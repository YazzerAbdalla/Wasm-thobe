/**
 * @file ColorStep.tsx
 * @description الخطوة الأولى — اختيار اللون. وضع ليلي عربي.
 */

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useBuilderStore, type IColor } from '../builderStore';

/**
 * مكوّن اختيار اللون.
 * يعرض شبكة من نماذج الألوان. الاختيار يُحدّث المعاينة فوراً.
 */
export default function ColorStep() {
  const { colors, selectedColor, selectColor } = useBuilderStore();

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h2 className="text-2xl font-heading" style={{ color: 'white' }}>
          اختر لون ثوبك
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
          حدّد اللون الأساسي — المعاينة تتحدث فوراً
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
        {colors.map((color: IColor) => {
          const isSelected = selectedColor?.id === color.id;
          return (
            <motion.button
              key={color.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectColor(color)}
              className="flex flex-col items-center gap-2 focus:outline-none group"
              title={color.name}
            >
              {/* دائرة اللون */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  backgroundColor: color.hex_code,
                  border: isSelected
                    ? '3px solid var(--color-gold)'
                    : '3px solid transparent',
                  boxShadow: isSelected
                    ? '0 0 12px rgba(212,175,55,0.4)'
                    : 'none',
                }}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Check
                      className="w-5 h-5"
                      style={{ color: isLightColor(color.hex_code) ? '#0b0b0b' : '#ffffff' }}
                    />
                  </motion.div>
                )}
              </div>

              {/* اسم اللون */}
              <span
                className="text-xs text-center leading-tight transition-colors"
                style={{ color: isSelected ? 'var(--color-gold)' : 'var(--color-muted)', fontWeight: isSelected ? 600 : 400 }}
              >
                {color.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {selectedColor && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)' }}
        >
          تم الاختيار:{' '}
          <strong style={{ color: 'white' }}>{selectedColor.name}</strong>
          <span style={{ marginRight: '8px', color: 'var(--color-muted)', fontSize: 'var(--text-xs)' }}>
            ({selectedColor.hex_code})
          </span>
        </motion.p>
      )}
    </div>
  );
}

/**
 * يتحقق مما إذا كان اللون فاتحاً لضمان تباين علامة الاختيار.
 * @param hex - سلسلة اللون بصيغة hex
 */
function isLightColor(hex: string): boolean {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
}
