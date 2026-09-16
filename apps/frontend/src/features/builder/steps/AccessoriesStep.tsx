import { useBuilderStore } from "../builderStore";

export default function AccessoriesStep() {
  const { accessories, selectedAccessories, toggleAccessory } = useBuilderStore();
  const isSel = (id: string) => selectedAccessories.some((a) => a.id === id);

  return (
    <div>
      <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>إضافات اختيارية</h3>
      <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 18px" }}>تفاصيل ترفع الثوب من جميل إلى لا يُنسى. اختر ما يناسب ذوقك.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 } as React.CSSProperties} className="addon-grid">
        {accessories.map((a) => {
          const sel = isSel(a.id);
          return (
            <div
              key={a.id}
              onClick={() => toggleAccessory(a)}
              className={sel ? "glass addon-card selected" : "glass addon-card"}
              style={{
                padding: 18,
                cursor: "pointer",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                borderColor: sel ? "var(--accent)" : undefined,
              } as React.CSSProperties}
            >
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.18)"}`,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  color: sel ? "#0B0B0B" : "transparent",
                  background: sel ? "var(--accent)" : "transparent",
                }}
              >
                ✓
              </div>
              <h4 style={{ margin: 0, fontSize: 14, paddingLeft: 28 }}>{a.name}</h4>
              <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{(a as { description?: string }).description || a.type}</p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)", marginTop: "auto" as const }}>+ SAR {a.extra_price}</span>
            </div>
          );
        })}
      </div>
      <style>{`@media(min-width:640px){ .addon-grid{ grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}
