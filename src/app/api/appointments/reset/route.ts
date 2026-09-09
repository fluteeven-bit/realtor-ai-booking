import { NextResponse } from "next/server";
import { resetDemoAppointments } from "@/lib/appointment-store";
import { isAdmin } from "@/lib/admin-auth";

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "請先登入後台。" }, { status: 401 });
  }
  try {
    await resetDemoAppointments();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[reset]", error);
    return NextResponse.json({ ok: false, error: "重設示範資料失敗。" }, { status: 500 });
  }
}
