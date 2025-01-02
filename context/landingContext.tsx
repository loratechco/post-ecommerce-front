"use client";
import { useContext, createContext, ReactNode, useState } from "react";

interface Props {
  valueContext?: any;
  children: ReactNode;
}



const LandingContextProvider = createContext<any>(null);
function LandingContext({ valueContext, children }: Props) {
  const [data, setData] = useState<ResponseData | any>(null);
  return (
    <LandingContextProvider.Provider
      value={{ postServiceData: { data, setData }, ...valueContext }}
    >
      {children}
    </LandingContextProvider.Provider>
  );
}

const useLandingContext = (): {
  postServiceData: { data:  ResponseData; setData: (value: any) => any };
} => {
  const context = useContext(LandingContextProvider);

  if (!context) {
    console.error(
      "useLandingContext must be used within a LandingContextProvider"
    );
    return;
  }

  return context;
};

export { LandingContext, useLandingContext };
