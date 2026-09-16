import { useBuilderStore } from "../builderStore";

export default function PocketCuffStep() {
  const { pockets, cuffs, selectedPocket, selectedCuff, selectPocket, selectCuff } = useBuilderStore();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>الجيوب</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 14px" }}>جيب صدر فقط — لا جيوب جانبية. البساطة هي الفخامة.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {pockets.map((p) => {
            const sel = selectedPocket?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => selectPocket(p)}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  padding: 14,
                  cursor: "pointer",
                  border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 12,
                  background: sel ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 10, flex: "0 0 56px", background: `url('${p.thumb}') center/cover no-repeat, linear-gradient(135deg,#1a1a18,#0b0b0b)`, border: "1px solid rgba(255,255,255,0.06)" }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: 14 }}>{p.name}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{p.description}</p>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>{p.price ? `+SAR ${p.price}` : "متضمن"}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 20, margin: "0 0 6px" }}>الأساور</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 14px" }}>نهاية الكم تروي ذوقك: عادية بزر، مربعة بزرين، أو فرنسية بكبك.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {cuffs.map((c) => {
            const sel = selectedCuff?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => selectCuff(c)}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  padding: 14,
                  cursor: "pointer",
                  border: `1px solid ${sel ? "var(--accent)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 12,
                  background: sel ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 10, flex: "0 0 56px", background: `url('${c.thumb}') center/cover no-repeat, linear-gradient(135deg,#1a1a18,#0b0b0b)`, border: "1px solid rgba(255,255,255,0.06)" }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: 14 }}>{c.name}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{c.description}</p>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>{c.price ? `+SAR ${c.price}` : "متضمن"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
