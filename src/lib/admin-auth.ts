import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * 預約後台的密碼保護。
 *
 * 做法:輸入正確密碼 → 發一張有簽章、有效期 30 天的 cookie。
 * 簽章用 AUTH_SECRET 產生,伺服器端驗,別人偽造不出來。
 */

const COOKIE = "rb_admin";
const DAYS = 30;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("缺少環境變數 AUTH_SECRET");
  return s;
}

function sign(value: string): string {
  const mac = crypto.createHmac("sha256", secret()).update(value).digest("hex");
  return value + "." + mac;
}

/** 驗證時金鑰不存在就一律當作沒登入,不要讓整頁噴錯 */
function unsign(signed: string | undefined): string | null {
  if (!signed || !process.env.AUTH_SECRET) return null;
  const i = signed.lastIndexOf(".");
  if (i <= 0) return null;
  const value = signed.slice(0, i);
  const mac = signed.slice(i + 1);
  const expect = crypto.createHmac("sha256", secret()).update(value).digest("hex");
  const a = Buffer.from(mac, "utf8");
  const b = Buffer.from(expect, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return value;
}

/** 常數時間比對,避免用回應時間猜密碼 */
export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function checkAdminPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD || "";
  if (!pw) return false;
  return safeEqual(input, pw);
}

export function adminCookie() {
  return { name: COOKIE, value: sign("admin|" + (Date.now() + DAYS * 86400000)), maxAge: DAYS * 86400 };
}

export function clearedAdminCookie() {
  return { name: COOKIE, value: "", maxAge: 0 };
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const value = unsign(jar.get(COOKIE)?.value);
  if (!value) return false;
  const [scope, expStr] = value.split("|");
  if (scope !== "admin") return false;
  const exp = Number(expStr);
  return Number.isFinite(exp) && exp > Date.now();
}

export async function setAdminCookie(c: { name: string; value: string; maxAge: number }) {
  const jar = await cookies();
  jar.set(c.name, c.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: c.maxAge,
  });
}
