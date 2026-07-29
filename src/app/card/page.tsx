import Image from "next/image";
import Link from "next/link";
import Topbar from "@/app/_components/Topbar";
import { PROFILE } from "@/lib/profile";

function ContactRow({ symbol, value, href, external }: { symbol: string; value: string; href?: string; external?: boolean }) {
  const content = (
    <>
      <span className="contact-symbol" aria-hidden="true">{symbol}</span>
      <span>{value}</span>
    </>
  );
  return href ? (
    <a className="contact-row" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{content}</a>
  ) : (
    <div className="contact-row">{content}</div>
  );
}

export default function CardPage() {
  return (
    <div className="site-shell">
      <Topbar />
      <main className="card-page">
        <article className="business-card">
          <div className="card-cover">志會買好房 · 張裕志</div>
          <div className="portrait-wrap">
            <Image
              className="portrait"
              src={PROFILE.photoUrl}
              width={150}
              height={150}
              priority
              alt={`${PROFILE.name}個人照`}
            />
          </div>
          <div className="card-copy">
            <h1>{PROFILE.name}<span className="alias">{PROFILE.alias}</span></h1>
            <div className="card-title">{PROFILE.title}</div>
            <p className="card-slogan">{PROFILE.slogan}</p>
          </div>
          <div className="card-actions">
            <Link className="button" href="/card/booking">預約一對一諮詢</Link>
            <a className="button line-button" href={PROFILE.social.line} target="_blank" rel="noreferrer">加入 LINE</a>
          </div>
          <div className="contact-list">
            <ContactRow symbol="T" value={PROFILE.phone} href={`tel:${PROFILE.phoneRaw}`} />
            <ContactRow symbol="@" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
            <ContactRow symbol="P" value={PROFILE.address} />
            <ContactRow symbol="G" value="現任版主：新北市.台北市｜賣房買房｜預售屋 新成屋 中古屋 不動產討論交流平臺" href={PROFILE.social.facebook} external />
          </div>
          <div className="social-row">
            <a href={PROFILE.social.facebook} target="_blank" rel="noreferrer">加入 FB 社團</a>
          </div>
        </article>
      </main>
    </div>
  );
}
