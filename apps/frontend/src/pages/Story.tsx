export default function Story() {
  return (
    <div className="container-atelier" style={{ paddingBottom: 64 }}>
      <div style={{ textAlign: "center", padding: "56px 0 32px", maxWidth: 760, margin: "0 auto" }}>
        <p className="eyebrow">Our Story</p>
        <h1 className="gold-text" style={{ fontSize: 40, margin: "12px 0" }}>
          قصتنا — خيطٌ من أجدادنا
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 17, maxWidth: "64ch", margin: "0 auto" }}>
          بدأت وسم في مشغل صغير في الرياض، على طاولة خشبية واحدة ومقص واحد. لم نرد أن نبيع ثياباً — أردنا
          أن نُعيد للثوب هيبته: قماش يُحكى عنه، وقصّة تُلائم الجسد لا الصورة.
        </p>
      </div>

      <div style={{ position: "relative", maxWidth: 980, margin: "40px auto 0" }} className="timeline">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "center",
            marginBottom: 36,
          } as React.CSSProperties}
          className="tl-row"
        >
          <div className="glass" style={{ padding: 24, position: "relative" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.12em" }}>2018 — البداية</div>
            <h3 style={{ margin: "6px 0 8px", fontSize: 20, color: "#fff" }}>مشغل بلا واجهة</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
              ثلاثة حرفيين، زبون واحد كل أسبوع، وشرط واحد: إن لم يكن الثوب يستحق أن يُهدى لملك، فلا يخرج من المشغل.
            </p>
            <div style={{ position: "absolute", top: "50%", left: -16, transform: "translate(-50%, -50%)", width: 12, height: 12, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 0 6px rgba(212,175,55,0.15)" }} />
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, padding: 12 }}>الرياض، حي السليمانية — أول طاولة تفصيل، ولا تزال موجودة حتى اليوم كتذكار.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", marginBottom: 36, direction: "ltr" as const } as React.CSSProperties} className="tl-row">
          <div className="glass" style={{ padding: 24, position: "relative", direction: "rtl" as const }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.12em" }}>2021 — الاعتراف</div>
            <h3 style={{ margin: "6px 0 8px", fontSize: 20, color: "#fff" }}>ألف ثوب بلا إعلان</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
              وصلنا إلى 1,000 عميل بالكلمة وحدها. كل ثوب يحمل بطاقة باسم الحرفي الذي قصّه وخاطه — مسؤولية كاملة.
            </p>
            <div style={{ position: "absolute", top: "50%", right: -16, transform: "translate(50%, -50%)", width: 12, height: 12, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 0 6px rgba(212,175,55,0.15)" }} />
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, padding: 12, textAlign: "left" as const }}>تقييم 4.9 من 5 عبر 600 مراجعة موثقة — لا صور مستعارة، فقط ثياب حقيقية.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center", marginBottom: 36 } as React.CSSProperties} className="tl-row">
          <div className="glass" style={{ padding: 24, position: "relative" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.12em" }}>2026 — الأتيليه الرقمي</div>
            <h3 style={{ margin: "6px 0 8px", fontSize: 20, color: "#fff" }}>الحرفية تلتقي التقنية</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
              المصمم الحي الذي تراه اليوم ليس متجراً — هو نفس المشغل، ولكن بزجاج شفاف: ترى كل خيط وسعره قبل أن نبدأ.
            </p>
            <div style={{ position: "absolute", top: "50%", left: -16, transform: "translate(-50%, -50%)", width: 12, height: 12, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 0 6px rgba(212,175,55,0.15)" }} />
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, padding: 12 }}>نفس الأيدي، نفس المقص — الآن مع معاينة لحظية وتتبع حي لكل غرزة.</div>
        </div>
      </div>

      <section className="glass story-values" style={{ margin: "48px auto", maxWidth: 980, padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "center" } as React.CSSProperties}>
        <div>
          <h3 style={{ margin: "0 0 12px", fontSize: 20 }}>قيمنا — ثلاث كلمات فقط</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
            {[
              { t: "إتقان بلا استعجال", d: "نرفض الإنتاج الكمي. كل ثوب يأخذ وقته، ولو تأخر يوماً." },
              { t: "شفافية كاملة", d: "سعر القماش، سعر التطريز، سعر التوصيل — كل شيء أمامك قبل الدفع." },
              { t: "احترام التراث", d: "نُحدّث الثوب ولا نُبدّله. الهيبة تبقى، والراحة تزيد." },
            ].map((v) => (
              <div key={v.t} style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--accent)" }}>—</span>
                <div>
                  <strong style={{ fontSize: 14 }}>{v.t}</strong>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted)" }}>{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
          <img src="/images/design.png" alt="تفاصيل التصميم — وسم" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.62) 100%)" }} />
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              left: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(0,0,0,0.46)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: "10px 12px",
            }}
          >
            <span style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid var(--accent)", display: "grid", placeItems: "center", color: "var(--accent)", fontSize: 14, flex: "0 0 36px" }}>و</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "#fff" }}>حرفيّ واحد · ثوب واحد · توقيع واحد</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.66)" }}>كل ثوب يوقّعه صانعه</div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .timeline::before{ content:""; position:absolute; top:0; bottom:0; right:50%; width:1px; background:rgba(255,255,255,0.08); }
        @media(max-width:900px){ .timeline::before{ right:16px !important } .tl-row{ grid-template-columns:1fr !important; padding-right:40px !important } }
        .story-values{ grid-template-columns:1fr 1fr; }
        @media(max-width:900px){ .story-values{ grid-template-columns:1fr !important } }
      `}</style>
    </div>
  );
}
