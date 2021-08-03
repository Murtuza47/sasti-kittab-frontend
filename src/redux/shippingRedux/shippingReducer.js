import * as constants from "./shippingConstants";
const initialState = {
  shippingInfo: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
};

export const shippingReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case constants.SHIPPING_INFO: {
      state.shippingInfo.address = actions.payload.address;
      state.shippingInfo.city = actions.payload.city;
      state.shippingInfo.postalCode = actions.payload.postalCode;
      state.shippingInfo.country = actions.payload.country;
      break;
    }
    default:
      return state;
  }
  return state;
};
