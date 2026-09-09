"use client";

import { useState } from "react";

/** 後台登入畫面 —— 密碼對了才看得到客戶名單 */
export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !pw) return;
    setBusy(true);
    setErr("");
    const r = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    }).then((x) => x.json()).catch(() => null);
    setBusy(false);
    if (r?.ok) window.location.reload();
    else setErr(r?.error || "登入失敗");
  }

  return (
    <main className="booking-shell">
      <div className="page-heading">
        <h1>預約後台</h1>
        <p>這裡是客戶名單,需要密碼才能進入。</p>
      </div>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="admin-pw">後台密碼</label>
          <input
            autoFocus
            id="admin-pw"
            onChange={(e) => setPw(e.target.value)}
            type="password"
            value={pw}
          />
        </div>
        {err ? <div className="form-error" role="alert">{err}</div> : null}
        <button className="button booking-submit" disabled={busy || !pw} type="submit">
          {busy ? "確認中..." : "登入"}
        </button>
      </form>
    </main>
  );
}
