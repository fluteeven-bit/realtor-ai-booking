import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "張裕志｜志會買好房・雙北市房產顧問",
  description:
    "張裕志，志會買好房創辦人，雙北市房產顧問。提供資產配置、稅務諮詢、簡易裝潢一站式服務，可線上預約諮詢。",
  // 預設開放 Google 收錄;後台那幾頁會各自蓋掉這個設定
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body>{children}</body>
    </html>
  );
}
