import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface ICollar {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly thumb: string; // /images/details/collar-*.jpg or gradient fallback
}

export interface IPlacket {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly thumb: string;
}

export interface IButtonOption {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly thumb: string;
}

export interface IPocket {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly thumb: string;
}

export interface ICuff {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly thumb: string;
}

interface IBuilderState {
  currentStep: number;
  totalSteps: number;

  colors: IColor[];
  fabrics: IFabric[];
  accessories: IAccessory[];
  collars: ICollar[];
  plackets: IPlacket[];
  buttons: IButtonOption[];
  pockets: IPocket[];
  cuffs: ICuff[];
  isLoadingOptions: boolean;
  optionsError: string | null;

  selectedColor: IColor | null;
  selectedFabric: IFabric | null;
  selectedAccessories: IAccessory[];
  selectedCollar: ICollar | null;
  selectedPlacket: IPlacket | null;
  selectedButton: IButtonOption | null;
  selectedPocket: IPocket | null;
  selectedCuff: ICuff | null;

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
  setCollars: (collars: ICollar[]) => void;
  setPlackets: (plackets: IPlacket[]) => void;
  setButtons: (buttons: IButtonOption[]) => void;
  setPockets: (pockets: IPocket[]) => void;
  setCuffs: (cuffs: ICuff[]) => void;
  setLoadingOptions: (loading: boolean) => void;
  setOptionsError: (error: string | null) => void;

  selectColor: (color: IColor) => void;
  selectFabric: (fabric: IFabric) => void;
  toggleAccessory: (accessory: IAccessory) => void;
  selectCollar: (collar: ICollar) => void;
  selectPlacket: (placket: IPlacket) => void;
  selectButton: (button: IButtonOption) => void;
  selectPocket: (pocket: IPocket) => void;
  selectCuff: (cuff: ICuff) => void;

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

export const useBuilderStore = create<IBuilderState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      totalSteps: 5,

      colors: [],
      fabrics: [],
      accessories: [],
      collars: [],
      plackets: [],
      buttons: [],
      pockets: [],
      cuffs: [],
      isLoadingOptions: false,
      optionsError: null,

      selectedColor: null,
      selectedFabric: null,
      selectedAccessories: [],
      selectedCollar: null,
      selectedPlacket: null,
      selectedButton: null,
      selectedPocket: null,
      selectedCuff: null,

      guestName: "",
      guestCC: "+966",
      guestPhone: "",

      customizationId: null,
      recommendationLabel: null,
      basePrice: BASE_PRICE,

      setColors: (colors) => set({ colors }),
      setFabrics: (fabrics) => set({ fabrics }),
      setAccessories: (accessories) => set({ accessories }),
      setCollars: (collars) => set({ collars }),
      setPlackets: (plackets) => set({ plackets }),
      setButtons: (buttons) => set({ buttons }),
      setPockets: (pockets) => set({ pockets }),
      setCuffs: (cuffs) => set({ cuffs }),
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
      selectCollar: (collar) => set({ selectedCollar: collar }),
      selectPlacket: (placket) => set({ selectedPlacket: placket }),
      selectButton: (button) => set({ selectedButton: button }),
      selectPocket: (pocket) => set({ selectedPocket: pocket }),
      selectCuff: (cuff) => set({ selectedCuff: cuff }),

      setGuestName: (v) => set({ guestName: v }),
      setGuestCC: (v) => set({ guestCC: v }),
      setGuestPhone: (v) => set({ guestPhone: v }),

      setRecommendation: (id, label) => set({ customizationId: id, recommendationLabel: label }),

      goToStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, s.totalSteps) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

      getTotalPrice: () => {
        const { basePrice, selectedColor, selectedFabric, selectedAccessories, selectedCollar, selectedPlacket, selectedButton, selectedPocket, selectedCuff } = get();
        const colorPrice = selectedColor?.price ?? 0;
        const fabricPrice = selectedFabric
          ? (typeof selectedFabric.price === "number" ? selectedFabric.price : Math.round(basePrice * (selectedFabric.price_multiplier - 1)))
          : 0;
        const addonSum = selectedAccessories.reduce((sum, a) => sum + (a.extra_price ?? a.price ?? 0), 0);
        const collarPrice = selectedCollar?.price ?? 0;
        const placketPrice = selectedPlacket?.price ?? 0;
        const buttonPrice = selectedButton?.price ?? 0;
        const pocketPrice = selectedPocket?.price ?? 0;
        const cuffPrice = selectedCuff?.price ?? 0;
        return Math.round(basePrice + colorPrice + fabricPrice + addonSum + collarPrice + placketPrice + buttonPrice + pocketPrice + cuffPrice);
      },

      reset: () =>
        set({
          currentStep: 1,
          selectedColor: null,
          selectedFabric: null,
          selectedAccessories: [],
          selectedCollar: null,
          selectedPlacket: null,
          selectedButton: null,
          selectedPocket: null,
          selectedCuff: null,
          customizationId: null,
          recommendationLabel: null,
          guestName: "",
          guestCC: "+966",
          guestPhone: "",
        }),
    }),
    {
      name: "wasm-builder",
      partialize: (state) => ({
        currentStep: state.currentStep,
        selectedColor: state.selectedColor,
        selectedFabric: state.selectedFabric,
        selectedAccessories: state.selectedAccessories,
        selectedCollar: state.selectedCollar,
        selectedPlacket: state.selectedPlacket,
        selectedButton: state.selectedButton,
        selectedPocket: state.selectedPocket,
        selectedCuff: state.selectedCuff,
        guestName: state.guestName,
        guestCC: state.guestCC,
        guestPhone: state.guestPhone,
        customizationId: state.customizationId,
        recommendationLabel: state.recommendationLabel,
      }),
    },
  ),
);
