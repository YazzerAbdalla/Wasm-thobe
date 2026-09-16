import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuilderStore } from "./builderStore";
import { api } from "../../services/api";
import ThobePreview from "./ThobePreview";
import ColorStep from "./steps/ColorStep";
import FabricStep from "./steps/FabricStep";
import CollarStep from "./steps/CollarStep";
import FrontStep from "./steps/FrontStep";
import PocketCuffStep from "./steps/PocketCuffStep";
import ReviewStep from "./steps/ReviewStep";
import { RefreshCw } from "lucide-react";

// Curated Saudi palette — 10, sand → night, luxury editorial
const MOCK_COLORS = [
  { id: "white", name: "أبيض نقي", hex_code: "#FFFFFF", price: 0 },
  { id: "offwhite", name: "أوف وايت", hex_code: "#F8F6F0", price: 0 },
  { id: "cream", name: "أبيض لؤلؤي", hex_code: "#F5F0E8", price: 0 },
  { id: "beige", name: "بيج صحراوي", hex_code: "#E8DCC6", price: 0 },
  { id: "grey-light", name: "رمادي فاتح", hex_code: "#CBD5E1", price: 0 },
  { id: "grey-mid", name: "رمادي حجري", hex_code: "#8A8A8A", price: 0 },
  { id: "charcoal", name: "فحمي أصيل", hex_code: "#2B2B2B", price: 15 },
  { id: "black", name: "أسود ليل", hex_code: "#0A0A0B", price: 15 },
  { id: "navy", name: "كحلي ملوكي", hex_code: "#1A2332", price: 15 },
  { id: "olive", name: "زيتي هادئ", hex_code: "#4A5D4A", price: 15 },
];

// Premium fabric families only — art director curated (remove poly mass-market)
const MOCK_FABRICS = [
  { id: "egyptian-cotton", name: "قطن مصري فاخر", description: "تيلة طويلة، ملمس حريري، تهوية يومية راقية — الأكثر طلباً", price: 0, price_multiplier: 1, texture_class: "fabric-cotton", thumb: "/images/materials/fabric-egyptian-cotton.jpg", rec: true },
  { id: "cotton-poplin", name: "قطن بوبلين", description: "ناعم متماسك، خطوط دقيقة — مثالي للدوام", price: 30, price_multiplier: 1.08, texture_class: "fabric-cotton", thumb: "/images/materials/fabric-cotton-poplin.jpg" },
  { id: "cotton-oxford", name: "قطن أوكسفورد", description: "نسج سلة، متين وأنيق — شتوي خفيف", price: 45, price_multiplier: 1.12, texture_class: "fabric-cotton", thumb: "/images/materials/fabric-cotton-oxford.jpg" },
  { id: "linen-blend", name: "كتان طبيعي (مزيج)", description: "نفس مفتوح وخشونة محببة — صيفي بامتياز", price: 80, price_multiplier: 1.23, texture_class: "fabric-linen", thumb: "/images/materials/fabric-linen-blend.jpg" },
  { id: "wool-blend", name: "صوف خفيف مبرد", description: "انسدال مهيب وخفة — للمناسبات الرسمية", price: 120, price_multiplier: 1.35, texture_class: "fabric-wool", thumb: "/images/materials/fabric-wool-blend.jpg" },
  { id: "premium-luxury", name: "خامة فاخرة — حريري الملمس", description: "سقوط حريري وتشطيب مقاوم للتجعد — للضيوف الكبار", price: 180, price_multiplier: 1.5, texture_class: "fabric-luxury", thumb: "/images/materials/fabric-premium-luxury.jpg" },
];

const MOCK_COLLARS = [
  { id: "round-stand", name: "ياقة دائرية واقفة", description: "الافتراضية للثوب السعودي — هيبة يومية", price: 0, thumb: "/images/details/collar-round-stand.jpg" },
  { id: "band", name: "ياقة شريطية (Band)", description: "منخفضة 1.8سم، مودرن وهادئة — للشباب", price: 15, thumb: "/images/details/collar-band.jpg" },
  { id: "french", name: "ياقة فرنسية", description: "مدببة مهيكلة — للرسمي والمناسبات", price: 25, thumb: "/images/details/collar-french.jpg" },
];

const MOCK_PLACKETS = [
  { id: "classic", name: "فتحة كلاسيكية", description: "شريط أمامي 4 أزرار ظاهرة — التقليدي", price: 0, thumb: "/images/details/placket-classic.jpg" },
  { id: "hidden", name: "أزرار مخفية", description: "خط نظيف بلا خياطة ظاهرة — مودرن", price: 20, thumb: "/images/details/placket-hidden.jpg" },
  { id: "embroidered", name: "مطرزة بخط ذهبي", description: "خط حريري 1مم على طول الفتحة — للعيد", price: 45, thumb: "/images/details/placket-embroidered.jpg" },
];

const MOCK_BUTTONS = [
  { id: "standard-matte", name: "مطفي عادي", description: "أبيض مطفي — يومي", price: 0, thumb: "/images/details/button-standard-matte.jpg" },
  { id: "mother-of-pearl", name: "صدف طبيعي", description: "لمعان قزحي — الأكثر فخامة", price: 35, thumb: "/images/details/button-mother-of-pearl.jpg" },
  { id: "fabric-covered", name: "مغطى بالقماش", description: "نفس قماش الثوب — هادئ وتونالي", price: 15, thumb: "/images/details/button-fabric-covered.jpg" },
  { id: "metal-gold", name: "معدن ذهبي محفور", description: "محفور بشعار وسم — للمناسبات", price: 55, thumb: "/images/details/button-metal-gold.jpg" },
];

const MOCK_POCKETS = [
  { id: "no-pocket", name: "بدون جيب", description: "صدر نظيف — مودرن", price: 0, thumb: "/images/details/pocket-no.jpg" },
  { id: "straight", name: "جيب مستقيم", description: "مستقيم بزوايا حادة — كلاسيكي", price: 15, thumb: "/images/details/pocket-straight.jpg" },
  { id: "rounded", name: "جيب دائري", description: "زوايا مستديرة — لين وأنيق", price: 15, thumb: "/images/details/pocket-rounded.jpg" },
];

const MOCK_CUFFS = [
  { id: "standard-1btn", name: "أسورة عادية — زر واحد", description: "ضيقة وعملية — يومي", price: 0, thumb: "/images/details/cuff-standard-1btn.jpg" },
  { id: "square-2btn", name: "مربعة — زران", description: "حافة مربعة، زران عمودي — مهيب", price: 20, thumb: "/images/details/cuff-square-2btn.jpg" },
  { id: "french-cufflink", name: "فرنسية + كبك", description: "مزدوجة مع كبك معدني — رسمي", price: 45, thumb: "/images/details/cuff-french-cufflink.jpg" },
];

const MOCK_ACCESSORIES = [
  { id: "collar", name: "ياقة مرتفعة ذهبية", type: "collar", description: "حافة ذهبية رفيعة — لمسة ملوكية", extra_price: 45, price: 45 },
  { id: "cuff", name: "أزرار صدف فاخرة", type: "cuff", description: "صدف طبيعي مصقول يدوياً", extra_price: 35, price: 35 },
  { id: "emb", name: "تطريز يدوي على الصدر", type: "emb", description: "زخرفة هندسية دقيقة بخيط حريري", extra_price: 95, price: 95 },
  { id: "pocket", name: "جيب مخفي أنيق", type: "pocket", description: "عملي بلا أن يقطع انسياب الثوب", extra_price: 25, price: 25 },
];

// 5 steps curated — prevents overwhelm (was 4, now 5; still ≤6 cards per step)
const STEP_LABELS = ["اللون", "القماش", "الياقة", "الصدر والجيوب", "المراجعة"];

function renderStep(step: number) {
  switch (step) {
    case 1:
      return <ColorStep />;
    case 2:
      return <FabricStep />;
    case 3:
      return <CollarStep />;
    case 4:
      return (
        <>
          <FrontStep />
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "22px 0" }} />
          <PocketCuffStep />
        </>
      );
    case 5:
      return <ReviewStep />;
    default:
      return null;
  }
}

export default function Builder() {
  const {
    currentStep,
    totalSteps,
    selectedColor,
    selectedFabric,
    setColors,
    setFabrics,
    setAccessories,
    setCollars,
    setPlackets,
    setButtons,
    setPockets,
    setCuffs,
    setLoadingOptions,
    setOptionsError,
    setRecommendation,
    goToStep,
    isLoadingOptions,
    optionsError,
    selectedAccessories,
  } = useBuilderStore();

  const fetchOptions = useCallback(async () => {
    setLoadingOptions(true);
    setOptionsError(null);
    try {
      const res = await api.get("/customization/options");
      const colors = (res.data.colors || []).map((c: { id: string; name: string; hex_code: string; hexCode?: string; price?: number }) => ({
        ...c,
        hex_code: c.hex_code || c.hexCode,
        price: c.price ?? 0,
      }));
      const fabrics = (res.data.fabrics || []).map((f: { id: string; name: string; description?: string; desc?: string; price?: number; price_multiplier?: number; texture_class?: string; thumb?: string }) => ({
        id: f.id,
        name: f.name,
        description: f.description || f.desc || "",
        price: f.price ?? (f.price_multiplier ? Math.round(349 * (f.price_multiplier - 1)) : 0),
        price_multiplier: f.price_multiplier ?? 1,
        texture_class: f.texture_class || "",
        thumb: f.thumb,
      }));
      const accessories = (res.data.accessories || []).map((a: { id: string; name: string; type?: string; description?: string; desc?: string; extra_price?: number; price?: number }) => ({
        id: a.id,
        name: a.name,
        type: a.type || a.id,
        description: a.description || a.desc || "",
        extra_price: a.extra_price ?? a.price ?? 0,
        price: a.price ?? a.extra_price ?? 0,
      }));
      setColors(colors.length ? colors : MOCK_COLORS);
      setFabrics(fabrics.length ? fabrics : MOCK_FABRICS);
      setAccessories(accessories.length ? accessories : MOCK_ACCESSORIES);
      setCollars(MOCK_COLLARS as never);
      setPlackets(MOCK_PLACKETS as never);
      setButtons(MOCK_BUTTONS as never);
      setPockets(MOCK_POCKETS as never);
      setCuffs(MOCK_CUFFS as never);
      const s = useBuilderStore.getState();
      if (!s.selectedColor) s.selectColor((colors[0] || MOCK_COLORS[0]) as never);
      if (!s.selectedFabric) s.selectFabric((fabrics[0] || MOCK_FABRICS[0]) as never);
      if (!s.selectedCollar) s.selectCollar(MOCK_COLLARS[0] as never);
      if (!s.selectedPlacket) s.selectPlacket(MOCK_PLACKETS[0] as never);
      if (!s.selectedButton) s.selectButton(MOCK_BUTTONS[0] as never);
      if (!s.selectedPocket) s.selectPocket(MOCK_POCKETS[1] as never);
      if (!s.selectedCuff) s.selectCuff(MOCK_CUFFS[0] as never);
    } catch {
      setColors(MOCK_COLORS as never);
      setFabrics(MOCK_FABRICS as never);
      setAccessories(MOCK_ACCESSORIES as never);
      setCollars(MOCK_COLLARS as never);
      setPlackets(MOCK_PLACKETS as never);
      setButtons(MOCK_BUTTONS as never);
      setPockets(MOCK_POCKETS as never);
      setCuffs(MOCK_CUFFS as never);
      const s = useBuilderStore.getState();
      if (!s.selectedColor) s.selectColor(MOCK_COLORS[0] as never);
      if (!s.selectedFabric) s.selectFabric(MOCK_FABRICS[0] as never);
      if (!s.selectedCollar) s.selectCollar(MOCK_COLLARS[0] as never);
      if (!s.selectedPlacket) s.selectPlacket(MOCK_PLACKETS[0] as never);
      if (!s.selectedButton) s.selectButton(MOCK_BUTTONS[0] as never);
      if (!s.selectedPocket) s.selectPocket(MOCK_POCKETS[1] as never);
      if (!s.selectedCuff) s.selectCuff(MOCK_CUFFS[0] as never);
    } finally {
      setLoadingOptions(false);
    }
  }, [setColors, setFabrics, setAccessories, setCollars, setPlackets, setButtons, setPockets, setCuffs, setLoadingOptions, setOptionsError]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    if (!selectedColor || !selectedFabric) return;
    api
      .post("/customization", {
        color_id: selectedColor.id,
        fabric_id: selectedFabric.id,
        accessory_ids: selectedAccessories.map((a) => a.id),
      })
      .then((res) => setRecommendation(res.data.id, res.data.recommendation_label))
      .catch(() => {});
  }, [selectedColor, selectedFabric, selectedAccessories, setRecommendation]);

  return (
    <div style={{ paddingTop: 32, paddingBottom: 64 } as React.CSSProperties} className="container-atelier">
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <p className="eyebrow">المصمم — 5 خطوات curated</p>
        <h1 style={{ fontSize: 32, margin: "8px 0" } as React.CSSProperties} className="gold-text">
          صمّم ثوبك
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>اختر الخامة وشاهدها عن قرب — معاينة القماش الحيّة تتحدث لحظياً.</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
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
              <div
                key={n}
                onClick={() => goToStep(n)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 72, cursor: "pointer" }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 600,
                    border: "2px solid",
                    borderColor: isCurrent || isDone ? "var(--accent)" : "rgba(255,255,255,0.12)",
                    color: isCurrent ? "#0B0B0B" : isDone ? "var(--accent)" : "var(--muted)",
                    background: isCurrent ? "var(--accent)" : isDone ? "transparent" : "rgba(255,255,255,0.03)",
                    transform: isCurrent ? "scale(1.12)" : "none",
                    boxShadow: isCurrent ? "0 0 14px rgba(212,175,55,0.35)" : "none",
                    transition: "all .3s ease",
                  }}
                >
                  {isDone ? "✓" : n}
                </div>
                <span style={{ fontSize: 11, color: isCurrent ? "var(--accent)" : isDone ? "#fff" : "var(--muted)", fontWeight: isCurrent ? 600 : 400, textAlign: "center" as const, whiteSpace: "nowrap" as const }}>
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
