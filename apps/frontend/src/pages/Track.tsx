import { useState } from "react";

export default function Track() {
  const [mode, setMode] = useState<"code" | "phone">("code");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [cc, setCC] = useState("+966");
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultHeader, setResultHeader] = useState("WASM-84291 · قطن مصري · أبيض لؤلؤي");

  const doTrack = () => {
    setError(null);
    if (mode === "code") {
      const v = code.trim().toUpperCase();
      if (!v) {
        setError("أدخل رقم الطلب أولاً — مثال: WASM-84291");
        setShowResult(false);
        return;
      }
      if (!/^WASM-\d{4,6}$/.test(v)) {
        setError("رقم الطلب غير صحيح — الصيغة: WASM- ثم 4 إلى 6 أرقام (مثال: WASM-84291)");
        setShowResult(false);
        return;
      }
      setResultHeader(`${v} · قطن مصري · أبيض لؤلؤي`);
      setShowResult(true);
    } else {
      const digits = phone.replace(/\D/g, "");
      if (!digits) {
        setError("أدخل رقم الجوال أولاً.");
        setShowResult(false);
        return;
      }
      if (digits.length < 7 || digits.length > 14) {
        setError("رقم الجوال غير صحيح — 7 إلى 14 رقم بعد مفتاح الدولة.");
        setShowResult(false);
        return;
      }
      const mockCode = `WASM-${80000 + (parseInt(digits.slice(-4)) % 19999)}`;
      setResultHeader(`${mockCode} · مرتبط بـ ${cc} ${phone} · قطن مصري`);
      setShowResult(true);
    }
  };

  return (
    <div className="container-atelier" style={{ padding: "48px 0 64px" } as React.CSSProperties}>
      <div className="glass" style={{ maxWidth: 720, margin: "0 auto", padding: 28, textAlign: "center" }}>
        <p className="eyebrow">تتبع طلبك</p>
        <h2 style={{ fontSize: 28, margin: "8px 0" }}>أين ثوبك الآن؟</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>تتبع برقم الطلب أو برقم جوالك — نجد ثوبك فوراً.</p>

        <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.06)", padding: 4, borderRadius: 999, margin: "18px auto 0", maxWidth: 360 }}>
          <button
            onClick={() => setMode("code")}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 999,
              background: mode === "code" ? "var(--accent)" : "transparent",
              color: mode === "code" ? "#0B0B0B" : "var(--muted)",
              border: 0,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            برقم الطلب
          </button>
          <button
            onClick={() => setMode("phone")}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 999,
              background: mode === "phone" ? "var(--accent)" : "transparent",
              color: mode === "phone" ? "#0B0B0B" : "var(--muted)",
              border: 0,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            برقم الجوال
          </button>
        </div>

        {mode === "code" ? (
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="WASM-XXXXX"
              style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", ...inputStyle }}
            />
            <button className="btn btn-primary" onClick={doTrack}>
              تتبع
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, marginTop: 14, direction: "ltr" as const }}>
            <select value={cc} onChange={(e) => setCC(e.target.value)} style={{ flex: "0 0 130px", direction: "ltr" as const, textAlign: "left" as const, ...inputStyle }}>
              <option value="+966">🇸🇦 +966</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+965">🇰🇼 +965</option>
              <option value="+973">🇧🇭 +973</option>
              <option value="+974">🇶🇦 +974</option>
              <option value="+968">🇴🇲 +968</option>
              <option value="+20">🇪🇬 +20</option>
              <option value="+962">🇯🇴 +962</option>
              <option value="+961">🇱🇧 +961</option>
            </select>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, ""))}
              placeholder="5x xxx xxxx"
              style={{ flex: 1, direction: "ltr" as const, textAlign: "left" as const, letterSpacing: "0.04em", ...inputStyle }}
              inputMode="numeric"
            />
            <button className="btn btn-primary" onClick={doTrack}>
              تتبع
            </button>
          </div>
        )}

        {error && <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, fontSize: 13, background: "rgba(185,28,28,0.2)", border: "1px solid rgba(185,28,28,0.4)", color: "#FCA5A5" }}>{error}</div>}

        {showResult && (
          <div>
            <div style={{ marginTop: 22, padding: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "right" as const }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{resultHeader}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>قيد الحياكة — المرحلة 2 من 4</div>
              </div>
              <span style={{ background: "var(--accent)", color: "#0B0B0B", fontSize: 11, fontWeight: 700, padding: "6px 10px", borderRadius: 999 }}>يُحاك الآن</span>
            </div>
            <div style={{ marginTop: 28, textAlign: "right" as const, display: "flex", flexDirection: "column", gap: 0, position: "relative" } as React.CSSProperties}>
              <div style={{ content: '""', position: "absolute", right: 15, top: 12, bottom: 12, width: 1, background: "rgba(255,255,255,0.10)" } as React.CSSProperties} />
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", position: "relative" }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", flex: "0 0 30px", border: "1px solid var(--accent)", background: "var(--accent)", color: "#0B0B0B", fontSize: 12, zIndex: 1 }}>✓</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14 }}>تم تأكيد الطلب</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>استلمنا تفاصيلك ومقاسك</p>
                </div>
                <time style={{ marginRight: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>12 سبتمبر · 10:42ص</time>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", position: "relative" }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", flex: "0 0 30px", border: "1px solid var(--accent)", background: "var(--accent)", color: "#0B0B0B", fontSize: 12, zIndex: 1 }}>✓</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14 }}>تم قص القماش</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>الحرفي: أبو فيصل — الطاولة 2</p>
                </div>
                <time style={{ marginRight: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>13 سبتمبر · 4:15م</time>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", position: "relative" }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", flex: "0 0 30px", border: "1px solid var(--accent)", background: "transparent", color: "var(--accent)", fontSize: 12, zIndex: 1, boxShadow: "0 0 0 6px rgba(212,175,55,0.14)" }}>◉</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14 }}>قيد الحياكة</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>الغرز الرئيسية + تثبيت الأزرار</p>
                </div>
                <time style={{ marginRight: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>الآن</time>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", position: "relative" }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", flex: "0 0 30px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "var(--muted)", fontSize: 12, zIndex: 1 }}>○</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14 }}>الكي والتغليف</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>كي بخاري وفحص نهائي</p>
                </div>
                <time style={{ marginRight: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>—</time>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", position: "relative" }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", flex: "0 0 30px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "var(--muted)", fontSize: 12, zIndex: 1 }}>○</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14 }}>التوصيل</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>مندوب خاص — توصيل خلال يوم</p>
                </div>
                <time style={{ marginRight: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>—</time>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "#fff",
  fontSize: 14,
};
