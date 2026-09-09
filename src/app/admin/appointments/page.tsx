import Topbar from "@/app/_components/Topbar";
import { listAppointments } from "@/lib/appointment-store";
import { isAdmin } from "@/lib/admin-auth";
import AdminLogin from "../AdminLogin";
import AppointmentBoard from "./AppointmentBoard";

export const dynamic = "force-dynamic";

// 後台是客戶名單,絕對不能被搜尋引擎收錄
export const metadata = { robots: { index: false, follow: false } };

export default async function AppointmentsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  // 沒登入就只給登入畫面 —— 客戶資料連撈都不撈,不會出現在網頁原始碼裡
  if (!(await isAdmin())) {
    return (
      <div className="admin-page">
        <AdminLogin />
      </div>
    );
  }

  const params = await searchParams;
  const status = ["confirmed", "completed", "cancelled"].includes(params.status || "")
    ? params.status!
    : "all";
  const rows = await listAppointments(status);

  return (
    <div className="admin-page">
      <Topbar admin />
      <AppointmentBoard initialRows={rows} status={status} />
    </div>
  );
}
