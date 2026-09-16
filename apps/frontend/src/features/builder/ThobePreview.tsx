import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuilderStore } from "./builderStore";

export default function ThobePreview() {
  const {
    selectedColor,
    selectedFabric,
    selectedCollar,
    selectedPlacket,
    selectedButton,
    selectedPocket,
    selectedCuff,
    currentStep,
  } = useBuilderStore();
  const total = useBuilderStore((s) => s.getTotalPrice());
  const [showTip, setShowTip] = useState(false);
  const [imgError, setImgError] = useState(false);

  // ---- Material Preview logic: show chosen material sheet, not thobe silhouette ----
  // Step 1: color, 2: fabric, 3: collar, 4: placket/buttons/pocket/cuff, 5: review → fabric
  let preview: { thumb: string; title: string; desc: string; label: string } | null = null;

  const fabricThumb = selectedFabric?.thumb || "";
  const isImageThumb = (t: string) => t.startsWith("/");

  if (currentStep === 1 && selectedColor) {
    preview = {
      thumb: "",
      title: selectedColor.name,
      desc: `لون ${selectedColor.name} — ${selectedColor.hex_code}`,
      label: "اللون",
    };
  } else if (currentStep === 2 && selectedFabric) {
    preview = {
      thumb: fabricThumb,
      title: selectedFabric.name,
      desc: selectedFabric.description,
      label: "الخامة — عن قرب",
    };
  } else if (currentStep === 3 && selectedCollar) {
    preview = {
      thumb: selectedCollar.thumb,
      title: selectedCollar.name,
      desc: selectedCollar.description,
      label: "الياقة — تفصيل",
    };
  } else if (currentStep === 4) {
    // Prioritize button > placket > pocket > cuff based on recent selection
    if (selectedButton) {
      preview = { thumb: selectedButton.thumb, title: selectedButton.name, desc: selectedButton.description, label: "الزر — عن قرب" };
    } else if (selectedPlacket) {
      preview = { thumb: selectedPlacket.thumb, title: selectedPlacket.name, desc: selectedPlacket.description, label: "فتحة الصدر" };
    } else if (selectedCuff) {
      preview = { thumb: selectedCuff.thumb, title: selectedCuff.name, desc: selectedCuff.description, label: "الأسورة" };
    } else if (selectedPocket) {
      preview = { thumb: selectedPocket.thumb, title: selectedPocket.name, desc: selectedPocket.description, label: "الجيب" };
    }
  } else {
    // Review or fallback → fabric
    if (selectedFabric) {
      preview = { thumb: fabricThumb, title: selectedFabric.name, desc: selectedFabric.description, label: "الخامة — الملخص" };
    }
  }

  // Fallback if no preview (first load)
  if (!preview) {
    preview = {
      thumb: fabricThumb || "",
      title: selectedFabric?.name ?? "قطن مصري فاخر",
      desc: selectedFabric?.description ?? "ملمس حريري، تهوية عالية",
      label: "معاينة الخامة",
    };
  }

  useEffect(() => {
    setImgError(false);
  }, [preview.thumb]);

  const showAsColor = currentStep === 1 && selectedColor && !preview.thumb;
  const thumbIsImage = preview.thumb ? isImageThumb(preview.thumb) : false;

  return (
    <aside className="glass" style={{ position: "sticky", top: 96, padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)" }}>معاينة الخامة</span>
        <span style={{ fontSize: 11, color: "var(--accent)", background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)", padding: "4px 10px", borderRadius: 999 }}>
          {preview.label}
        </span>
      </div>

      {/* Material stage — replaces thobe SVG */}
      <div
        style={{
          background: "radial-gradient(500px 300px at 50% 20%, rgba(212,175,55,0.10), transparent 70%), linear-gradient(180deg, #1A1A18, #0E0E0D)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
          aspectRatio: "4 / 3",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Sadu whisper — heritage hint */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2l5 5-5 5-5-5z M14 14l5 5-5 5-5-5z' fill='none' stroke='%23D4AF37' stroke-width='0.6' opacity='0.9'/%3E%3C/svg%3E")`,
            backgroundSize: "28px 28px",
            mixBlendMode: "overlay" as const,
          }}
        />

        <AnimatePresence mode="wait">
          {showAsColor ? (
            <motion.div
              key={`color-${selectedColor?.id}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: 24 }}
            >
              <div
                style={{
                  width: 148,
                  height: 148,
                  borderRadius: 999,
                  background: selectedColor!.hex_code,
                  border: "3px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,175,55,0.22)",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{preview.title}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", marginTop: 4 }}>{preview.desc}</div>
              </div>
            </motion.div>
          ) : thumbIsImage && !imgError ? (
            <motion.div
              key={preview.thumb}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <img
                src={preview.thumb}
                alt={preview.title}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 42%, rgba(0,0,0,0.68) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 14,
                  left: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>{preview.label}</span>
                <strong style={{ fontSize: 14, color: "#fff" }}>{preview.title}</strong>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.66)", lineHeight: 1.6 }}>{preview.desc}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`fallback-${preview.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                background: preview.thumb && !thumbIsImage ? preview.thumb : "linear-gradient(135deg,#F5F0E8,#E8DCC6)",
                display: "grid",
                placeItems: "center",
                padding: 24,
                textAlign: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-mono)" }}>{preview.label} — صورة قريباً</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0B0B0B", marginTop: 6 }}>{preview.title}</div>
                <div style={{ fontSize: 12, color: "rgba(0,0,0,0.58)", marginTop: 4 }}>{preview.desc}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected summary — curated fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--muted)" }}>اللون</span>
          <strong style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {selectedColor?.name ?? "—"}
            {selectedColor && <span style={{ width: 14, height: 14, borderRadius: 999, background: selectedColor.hex_code, border: "1px solid rgba(255,255,255,0.14)", display: "inline-block" }} />}
          </strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--muted)" }}>القماش</span>
          <strong>{selectedFabric?.name ?? "—"}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--muted)" }}>الياقة</span>
          <strong>{selectedCollar?.name ?? "—"}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--muted)" }}>الزر</span>
          <strong>{selectedButton?.name ?? "—"}</strong>
        </div>
      </div>

      <hr className="rule" />

      <div
        className="price-row"
        style={{
          background: "rgba(212,175,55,0.08)",
          borderColor: "rgba(212,175,55,0.18)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          border: "1px solid",
          borderRadius: 10,
        }}
      >
        <span style={{ fontSize: 13, color: "var(--muted)" }}>الإجمالي</span>
        <AnimatePresence mode="popLayout">
          <motion.strong
            key={total}
            initial={{ y: 8, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 380 }}
            style={{ color: "var(--accent)", fontSize: 18, fontFamily: "var(--font-mono)", display: "inline-block" }}
          >
            SAR {total}
          </motion.strong>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, position: "relative" }}>
        <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", margin: 0 }}>السعر يشمل التفصيل والتغليف الحريري</p>
        <button
          type="button"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
          aria-label="تفاصيل الضمان"
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "var(--muted)",
            fontSize: 10,
            display: "grid",
            placeItems: "center",
            cursor: "help",
            flex: "0 0 16px",
          }}
        >
          ؟
        </button>
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#141412",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 12,
                padding: "12px 14px",
                width: 260,
                textAlign: "right",
                boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                zIndex: 5,
              }}
              role="tooltip"
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 6 }}>ضمان 14 يوم — إعادة تفصيل مجاناً</div>
              <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>إن لم يكن المقاس على توقعك، نعيد التفصيل بلا أسئلة. يشمل التوصيل.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
