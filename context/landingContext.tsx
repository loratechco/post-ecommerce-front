"use client";
import { LandingDataStructure } from "@/app/types/landing-types";
import { useContext, createContext, ReactNode, useState } from "react";

interface Props {
  valueContext?: any;
  children: ReactNode;
}

const LandingContextProvider = createContext<any>(null);
function LandingContext({ valueContext, children }: Props) {
  const [data, setData] = useState<LandingDataStructure | null>(null);
  return (
    <LandingContextProvider.Provider
      value={{ postServiceData: { data, setData }, ...valueContext }}
    >
      {children}
    </LandingContextProvider.Provider>
  );
}

const defaultContextValue: {
  postServiceData: {
    data: LandingDataStructure | null;
    setData: (value: any) => any;
  };
} = {
  postServiceData: {
    data: null,
    setData: () => {},
  }
};

const useLandingContext = (): {
  postServiceData: { data: LandingDataStructure | null; setData: (value: any) => any };
} => {
  const context = useContext(LandingContextProvider);

  if (!context) {
    console.error(
      "useLandingContext must be used within a LandingContextProvider"
    );
    return defaultContextValue;
  }

  return context;
};

export { LandingContext, useLandingContext };
