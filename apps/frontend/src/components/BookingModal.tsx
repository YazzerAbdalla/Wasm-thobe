import { useState } from "react";

export interface IBookingModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function BookingModal({ open, onClose }: IBookingModalProps) {
  const [ok, setOk] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const confirm = () => {
    if (!name.trim() || !phone.trim()) {
      alert("الرجاء تعبئة الاسم والجوال");
      return;
    }
    setOk(true);
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        inset: 0,
        zIndex: 70,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.66)" }} onClick={onClose} />
      <div
        className="glass"
        style={{
          position: "relative",
          maxWidth: 520,
          width: "100%",
          padding: 28,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>احجز موعد قياس</h3>
          <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--muted)", fontSize: 20 }}>
            ✕
          </button>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 16px" }}>
          حرفيّ يزورك أو تستقبلنا في الأتيليه — 30 دقيقة، قياس دقيق، شاي عربي.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>الاسم</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك" className="input" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>الجوال</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+966 ..." className="input" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>التاريخ المفضل</label>
            <input type="date" className="input" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>الوقت</label>
            <input type="time" className="input" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
          <label style={{ fontSize: 13, color: "var(--muted)" }}>المكان</label>
          <select className="input" style={inputStyle}>
            <option>الأتيليه — الرياض</option>
            <option>زيارة منزلية (الرياض فقط)</option>
            <option>فيديو — قياس عن بُعد</option>
          </select>
        </div>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 16 }} onClick={confirm}>
          تأكيد الموعد
        </button>
        {ok && (
          <p
            style={{
              marginTop: 12,
              textAlign: "center",
              fontSize: 13,
              color: "#86EFAC",
              background: "rgba(34,197,94,0.10)",
              border: "1px solid rgba(34,197,94,0.20)",
              padding: 10,
              borderRadius: 10,
            }}
          >
            تم الحجز — سنتصل لتأكيد الموعد خلال ساعتين.
          </p>
        )}
      </div>
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
