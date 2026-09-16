import { motion } from "motion/react";

export default function StorySection() {
  return (
    <>
      <section
        className="container-atelier"
        style={{ paddingTop: 64, paddingBottom: 0 } as React.CSSProperties}
      >
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
          <p className="eyebrow">الرحلة</p>
          <h2 style={{ fontSize: 32, margin: "10px 0 14px" }}>
            <span className="gold-text">مراحل ولادة التحفة</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16, margin: 0 }}>
            من أول خيط إلى آخر غرزة — كل ثوب يمر بثلاث محطات من العناية. لا استعجال، لا اختصار، فقط
            إتقان يورث.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 } as React.CSSProperties}
          className="craft-grid"
        >
          <motion.article
            className="glass"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            style={{ position: "relative", overflow: "hidden", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28, borderRadius: 20, borderColor: "rgba(255,255,255,0.06)" }}
          >
            <img
              src="/images/story-1.png"
              alt="اختيار النسيج — يد تفحص القماش تحت الضوء"
              loading="lazy"
              decoding="async"
              width={640}
              height={380}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 18%, rgba(0,0,0,0.78) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 2,
                width: 44,
                height: 44,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                backdropFilter: "blur(8px)",
              }}
            >
              01
            </div>
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3 style={{ fontSize: 22, margin: "0 0 8px", color: "#fff" }}>اختيار النسيج</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.7 }}>
                ننتقي الألياف يدوياً — قطن مصري طويل التيلة، صوف مبرد، كتان طبيعي. كل قماش يُفحص تحت
                الضوء للملمس والانسدال.
              </p>
            </div>
          </motion.article>

          <motion.article
            className="glass"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ position: "relative", overflow: "hidden", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28, borderRadius: 20 }}
          >
            <img
              src="/images/story-2.png"
              alt="القصّة اليدوية — مقص على طاولة التفصيل"
              loading="lazy"
              decoding="async"
              width={640}
              height={380}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 18%, rgba(0,0,0,0.78) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 2,
                width: 44,
                height: 44,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                backdropFilter: "blur(8px)",
              }}
            >
              02
            </div>
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3 style={{ fontSize: 22, margin: "0 0 8px", color: "#fff" }}>القصّة اليدوية</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.7 }}>
                يُقص القماش على طاولة واحدة، مقص واحد، حرفي واحد. لا قوالب جاهزة — كل ثوب يُفصّل على
                مقاسك بدقة المليمتر.
              </p>
            </div>
          </motion.article>

          <motion.article
            className="glass"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ position: "relative", overflow: "hidden", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28, borderRadius: 20 }}
          >
            <img
              src="/images/story-3.png"
              alt="اللمسة الأخيرة — تطريز وأزرار صدف ومراجعة نهائية"
              loading="lazy"
              decoding="async"
              width={640}
              height={380}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 18%, rgba(0,0,0,0.78) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 2,
                width: 44,
                height: 44,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                backdropFilter: "blur(8px)",
              }}
            >
              03
            </div>
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3 style={{ fontSize: 22, margin: "0 0 8px", color: "#fff" }}>اللمسة الأخيرة</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.7 }}>
                تطريز، أزرار صدف، كيّ بخاري ومراجعة نهائية تحت عدسة مكبرة. يوقّع الحرفي بطاقته قبل
                التغليف الحريري.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="container-atelier" style={{ padding: "40px 0 80px" } as React.CSSProperties}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <h3 style={{ fontSize: 22, margin: 0 }}>لماذا يختارنا من يقدّر التفاصيل</h3>
          <span className="eyebrow" style={{ fontSize: 10 }}>
            Atelier · Since 2018
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 } as React.CSSProperties} className="pillars-grid">
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            style={{ padding: 28, display: "flex", gap: 16, alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                flex: "0 0 44px",
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(212,175,55,0.22)",
                background: "rgba(212,175,55,0.08)",
                color: "var(--accent)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: "0 0 6px", fontSize: 16, color: "#fff" }}>ضمان الإتقان</h4>
              <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
                إن لم يكن الثوب على مقاس توقعك، نعيد التفصيل مجاناً خلال 14 يوماً. بلا أسئلة.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            style={{ padding: 28, display: "flex", gap: 16, alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                flex: "0 0 44px",
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(212,175,55,0.22)",
                background: "rgba(212,175,55,0.08)",
                color: "var(--accent)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l3 2" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: "0 0 6px", fontSize: 16, color: "#fff" }}>سبعة أيام إلى بابك</h4>
              <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
                من القص إلى التوصيل المغلف — تتبع حي لكل مرحلة ورسالة عند كل ختم جودة.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            style={{ padding: 28, display: "flex", gap: 16, alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                flex: "0 0 44px",
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(212,175,55,0.22)",
                background: "rgba(212,175,55,0.08)",
                color: "var(--accent)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h16M4 12h10M4 17h16" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: "0 0 6px", fontSize: 16, color: "#fff" }}>خامات يُوثق مصدرها</h4>
              <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
                شهادة منشأ لكل قماش، وحرفيّ واحد مسؤول من البداية للنهاية — اسمه على بطاقة الثوب.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-atelier" style={{ textAlign: "center", padding: "48px 0 16px" } as React.CSSProperties}>
        <div
          className="glass"
          style={{ padding: "48px 28px", maxWidth: 860, margin: "0 auto", position: "relative", overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(600px 280px at 50% 0%, rgba(212,175,55,0.10), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p className="eyebrow" style={{ position: "relative" } as React.CSSProperties}>
            ابدأ الآن
          </p>
          <h2 style={{ fontSize: 30, margin: "12px 0", position: "relative" } as React.CSSProperties}>ثوبك، كما تتخيله — بالضبط.</h2>
          <p style={{ color: "var(--muted)", maxWidth: "48ch", margin: "0 auto 24px", position: "relative" } as React.CSSProperties}>
            أربع خطوات، معاينة حيّة، وسعر شفاف قبل التأكيد. لا مفاجآت.
          </p>
          <a href="/builder" className="btn btn-primary" style={{ position: "relative", padding: "14px 36px", fontSize: 16 } as React.CSSProperties}>
            ادخل المصمم
          </a>
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--muted)", position: "relative" } as React.CSSProperties}>يستغرق أقل من دقيقتين · لا حاجة للدفع الآن</div>
        </div>
      </section>

      <style>{`
        @media(min-width:900px){ .craft-grid{ grid-template-columns: repeat(3,1fr) !important; } }
        @media(min-width:900px){ .pillars-grid{ grid-template-columns: repeat(3,1fr) !important; } }
      `}</style>
    </>
  );
}
