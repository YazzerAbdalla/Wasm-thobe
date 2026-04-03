/**
 * @file RecommendationBadge.tsx
 * @description Displays an animated badge showing the AI-generated recommendation
 *              label returned from the POST /customization endpoint.
 */

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useBuilderStore } from './builderStore';

/**
 * RecommendationBadge component.
 * Animates in when a recommendation label is available,
 * and gracefully fades out when it changes or is absent.
 */
export default function RecommendationBadge() {
  const { recommendationLabel } = useBuilderStore();

  return (
    <AnimatePresence mode="wait">
      {recommendationLabel && (
        <motion.div
          key={recommendationLabel}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-sm font-semibold shadow-lg shadow-amber-200"
        >
          <Sparkles className="w-4 h-4" />
          <span>{recommendationLabel}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
