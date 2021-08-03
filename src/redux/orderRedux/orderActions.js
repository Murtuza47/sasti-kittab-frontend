import axios from "axios";
import * as constant from "./orderConstants";
import * as cartConstant from "../cartReducer/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_CREATE_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/order/add/", order, config);
    dispatch({
      type: constant.ORDER_CREATE_SUCCESS,
      payload: {
        data: data,
      },
    });
    localStorage.removeItem("cartItems");
    dispatch({
      type: cartConstant.CART_CLEAR_ITEM,
    });
  } catch (error) {
    dispatch({
      type: constant.ORDER_CREATE_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_DETAIL_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/detail/${id}/`, config);
    dispatch({
      type: constant.ORDER_DETAIL_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    dispatch({
      type: constant.ORDER_DETAIL_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};

export const getOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.GET_ORDERS_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/list/`, config);
    dispatch({
      type: constant.GET_ORDERS_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    dispatch({
      type: constant.GET_ORDERS_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constant.ORDER_PAY_REQUEST,
    });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/order/payment/${id}/`,
      paymentResult,
      config
    );
    dispatch({
      type: constant.ORDER_PAY_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    dispatch({
      type: constant.ORDER_PAY_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};
