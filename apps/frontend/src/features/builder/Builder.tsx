import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuilderStore } from "./builderStore";
import { api } from "../../services/api";
import ThobePreview from "./ThobePreview";
import ColorStep from "./steps/ColorStep";
import FabricStep from "./steps/FabricStep";
import AccessoriesStep from "./steps/AccessoriesStep";
import ReviewStep from "./steps/ReviewStep";
import { RefreshCw } from "lucide-react";

const MOCK_COLORS = [
  { id: "cream", name: "أبيض لؤلؤي", hex_code: "#F5F0E8", price: 0 },
  { id: "sand", name: "بيج صحراوي", hex_code: "#E8DCC6", price: 0 },
  { id: "stone", name: "رمادي حجري", hex_code: "#8A8A8A", price: 0 },
  { id: "charcoal", name: "فحمي أصيل", hex_code: "#2B2B2B", price: 25 },
  { id: "navy", name: "كحلي ملوكي", hex_code: "#1A2332", price: 25 },
  { id: "midnight", name: "أسود ليل", hex_code: "#0A0A0B", price: 15 },
];

const MOCK_FABRICS = [
  { id: "cotton", name: "قطن مصري فاخر", description: "ملمس حريري، تهوية عالية — للاستخدام اليومي الراقي", price: 0, price_multiplier: 1, texture_class: "fabric-cotton", thumb: "linear-gradient(135deg,#F5F0E8,#E8DCC6)", rec: true },
  { id: "wool", name: "صوف خفيف مبرد", description: "انسدال مهيب وخفة — مثالي للمناسبات", price: 120, price_multiplier: 1.35, texture_class: "fabric-wool", thumb: "linear-gradient(135deg,#8A8A8A,#C8B08A)" },
  { id: "linen", name: "كتان طبيعي فاخر", description: "نفس طبيعي وملمس محبب — صيفي بامتياز", price: 80, price_multiplier: 1.23, texture_class: "fabric-linen", thumb: "linear-gradient(135deg,#E8DCC6,#C8B08A)" },
];

const MOCK_ACCESSORIES = [
  { id: "collar", name: "ياقة مرتفعة ذهبية", type: "collar", description: "حافة ذهبية رفيعة — لمسة ملوكية", extra_price: 45, price: 45 },
  { id: "cuff", name: "أزرار صدف فاخرة", type: "cuff", description: "صدف طبيعي مصقول يدوياً", extra_price: 35, price: 35 },
  { id: "emb", name: "تطريز يدوي على الصدر", type: "emb", description: "زخرفة هندسية دقيقة بخيط حريري", extra_price: 95, price: 95 },
  { id: "pocket", name: "جيب مخفي أنيق", type: "pocket", description: "عملي بلا أن يقطع انسياب الثوب", extra_price: 25, price: 25 },
];

const STEP_LABELS = ["اللون", "القماش", "الإضافات", "المراجعة"];

function renderStep(step: number) {
  switch (step) {
    case 1: return <ColorStep />;
    case 2: return <FabricStep />;
    case 3: return <AccessoriesStep />;
    case 4: return <ReviewStep />;
    default: return null;
  }
}

export default function Builder() {
  const {
    currentStep, totalSteps,
    selectedColor, selectedFabric, selectedAccessories,
    isLoadingOptions, optionsError,
    setColors, setFabrics, setAccessories,
    setLoadingOptions, setOptionsError, setRecommendation, goToStep,
  } = useBuilderStore();

  const fetchOptions = useCallback(async () => {
    setLoadingOptions(true);
    setOptionsError(null);
    try {
      const res = await api.get("/customization/options");
      const colors = (res.data.colors || []).map((c: { id: string; name: string; hex_code: string; hexCode?: string; price?: number }) => ({ ...c, hex_code: c.hex_code || c.hexCode, price: c.price ?? 0 }));
      const fabrics = (res.data.fabrics || []).map((f: { id: string; name: string; description?: string; desc?: string; price?: number; price_multiplier?: number; texture_class?: string; thumb?: string }) => ({
        id: f.id, name: f.name, description: f.description || f.desc || "", price: f.price ?? (f.price_multiplier ? Math.round(349 * (f.price_multiplier - 1)) : 0), price_multiplier: f.price_multiplier ?? 1, texture_class: f.texture_class || "", thumb: f.thumb,
      }));
      const accessories = (res.data.accessories || []).map((a: { id: string; name: string; type?: string; description?: string; desc?: string; extra_price?: number; price?: number }) => ({
        id: a.id, name: a.name, type: a.type || a.id, description: a.description || a.desc || "", extra_price: a.extra_price ?? a.price ?? 0, price: a.price ?? a.extra_price ?? 0,
      }));
      setColors(colors.length ? colors : MOCK_COLORS);
      setFabrics(fabrics.length ? fabrics : MOCK_FABRICS);
      setAccessories(accessories.length ? accessories : MOCK_ACCESSORIES);
      // Preselect first if none
      if (!useBuilderStore.getState().selectedColor) useBuilderStore.getState().selectColor((colors[0] || MOCK_COLORS[0]) as never);
      if (!useBuilderStore.getState().selectedFabric) useBuilderStore.getState().selectFabric((fabrics[0] || MOCK_FABRICS[0]) as never);
    } catch {
      setColors(MOCK_COLORS as never);
      setFabrics(MOCK_FABRICS as never);
      setAccessories(MOCK_ACCESSORIES as never);
      if (!useBuilderStore.getState().selectedColor) useBuilderStore.getState().selectColor(MOCK_COLORS[0] as never);
      if (!useBuilderStore.getState().selectedFabric) useBuilderStore.getState().selectFabric(MOCK_FABRICS[0] as never);
    } finally {
      setLoadingOptions(false);
    }
  }, [setColors, setFabrics, setAccessories, setLoadingOptions, setOptionsError]);

  useEffect(() => { fetchOptions(); }, [fetchOptions]);

  useEffect(() => {
    if (!selectedColor || !selectedFabric) return;
    api.post("/customization", { color_id: selectedColor.id, fabric_id: selectedFabric.id, accessory_ids: selectedAccessories.map((a) => a.id) })
      .then((res) => setRecommendation(res.data.id, res.data.recommendation_label))
      .catch(() => {});
  }, [selectedColor, selectedFabric, selectedAccessories, setRecommendation]);

  return (
    <div style={{ paddingTop: 32, paddingBottom: 64 } as React.CSSProperties} className="container-atelier">
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <p className="eyebrow">المصمم</p>
        <h1 style={{ fontSize: 32, margin: "8px 0" } as React.CSSProperties} className="gold-text">
          صمّم ثوبك
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>اختر التفاصيل وشاهد ثوبك يتشكّل أمامك — السعر يتحدّث لحظياً.</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 28,
          maxWidth: 760,
          marginInline: "auto",
        } as React.CSSProperties}
      >
        {STEP_LABELS.map((label, idx) => {
          const n = idx + 1;
          const isCurrent = currentStep === n;
          const isDone = n < currentStep;
          return (
            <>
              <div key={n} onClick={() => goToStep(n)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 84, cursor: "pointer" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    fontWeight: 600,
                    border: "2px solid",
                    borderColor: isCurrent || isDone ? "var(--accent)" : "rgba(255,255,255,0.12)",
                    color: isCurrent ? "#0B0B0B" : isDone ? "var(--accent)" : "var(--muted)",
                    background: isCurrent ? "var(--accent)" : isDone ? "transparent" : "rgba(255,255,255,0.03)",
                    transform: isCurrent ? "scale(1.15)" : "none",
                    boxShadow: isCurrent ? "0 0 16px rgba(212,175,55,0.35)" : "none",
                    transition: "all .3s ease",
                  }}
                >
                  {isDone ? "✓" : n}
                </div>
                <span style={{ fontSize: 12, color: isCurrent ? "var(--accent)" : isDone ? "#fff" : "var(--muted)", fontWeight: isCurrent ? 600 : 400 }}>
                  {label}
                </span>
              </div>
              {idx < STEP_LABELS.length - 1 && <div style={{ flex: 1, height: 1, background: idx < currentStep - 1 ? "var(--accent)" : "rgba(255,255,255,0.12)" }} />}
            </>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
          alignItems: "start",
          maxWidth: 1120,
          marginInline: "auto",
        } as React.CSSProperties}
        className="builder-grid"
      >
        <section className="glass" style={{ padding: 28 }}>
          {isLoadingOptions ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
              <RefreshCw style={{ width: 28, height: 28, color: "var(--accent)" }} className="animate-spin" />
            </div>
          ) : optionsError ? (
            <div style={{ textAlign: "center", padding: "32px 0", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <p style={{ color: "#FCA5A5" }}>{optionsError}</p>
              <button className="btn btn-primary" onClick={fetchOptions}>
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {renderStep(currentStep)}
                </motion.div>
              </AnimatePresence>
              {currentStep < totalSteps && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => goToStep(Math.min(totalSteps, currentStep + 1))}
                    style={{ opacity: (!selectedColor && currentStep === 1) || (!selectedFabric && currentStep === 2) ? 0.5 : 1 }}
                  >
                    التالي — {STEP_LABELS[currentStep]} ←
                  </button>
                </div>
              )}
              {currentStep > 1 && currentStep < totalSteps && (
                <div style={{ display: "flex", justifyContent: "flex-start", marginTop: -42 }}>
                  <button className="btn btn-outline" onClick={() => goToStep(currentStep - 1)}>
                    السابق →
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <ThobePreview />
      </div>

      <style>{`@media(min-width:1024px){ .builder-grid{ grid-template-columns: 1.15fr 0.85fr !important; } }`}</style>
    </div>
  );
}
