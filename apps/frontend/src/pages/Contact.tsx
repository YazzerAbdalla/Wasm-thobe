import { useState } from "react";

export default function Contact() {
  const [ok, setOk] = useState(false);

  return (
    <div className="container-atelier" style={{ padding: "48px 0 64px" } as React.CSSProperties}>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
        <p className="eyebrow">Contact</p>
        <h1 className="gold-text" style={{ fontSize: 32, margin: "8px 0" }}>
          تواصل معنا
        </h1>
        <p style={{ color: "var(--muted)", margin: 0 }}>نسمع بعناية — سواء سؤال عن المقاس، موعد قياس في الأتيليه، أو متابعة طلب.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 22, alignItems: "start" } as React.CSSProperties} className="contact-grid">
        <div className="glass" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 18, margin: "0 0 16px" }}>أرسل رسالة</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, color: "var(--muted)" }}>الاسم</label>
              <input placeholder="مثال: عبدالله السعيد" style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, color: "var(--muted)" }}>رقم الجوال</label>
              <input placeholder="+966 5x xxx xxxx" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>البريد الإلكتروني</label>
            <input placeholder="you@example.com" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>الموضوع</label>
            <input placeholder="استفسار عن المقاس / موعد / طلب" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <label style={{ fontSize: 13, color: "var(--muted)" }}>الرسالة</label>
            <textarea placeholder="اكتب رسالتك هنا..." style={{ ...inputStyle, minHeight: 118, resize: "vertical" as const }} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 16 }} onClick={() => setOk(true)}>
            إرسال الرسالة
          </button>
          {ok && (
            <p style={{ marginTop: 12, padding: 10, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.24)", borderRadius: 10, fontSize: 13, color: "#86EFAC", textAlign: "center" }}>
              تم الإرسال — سنرد خلال ساعتين في أوقات العمل.
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="glass" style={{ padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)", color: "var(--accent)" }}>✆</div>
            <div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>اتصال / واتساب</div>
              <div style={{ fontWeight: 600, fontFamily: "var(--font-mono)" }}>+966 11 234 5678</div>
            </div>
          </div>
          <div className="glass" style={{ padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)", color: "var(--accent)" }}>◉</div>
            <div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>الأتيليه — الرياض</div>
              <div style={{ fontWeight: 500 }}>حي السليمانية، شارع التحلية — موعد بطلب مسبق</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>السبت – الخميس · 10ص – 8م</div>
            </div>
          </div>
          <div className="glass" style={{ padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.18)", color: "var(--accent)" }}>✉</div>
            <div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>البريد</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>atelier@wasm.sa</div>
            </div>
          </div>
          <div
            className="glass"
            style={{
              padding: 0,
              minHeight: 220,
              overflow: "hidden",
              borderRadius: 16,
              position: "relative",
            }}
          >
            <iframe
              title="خريطة وسم — السليمانية، الرياض"
              src="https://www.google.com/maps?q=%D8%AD%D9%8A%20%D8%A7%D9%84%D8%B3%D9%84%D9%8A%D9%85%D8%A7%D9%86%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&z=14&output=embed"
              width="100%"
              height="220"
              style={{ border: 0, display: "block", filter: "grayscale(0.15) contrast(1.02)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href="https://www.google.com/maps/search/%D8%AD%D9%8A+%D8%A7%D9%84%D8%B3%D9%84%D9%8A%D9%85%D8%A7%D9%86%D9%8A%D8%A9+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6"
              target="_blank"
              rel="noreferrer"
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                background: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                padding: "8px 12px",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", display: "inline-block" }} />
              افتح في خرائط Google
            </a>
          </div>
        </div>
      </div>

      <style>{`@media(min-width:980px){ .contact-grid{ grid-template-columns: 1.1fr 0.9fr !important; } }`}</style>
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
