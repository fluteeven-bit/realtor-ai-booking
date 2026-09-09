import { NextRequest, NextResponse } from "next/server";
import { adminCookie, checkAdminPassword, clearedAdminCookie, setAdminCookie } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** POST /api/admin-auth —— 用密碼換一張 30 天的登入憑證 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  const password = String(body?.password || "");
  if (!password) return NextResponse.json({ error: "請輸入密碼" }, { status: 400 });
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "密碼錯誤" }, { status: 401 });
  }
  await setAdminCookie(adminCookie());
  return NextResponse.json({ ok: true });
}

/** DELETE /api/admin-auth —— 登出 */
export async function DELETE() {
  await setAdminCookie(clearedAdminCookie());
  return NextResponse.json({ ok: true });
}
