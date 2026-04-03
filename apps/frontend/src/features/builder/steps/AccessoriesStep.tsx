/**
 * @file AccessoriesStep.tsx
 * @description الخطوة الثالثة — اختيار الإضافات. وضع ليلي عربي.
 */

import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useBuilderStore, type IAccessory } from '../builderStore';

/** مكوّن اختيار الإضافات */
export default function AccessoriesStep() {
  const { accessories, selectedAccessories, toggleAccessory } = useBuilderStore();

  /** التحقق من اختيار إضافة معينة */
  const isSelected = (id: string) => selectedAccessories.some((a) => a.id === id);

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h2 className="text-2xl font-heading" style={{ color: 'white' }}>
          أضف التحسينات
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
          اختر الإضافات التي تُميّز ثوبك — كلها اختيارية.
        </p>
      </div>

      {accessories.length === 0 ? (
        <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>
          لا توجد إضافات متاحة حالياً.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accessories.map((accessory: IAccessory) => {
            const selected = isSelected(accessory.id);
            return (
              <motion.button
                key={accessory.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleAccessory(accessory)}
                className="text-right p-4 rounded-xl transition-all duration-200 focus:outline-none"
                style={{
                  background: selected ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)',
                  border: selected ? '2px solid var(--color-gold)' : '2px solid rgba(255,255,255,0.08)',
                  boxShadow: selected ? '0 0 16px rgba(212,175,55,0.15)' : 'none',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold" style={{ color: 'white' }}>
                      {accessory.name}
                    </div>
                    <div style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)', marginTop: '2px' }}>
                      {accessory.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span style={{ color: 'var(--color-gold)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      +{accessory.extra_price} ر.س
                    </span>
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-full transition-colors"
                      style={{
                        background: selected ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)',
                        border:     selected ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        color:      selected ? '#0b0b0b' : 'var(--color-muted)',
                      }}
                    >
                      {selected ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* ملخص الإضافات المختارة */}
      {selectedAccessories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg text-sm"
          style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
        >
          <span style={{ color: 'var(--color-muted)' }}>
            <strong style={{ color: 'white' }}>{selectedAccessories.length}</strong>{' '}
            {selectedAccessories.length === 1 ? 'إضافة' : 'إضافات'} مختارة — +
            <strong style={{ color: 'var(--color-gold)' }}>
              {selectedAccessories.reduce((s, a) => s + a.extra_price, 0)} ر.س
            </strong>
          </span>
        </motion.div>
      )}
    </div>
  );
}
