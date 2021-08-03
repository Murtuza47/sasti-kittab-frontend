import axios from "axios";
import * as constants from "./userConstants";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post("/api/login/", credentials, config);

    dispatch({
      type: constants.USER_LOGIN_SUCCESS,
      payload: {
        data: data,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: constants.USER_LOGUT,
  });
};

export const register = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post("/api/register/", credentials, config);

    dispatch({
      type: constants.USER_REGISTER_SUCCESS,
      payload: {
        data: data,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_REGISTER_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};
