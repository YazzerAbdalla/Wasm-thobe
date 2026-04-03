/**
 * @file Builder.tsx
 * @description صفحة منشئ الثوب — وضع ليلي عربي.
 *              Orchestrates the 4-step Arab-first dark mode thobe builder wizard.
 */

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import { useBuilderStore } from './builderStore';
import { api } from '../../services/api';
import ThobePreview from './ThobePreview';
import ColorStep from './steps/ColorStep';
import FabricStep from './steps/FabricStep';
import AccessoriesStep from './steps/AccessoriesStep';
import ReviewStep from './steps/ReviewStep';

// --- بيانات تجريبية للتطوير ---
const MOCK_COLORS = [
  { id: 'c1',  name: 'أبيض ناصع',   hex_code: '#FFFFFF' },
  { id: 'c2',  name: 'عاجي',         hex_code: '#FFFFF0' },
  { id: 'c3',  name: 'لؤلؤي',        hex_code: '#EAE0C8' },
  { id: 'c4',  name: 'كريمي',        hex_code: '#FFFDD0' },
  { id: 'c5',  name: 'رمادي فاتح',  hex_code: '#D3D3D3' },
  { id: 'c6',  name: 'فضي',          hex_code: '#C0C0C0' },
  { id: 'c7',  name: 'بيج',          hex_code: '#F5F5DC' },
  { id: 'c8',  name: 'أزرق سماوي',  hex_code: '#87CEEB' },
  { id: 'c9',  name: 'كحلي',         hex_code: '#000080' },
  { id: 'c10', name: 'أخضر غابي',   hex_code: '#228B22' },
  { id: 'c11', name: 'رمادي داكن',  hex_code: '#36454F' },
  { id: 'c12', name: 'أسود',         hex_code: '#1a1a1a' },
];

const MOCK_FABRICS = [
  { id: 'f1', name: 'قطن مصري', description: 'خفيف وناعم، مثالي للاستخدام اليومي.', price_multiplier: 1, texture_class: 'fabric-cotton' },
  { id: 'f2', name: 'كتان فاخر', description: 'وزن خفيف بملمس طبيعي. رائع لفصل الصيف.', price_multiplier: 1.2, texture_class: 'fabric-linen' },
  { id: 'f3', name: 'صوف ميرينو', description: 'دافئ وأنيق. مثالي للمناسبات الرسمية.', price_multiplier: 1.5, texture_class: 'fabric-wool' },
  { id: 'f4', name: 'حرير فاخر', description: 'ناعم كالحرير مع بريق خفي. ذروة الفخامة.', price_multiplier: 2, texture_class: 'fabric-silk' },
];

const MOCK_ACCESSORIES = [
  { id: 'a1', name: 'تطريز ذهبي',      type: 'decoration',     extra_price: 80 },
  { id: 'a2', name: 'أزرار فضية',       type: 'cufflinks',      extra_price: 60 },
  { id: 'a3', name: 'خياطة مونوغرام',  type: 'personalization', extra_price: 40 },
  { id: 'a4', name: 'جيب صدر',          type: 'pocket',         extra_price: 25 },
];

/** تسميات خطوات المعالج */
const STEP_LABELS = ['اللون', 'القماش', 'الإضافات', 'المراجعة'];

/** يُعيد مكوّن الخطوة المناسب */
function renderStep(step: number) {
  switch (step) {
    case 1: return <ColorStep />;
    case 2: return <FabricStep />;
    case 3: return <AccessoriesStep />;
    case 4: return <ReviewStep />;
    default: return null;
  }
}

/** صفحة منشئ الثوب */
export default function Builder() {
  const {
    currentStep, totalSteps,
    selectedColor, selectedFabric, selectedAccessories,
    isLoadingOptions, optionsError,
    setColors, setFabrics, setAccessories,
    setLoadingOptions, setOptionsError, setRecommendation,
    nextStep, prevStep,
  } = useBuilderStore();

  /** جلب خيارات التخصيص من الخادم مع احتياطي تجريبي */
  const fetchOptions = useCallback(async () => {
    setLoadingOptions(true);
    setOptionsError(null);
    try {
      const res = await api.get('/customization/options');
      setColors(res.data.colors);
      setFabrics(res.data.fabrics);
      setAccessories(res.data.accessories);
    } catch {
      // الخادم غير متاح — نستخدم البيانات التجريبية
      setColors(MOCK_COLORS);
      setFabrics(MOCK_FABRICS);
      setAccessories(MOCK_ACCESSORIES);
    } finally {
      setLoadingOptions(false);
    }
  }, [setColors, setFabrics, setAccessories, setLoadingOptions, setOptionsError]);

  useEffect(() => { fetchOptions(); }, [fetchOptions]);

  /** استدعاء نقطة التخصيص للحصول على توصية الذكاء الاصطناعي */
  const triggerRecommendation = useCallback(async () => {
    if (!selectedColor || !selectedFabric) return;
    try {
      const res = await api.post('/customization', {
        color_id: selectedColor.id,
        fabric_id: selectedFabric.id,
        accessory_ids: selectedAccessories.map((a) => a.id),
      });
      setRecommendation(res.data.id, res.data.recommendation_label);
    } catch {
      setRecommendation('mock-id', 'أسلوب مميز');
    }
  }, [selectedColor, selectedFabric, selectedAccessories, setRecommendation]);

  /** التحقق من صحة الخطوة الحالية قبل التقدم */
  const canAdvance = (): boolean => {
    if (currentStep === 1) return !!selectedColor;
    if (currentStep === 2) return !!selectedFabric;
    return true;
  };

  const handleNext = async () => {
    if (!canAdvance()) return;
    if (currentStep === 2) await triggerRecommendation();
    nextStep();
  };

  // -- ألوان التصميم --
  const cardBg    = 'rgba(255,255,255,0.04)';
  const cardBorder= '1px solid rgba(255,255,255,0.1)';

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--color-black)' }}>
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* عنوان الصفحة */}
        <div className="mb-8 text-center">
          <h1 className="font-heading" style={{ color: 'var(--color-gold)', fontSize: 'var(--text-4xl)' }}>
            صمّم ثوبك
          </h1>
          <p style={{ color: 'var(--color-muted)', marginTop: '8px' }}>
            ابنِ ثوبك التقليدي المثالي خطوةً بخطوة
          </p>
        </div>

        {/* شريط التقدم */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEP_LABELS.map((label, index) => {
            const step = index + 1;
            const isCompleted = step < currentStep;
            const isCurrent   = step === currentStep;
            return (
              <div key={step} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{
                      backgroundColor: isCompleted ? '#d4af37' : isCurrent ? '#fff' : 'rgba(255,255,255,0.1)',
                      color:           isCompleted || isCurrent ? '#0b0b0b' : '#8a8a8a',
                      scale:           isCurrent ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {isCompleted ? '✓' : step}
                  </motion.div>
                  <span
                    className="text-xs hidden sm:block"
                    style={{ color: isCurrent ? 'white' : 'var(--color-muted)', fontWeight: isCurrent ? 600 : 400 }}
                  >
                    {label}
                  </span>
                </div>
                {index < STEP_LABELS.length - 1 && (
                  <motion.div
                    animate={{ backgroundColor: isCompleted ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)' }}
                    transition={{ duration: 0.3 }}
                    className="w-10 sm:w-16 h-0.5 mb-4"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* التخطيط الرئيسي */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* المعاينة المباشرة */}
          <div className="lg:w-64 lg:shrink-0">
            <div
              className="sticky top-24 rounded-2xl p-6 flex flex-col items-center gap-4"
              style={{ background: cardBg, border: cardBorder, backdropFilter: 'blur(8px)' }}
            >
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--color-muted)' }}
              >
                معاينة مباشرة
              </p>
              {isLoadingOptions ? (
                <div className="w-48 h-64 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 animate-spin" style={{ color: 'var(--color-gold)' }} />
                </div>
              ) : (
                <ThobePreview />
              )}
            </div>
          </div>

          {/* محتوى الخطوة */}
          <div
            className="flex-1 rounded-2xl p-8"
            style={{ background: cardBg, border: cardBorder, backdropFilter: 'blur(8px)' }}
          >
            {isLoadingOptions ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 rounded w-1/3" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="h-4 rounded w-1/2" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
              </div>
            ) : optionsError ? (
              <div className="text-center py-12 space-y-4">
                <p style={{ color: '#f87171' }}>{optionsError}</p>
                <button
                  onClick={fetchOptions}
                  className="px-4 py-2 rounded-lg font-semibold bg-gold-gradient text-black"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    {renderStep(currentStep)}
                  </motion.div>
                </AnimatePresence>

                {/* أزرار التنقل */}
                {currentStep < totalSteps && (
                  <div
                    className="flex items-center justify-between mt-10 pt-6"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
                      style={{ color: currentStep === 1 ? 'var(--color-muted)' : 'white', opacity: currentStep === 1 ? 0.3 : 1 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                      السابق
                    </button>

                    <span style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)' }}>
                      الخطوة {currentStep} من {totalSteps}
                    </span>

                    <motion.button
                      whileHover={{ scale: canAdvance() ? 1.03 : 1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNext}
                      disabled={!canAdvance()}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold bg-gold-gradient text-black disabled:opacity-40"
                    >
                      التالي
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
