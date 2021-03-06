import { Item } from '../shop/shop.reducer';
import {
  CartActions,
  TOGGLE_CART_VISIBLE,
  ADD_ITEM,
  REMOVE_ITEM,
  DROP_ITEM,
} from './cart.actions';

import { addItemToCart, removeItemFromCart } from './cart.utils';

export type CartItem = Item & { quantity: number };

export type CartState = {
  visible: boolean;
  items: CartItem[];
};

const INITIAL_STATE: CartState = {
  visible: false,
  items: [],
};

const cartReducer = (state: CartState = INITIAL_STATE, action: CartActions) => {
  switch (action.type) {
    case TOGGLE_CART_VISIBLE:
      return {
        ...state,
        visible: !state.visible,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: addItemToCart(state.items, action.payload),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload),
      };
    case DROP_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default cartReducer;
