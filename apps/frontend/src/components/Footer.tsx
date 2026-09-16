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
              {[
                {
                  label: "X",
                  href: "#",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "#",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: "Snapchat",
                  href: "#",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M12 3c3.2 0 5 1.7 5 4.2 0 1.6-.8 2.9-2 3.6.2.8.6 1.9 1.6 2.4-.4.4-1.1.6-2 .3-.5-.2-1-.6-1.6-1-1 .3-2 .5-3 .5s-2-.2-3-.5c-.6.4-1.1.8-1.6 1-.9.3-1.6.1-2-.3 1-.5 1.4-1.6 1.6-2.4C6.8 10 6 8.7 6 7.2 6 4.7 7.8 3 11 3h1z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--muted)",
                  }}
                >
                  {s.icon}
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
                aria-label="بريدك الإلكتروني"
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
          </div>
        </div>
      </div>

      {/* ── Trust bar — fixed horizontal full-bleed, responsive ── */}
      <div
        className="trust-bar-wrap"
        style={{
          marginTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
          width: "100%",
        }}
      >
        <div
          className="container-atelier trust-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "14px 32px",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          {/* Maroof — primary */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(212,175,55,0.10)",
              border: "1px solid rgba(212,175,55,0.22)",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
            موثّق في معروف
          </span>

          <span className="trust-sep" aria-hidden="true" />

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "rgba(255,255,255,0.82)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.03em",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <rect x="3" y="7" width="18" height="10" rx="2" />
              <path d="M3 10h18" />
            </svg>
            مدى · Tabby · Apple Pay · STC Pay
          </span>

          <span className="trust-sep" aria-hidden="true" />

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "var(--muted)",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 12l2 2 6-6" />
              <circle cx="12" cy="12" r="8" />
            </svg>
            شحن مجاني + دفع عند الاستلام
          </span>

          <span className="trust-sep" aria-hidden="true" />

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "var(--muted)",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
            </svg>
            ضمان 14 يوم — إعادة تفصيل مجاناً
          </span>
        </div>
      </div>

      {/* Copyright — outside grid, centered, responsive */}
      <div className="container-atelier" style={{ paddingTop: 16, paddingBottom: 4, textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.32)", fontFamily: "var(--font-mono)" }}>
          © 2026 وسم — جميع الحقوق محفوظة · صُنع في الرياض
        </p>
      </div>
      <style>{`
        .trust-sep{ width:4px; height:4px; border-radius:999px; background:rgba(255,255,255,0.18); flex:0 0 4px; }
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr !important}}
        @media(max-width:560px){.footer-grid{grid-template-columns:1fr !important}}
        /* Trust bar responsive: horizontal scroll on narrow, wrap on tablet */
        @media(max-width:640px){
          .trust-bar{
            justify-content:flex-start !important;
            flex-wrap:nowrap !important;
            overflow-x:auto;
            -webkit-overflow-scrolling:touch;
            scrollbar-width:none;
            gap:10px !important;
            padding-inline:0 !important;
          }
          .trust-bar::-webkit-scrollbar{ display:none; }
          .trust-bar > span{ flex:0 0 auto; }
        }
        @media(min-width:641px) and (max-width:900px){
          .trust-bar{ gap:10px !important; }
        }
      `}</style>
    </footer>
  );
}
