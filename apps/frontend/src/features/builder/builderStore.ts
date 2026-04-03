/**
 * @file builderStore.ts
 * @description Zustand store for managing the Thobe Builder wizard state.
 *              Holds user selections (color, fabric, accessories), available options from the API,
 *              the current step, and the recommendation label.
 */

import { create } from 'zustand';

// --- Interfaces ---

/** Represents a color option from the API */
export interface IColor {
  id: string;
  name: string;
  hex_code: string;
}

/** Represents a fabric option from the API */
export interface IFabric {
  id: string;
  name: string;
  description: string;
  price_multiplier: number;
  texture_class: string;
}

/** Represents an accessory option from the API */
export interface IAccessory {
  id: string;
  name: string;
  type: string;
  extra_price: number;
}

/** The shape of the builder state */
interface IBuilderState {
  // Step navigation
  currentStep: number;
  totalSteps: number;

  // Available options fetched from the API
  colors: IColor[];
  fabrics: IFabric[];
  accessories: IAccessory[];
  isLoadingOptions: boolean;
  optionsError: string | null;

  // User selections
  selectedColor: IColor | null;
  selectedFabric: IFabric | null;
  selectedAccessories: IAccessory[];

  // Recommendation from API
  customizationId: string | null;
  recommendationLabel: string | null;

  // Computed price (local calculation)
  basePrice: number;

  // Actions
  setColors: (colors: IColor[]) => void;
  setFabrics: (fabrics: IFabric[]) => void;
  setAccessories: (accessories: IAccessory[]) => void;
  setLoadingOptions: (loading: boolean) => void;
  setOptionsError: (error: string | null) => void;

  selectColor: (color: IColor) => void;
  selectFabric: (fabric: IFabric) => void;
  toggleAccessory: (accessory: IAccessory) => void;

  setRecommendation: (id: string, label: string) => void;

  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  getTotalPrice: () => number;
  reset: () => void;
}

/** Base price for a thobe in SAR */
const BASE_PRICE = 200;

export const useBuilderStore = create<IBuilderState>((set, get) => ({
  // --- Initial State ---
  currentStep: 1,
  totalSteps: 4,

  colors: [],
  fabrics: [],
  accessories: [],
  isLoadingOptions: false,
  optionsError: null,

  selectedColor: null,
  selectedFabric: null,
  selectedAccessories: [],

  customizationId: null,
  recommendationLabel: null,
  basePrice: BASE_PRICE,

  // --- Option setters ---
  setColors: (colors) => set({ colors }),
  setFabrics: (fabrics) => set({ fabrics }),
  setAccessories: (accessories) => set({ accessories }),
  setLoadingOptions: (loading) => set({ isLoadingOptions: loading }),
  setOptionsError: (error) => set({ optionsError: error }),

  // --- Selection actions ---
  selectColor: (color) => set({ selectedColor: color }),

  selectFabric: (fabric) => set({ selectedFabric: fabric }),

  toggleAccessory: (accessory) => {
    const current = get().selectedAccessories;
    const exists = current.find((a) => a.id === accessory.id);
    if (exists) {
      // Remove if already selected
      set({ selectedAccessories: current.filter((a) => a.id !== accessory.id) });
    } else {
      // Add to selection
      set({ selectedAccessories: [...current, accessory] });
    }
  },

  // --- Recommendation ---
  setRecommendation: (id, label) =>
    set({ customizationId: id, recommendationLabel: label }),

  // --- Navigation ---
  goToStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  // --- Price calculation ---
  getTotalPrice: () => {
    const { basePrice, selectedFabric, selectedAccessories } = get();
    // Apply fabric multiplier on top of base price
    const fabricMultiplied = basePrice * (selectedFabric?.price_multiplier ?? 1);
    // Sum all accessory extra prices
    const accessorySum = selectedAccessories.reduce(
      (sum, acc) => sum + acc.extra_price,
      0
    );
    return Math.round(fabricMultiplied + accessorySum);
  },

  // --- Reset entire store ---
  reset: () =>
    set({
      currentStep: 1,
      selectedColor: null,
      selectedFabric: null,
      selectedAccessories: [],
      customizationId: null,
      recommendationLabel: null,
    }),
}));
