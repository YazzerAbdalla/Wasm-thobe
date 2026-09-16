import { useBuilderStore } from "../builderStore";

export default function FrontStep() {
  const { plackets, buttons, selectedPlacket, selectedButton, selectPlacket, selectButton } = useBuilderStore();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>فتحة الصدر</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 14px" }}>ثلاثة خيارات تكفي: كلاسيكية بأزرار ظاهرة، مخفية مودرن، أو مطرزة بخط ذهبي للعيد.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {plackets.map((p) => {
            const sel = selectedPlacket?.id === p.id;
            const priceText = p.price ? `+SAR ${p.price}` : "متضمن";
            return (
              <div
                key={p.id}
                onClick={() => selectPlacket(p)}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  padding: 14,
                  cursor: "pointer",
                  border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 12,
                  background: sel ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                  transition: "all .18s ease",
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 10, flex: "0 0 56px", background: `url('${p.thumb}') center/cover no-repeat, linear-gradient(135deg,#1a1a18,#0b0b0b)`, border: "1px solid rgba(255,255,255,0.08)" }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 3px", fontSize: 14 }}>{p.name}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{p.description}</p>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>{priceText}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>نوع الزر</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 14px" }}>الزر يصنع الفرق: صدف يلمع، معدن ذهبي محفور، أو قماشي هادئ. اختر ما يناسب ثوبك.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } as React.CSSProperties} className="front-btn-grid">
          {buttons.map((b) => {
            const sel = selectedButton?.id === b.id;
            return (
              <div
                key={b.id}
                onClick={() => selectButton(b)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: 14,
                  cursor: "pointer",
                  borderRadius: 12,
                  border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                  background: sel ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                  position: "relative",
                  transition: "all .18s ease",
                }}
              >
                <div style={{ width: "100%", height: 72, borderRadius: 8, background: `url('${b.thumb}') center/cover no-repeat, linear-gradient(135deg,#1a1a18,#0b0b0b)`, border: "1px solid rgba(255,255,255,0.06)" }} />
                <h4 style={{ margin: 0, fontSize: 13 }}>{b.name}</h4>
                <p style={{ margin: 0, fontSize: 11, color: "var(--muted)" }}>{b.description}</p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>{b.price ? `+SAR ${b.price}` : "متضمن"}</span>
                <span style={{ position: "absolute", top: 10, left: 10, width: 18, height: 18, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 10, background: sel ? "var(--accent)" : "transparent", color: sel ? "#0B0B0B" : "transparent", border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.18)"}` }}>✓</span>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:560px){ .front-btn-grid{ grid-template-columns:1fr !important } }`}</style>
    </div>
  );
}
