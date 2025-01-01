// تعریف نوع GetCitys
type GetCitys = {
  city_name: string;
  id: number;
};

// تعریف حالت اولیه
type CitySearchState = {
  originDebounceCityData: string;
  destinationDebounceCityData: string;
  originCityData: GetCitys[];
  destinationCityData: GetCitys[];
};

export const initialCitySearchState: CitySearchState = {
  originDebounceCityData: "",
  destinationDebounceCityData: "",
  originCityData: [],
  destinationCityData: [],
};

// تعریف نوع اکشن‌ها
type CitySearchAction =
  | { type: "SET_DEBOUNCE_ORIGIN_CITY"; payload: string }
  | { type: "SET_DEBOUNCE_DESTINATION_CITY"; payload: string }
  | { type: "SET_FETCH_RESULT_DATA_ORIGIN_CITY"; payload: GetCitys[] }
  | { type: "SET_FETCH_RESULT_DATA_DESTINATION_CITY"; payload: GetCitys[] };

// تعریف ردیوسر
export const citySearchReducer = (
  state: CitySearchState,
  action: CitySearchAction
): CitySearchState => {
  switch (action.type) {
    case "SET_DEBOUNCE_ORIGIN_CITY":
      return { ...state, originDebounceCityData: action.payload };
    case "SET_DEBOUNCE_DESTINATION_CITY":
      return { ...state, destinationDebounceCityData: action.payload };
    case "SET_FETCH_RESULT_DATA_ORIGIN_CITY":
      return { ...state, originCityData: action.payload };
    case "SET_FETCH_RESULT_DATA_DESTINATION_CITY":
      return { ...state, destinationCityData: action.payload };
    default:
      return state;
  }
};
