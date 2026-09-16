import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function LuxuryHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Close on Escape + lock scroll when drawer open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location.pathname]);

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
            aria-label="القائمة"
            aria-expanded={open}
            aria-controls="wasm-drawer"
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }} aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <button
            onClick={() => navigate("/")}
            aria-label="العودة للرئيسية"
            style={{ width: 132, cursor: "pointer", display: "flex", alignItems: "center", background: "transparent", border: 0, padding: 0 }}
          >
            <img src="/images/wasm-logo.png" alt="وسم WASM" loading="eager" decoding="async" width={132} height={36} style={{ width: 132, height: "auto", objectFit: "contain" }} />
          </button>

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

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="drawer-overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 60,
              }}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              id="wasm-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="قائمة التنقل"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "80%",
                maxWidth: 336,
                background: "#000",
                zIndex: 61,
                display: "flex",
                flexDirection: "column",
                padding: 24,
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                <img src="/images/wasm-logo.png" alt="وسم" loading="lazy" decoding="async" width={92} height={24} style={{ width: 92, height: "auto" }} />
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: "transparent", border: 0, color: "rgba(255,255,255,0.7)", fontSize: 20 }}
                  aria-label="إغلاق القائمة"
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>

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
