import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Topbar from "@/app/_components/Topbar";
import BookingForm from "@/app/card/booking/BookingForm";
import { PROFILE } from "@/lib/profile";

export const metadata: Metadata = {
  title: "張裕志｜雙北市房仲推薦・資產配置專家",
  description:
    "張裕志，志會買好房創辦人，資產配置專家，單月百萬經紀人實力認證，長期深耕雙北市在地市場動態。提供資產配置、稅務諮詢、簡易裝潢一站式服務，歡迎加LINE預約諮詢。",
  keywords: [
    "雙北房仲推薦",
    "新北市房仲推薦",
    "台北市房仲推薦",
    "資產配置專家",
    "新北市房仲",
    "台北市房仲",
    "張裕志",
    "志會買好房",
    "稅務諮詢",
    "新北買房",
    "新北賣房",
    "單月百萬經紀人"
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "張裕志｜雙北市房仲推薦・資產配置專家",
    description: "單月百萬經紀人實力認證。長期深耕雙北市在地市場，提供資產配置、稅務諮詢、簡易裝潢一站式服務。",
    images: [PROFILE.photoUrl]
  }
};

const SERVICES = [
  {
    title: "資產配置",
    text: "以顧問角度整合客戶財務目標、家庭階段與市場趨勢，量身規劃不動產資產配置策略，讓房產成為長期累積財富、對抗通膨的核心工具，而非單一次的買賣交易。"
  },
  {
    title: "稅務諮詢",
    text: "房地合一稅、契稅、贈與稅等交易稅負複雜且影響甚鉅，提供專業試算與節稅規劃諮詢，協助客戶在合法架構下降低稅務成本，把每一分錢都花在刀口上。"
  },
  {
    title: "簡易裝潢",
    text: "成交前後整合簡易修繕、局部裝潢建議與信任廠商媒合，從買賣到入住一條龍把關，體現一站式服務的專業與省心，讓客戶少走冤枉路。"
  }
];

export default function HomePage() {
  return (
    <div className="site-shell">
      <Topbar />
      <main className="profile-page">
        <section className="profile-hero">
          <div className="profile-hero-inner">
            <div className="profile-hero-photo">
              <Image
                src={PROFILE.photoUrl}
                alt={`${PROFILE.name} - 雙北市房仲推薦 資產配置專家`}
                width={220}
                height={220}
                priority
              />
            </div>
            <div className="profile-hero-copy">
              <p className="profile-eyebrow">新北市房產顧問｜雙北市房仲推薦首選</p>
              <h1>{PROFILE.name}</h1>
              <p className="profile-tagline">長期深耕雙北市・資產配置專家</p>
              <div className="profile-badges">
                <span className="profile-badge gold">單月百萬經紀人</span>
              </div>
              <p className="profile-credential">
                現任{" "}
                <a href={PROFILE.social.facebook} target="_blank" rel="noreferrer">
                  「新北市.台北市｜賣房買房｜預售屋 新成屋 中古屋 不動產討論交流平臺」
                </a>
                版主・個人品牌「志會買好房」創辦人
              </p>
              <div className="profile-cta">
                <a className="button" href={`tel:${PROFILE.phoneRaw}`}>📞 {PROFILE.phone}</a>
                <a className="button line-button" href={PROFILE.social.line} target="_blank" rel="noreferrer">加 LINE 好友諮詢</a>
                <Link className="button-secondary" href="/card/booking">線上預約諮詢</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <p className="profile-section-eyebrow">SERVICE AREA</p>
          <h2>服務區域｜雙北市房仲推薦首選</h2>
          <div className="profile-area-card">
            <h3>長期深耕雙北市・在地市場動態專家</h3>
            <p>
              長期深耕雙北市（新北市、台北市），每日緊盯區域行情、成交案例與生活機能變化，對各區供需脈動、公共建設進度瞭若指掌。無論是購屋自住、置產投資或換屋規劃，都能提供最即時、最貼近在地市場動態的專業建議。
            </p>
          </div>
        </section>

        <section className="profile-section profile-section-dark">
          <p className="profile-section-eyebrow light">ACHIEVEMENTS</p>
          <h2>我的戰績</h2>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-number">單月百萬</span>
              <span className="profile-stat-label">百萬經紀人實力認證</span>
            </div>
          </div>
          <p className="profile-stats-note">
            以單月百萬經紀人實力屢創佳績，是客戶信任與託付所累積的專業公信力。
          </p>
        </section>

        <section className="profile-section profile-section-center">
          <div className="profile-quote-mark" />
          <p className="profile-quote">秉持利他主義，創造自己被利用的價值，讓周遭的人更好。</p>
          <p className="profile-quote-body">
            房仲的價值不在於完成一筆交易，而在於能不能真心為客戶解決問題。這份初衷也延伸到社群——身兼「新北市.台北市｜賣房買房｜預售屋 新成屋 中古屋 不動產討論交流平臺」版主，日常協助平台上的買賣雙方解答疑惑、釐清交易眉角，用同樣的心態服務每一位需要幫助的人。
          </p>
        </section>

        <section className="profile-section">
          <p className="profile-section-eyebrow">SERVICES</p>
          <h2>服務項目｜資產配置專家的一站式服務</h2>
          <div className="profile-services">
            {SERVICES.map((service) => (
              <div className="profile-service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section" id="booking">
          <p className="profile-section-eyebrow">BOOKING</p>
          <h2>預約諮詢</h2>
          <p>
            選一個您方便的時段，留下聯絡方式與需求，我會親自與您聯繫。
            也歡迎直接加 LINE 或來電快速諮詢。
          </p>
          <BookingForm embedded />
          <div className="choice-row">
            <a className="button" href={PROFILE.social.line} target="_blank" rel="noreferrer">
              加 LINE 好友：{PROFILE.phone}
            </a>
            <a className="button-secondary" href={`tel:${PROFILE.phoneRaw}`}>
              直接來電：{PROFILE.phone}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
