import * as constants from "./userConstants";

const initialState = {
  loading: false,
  userInfo: {},
  error: "",
};

export const userInfoReducer = (state = initialState, actions) => {
  switch (actions.type) {
    //USER DETAIL
    case constants.USER_INFO_REQUEST: {
      state.loading = true;
      break;
    }
    case constants.USER_INFO_SUCCESS: {
      state.loading = false;
      state.userInfo = actions.payload.data;
      break;
    }
    case constants.USER_INFO_FAILED: {
      state.loading = false;
      state.error = actions.payload.error;
      break;
    }

    //REGISTER
    case constants.USER_REGISTER_REQUEST: {
      state.loading = true;
      break;
    }
    case constants.USER_REGISTER_SUCCESS: {
      state.loading = false;
      state.userInfo = actions.payload.data;
      break;
    }
    case constants.USER_REGISTER_FAILED: {
      state.loading = false;
      state.error = actions.payload.error;
      break;
    }

    //LOGIN
    case constants.USER_LOGIN_REQUEST: {
      state.loading = true;
      break;
    }
    case constants.USER_LOGIN_SUCCESS: {
      state.loading = false;
      state.userInfo = actions.payload.data;
      break;
    }
    case constants.USER_LOGIN_FAILED: {
      state.loading = false;
      break;
    }

    //Logout
    case constants.USER_LOGUT: {
      state.loading = false;
      state.userInfo = null;
      break;
    }
    default:
      return state;
  }
  return state;
};
