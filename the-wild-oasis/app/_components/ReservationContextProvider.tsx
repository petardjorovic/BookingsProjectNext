"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ReservationContextProps = {
  range: { from: Date | undefined; to?: Date | undefined };
  setRange: Dispatch<
    SetStateAction<{
      from: Date | undefined;
      to?: Date | undefined;
    }>
  >;
  resetRange: () => void;
};

export const ReservationContext = createContext<
  ReservationContextProps | undefined
>(undefined);

const initialState: { from: Date | undefined; to?: Date | undefined } = {
  from: undefined,
  to: undefined,
};

export default function ReservationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [range, setRange] = useState(initialState);

  function resetRange() {
    setRange(initialState);
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
