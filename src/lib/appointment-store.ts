import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Redis } from "@upstash/redis";

const SEED_FILE = path.join(process.cwd(), "data", "appointments.seed.json");
const REDIS_KEY = "appointments";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!
});

export type AppointmentStatus = "confirmed" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string;
  meetType: string;
  intent: string[];
  urgency: string | null;
  note: string;
  slotIso: string;
  status: AppointmentStatus;
  aiHeat: "high" | "mid" | "low";
  aiSuggestion: string;
  aiSummary: string;
  aiNextAction: string;
  previewFile: string | null;
  createdAt: string;
};

export class SlotConflictError extends Error {
  constructor() {
    super("這個時段剛剛被預約，請重新選擇。");
    this.name = "SlotConflictError";
  }
}

let writeQueue: Promise<unknown> = Promise.resolve();

function withLock<T>(operation: () => Promise<T>) {
  const run = writeQueue.then(operation, operation);
  writeQueue = run.catch(() => undefined);
  return run;
}

async function readSeed(): Promise<Appointment[]> {
  const raw = await fs.readFile(SEED_FILE, "utf8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as Appointment[]) : [];
}

export async function readAppointments(): Promise<Appointment[]> {
  const rows = await redis.get<Appointment[]>(REDIS_KEY);
  if (rows) return rows;
  const seeded = await readSeed();
  await redis.set(REDIS_KEY, seeded);
  return seeded;
}

async function writeAppointments(rows: Appointment[]) {
  await redis.set(REDIS_KEY, rows);
}

export async function bookedSlots() {
  const rows = await readAppointments();
  return new Set(rows.filter((row) => row.status === "confirmed").map((row) => row.slotIso));
}

export async function listAppointments(status = "all") {
  const rows = await readAppointments();
  const filtered = status === "all" ? rows : rows.filter((row) => row.status === status);
  return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

type CreateAppointmentInput = Omit<Appointment, "id" | "status" | "previewFile" | "createdAt">;

export async function createAppointment(input: CreateAppointmentInput) {
  return withLock(async () => {
    const rows = await readAppointments();
    if (rows.some((row) => row.status === "confirmed" && row.slotIso === input.slotIso)) {
      throw new SlotConflictError();
    }
    const appointment: Appointment = {
      ...input,
      id: crypto.randomUUID(),
      status: "confirmed",
      previewFile: null,
      createdAt: new Date().toISOString()
    };
    rows.push(appointment);
    await writeAppointments(rows);
    return appointment;
  });
}

export async function attachPreview(id: string, previewFile: string) {
  return withLock(async () => {
    const rows = await readAppointments();
    const appointment = rows.find((row) => row.id === id);
    if (!appointment) return;
    appointment.previewFile = previewFile;
    await writeAppointments(rows);
  });
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  return withLock(async () => {
    const rows = await readAppointments();
    const appointment = rows.find((row) => row.id === id);
    if (!appointment) return null;
    appointment.status = status;
    await writeAppointments(rows);
    return appointment;
  });
}

export async function resetDemoAppointments() {
  return withLock(async () => {
    await redis.del(REDIS_KEY);
  });
}
