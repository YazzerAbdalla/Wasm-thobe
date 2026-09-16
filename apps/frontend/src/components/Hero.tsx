import { Link } from "react-router-dom";
import { useBooking } from "../hooks/useBooking";

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="hero-wrap" style={{ paddingTop: "var(--header-h)", minHeight: "92vh", position: "relative", overflow: "hidden", display: "flex" } as React.CSSProperties}>
      {/* Mobile */}
      <div
        className="hero-mobile"
        style={{
          display: "flex",
          minHeight: "calc(100vh - 80px)",
          width: "100%",
          position: "relative",
          background:
            "linear-gradient(to left, rgba(0,0,0,1) 8%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.42) 100%), radial-gradient(600px 400px at 70% 50%, rgba(212,175,55,0.08), transparent 60%), url('/images/Hero.png') center/cover no-repeat",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "48px 20px",
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 28, alignItems: "center", animation: "heroFadeUp .9s cubic-bezier(.22,1,.36,1) .14s both" } as React.CSSProperties}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
            <p className="eyebrow" style={{ letterSpacing: "0.45em" }}>
              craftsmanship
            </p>
            <h1 className="gold-text" style={{ fontSize: 40, lineHeight: 1.2, margin: 0 }}>
              إرث من الإتقان
            </h1>
          </div>
          <p style={{ fontSize: 24, color: "#fff", margin: 0, fontWeight: 400, maxWidth: "22ch" }}>ثياب نُشكّلها وفق أذواق مختارة، ومعالجة يدوية دقيقة.</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/builder" className="btn btn-primary" style={{ padding: "16px 36px", fontSize: 16, minWidth: 190 }}>
              صمّم ثوبك الخاص
            </Link>
            <button className="btn btn-outline" style={{ padding: "16px 36px", fontSize: 16, minWidth: 190 }} onClick={openBooking}>
              احجز موعد قياس
            </button>
          </div>
          <img src="/images/arrow-icon.png" alt="" loading="lazy" decoding="async" style={{ width: 200, opacity: 0.9, marginBlock: 4 }} />
          <Link to="/story" className="link-gold" style={{ color: "var(--accent)", fontWeight: 600, fontSize: 20 }}>
            اكتشف الرحلة ↓
          </Link>
          <div
            style={{
              marginTop: 4,
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.72)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              flexWrap: "wrap",
            }}
          >
            <span>★ 4.9 / 1,200 عميل</span>
            <span style={{ width: 4, height: 4, background: "var(--accent)", borderRadius: 999, display: "inline-block" }} />
            <span>توصيل خلال 7 أيام</span>
            <span style={{ width: 4, height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 999, display: "inline-block" }} />
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>موثّق في معروف</span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hero-desktop" style={{ display: "none", width: "100%" } as React.CSSProperties}>
        <div
          className="hero-content"
          style={
            {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              padding: "56px 32px",
              textAlign: "center",
              background: "linear-gradient(to left, #000 0%, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0) 100%)",
              position: "relative",
              zIndex: 2,
              animation: "heroContentIn .92s cubic-bezier(.22,1,.36,1) both",
            } as React.CSSProperties
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
            <p className="eyebrow" style={{ letterSpacing: "0.45em" }}>
              craftsmanship
            </p>
            <h1 className="gold-text" style={{ fontSize: 40, lineHeight: 1.2, margin: 0 }}>
              إرث من الإتقان
            </h1>
          </div>
          <p style={{ fontSize: 24, color: "#fff", margin: 0, fontWeight: 400, maxWidth: "22ch" }}>ثياب نُشكّلها وفق أذواق مختارة، ومعالجة يدوية دقيقة.</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", flexDirection: "column", alignItems: "center" } as React.CSSProperties}>
            <Link to="/builder" className="btn btn-primary" style={{ width: 280, padding: "16px 36px", fontSize: 16 }}>
              صمّم ثوبك الخاص
            </Link>
            <button className="btn btn-outline" style={{ width: 280, padding: "16px 36px", fontSize: 16 }} onClick={openBooking}>
              احجز موعد قياس
            </button>
          </div>
          <img src="/images/arrow-icon.png" alt="" loading="lazy" decoding="async" style={{ width: 200, opacity: 0.9, marginBlock: 4 }} />
          <Link to="/story" style={{ color: "var(--accent)", fontWeight: 600, fontSize: 20 }}>
            اكتشف الرحلة ↓
          </Link>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 18,
              alignItems: "center",
              color: "var(--muted)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
            }}
          >
            <span>★ 4.9 / 1,200 عميل</span>
            <span style={{ width: 4, height: 4, background: "var(--accent)", borderRadius: 999, display: "inline-block" }} />
            <span>توصيل خلال 7 أيام</span>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            background: "#0f0f0e",
            animation: "heroImageIn 1.02s cubic-bezier(.22,1,.36,1) .08s both",
          } as React.CSSProperties}
        >
          <img
            src="/images/Hero.png"
            alt="ثوب وسم — لقطة هيرو"
            fetchPriority="high"
            decoding="async"
            width={1280}
            height={720}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "contrast(1.04) saturate(0.92)" } as React.CSSProperties}
          />
          <div
            style={{
              content: '""',
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 18%, transparent 55%)",
            }}
          />
        </div>
      </div>

      <style>{`
        @media(min-width:1024px){ .hero-desktop{ display:flex !important; min-height: calc(92vh - 80px); } .hero-mobile{ display:none !important; } }
        .hero-desktop .hero-content > *{ opacity:0; animation: heroFadeUp .56s ease both }
        .hero-desktop .hero-content > *:nth-child(1){ animation-delay:.22s }
        .hero-desktop .hero-content > *:nth-child(2){ animation-delay:.32s }
        .hero-desktop .hero-content > *:nth-child(3){ animation-delay:.42s }
        .hero-desktop .hero-content > *:nth-child(4){ animation-delay:.52s }
        .hero-desktop .hero-content > *:nth-child(5){ animation-delay:.62s }
        .hero-desktop .hero-content > *:nth-child(6){ animation-delay:.72s }
        .link-gold:hover{ filter:brightness(1.15) }
      `}</style>
    </section>
  );
}
