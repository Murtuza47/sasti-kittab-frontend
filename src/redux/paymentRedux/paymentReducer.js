import * as constants from "./paymentConstants";

const initialState = {
  paymentInfo: {
    method: "",
    data: {},
    loading: false,
    error: "",
    success: false,
  },
};

export const paymentReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case constants.ADD_PAYMENT_INFO: {
      state.paymentInfo.method = actions.payload.data;
      break;
    }
    case constants.PAYMENT_INTENT_REQUEST: {
      state.paymentInfo.loading = true;
      break;
    }
    case constants.PAYMENT_INTENT_SUCCESS: {
      state.paymentInfo.loading = false;
      state.paymentInfo.data = actions.payload.data;
      break;
    }
    case constants.PAYMENT_INTENT_FAILED: {
      state.paymentInfo.loading = false;
      state.paymentInfo.error = actions.payload.error;
      break;
    }
    case constants.CLEAR_PAYMENT_INFO: {
      state.paymentInfo.loading = false;
      state.paymentInfo.data = {};
      state.paymentInfo.error = "";
      state.paymentInfo.success = false;
      break;
    }

    default:
      return state;
  }
  return state;
};
