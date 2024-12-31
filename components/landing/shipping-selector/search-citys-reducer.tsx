export const initialCitySearchState = {
  originCity: "",
  destinationCity: "",
};

// تعریف ردیوسر
export const citySearchReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORIGIN_CITY":
      return { ...state, originCity: action.payload };
    case "SET_DESTINATION_CITY":
      return { ...state, destinationCity: action.payload };
    default:
      return state;
  }
};
