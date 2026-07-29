import Image from "next/image";
import Link from "next/link";

export default function Topbar({ admin = false }: { admin?: boolean }) {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <Image className="brand-mark" src="/brand-icon.png" alt="志會買好房 品牌標誌" width={30} height={30} priority />
        <span>{admin ? "預約管理" : "志會買好房"}</span>
      </Link>
      <nav className="topnav" aria-label="主要導覽">
        <Link href="/card">名片</Link>
        <Link href="/card/booking">預約</Link>
        <Link href="/admin/appointments">後台</Link>
        <Link href="/demo">專案總覽</Link>
      </nav>
    </header>
  );
}
