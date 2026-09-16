import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LuxuryHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          height: "var(--header-h)",
          zIndex: 50,
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="container-atelier"
          style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
        >
          <button
            aria-label="menu"
            onClick={() => setOpen(true)}
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: 44,
              height: 44,
              border: 0,
              background: "transparent",
              color: "var(--accent)",
            }}
            className="burger-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div
            onClick={() => navigate("/")}
            style={{ width: 132, cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <img src="/images/wasm-logo.png" alt="وسم WASM" style={{ width: 132, height: "auto", objectFit: "contain" }} />
          </div>

          <nav
            style={{ gap: 40, alignItems: "center" }}
            className="nav-desktop"
          >
            <Link to="/" style={{ fontSize: 14, color: isActive("/") ? "var(--accent)" : "rgba(255,255,255,0.8)" }}>
              الرئيسية
            </Link>
            <Link to="/story" style={{ fontSize: 14, color: isActive("/story") ? "var(--accent)" : "rgba(255,255,255,0.8)" }}>
              قصتنا
            </Link>
            <Link to="/contact" style={{ fontSize: 14, color: isActive("/contact") ? "var(--accent)" : "rgba(255,255,255,0.8)" }}>
              تواصل معنا
            </Link>
            <Link to="/builder" style={{ fontSize: 14, color: isActive("/builder") ? "var(--accent)" : "rgba(255,255,255,0.8)" }}>
              صمّم ثوبك
            </Link>
          </nav>

          <div style={{ gap: 12, alignItems: "center" }} className="actions-desktop">
            <Link to="/track">
              <button className="btn btn-ghost-gold" style={{ padding: "8px 18px", fontSize: 13 }}>
                تتبع طلبك
              </button>
            </Link>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: 12,
                color: "var(--muted)",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: "#4ADE80", display: "inline-block" }} />
              وضع الضيف — لا حاجة للتسجيل
            </span>
          </div>

          <div style={{ width: 44 }} className="spacer-mobile" />
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 60,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s",
        }}
      />

      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "80%",
          maxWidth: 336,
          background: "#000",
          zIndex: 61,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .34s cubic-bezier(.4,0,.2,1)",
          display: "flex",
          flexDirection: "column",
          padding: 24,
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <img src="/images/wasm-logo.png" alt="وسم" style={{ width: 92, height: "auto" }} />
          <button
            onClick={() => setOpen(false)}
            style={{ background: "transparent", border: 0, color: "rgba(255,255,255,0.7)", fontSize: 20 }}
            aria-label="close"
          >
            ✕
          </button>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 24, fontSize: 18 }}>
          <Link to="/" onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.86)" }}>
            الرئيسية
          </Link>
          <Link to="/story" onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.86)" }}>
            قصتنا
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.86)" }}>
            تواصل معنا
          </Link>
          <Link to="/builder" onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.86)" }}>
            صمّم ثوبك
          </Link>
        </nav>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/track" onClick={() => setOpen(false)}>
            <button className="btn btn-ghost-gold" style={{ width: "100%" }}>
              تتبع طلبك
            </button>
          </Link>
          <span
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "var(--muted)",
              padding: 8,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            وضع الضيف — اطلب مباشرة بدون حساب
          </span>
        </div>
      </aside>

      <style>{`
        .nav-desktop, .actions-desktop { display: none; }
        .burger-btn { display: inline-grid; }
        .spacer-mobile { display: block; }
        @media(min-width:1100px){
          .nav-desktop { display: flex; }
          .actions-desktop { display: flex; }
          .burger-btn { display: none !important; }
          .spacer-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
