import axios from "axios";
import * as constants from "./productConstants";

export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: constants.GET_PRODUCT_REQUEST,
    });

    const { data } = await axios.get(`/api/product/${productId}`);

    dispatch({
      type: constants.GET_PRODUCT_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    dispatch({
      type: constants.GET_PRODUCT_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};

export const createProductReview =
  (reviewDetail) => async (dispatch, getState) => {
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
        type: constants.CREATE_PRODUCT_REVIEW_REQUEST,
      });

      const { data } = await axios.post(
        `/api/product/${reviewDetail.productId}/review/`,
        reviewDetail,
        config
      );
      dispatch({
        type: constants.CREATE_PRODUCT_REVIEW_SUCCESS,
        payload: {
          data: data,
        },
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: constants.CREATE_PRODUCT_REVIEW_FAILED,
        payload: {
          error:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        },
      });
    }
  };
