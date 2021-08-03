import * as constant from "./orderConstants";

const initialState = {
  loading: false,
  success: false,
  order: {},
  error: "",
  paySuccess: false,
  ordersList: [],
  ordersLoading: false,
  ordersError: "",
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.ORDER_CREATE_REQUEST: {
      state.loading = true;
      break;
    }
    case constant.ORDER_CREATE_SUCCESS: {
      state.loading = false;
      state.order = action.payload.data;
      state.success = true;
      break;
    }
    case constant.ORDER_CREATE_FAILED: {
      state.loading = false;
      state.success = false;
      state.error = action.payload.error;
      break;
    }

    case constant.GET_ORDERS_REQUEST: {
      state.ordersLoading = true;
      break;
    }
    case constant.GET_ORDERS_SUCCESS: {
      state.ordersLoading = false;
      state.ordersList = action.payload.data;
      break;
    }
    case constant.GET_ORDERS_FAILED: {
      state.ordersLoading = false;
      state.ordersError = action.payload.error;
      break;
    }

    case constant.ORDER_DETAIL_REQUEST: {
      state.loading = true;
      break;
    }
    case constant.ORDER_DETAIL_SUCCESS: {
      state.loading = false;
      state.order = action.payload.data;
      break;
    }
    case constant.ORDER_DETAIL_FAILED: {
      state.loading = false;
      state.error = action.payload.error;
      break;
    }
    case constant.ORDER_PAY_REQUEST: {
      state.loading = true;
      break;
    }
    case constant.ORDER_PAY_SUCCESS: {
      state.loading = false;
      state.paySuccess = true;
      break;
    }
    case constant.ORDER_PAY_FAILED: {
      state.loading = false;
      state.paySuccess = false;
      break;
    }
    case constant.ORDER_RESET: {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.order = {};
      break;
    }
    case constant.ORDER_PAY_RESET: {
      state.loading = false;
      state.success = false;
      break;
    }
    default:
      return state;
  }
  return state;
};
