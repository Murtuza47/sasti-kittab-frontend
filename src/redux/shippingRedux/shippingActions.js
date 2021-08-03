import * as constants from "./shippingConstants";

export const addShippingInfo =
  ({ address, city, country, postalCode }) =>
  async (dispatch) => {
    try {
      const data = {
        address: address,
        city: city,
        country: country,
        postalCode: postalCode,
      };
      dispatch({
        type: constants.SHIPPING_INFO,
        payload: data,
      });
      localStorage.setItem("shippingInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
