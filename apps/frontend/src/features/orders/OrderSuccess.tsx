import { useParams, Link } from "react-router-dom";
import { useBuilderStore } from "../builder/builderStore";

export default function OrderSuccess() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getTotalPrice, guestName, guestCC, guestPhone, reset } = useBuilderStore();
  const total = getTotalPrice();
  const date = new Date(Date.now() + 7 * 24 * 3600 * 1000).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ minHeight: "calc(100vh - 80px)", display: "grid", placeItems: "center", padding: "40px 16px" } as React.CSSProperties}>
      <div className="glass" style={{ maxWidth: 560, width: "100%", padding: 36, textAlign: "center" }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 999,
            margin: "0 auto 18px",
            display: "grid",
            placeItems: "center",
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.3)",
            color: "#4ADE80",
            animation: "pop .5s cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 style={{ fontSize: 26, margin: "0 0 8px" }}>تم تأكيد طلبك — شكراً لثقتك</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>ثوبك الآن في طاولة الحرفي. ستصلك رسالة عند كل مرحلة، ورقم تتبعك أدناه.</p>

        <dl style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "right" as const, margin: "22px 0" }}>
          <div style={{ padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
            <dt style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 6px", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>رقم الطلب</dt>
            <dd style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: "var(--font-mono)" }}>{orderId ?? "WASM-84291"}</dd>
          </div>
          <div style={{ padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
            <dt style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 6px", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>الإجمالي</dt>
            <dd style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>SAR {total}</dd>
          </div>
          <div style={{ padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
            <dt style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 6px", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>موعد التسليم المتوقع</dt>
            <dd style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{date}</dd>
          </div>
          <div style={{ padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
            <dt style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 6px", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>طريقة الدفع</dt>
            <dd style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>الدفع عند الاستلام</dd>
          </div>
        </dl>

        {(guestName || guestPhone) && (
          <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.16)", borderRadius: 10, fontSize: 13, color: "var(--muted)", textAlign: "right" as const }}>
            <span style={{ color: "#fff", fontWeight: 600 }}>{guestName}</span> · <span dir="ltr" style={{ fontFamily: "var(--font-mono)" }}>{guestCC} {guestPhone}</span> — سنرسل تأكيد واتساب على هذا الرقم.
          </div>
        )}

        <div style={{ padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, fontSize: 13, color: "var(--muted)", marginTop: 12 }}>
          ستصلك رسالة واتساب بالتحديثات. يمكنك تتبع الثوب في أي وقت من “تتبع طلبك”.
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <Link to="/track" className="btn btn-primary" style={{ flex: 1 }}>
            تتبع طلبك
          </Link>
          <Link to="/" onClick={() => reset()} className="btn btn-outline" style={{ flex: 1 }}>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
