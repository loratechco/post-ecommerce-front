"use client";
import { useEffect, useState } from "react";
import CountryCitySelector from "./CountryCitySelector";

import { Country } from "@/app/types/landing-types";

interface Props {
  dispatch: any;
  citySearchData: any;
  dataOriginDestinationCountries: any;
  form: any;
}

function CounterySitySelectorListItems({
  dispatch,
  citySearchData,
  dataOriginDestinationCountries,
  form,
}: Props) {
    const [isItaliaOrigin, setIsItaliaOrigin] = useState(false);
    const [isItaliaDestention, setIsItaliaDestention] = useState(false);
    const [areBothItalia, setAreBothItalia] = useState(false); 
    
    const checkIsItalia = ({
      countryName,
      setState,
    }: {
      countryName: string;
      setState: (value: boolean) => void;
    }) => {
      if(countryName?.toLowerCase() === "italia") {
        setState(true);
      }else{
        setState(false);
      }
    };
    
    useEffect(() => {
      if (isItaliaOrigin && isItaliaDestention) {
        setAreBothItalia(false);
      } else {
        setAreBothItalia(true);
      }
    }, [isItaliaOrigin, isItaliaDestention]);
    
    return (
      <div className="flex items-center justify-center max-lg:flex-col gap-3">
        {/* Origin */}
        <CountryCitySelector
          disabled={areBothItalia}
          selectedCountry={(countryName: string) => {
            checkIsItalia({ countryName, setState: setIsItaliaOrigin });
          }}
          getSearchCityValue={(value) =>
            dispatch({ type: "SET_DEBOUNCE_ORIGIN_CITY", payload: value })
          }
          cityData={citySearchData?.originCityData}
          countries={
            dataOriginDestinationCountries?.origin_countries as Country[]
          }
          hookForm={form}
          countryName="countryOrigin"
          cityName="cityOrigin"
        />
    
        {/* destination */}
        <CountryCitySelector
          disabled={areBothItalia}
          selectedCountry={(countryName: string) => {
            checkIsItalia({ countryName, setState: setIsItaliaDestention });
          }}
          getSearchCityValue={(value) =>
            dispatch({
              type: "SET_DEBOUNCE_DESTINATION_CITY",
              payload: value,
            })
          }
          cityData={citySearchData?.destinationCityData}
          countries={
            dataOriginDestinationCountries?.destination_countries as Country[]
          }
          hookForm={form}
          countryName="countryDestination"
          cityName="cityDestination"
        />
      </div>
    );
}

export default CounterySitySelectorListItems;
