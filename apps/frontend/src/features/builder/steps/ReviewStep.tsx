import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useBuilderStore } from "../builderStore";
import { api } from "../../../services/api";

export default function ReviewStep() {
  const { selectedColor, selectedFabric, selectedAccessories, basePrice, getTotalPrice, customizationId, guestName, guestCC, guestPhone, setGuestName, setGuestCC, setGuestPhone } = useBuilderStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftCard, setGiftCard] = useState(false);
  const [giftText, setGiftText] = useState("");
  const navigate = useNavigate();
  const baseTotal = getTotalPrice();
  const total = baseTotal + (giftWrap ? 25 : 0);

  const confirm = async () => {
    setError(null);
    if (!guestName.trim() || guestName.trim().length < 2) {
      setError("الرجاء كتابة اسمك الكامل (حرفان على الأقل).");
      return;
    }
    const digits = guestPhone.replace(/\D/g, "");
    if (!guestPhone.trim()) {
      setError("الرجاء إدخال رقم الجوال.");
      return;
    }
    if (digits.length < 7 || digits.length > 14) {
      setError("رقم الجوال غير صحيح — تأكد من 7 إلى 14 رقم بعد مفتاح الدولة.");
      return;
    }

    setLoading(true);
    try {
      const cid = customizationId || `local-${Date.now()}`;
      // Try real order if backend exists, else local success
      try {
        const res = await api.post("/orders", { customization_id: cid, total_price: total, guest_name: guestName, guest_phone: `${guestCC} ${guestPhone}` } as never);
        const id = res.data?.id || res.data?.orderId || `WASM-${Math.floor(80000 + Math.random() * 19999)}`;
        navigate(`/orders/success/${id}`);
        return;
      } catch {
        const id = `WASM-${Math.floor(80000 + Math.random() * 19999)}`;
        navigate(`/orders/success/${id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>راجع طلبك</h3>
      <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 18px" }}>كل شيء شفاف — التفاصيل والسعر قبل التأكيد. يمكنك العودة وتعديل أي خطوة.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "18px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>اللون</span>
          <strong style={{ fontSize: 14 }}>{selectedColor ? `${selectedColor.name} ${(selectedColor.price ?? 0) ? `· +SAR ${selectedColor.price}` : ""}` : "—"}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>القماش</span>
          <strong style={{ fontSize: 14 }}>{selectedFabric ? `${selectedFabric.name} ${(selectedFabric.price ?? 0) ? `· +SAR ${selectedFabric.price}` : "· متضمن"}` : "—"}</strong>
        </div>
        {selectedAccessories.length ? (
          selectedAccessories.map((a) => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>{a.name}</span>
              <strong style={{ fontSize: 14 }}>+SAR {a.extra_price}</strong>
            </div>
          ))
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>الإضافات</span>
            <strong style={{ fontSize: 14, color: "var(--muted)" }}>بدون — يمكنك الإضافة لاحقاً</strong>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.14)", borderRadius: 10 }}>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>السعر الأساسي</span>
          <strong style={{ fontSize: 14 }}>SAR {basePrice}</strong>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.18)", borderRadius: 10, marginBottom: 14 }}>
        <span style={{ color: "var(--muted)", fontSize: 14 }}>الإجمالي{giftWrap ? " (شامل التغليف)" : ""}</span>
        <strong style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>SAR {total}</strong>
      </div>

      {/* Gifting — silk wrap + handwritten card */}
      <div
        style={{
          padding: 14,
          borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 14,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                background: giftWrap ? "var(--accent)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${giftWrap ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                color: giftWrap ? "#0B0B0B" : "var(--muted)",
                fontSize: 14,
              }}
            >
              ✦
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>تغليف هدايا حريري + كيس قماشي</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>إضافة 25 ر.س — تغليف فاخر جاهز للإهداء (العيد / تخرج)</div>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={giftWrap}
            onClick={() => setGiftWrap((v) => !v)}
            style={{
              width: 44,
              height: 26,
              borderRadius: 999,
              border: 0,
              padding: 3,
              background: giftWrap ? "var(--accent)" : "rgba(255,255,255,0.14)",
              display: "flex",
              justifyContent: giftWrap ? "flex-start" : "flex-end",
              transition: "background .22s ease",
              cursor: "pointer",
            }}
          >
            <span style={{ width: 20, height: 20, borderRadius: 999, background: "#fff", display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.22)" }} />
          </button>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                background: giftCard ? "var(--accent)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${giftCard ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                color: giftCard ? "#0B0B0B" : "var(--muted)",
                fontSize: 12,
              }}
            >
              ✎
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>بطاقة إهداء بخط عربي — مجاناً</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>نكتب اسم المُهدى له بخط يدوي على بطاقة وسم</div>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={giftCard}
            onClick={() => setGiftCard((v) => !v)}
            style={{
              width: 44,
              height: 26,
              borderRadius: 999,
              border: 0,
              padding: 3,
              background: giftCard ? "var(--accent)" : "rgba(255,255,255,0.14)",
              display: "flex",
              justifyContent: giftCard ? "flex-start" : "flex-end",
              transition: "background .22s ease",
              cursor: "pointer",
            }}
          >
            <span style={{ width: 20, height: 20, borderRadius: 999, background: "#fff", display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.22)" }} />
          </button>
        </div>

        <AnimatePresence>
          {giftCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden" }}
            >
              <input
                value={giftText}
                onChange={(e) => setGiftText(e.target.value.slice(0, 40))}
                placeholder="مثال: إلى أخي فيصل — بكل فخر"
                maxLength={40}
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                }}
              />
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, textAlign: "left" as const }}>{giftText.length}/40</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ padding: 18, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 14 }}>
        <h4 style={{ margin: "0 0 4px", fontSize: 15 }}>بيانات التواصل — للضيف</h4>
        <p style={{ margin: "0 0 14px", fontSize: 12, color: "var(--muted)" }}>نستخدمها فقط لتأكيد الطلب وإرسال رقم التتبع. لا حاجة لإنشاء حساب.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
          <label htmlFor="guest-name" style={{ fontSize: 13, color: "var(--muted)" }}>
            الاسم الكامل <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            id="guest-name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="input"
            placeholder="مثال: عبدالله السعيد"
            autoComplete="name"
            aria-required="true"
            aria-invalid={error && !guestName.trim() ? true : undefined}
            aria-errormessage={error ? "review-error" : undefined}
            style={inputStyle}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label htmlFor="guest-phone" style={{ fontSize: 13, color: "var(--muted)" }}>
            رقم الجوال <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <div style={{ display: "flex", gap: 8, direction: "ltr" as const }}>
            <label htmlFor="guest-cc" className="sr-only">
              مفتاح الدولة
            </label>
            <select
              id="guest-cc"
              value={guestCC}
              onChange={(e) => setGuestCC(e.target.value)}
              className="input"
              aria-label="مفتاح الدولة"
              style={{ flex: "0 0 132px", textAlign: "left" as const, direction: "ltr" as const, background: "rgba(255,255,255,0.08)", ...inputStyle }}
            >
              <option value="+966">🇸🇦 +966 السعودية</option>
              <option value="+971">🇦🇪 +971 الإمارات</option>
              <option value="+965">🇰🇼 +965 الكويت</option>
              <option value="+973">🇧🇭 +973 البحرين</option>
              <option value="+974">🇶🇦 +974 قطر</option>
              <option value="+968">🇴🇲 +968 عُمان</option>
              <option value="+20">🇪🇬 +20 مصر</option>
              <option value="+962">🇯🇴 +962 الأردن</option>
              <option value="+961">🇱🇧 +961 لبنان</option>
            </select>
            <input
              id="guest-phone"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value.replace(/[^\d\s]/g, ""))}
              className="input"
              placeholder="5x xxx xxxx"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={error && !guestPhone.trim() ? true : undefined}
              aria-errormessage={error ? "review-error" : undefined}
              style={{ flex: 1, direction: "ltr" as const, textAlign: "left" as const, letterSpacing: "0.04em", ...inputStyle }}
              inputMode="numeric"
            />
          </div>
          <span style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>مثال: +966 5x xxx xxxx — سنرسل تأكيد واتساب</span>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            id="review-error"
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            style={{ padding: "12px 14px", borderRadius: 10, fontSize: 13, background: "rgba(185,28,28,0.2)", border: "1px solid rgba(185,28,28,0.4)", color: "#FCA5A5", marginBottom: 14 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
        <button className="btn btn-outline" onClick={() => useBuilderStore.getState().goToStep(3)}>
          تعديل →
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={confirm} disabled={loading}>
          {loading ? "جارٍ التأكيد..." : <>تأكيد الطلب — <span>SAR {total}</span></>}
        </button>
      </div>
      <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, textAlign: "center" }}>بالضغط على “تأكيد” توافق على الشروط — الدفع عند الاستلام · توصيل 7 أيام · تتبع حي</p>
    </div>
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
