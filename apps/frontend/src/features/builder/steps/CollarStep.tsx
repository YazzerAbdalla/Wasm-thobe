import { useBuilderStore } from "../builderStore";

export default function CollarStep() {
  const { collars, selectedCollar, selectCollar } = useBuilderStore();
  return (
    <div>
      <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>اختر الياقة</h3>
      <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 18px" }}>
        الياقة الواقفة هي هوية الثوب السعودي. اختر ما يناسب المناسبة — واقفة يومية، شريطية مودرن، أو فرنسية رسمية.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        {collars.map((c) => {
          const sel = selectedCollar?.id === c.id;
          const priceText = (c.price ?? 0) ? `+SAR ${c.price}` : "متضمن";
          return (
            <div
              key={c.id}
              onClick={() => selectCollar(c)}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                padding: 16,
                cursor: "pointer",
                border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 14,
                background: sel ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                boxShadow: sel ? "0 0 16px rgba(212,175,55,0.15)" : "none",
                transition: "all .18s ease",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 10,
                  flex: "0 0 64px",
                  background: `url('${c.thumb}') center/cover no-repeat, linear-gradient(135deg,#1a1a18,#0b0b0b)`,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                aria-hidden="true"
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 4px", fontSize: 15 }}>{c.name}</h4>
                <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>{c.description}</p>
              </div>
              <div style={{ textAlign: "left" as const }}>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: 13 }}>{priceText}</div>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    marginTop: 6,
                    marginLeft: "auto",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 10,
                    background: sel ? "var(--accent)" : "transparent",
                    color: sel ? "#0B0B0B" : "transparent",
                    border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.2)"}`,
                  }}
                >
                  ✓
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 12 }}>الياقة الواقفة الدائرية هي الافتراضية للثوب السعودي — التراث يبقى.</p>
    </div>
  );
}
