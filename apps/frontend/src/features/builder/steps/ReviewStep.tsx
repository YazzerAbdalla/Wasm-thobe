/**
 * @file ReviewStep.tsx
 * @description الخطوة الرابعة — مراجعة الطلب وتأكيده. وضع ليلي عربي.
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBuilderStore } from '../builderStore';
import { api } from '../../../services/api';
import RecommendationBadge from '../RecommendationBadge';

/** مكوّن مراجعة الطلب وتأكيده */
export default function ReviewStep() {
  const {
    selectedColor, selectedFabric, selectedAccessories,
    customizationId, basePrice, getTotalPrice,
  } = useBuilderStore();

  const [isOrdering, setIsOrdering] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const navigate = useNavigate();

  const totalPrice  = getTotalPrice();
  const fabricExtra = selectedFabric
    ? Math.round(basePrice * (selectedFabric.price_multiplier - 1))
    : 0;

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    color: 'var(--color-muted)',
    fontSize: 'var(--text-sm)',
  };

  /** تأكيد الطلب واستدعاء POST /orders */
  const handleConfirmOrder = async () => {
    if (!customizationId) {
      setOrderError('يُرجى العودة لاختيار القماش أولاً.');
      return;
    }
    setIsOrdering(true);
    setOrderError(null);
    try {
      const res = await api.post('/orders', {
        customization_id: customizationId,
        total_price: totalPrice,
      });
      navigate(`/orders/success/${res.data.id}`);
    } catch (err: any) {
      setOrderError(err.response?.data?.message ?? 'فشل تقديم الطلب. حاول مجدداً.');
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* الرأس */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-heading" style={{ color: 'white' }}>
            مراجعة طلبك
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            تحقق من اختياراتك قبل تأكيد الطلب
          </p>
        </div>
        <RecommendationBadge />
      </div>

      {/* بطاقة الملخص */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {/* اللون */}
        <div style={{ ...rowStyle, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span>اللون</span>
          {selectedColor ? (
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedColor.hex_code, border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <span style={{ color: 'white', fontWeight: 500 }}>{selectedColor.name}</span>
            </div>
          ) : (
            <span style={{ color: '#f87171', fontStyle: 'italic' }}>لم يُختَر</span>
          )}
        </div>

        {/* القماش */}
        <div style={{ ...rowStyle, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span>القماش</span>
          {selectedFabric ? (
            <span style={{ color: 'white', fontWeight: 500 }}>{selectedFabric.name}</span>
          ) : (
            <span style={{ color: '#f87171', fontStyle: 'italic' }}>لم يُختَر</span>
          )}
        </div>

        {/* الإضافات */}
        <div style={{ padding: '12px 20px' }}>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>الإضافات</span>
            <span style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}>
              {selectedAccessories.length === 0 ? 'لا يوجد' : `${selectedAccessories.length} مختارة`}
            </span>
          </div>
          {selectedAccessories.length > 0 && (
            <ul className="mt-2 space-y-1 pr-2">
              {selectedAccessories.map((acc) => (
                <li
                  key={acc.id}
                  className="flex justify-between"
                  style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)' }}
                >
                  <span>{acc.name}</span>
                  <span>+{acc.extra_price} ر.س</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* تفصيل السعر */}
      <div
        className="rounded-xl p-5 space-y-2"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'white' }}>
          تفصيل السعر
        </h3>

        <div className="flex justify-between text-sm" style={{ color: 'var(--color-muted)' }}>
          <span>السعر الأساسي</span>
          <span>{basePrice} ر.س</span>
        </div>

        {selectedFabric && fabricExtra > 0 && (
          <div className="flex justify-between text-sm" style={{ color: 'var(--color-muted)' }}>
            <span>{selectedFabric.name}</span>
            <span>+{fabricExtra} ر.س</span>
          </div>
        )}

        {selectedAccessories.map((acc) => (
          <div key={acc.id} className="flex justify-between text-sm" style={{ color: 'var(--color-muted)' }}>
            <span>{acc.name}</span>
            <span>+{acc.extra_price} ر.س</span>
          </div>
        ))}

        <div
          className="flex justify-between font-bold pt-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-gold)' }}
        >
          <span>الإجمالي</span>
          <span>{totalPrice} ر.س</span>
        </div>
      </div>

      {/* رسالة خطأ */}
      {orderError && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            background: 'rgba(185,28,28,0.2)',
            border: '1px solid rgba(185,28,28,0.4)',
            color: '#fca5a5',
          }}
        >
          {orderError}
        </div>
      )}

      {/* زر التأكيد */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleConfirmOrder}
        disabled={isOrdering || !customizationId}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gold-gradient text-black disabled:opacity-50"
      >
        {isOrdering ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            جارٍ تقديم الطلب…
          </>
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            تأكيد الطلب
          </>
        )}
      </motion.button>

      {!customizationId && (
        <p className="text-xs text-center" style={{ color: 'var(--color-muted)' }}>
          عُد لاختيار القماش لتوليد توصيتك الشخصية.
        </p>
      )}
    </div>
  );
}
