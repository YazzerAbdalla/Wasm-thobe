import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 0 32px",
        marginTop: 48,
      }}
    >
      <div className="container-atelier">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: 28,
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  border: "1px solid var(--accent)",
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent)",
                  fontSize: 13,
                }}
              >
                و
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>وسم</span>
              <span style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.12em" }}>
                WASM ATELIER
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9, margin: 0 }}>
              أتيليه ثياب فاخرة — حرفية هادئة، تفصيل على المقاس، وتغليف حريري. الرياض · منذ 2018
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {["𝕏", "◎", "▶"].map((c) => (
                <a
                  key={c}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: 13,
                    color: "var(--muted)",
                  }}
                >
                  {c}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5
              style={{
                margin: "0 0 14px",
                fontSize: 13,
                letterSpacing: "0.08em",
                color: "#fff",
                fontFamily: "var(--font-mono)",
              }}
            >
              المنصة
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to="/builder" style={{ fontSize: 13, color: "var(--muted)" }}>
                صمّم ثوبك
              </Link>
              <Link to="/track" style={{ fontSize: 13, color: "var(--muted)" }}>
                تتبع طلبك
              </Link>
              <a href="#" style={{ fontSize: 13, color: "var(--muted)" }}>
                حجز موعد قياس
              </a>
              <a href="#" style={{ fontSize: 13, color: "var(--muted)" }}>
                دليل المقاسات
              </a>
            </div>
          </div>

          <div>
            <h5
              style={{
                margin: "0 0 14px",
                fontSize: 13,
                letterSpacing: "0.08em",
                color: "#fff",
                fontFamily: "var(--font-mono)",
              }}
            >
              وسم
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to="/story" style={{ fontSize: 13, color: "var(--muted)" }}>
                قصتنا
              </Link>
              <Link to="/contact" style={{ fontSize: 13, color: "var(--muted)" }}>
                تواصل معنا
              </Link>
              <a href="#" style={{ fontSize: 13, color: "var(--muted)" }}>
                الأسئلة الشائعة
              </a>
              <a href="#" style={{ fontSize: 13, color: "var(--muted)" }}>
                سياسة الاسترجاع
              </a>
            </div>
          </div>

          <div>
            <h5
              style={{
                margin: "0 0 14px",
                fontSize: 13,
                letterSpacing: "0.08em",
                color: "#fff",
                fontFamily: "var(--font-mono)",
              }}
            >
              النشرة — حكايات القماش
            </h5>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9, margin: 0 }}>
              رسالة كل شهر: قماش جديد، حرفي جديد، وحكاية ثوب. لا إزعاج.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input
                className="input"
                placeholder="بريدك الإلكتروني"
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "#fff",
                  fontSize: 14,
                }}
              />
              <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
                اشتراك
              </button>
            </div>
            <p style={{ marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.36)" }}>
              © 2026 وسم — جميع الحقوق محفوظة · صُنع في الرياض
            </p>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr !important}} @media(max-width:560px){.footer-grid{grid-template-columns:1fr !important}}`}</style>
    </footer>
  );
}
