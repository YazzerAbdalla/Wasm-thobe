/**
 * @file OrderSummary.tsx
 * @description Reusable order summary card displaying selected color, fabric,
 *              accessories, and itemized price breakdown with a SVG preview thumbnail.
 */

import ThobePreview from '../builder/ThobePreview';
import { useBuilderStore } from '../builder/builderStore';

/**
 * OrderSummary component.
 * Renders the full summary of a user's thobe customization including the
 * live SVG thumbnail, color swatch, fabric name, accessories list, and price breakdown.
 */
export default function OrderSummary() {
  const {
    selectedColor,
    selectedFabric,
    selectedAccessories,
    basePrice,
    getTotalPrice,
  } = useBuilderStore();

  const totalPrice = getTotalPrice();
  const fabricExtra = selectedFabric
    ? Math.round(basePrice * (selectedFabric.price_multiplier - 1))
    : 0;

  return (
    <div className="space-y-6">
      {/* Thobe thumbnail */}
      <div className="flex justify-center">
        <ThobePreview />
      </div>

      {/* Selections */}
      <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-gray-500">Color</span>
          <div className="flex items-center gap-2">
            {selectedColor && (
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: selectedColor.hex_code }}
              />
            )}
            <span className="text-sm font-medium">
              {selectedColor?.name ?? '—'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-sm text-gray-500">Fabric</span>
          <span className="text-sm font-medium">{selectedFabric?.name ?? '—'}</span>
        </div>

        <div className="px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Accessories</span>
            <span className="text-sm text-gray-400">
              {selectedAccessories.length === 0
                ? 'None'
                : `${selectedAccessories.length} item(s)`}
            </span>
          </div>
          {selectedAccessories.length > 0 && (
            <ul className="mt-2 space-y-1 pl-2">
              {selectedAccessories.map((acc) => (
                <li
                  key={acc.id}
                  className="flex justify-between text-xs text-gray-500"
                >
                  <span>{acc.name}</span>
                  <span>+{acc.extra_price} SAR</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-gray-50 rounded-xl p-5 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Breakdown</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Base price</span>
          <span>{basePrice} SAR</span>
        </div>
        {selectedFabric && fabricExtra > 0 && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Fabric ({selectedFabric.name})</span>
            <span>+{fabricExtra} SAR</span>
          </div>
        )}
        {selectedAccessories.map((acc) => (
          <div key={acc.id} className="flex justify-between text-sm text-gray-600">
            <span>{acc.name}</span>
            <span>+{acc.extra_price} SAR</span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>{totalPrice} SAR</span>
        </div>
      </div>
    </div>
  );
}
