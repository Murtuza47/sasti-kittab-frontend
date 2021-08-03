import axios from "axios";
import * as constants from "./bookListConstants";

export const getBookList = (searchText) => async (dispatch) => {
  try {
    dispatch({ type: constants.BOOKLIST_REQUESTED });
    const { data } = await axios.get(`/api/products${searchText}`);
    dispatch({
      type: constants.BOOKLIST_SUCEEDED,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    dispatch({
      type: constants.BOOKLIST_FAILED,
      payload: {
        error: error,
      },
    });
  }
};

export const getLatestBook = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: constants.GET_LATEST_BOOK_REQUEST,
    });

    const { data } = await axios.get("/api/product/latest");

    dispatch({
      type: constants.GET_LATEST_BOOK_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    dispatch({
      type: constants.GET_LATEST_BOOK_FAILED,
      payload: {
        error:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      },
    });
  }
};
