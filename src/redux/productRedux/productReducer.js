import * as constants from "./productConstants";

const initialState = {
  product: {},
  reviewLoading: false,
  error: "",
  loading: false,
  reviewSuccess: false,
  latestProduct: [],
  latestProductError: "",
};

export const productReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case constants.GET_PRODUCT_REQUEST: {
      state.loading = true;
      break;
    }
    case constants.GET_PRODUCT_SUCCESS: {
      state.loading = false;
      state.product = actions.payload.data;
      break;
    }
    case constants.GET_PRODUCT_FAILED: {
      state.loading = false;
      state.error = actions.payload.error;
      break;
    }

    case constants.CREATE_PRODUCT_REVIEW_RESET: {
      state.reviewSuccess = false;
      state.reviewLoading = false;
      state.error = "";
      break;
    }

    case constants.CREATE_PRODUCT_REVIEW_REQUEST: {
      state.reviewLoading = true;
      break;
    }
    case constants.CREATE_PRODUCT_REVIEW_SUCCESS: {
      state.reviewLoading = false;
      state.reviewSuccess = true;
      state.product.reviews = [...state.product.reviews, actions.payload.data];
      break;
    }
    case constants.CREATE_PRODUCT_REVIEW_FAILED: {
      state.reviewLoading = false;
      state.reviewSuccess = false;
      state.error = actions.payload.error;
      break;
    }

    default:
      return state;
  }
  return state;
};
