import { useContext, createContext, ReactNode } from "react";

interface Props {
  valueContext: any;
  childern: ReactNode;
}

const LandingContextData = createContext<any>(null);
function landingContext({ valueContext, childern }: Props) {
  return (
    <LandingContextData.Provider value={valueContext}>
      {childern}
    </LandingContextData.Provider>
  );
}

const useLandingContext = () => {
  const context = useContext(LandingContextData);

  if (!context) {
    console.error(
      "useLandingContext must be used within a LandingContextProvider"
    );
    return;
  }

  return context;
};

export { landingContext, useLandingContext };
