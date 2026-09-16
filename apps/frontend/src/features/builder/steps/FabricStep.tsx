import { useBuilderStore } from "../builderStore";

export default function FabricStep() {
  const { fabrics, selectedFabric, selectFabric } = useBuilderStore();

  return (
    <div>
      <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>اختر القماش</h3>
      <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 18px" }}>الملمس يصنع الهيبة. كل خيار يغيّر انسياب الثوب وسعره بشفافية.</p>
      <div style={{ display: "grid", gap: 12 }}>
        {fabrics.map((f) => {
          const sel = selectedFabric?.id === f.id;
          const priceText = (f.price ?? 0) ? `+SAR ${f.price}` : "متضمن";
          return (
            <div
              key={f.id}
              onClick={() => selectFabric(f)}
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
                  background: (f as { thumb?: string }).thumb || (f.price === 0 ? "linear-gradient(135deg,#F5F0E8,#E8DCC6)" : "linear-gradient(135deg,#8A8A8A,#C8B08A)"),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <h4 style={{ margin: "0 0 4px", fontSize: 15 }}>{f.name}</h4>
                  {(f as { rec?: boolean }).rec && (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", background: "var(--accent)", color: "#0B0B0B", padding: "3px 8px", borderRadius: 999, fontWeight: 700 }}>
                      موصى به
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>{f.description}</p>
              </div>
              <div style={{ textAlign: "left" as const }}>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: 13 }}>{priceText}</div>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.2)",
                    marginTop: 6,
                    marginLeft: "auto",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 10,
                    background: sel ? "var(--accent)" : "transparent",
                    color: sel ? "#0B0B0B" : "transparent",
                    borderColor: sel ? "var(--accent)" : "rgba(255,255,255,0.2)",
                  }}
                >
                  ✓
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
