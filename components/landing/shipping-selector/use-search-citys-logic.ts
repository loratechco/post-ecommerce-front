/* eslint-disable react-hooks/exhaustive-deps */

import { API_Backend } from "@/hooks/use-fetch";
import axios from "axios";
import { useEffect } from "react";

interface Props {
  citySearchData: {
    originDebounceCityData: string;
    destinationDebounceCityData: string;
  };
  dispatch: any;
}
type DispatchType = "SET_FETCH_RESULT_DATA_ORIGIN_CITY" | 'SET_FETCH_RESULT_DATA_DESTINATION_CITY';

function useSearchCitysLogic({
  citySearchData,
  dispatch,
}: Props) {
  const getCityData = async ({ city, dispatchType }: { city: string, dispatchType: DispatchType }) => {
    try {
      const { data } = await axios.get(
        `${API_Backend}/api/cities?${city && `city=${city}`}`
      );
      dispatch({ type: dispatchType, payload: data });
    } catch (error) {
      console.error(`Error fetching __${dispatchType}__ city data:`, error);
    }
  };

  useEffect(() => {
    getCityData({
      city: citySearchData?.originDebounceCityData,
      dispatchType: "SET_FETCH_RESULT_DATA_ORIGIN_CITY"
    });
  }, [citySearchData?.originDebounceCityData]);

  useEffect(() => {
    getCityData({
      city: citySearchData?.destinationDebounceCityData,
      dispatchType: "SET_FETCH_RESULT_DATA_DESTINATION_CITY"
    });
  }, [citySearchData?.destinationDebounceCityData]);
}

export default useSearchCitysLogic;
