/**
 * @file OrderSuccess.tsx
 * @description شاشة نجاح الطلب — وضع ليلي عربي.
 *              Shown at /orders/success/:orderId after a successful POST /orders.
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Copy, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { useBuilderStore } from '../builder/builderStore';

/** شاشة نجاح الطلب */
export default function OrderSuccess() {
  const { orderId } = useParams<{ orderId: string }>();
  const {
    selectedColor, selectedFabric, selectedAccessories,
    recommendationLabel, getTotalPrice, reset,
  } = useBuilderStore();

  const [copied, setCopied] = useState(false);
  const totalPrice = getTotalPrice();

  /** نسخ رقم الطلب إلى الحافظة */
  const handleCopyId = async () => {
    if (!orderId) return;
    await navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <div
      style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--color-black)' }}
      className="flex items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-lg space-y-8" dir="rtl">

        {/* رمز النجاح */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <CheckCircle2 className="w-10 h-10" style={{ color: '#4ade80' }} />
          </div>

          <h1 className="text-3xl font-heading" style={{ color: 'white' }}>
            تم تأكيد طلبك!
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            ثوبك قيد التصنيع بعناية فائقة. ستصلك رسالة تأكيد قريباً.
          </p>

          {recommendationLabel && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--color-gold)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              <Sparkles className="w-4 h-4" />
              <span>{recommendationLabel}</span>
            </div>
          )}
        </motion.div>

        {/* بطاقة رقم الطلب */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 space-y-4"
          style={cardStyle}
        >
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            رقم الطلب
          </p>

          {/* رقم قابل للنسخ */}
          <div
            className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <span className="font-mono text-sm break-all" style={{ color: 'white' }}>
              {orderId ?? 'N/A'}
            </span>
            <button
              onClick={handleCopyId}
              title="نسخ رقم الطلب"
              style={{ color: copied ? '#4ade80' : 'var(--color-muted)', flexShrink: 0 }}
              className="hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* ملخص سريع */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}
            className="space-y-2 text-sm"
          >
            <div className="flex justify-between" style={{ color: 'var(--color-muted)' }}>
              <span>اللون</span>
              <div className="flex items-center gap-2">
                {selectedColor && (
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedColor.hex_code, border: '1px solid rgba(255,255,255,0.2)' }}
                  />
                )}
                <span style={{ color: 'white' }}>{selectedColor?.name ?? '—'}</span>
              </div>
            </div>
            <div className="flex justify-between" style={{ color: 'var(--color-muted)' }}>
              <span>القماش</span>
              <span style={{ color: 'white' }}>{selectedFabric?.name ?? '—'}</span>
            </div>
            <div className="flex justify-between" style={{ color: 'var(--color-muted)' }}>
              <span>الإضافات</span>
              <span style={{ color: 'white' }}>
                {selectedAccessories.length === 0
                  ? 'لا يوجد'
                  : selectedAccessories.map((a) => a.name).join('، ')}
              </span>
            </div>
            <div
              className="flex justify-between font-bold pt-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-gold)' }}
            >
              <span>الإجمالي المدفوع</span>
              <span>{totalPrice} ر.س</span>
            </div>
          </div>
        </motion.div>

        {/* أزرار الإجراء */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/builder"
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gold-gradient text-black transition-all"
          >
            <Sparkles className="w-4 h-4" />
            تصميم ثوب آخر
          </Link>
          <Link
            to="/track"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all"
            style={{
              border: '2px solid rgba(255,255,255,0.15)',
              color: 'white',
            }}
          >
            <ShoppingBag className="w-4 h-4" />
            متابعة الطلبات
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
