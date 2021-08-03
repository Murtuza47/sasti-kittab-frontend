import * as constants from "./bookListConstants";

const initialState = {
  loading: false,
  bookList: [],
  error: "",
  page: 0,
  pages: 0,
  latestbook: [],
  latestBookError: "",
  latestBookLoading: false,
};

export const bookListReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case constants.BOOKLIST_REQUESTED:
      state.loading = true;
      break;
    case constants.BOOKLIST_SUCEEDED:
      state.loading = false;
      state.bookList = actions.payload.data.products;
      state.page = actions.payload.data.page;
      state.pages = actions.payload.data.pages;
      break;
    case constants.BOOKLIST_FAILED:
      state.loading = false;
      state.error = actions.payload.error;
      break;
    case constants.GET_LATEST_BOOK_REQUEST: {
      state.latestBookLoading = true;
      break;
    }
    case constants.GET_LATEST_BOOK_SUCCESS: {
      state.latestBookLoading = false;
      state.latestbook = actions.payload.data;
      break;
    }
    case constants.GET_LATEST_BOOK_FAILED: {
      state.latestBookLoading = false;
      state.latestBookError = actions.payload.error;
      break;
    }
    default:
      return state;
  }
  return state;
};
