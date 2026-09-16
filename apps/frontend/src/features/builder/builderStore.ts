import { create } from 'zustand';

export interface IColor {
  readonly id: string;
  readonly name: string;
  readonly hex_code: string;
  /** Price delta vs base (ref: 0,15,25). Falls back to 0 if missing. */
  readonly price?: number;
}

export interface IFabric {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  /** Additive price (ref model). Keep multiplier for backend compat. */
  readonly price: number;
  readonly price_multiplier: number;
  readonly texture_class: string;
  readonly thumb?: string;
  readonly rec?: boolean;
}

export interface IAccessory {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly description?: string;
  readonly extra_price: number;
  /** Alias for ref price */
  readonly price?: number;
}

interface IBuilderState {
  currentStep: number;
  totalSteps: number;

  colors: IColor[];
  fabrics: IFabric[];
  accessories: IAccessory[];
  isLoadingOptions: boolean;
  optionsError: string | null;

  selectedColor: IColor | null;
  selectedFabric: IFabric | null;
  selectedAccessories: IAccessory[];

  // Guest checkout (ref)
  guestName: string;
  guestCC: string;
  guestPhone: string;

  customizationId: string | null;
  recommendationLabel: string | null;

  basePrice: number;

  setColors: (colors: IColor[]) => void;
  setFabrics: (fabrics: IFabric[]) => void;
  setAccessories: (accessories: IAccessory[]) => void;
  setLoadingOptions: (loading: boolean) => void;
  setOptionsError: (error: string | null) => void;

  selectColor: (color: IColor) => void;
  selectFabric: (fabric: IFabric) => void;
  toggleAccessory: (accessory: IAccessory) => void;

  setGuestName: (v: string) => void;
  setGuestCC: (v: string) => void;
  setGuestPhone: (v: string) => void;

  setRecommendation: (id: string, label: string) => void;

  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  getTotalPrice: () => number;
  reset: () => void;
}

const BASE_PRICE = 349;

export const useBuilderStore = create<IBuilderState>((set, get) => ({
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

  guestName: "",
  guestCC: "+966",
  guestPhone: "",

  customizationId: null,
  recommendationLabel: null,
  basePrice: BASE_PRICE,

  setColors: (colors) => set({ colors }),
  setFabrics: (fabrics) => set({ fabrics }),
  setAccessories: (accessories) => set({ accessories }),
  setLoadingOptions: (loading) => set({ isLoadingOptions: loading }),
  setOptionsError: (error) => set({ optionsError: error }),

  selectColor: (color) => set({ selectedColor: color }),
  selectFabric: (fabric) => set({ selectedFabric: fabric }),

  toggleAccessory: (accessory) => {
    const current = get().selectedAccessories;
    const exists = current.find((a) => a.id === accessory.id);
    if (exists) {
      set({ selectedAccessories: current.filter((a) => a.id !== accessory.id) });
    } else {
      set({ selectedAccessories: [...current, accessory] });
    }
  },

  setGuestName: (v) => set({ guestName: v }),
  setGuestCC: (v) => set({ guestCC: v }),
  setGuestPhone: (v) => set({ guestPhone: v }),

  setRecommendation: (id, label) => set({ customizationId: id, recommendationLabel: label }),

  goToStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, s.totalSteps) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

  getTotalPrice: () => {
    const { basePrice, selectedColor, selectedFabric, selectedAccessories } = get();
    const colorPrice = selectedColor?.price ?? 0;
    // Prefer additive price; fallback to multiplier for backend shapes
    const fabricPrice = selectedFabric
      ? (typeof selectedFabric.price === "number" ? selectedFabric.price : Math.round(basePrice * (selectedFabric.price_multiplier - 1)))
      : 0;
    const addonSum = selectedAccessories.reduce((sum, a) => sum + (a.extra_price ?? a.price ?? 0), 0);
    return Math.round(basePrice + colorPrice + fabricPrice + addonSum);
  },

  reset: () =>
    set({
      currentStep: 1,
      selectedColor: null,
      selectedFabric: null,
      selectedAccessories: [],
      customizationId: null,
      recommendationLabel: null,
      guestName: "",
      guestCC: "+966",
      guestPhone: "",
    }),
}));
