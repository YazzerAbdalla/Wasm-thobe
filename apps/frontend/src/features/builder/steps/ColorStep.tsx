import { useBuilderStore } from "../builderStore";

export default function ColorStep() {
  const { colors, selectedColor, selectColor } = useBuilderStore();

  return (
    <div>
      <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>اختر لون ثوبك</h3>
      <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 20px" }}>عشرة ألوان curated — من الأبيض النقي إلى الليلي، تدرّج صحراوي هادئ.</p>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 } as React.CSSProperties}
        className="color-grid"
      >
        {colors.map((c) => {
          const sel = selectedColor?.id === c.id;
          const priceLabel = (c.price ?? 0) ? ` · +${c.price}` : "";
          return (
            <div
              key={c.id}
              onClick={() => selectColor(c)}
              className={sel ? "color-opt selected" : "color-opt"}
              data-id={c.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                position: "relative",
              } as React.CSSProperties}
            >
              <div
                className="color-circle"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 999,
                  border: `3px solid ${sel ? "var(--accent)" : "transparent"}`,
                  background: c.hex_code,
                  boxShadow: sel ? "0 0 12px rgba(212,175,55,0.4)" : "none",
                  transform: sel ? "scale(1.06)" : "none",
                  transition: "transform .18s ease, border-color .18s, box-shadow .18s",
                  borderColor: sel ? "var(--accent)" : "transparent",
                } as React.CSSProperties}
              />
              {sel && (
                <span
                  style={{
                    position: "absolute",
                    top: 18,
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: "var(--accent)",
                    color: "#0B0B0B",
                    fontSize: 11,
                    display: "grid",
                    placeItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  ✓
                </span>
              )}
              <span
                style={{
                  fontSize: 12,
                  color: sel ? "#fff" : "var(--muted)",
                  textAlign: "center",
                }}
              >
                {c.name}
                {priceLabel}
              </span>
            </div>
          );
        })}
      </div>
      <style>{`@media(min-width:640px){ .color-grid{ grid-template-columns: repeat(5,1fr) !important; } } .color-opt:hover .color-circle{ transform:scale(1.08) }`}</style>
    </div>
  );
}
