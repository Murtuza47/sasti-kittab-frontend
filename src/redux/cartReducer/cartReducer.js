import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEM,
} from "./cartConstants";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CART_ADD_ITEM: {
      const cartItem = actions.payload;
      const existItem = state.cartItems?.find((x) => x.id === cartItem?.id);

      if (existItem) {
        state.cartItems = state.cartItems?.map((x) =>
          x.id === existItem.id ? cartItem : x
        );
        break;
      }
      state.cartItems = [...state.cartItems, cartItem];
      break;
    }

    case CART_REMOVE_ITEM: {
      const id = actions.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      break;
    }
    case CART_CLEAR_ITEM: {
      state.cartItems = [];
      break;
    }

    default:
      return state;
  }
  return state;
};
