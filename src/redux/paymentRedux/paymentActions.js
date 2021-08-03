import axios from "axios";
import * as constants from "./paymentConstants";

export const addPaymentInfo = (data) => async (dispatch) => {
  try {
    dispatch({
      type: constants.ADD_PAYMENT_INFO,
      payload: {
        data,
      },
    });
  } catch (error) {}
};

export const paymentIntent = (paymentInfo) => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({
      type: constants.PAYMENT_INTENT_REQUEST,
    });

    const { data } = await axios.post(
      `/api/order/payment/${paymentInfo.order_id}/`,
      paymentInfo,
      config
    );
    dispatch({
      type: constants.PAYMENT_INTENT_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    dispatch({
      type: constants.PAYMENT_INTENT_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};
