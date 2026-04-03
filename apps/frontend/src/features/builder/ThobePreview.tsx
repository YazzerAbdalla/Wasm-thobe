/**
 * @file ThobePreview.tsx
 * @description Live SVG preview of the thobe that updates instantly
 *              via CSS custom properties when the user changes color or fabric.
 *              No server calls — all rendering is pure CSS-driven.
 */

import { useEffect, useRef } from 'react';
import { useBuilderStore } from './builderStore';

/**
 * ThobePreview component.
 * Renders an inline SVG of a traditional Saudi thobe.
 * Updates color and fabric texture in real-time using CSS custom properties.
 */
export default function ThobePreview() {
  const { selectedColor, selectedFabric } = useBuilderStore();
  const svgRef = useRef<SVGSVGElement>(null);

  // Update CSS custom property on color change — instant, no re-render needed
  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.style.setProperty(
        '--thobe-color',
        selectedColor?.hex_code ?? '#FFFFFF'
      );
    }
  }, [selectedColor]);

  // Build the texture class based on selected fabric
  const textureClass = selectedFabric?.texture_class ?? '';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Glow effect behind the thobe */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-all duration-700"
          style={{ backgroundColor: selectedColor?.hex_code ?? '#FFFFFF' }}
        />
        <svg
          ref={svgRef}
          viewBox="0 0 200 320"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-auto relative z-10 drop-shadow-xl"
          style={{ '--thobe-color': selectedColor?.hex_code ?? '#FFFFFF' } as React.CSSProperties}
        >
          {/* Fabric texture definitions */}
          <defs>
            {/* Linen texture: fine crosshatch */}
            <pattern id="linen-pattern" patternUnits="userSpaceOnUse" width="4" height="4">
              <path d="M0,0 L4,4 M4,0 L0,4" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            </pattern>
            {/* Wool texture: tighter dots */}
            <pattern id="wool-pattern" patternUnits="userSpaceOnUse" width="5" height="5">
              <circle cx="2.5" cy="2.5" r="0.8" fill="rgba(0,0,0,0.08)" />
            </pattern>
            {/* Cotton texture: very subtle lines */}
            <pattern id="cotton-pattern" patternUnits="userSpaceOnUse" width="3" height="3">
              <line x1="0" y1="1.5" x2="3" y2="1.5" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
            </pattern>
            {/* Silk texture: diagonal shimmer */}
            <pattern id="silk-pattern" patternUnits="userSpaceOnUse" width="6" height="6">
              <path d="M0,6 L6,0" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* === Body === */}
          {/* Main body fill with CSS custom property */}
          <path
            className={`thobe-body ${textureClass}`}
            d="M 40 80 L 20 280 L 180 280 L 160 80 L 140 70 L 100 90 L 60 70 Z"
            fill="var(--thobe-color, #FFFFFF)"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />

          {/* Fabric texture overlay — mapped by class */}
          {textureClass === 'fabric-linen' && (
            <path
              d="M 40 80 L 20 280 L 180 280 L 160 80 L 140 70 L 100 90 L 60 70 Z"
              fill="url(#linen-pattern)"
            />
          )}
          {textureClass === 'fabric-wool' && (
            <path
              d="M 40 80 L 20 280 L 180 280 L 160 80 L 140 70 L 100 90 L 60 70 Z"
              fill="url(#wool-pattern)"
            />
          )}
          {textureClass === 'fabric-cotton' && (
            <path
              d="M 40 80 L 20 280 L 180 280 L 160 80 L 140 70 L 100 90 L 60 70 Z"
              fill="url(#cotton-pattern)"
            />
          )}
          {textureClass === 'fabric-silk' && (
            <path
              d="M 40 80 L 20 280 L 180 280 L 160 80 L 140 70 L 100 90 L 60 70 Z"
              fill="url(#silk-pattern)"
            />
          )}

          {/* === Collar === */}
          <path
            d="M 85 90 Q 100 120 115 90"
            fill="none"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="1.5"
          />

          {/* === Left Sleeve === */}
          <path
            className={`thobe-sleeve ${textureClass}`}
            d="M 40 80 L 60 70 L 65 110 L 10 130 L 5 110 Z"
            fill="var(--thobe-color, #FFFFFF)"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          {textureClass === 'fabric-linen' && (
            <path d="M 40 80 L 60 70 L 65 110 L 10 130 L 5 110 Z" fill="url(#linen-pattern)" />
          )}
          {textureClass === 'fabric-wool' && (
            <path d="M 40 80 L 60 70 L 65 110 L 10 130 L 5 110 Z" fill="url(#wool-pattern)" />
          )}
          {textureClass === 'fabric-cotton' && (
            <path d="M 40 80 L 60 70 L 65 110 L 10 130 L 5 110 Z" fill="url(#cotton-pattern)" />
          )}
          {textureClass === 'fabric-silk' && (
            <path d="M 40 80 L 60 70 L 65 110 L 10 130 L 5 110 Z" fill="url(#silk-pattern)" />
          )}

          {/* === Right Sleeve === */}
          <path
            className={`thobe-sleeve ${textureClass}`}
            d="M 140 70 L 160 80 L 195 110 L 190 130 L 135 110 Z"
            fill="var(--thobe-color, #FFFFFF)"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          {textureClass === 'fabric-linen' && (
            <path d="M 140 70 L 160 80 L 195 110 L 190 130 L 135 110 Z" fill="url(#linen-pattern)" />
          )}
          {textureClass === 'fabric-wool' && (
            <path d="M 140 70 L 160 80 L 195 110 L 190 130 L 135 110 Z" fill="url(#wool-pattern)" />
          )}
          {textureClass === 'fabric-cotton' && (
            <path d="M 140 70 L 160 80 L 195 110 L 190 130 L 135 110 Z" fill="url(#cotton-pattern)" />
          )}
          {textureClass === 'fabric-silk' && (
            <path d="M 140 70 L 160 80 L 195 110 L 190 130 L 135 110 Z" fill="url(#silk-pattern)" />
          )}

          {/* === Head (simplified) === */}
          <circle cx="100" cy="48" r="28" fill="#F5DEB3" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

          {/* Ghutra (headscarf) */}
          <path
            d="M 72 35 Q 100 10 128 35 L 130 48 Q 100 60 70 48 Z"
            fill="#FFFFFF"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="0.8"
          />
          {/* Iqal (black rope on ghutra) */}
          <ellipse cx="100" cy="35" rx="18" ry="5" fill="none" stroke="#222" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Color / Fabric label */}
      <div className="text-center text-sm space-y-1">
        {selectedColor && (
          <p className="flex items-center justify-center gap-2" style={{ color: 'var(--color-muted)' }}>
            <span
              className="inline-block w-3 h-3 rounded-full border border-white/20"
              style={{ backgroundColor: selectedColor.hex_code }}
            />
            <span style={{ color: 'white' }}>{selectedColor.name}</span>
          </p>
        )}
        {selectedFabric && (
          <p style={{ color: 'var(--color-muted)' }}>{selectedFabric.name}</p>
        )}
        {!selectedColor && !selectedFabric && (
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)', fontStyle: 'italic' }}>اختر لوناً لرؤية ثوبك</p>
        )}
      </div>
    </div>
  );
}
