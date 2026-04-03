/**
 * @file FabricStep.tsx
 * @description الخطوة الثانية — اختيار القماش. وضع ليلي عربي.
 */

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useBuilderStore, type IFabric } from '../builderStore';

/** مكوّن اختيار القماش */
export default function FabricStep() {
  const { fabrics, selectedFabric, selectFabric } = useBuilderStore();

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h2 className="text-2xl font-heading" style={{ color: 'white' }}>
          اختر نوع القماش
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
          لكل قماش ملمسه الخاص وتأثيره على السعر.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fabrics.map((fabric: IFabric) => {
          const isSelected = selectedFabric?.id === fabric.id;
          const priceTag =
            fabric.price_multiplier === 1
              ? 'أساسي'
              : `+${Math.round((fabric.price_multiplier - 1) * 100)}%`;

          return (
            <motion.button
              key={fabric.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectFabric(fabric)}
              className="text-right p-4 rounded-xl transition-all duration-200 focus:outline-none"
              style={{
                background: isSelected ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)',
                border: isSelected ? '2px solid var(--color-gold)' : '2px solid rgba(255,255,255,0.08)',
                boxShadow: isSelected ? '0 0 16px rgba(212,175,55,0.15)' : 'none',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold" style={{ color: 'white' }}>
                      {fabric.name}
                    </span>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center w-5 h-5 rounded-full"
                        style={{ backgroundColor: 'var(--color-gold)' }}
                      >
                        <Check className="w-3 h-3 text-black" />
                      </motion.span>
                    )}
                  </div>
                  <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
                    {fabric.description}
                  </p>
                </div>

                <span
                  className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                  style={{
                    background: fabric.price_multiplier === 1 ? 'rgba(255,255,255,0.08)' : 'rgba(212,175,55,0.18)',
                    color:      fabric.price_multiplier === 1 ? 'var(--color-muted)'     : 'var(--color-gold)',
                  }}
                >
                  {priceTag}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
