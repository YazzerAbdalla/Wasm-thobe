import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface IBookingModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function BookingModal({ open, onClose }: IBookingModalProps) {
  const [ok, setOk] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOk(false);
    } else {
      // focus first field
      setTimeout(() => nameRef.current?.focus(), 120);
    }
  }, [open]);

  // Close on Escape (also handled by parent, but keep here for focus)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const confirm = () => {
    setError(null);
    const n = name.trim();
    const p = phone.trim().replace(/\s/g, "");
    if (!n || n.length < 2) {
      setError("الرجاء كتابة اسمك الكامل (حرفان على الأقل).");
      return;
    }
    if (!p) {
      setError("الرجاء إدخال رقم الجوال.");
      return;
    }
    const digits = p.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 14) {
      setError("رقم الجوال غير صحيح — 7 إلى 14 رقم بعد مفتاح الدولة.");
      return;
    }
    setError(null);
    setOk(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="booking-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            position: "fixed",
            inset: 0,
            zIndex: 70,
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.66)" }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            style={{
              position: "relative",
              maxWidth: 520,
              width: "100%",
              padding: 28,
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 id="booking-title" style={{ margin: 0, fontSize: 18 }}>
                احجز موعد قياس
              </h3>
              <button
                onClick={onClose}
                aria-label="إغلاق"
                style={{ background: "transparent", border: 0, color: "var(--muted)", fontSize: 20 }}
              >
                ✕
              </button>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 16px" }}>
              حرفيّ يزورك أو تستقبلنا في الأتيليه — 30 دقيقة، قياس دقيق، شاي عربي.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="booking-name" style={{ fontSize: 13, color: "var(--muted)" }}>
                  الاسم
                </label>
                <input
                  id="booking-name"
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك"
                  className="input"
                  style={inputStyle}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={error && !name.trim() ? true : undefined}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="booking-phone" style={{ fontSize: 13, color: "var(--muted)" }}>
                  الجوال
                </label>
                <input
                  id="booking-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 ..."
                  className="input"
                  style={inputStyle}
                  autoComplete="tel"
                  inputMode="tel"
                  aria-required="true"
                  aria-invalid={error && !phone.trim() ? true : undefined}
                  dir="ltr"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="booking-date" style={{ fontSize: 13, color: "var(--muted)" }}>
                  التاريخ المفضل
                </label>
                <input id="booking-date" type="date" className="input" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="booking-time" style={{ fontSize: 13, color: "var(--muted)" }}>
                  الوقت
                </label>
                <input id="booking-time" type="time" className="input" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
              <label htmlFor="booking-place" style={{ fontSize: 13, color: "var(--muted)" }}>
                المكان
              </label>
              <select id="booking-place" className="input" style={inputStyle}>
                <option>الأتيليه — الرياض</option>
                <option>زيارة منزلية (الرياض فقط)</option>
                <option>فيديو — قياس عن بُعد</option>
                <option disabled>جدة — قريباً</option>
              </select>
            </div>

            {/* Inline error — replaces alert() */}
            <div aria-live="polite" aria-atomic="true" style={{ minHeight: error ? undefined : 0 }}>
              {error && (
                <p
                  role="alert"
                  style={{
                    marginTop: 12,
                    padding: "10px 12px",
                    borderRadius: 10,
                    fontSize: 13,
                    background: "rgba(185,28,28,0.18)",
                    border: "1px solid rgba(185,28,28,0.38)",
                    color: "#FCA5A5",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
            </div>

            <button className="btn btn-primary" style={{ width: "100%", marginTop: 12 }} onClick={confirm}>
              تأكيد الموعد
            </button>

            {ok && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: 12,
                  textAlign: "center",
                  fontSize: 13,
                  color: "#86EFAC",
                  background: "rgba(34,197,94,0.10)",
                  border: "1px solid rgba(34,197,94,0.20)",
                  padding: 10,
                  borderRadius: 10,
                }}
                role="status"
                aria-live="polite"
              >
                تم الحجز — سنتصل لتأكيد الموعد خلال ساعتين.
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "#fff",
  fontSize: 14,
};
