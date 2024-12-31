import { useDebounce } from "@/hooks/use-debounce";
import { API_Backend } from "@/hooks/use-fetch";
import { useCallback, useEffect } from "react";

// Define the structure of the city data object returned from the API.
type GetCitys = {
  city_name: string;
  id: number;
};

// Define the shape of the props passed into the hook
interface Props {
  /**
   * Object containing the search data for both the origin and destination cities.
   */
  citySearchData: {
    originCity: string; // The city name to be used for searching the origin city
    destinationCity: string; // The city name to be used for searching the destination city
  };

  /**
   * Function to update the state with the fetched origin city data.
   * @param value - Array of city data for the origin city.
   */
  setOriginCityData: (value: GetCitys[]) => void;

  /**
   * Function to update the state with the fetched destination city data.
   * @param value - Array of city data for the destination city.
   */
  setDestinationCityData: (value: GetCitys[]) => void;
}

/**
 * Custom hook to manage the logic for searching and fetching cities (origin and destination).
 * 
 * This hook debounces the city search input, fetches city data from the API when the search term
 * changes (after the debounce period), and updates the state with the results for both origin 
 * and destination cities.
 * 
 * @param citySearchData - The current values of origin and destination cities to be searched.
 * @param setOriginCityData - The setter function to update the state with the origin city data.
 * @param setDestinationCityData - The setter function to update the state with the destination city data.
 */
function useSearchCitysLogic({
  citySearchData,
  setOriginCityData,
  setDestinationCityData
}: Props) {

  // Apply debouncing to the origin and destination city values to avoid too many requests.
  const getSearchOriginCityValueDebounce = useDebounce(citySearchData?.originCity, 1500);
  const getSearChDestinationCityValueDebounce = useDebounce(citySearchData?.destinationCity, 1500);

  /**
   * Fetch city data from the API for the given origin city.
   * 
   * @param city - The name of the origin city to search.
   */
  const fetchOriginCityData = useCallback(async (city: string) => {
    try {
      // Make the API request to fetch the origin city data
      const response = await fetch(`${API_Backend}/api/cities?city=${city}`);
      const data: GetCitys[] = await response.json();
      console.info(data); // Log the data for debugging purposes
      // Update the state with the fetched city data for the origin city
      setOriginCityData(data);
    } catch (error) {
      console.error("Error fetching origin city data:", error);
    }
  }, [setOriginCityData]);

  /**
   * Fetch city data from the API for the given destination city.
   * 
   * @param city - The name of the destination city to search.
   */
  const fetchDestinationCityData = useCallback(async (city: string) => {
    try {
      // Make the API request to fetch the destination city data
      const response = await fetch(`${API_Backend}/api/cities?city=${city}`);
      const data: GetCitys[] = await response.json();
      console.info(data); // Log the data for debugging purposes
      // Update the state with the fetched city data for the destination city
      setDestinationCityData(data);
    } catch (error) {
      console.error("Error fetching destination city data:", error);
    }
  }, [setDestinationCityData]);

  // Use the debounced value of the origin city search to fetch the corresponding city data.
  useEffect(() => {
    if (getSearchOriginCityValueDebounce) {
      fetchOriginCityData(getSearchOriginCityValueDebounce);
    }
  }, [getSearchOriginCityValueDebounce, fetchOriginCityData]);

  // Use the debounced value of the destination city search to fetch the corresponding city data.
  useEffect(() => {
    if (getSearChDestinationCityValueDebounce) {
      fetchDestinationCityData(getSearChDestinationCityValueDebounce);
    }
  }, [getSearChDestinationCityValueDebounce, fetchDestinationCityData]);
}

export default useSearchCitysLogic;
