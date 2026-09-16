import { createContext, useContext } from "react";

export interface IBookingContext {
  readonly openBooking: () => void;
}

export const BookingContext = createContext<IBookingContext>({ openBooking: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}
