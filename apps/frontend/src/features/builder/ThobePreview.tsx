import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuilderStore } from "./builderStore";

const DARK_COLORS = new Set(["charcoal", "navy", "midnight", "c9", "c10", "c11", "c12"]);

export default function ThobePreview() {
  const { selectedColor, selectedFabric, selectedAccessories } = useBuilderStore();
  const total = useBuilderStore((s) => s.getTotalPrice());
  const [showTip, setShowTip] = useState(false);

  const hex = selectedColor?.hex_code ?? "#F5F0E8";
  const isDark =
    selectedColor ? (DARK_COLORS.has(selectedColor.id) || ["#2B2B2B", "#1A2332", "#0A0A0B", "#1a1a1a", "#000080", "#36454F"].includes(hex.toUpperCase())) : false;

  const has = (id: string) => selectedAccessories.some((a) => a.id === id || a.type === id);
  const showCollar = has("collar") || has("decoration");
  const showButtons = has("cuff") || has("cufflinks");
  const showPocket = has("pocket");
  const showEmb = has("emb") || has("personalization");
  const fabricId = selectedFabric?.id ?? "cotton";
  const overlayOpacity = fabricId === "linen" || selectedFabric?.texture_class === "fabric-linen" ? 0.22 : fabricId === "wool" || selectedFabric?.texture_class === "fabric-wool" ? 0.08 : 0.12;

  const addonNames = selectedAccessories.map((a) => a.name).join(" · ");

  // Sadu diamond hint opacity — slightly higher for linen
  const saduOpacity = fabricId === "linen" ? 0.07 : fabricId === "wool" ? 0.045 : 0.035;

  return (
    <aside className="glass" style={{ position: "sticky", top: 96, padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)" }}>معاينة حيّة</span>
        <span style={{ fontSize: 11, color: "var(--accent)", background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)", padding: "4px 10px", borderRadius: 999 }}>تحديث فوري</span>
      </div>

      <div
        style={{
          background: "radial-gradient(500px 300px at 50% 20%, rgba(212,175,55,0.10), transparent 70%), linear-gradient(180deg, #1A1A18, #0E0E0D)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
          aspectRatio: "3 / 4",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Sadu subtle pattern — whispers heritage, not wallpaper */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: saduOpacity }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: saduOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2l5 5-5 5-5-5z M14 14l5 5-5 5-5-5z' fill='none' stroke='%23D4AF37' stroke-width='0.6' opacity='0.9'/%3E%3C/svg%3E")`,
            backgroundSize: "28px 28px",
            mixBlendMode: "overlay" as const,
          }}
        />

        <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Thobe preview" style={{ width: "64%", height: "auto", filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.55))" }}>
          <motion.path
            d="M70 18 L130 18 L148 36 L148 92 L168 92 L168 280 L32 280 L32 92 L52 92 L52 36 Z"
            animate={{ fill: hex }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            stroke={isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.06)"}
            strokeWidth={1.2}
          />
          {/* collar */}
          <motion.path
            d="M86 18 L100 38 L114 18"
            fill="none"
            stroke="#D4AF37"
            strokeWidth={1.4}
            strokeLinejoin="round"
            initial={false}
            animate={{ opacity: showCollar ? 1 : 0 }}
            transition={{ duration: 0.32 }}
          />
          {/* placket */}
          <motion.rect x="96" y="38" width="8" height="78" rx="3" fill="rgba(0,0,0,0.06)" initial={false} animate={{ opacity: showButtons || showEmb ? 1 : 0 }} transition={{ duration: 0.3 }} />
          {/* buttons */}
          <motion.g initial={false} animate={{ opacity: showButtons ? 1 : 0 }} transition={{ duration: 0.32 }}>
            <circle cx="100" cy="58" r={3.2} fill="#D4AF37" stroke="rgba(0,0,0,0.12)" />
            <circle cx="100" cy="78" r={3.2} fill="#D4AF37" />
            <circle cx="100" cy="98" r={3.2} fill="#D4AF37" />
          </motion.g>
          {/* pocket */}
          <motion.rect x="122" y="96" width="22" height="16" rx="2.5" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth={1.1} initial={false} animate={{ opacity: showPocket ? 1 : 0 }} transition={{ duration: 0.32 }} />
          {/* cuff */}
          <motion.g initial={false} animate={{ opacity: showCollar ? 1 : 0 }} transition={{ duration: 0.32 }}>
            <rect x="32" y="266" width="136" height="6" rx="3" fill="rgba(212,175,55,0.22)" />
          </motion.g>
          <path d="M52 92 L32 92 L32 280 L52 280" fill="none" stroke="rgba(0,0,0,0.04)" />
          <path d="M148 92 L168 92 L168 280 L148 280" fill="none" stroke="rgba(0,0,0,0.04)" />
        </svg>

        <motion.div
          aria-hidden="true"
          animate={{ opacity: overlayOpacity }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            mixBlendMode: "multiply" as const,
            backgroundImage: "repeating-linear-gradient(-8deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 6px)",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--muted)" }}>اللون</span>
          <strong>{selectedColor?.name ?? "أبيض لؤلؤي"}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--muted)" }}>القماش</span>
          <strong>{selectedFabric?.name ?? "قطن مصري فاخر"}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--muted)" }}>الإضافات</span>
          <strong style={{ textAlign: "left", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
            {addonNames || "— بدون إضافات"}
          </strong>
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
              <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>
                إن لم يكن المقاس على توقعك، نعيد التفصيل بلا أسئلة. يشمل التوصيل.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
