import { useContext } from "react";
import { ReservationContext } from "../_components/ReservationContextProvider";

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context used outside of Provider");

  return context;
}
