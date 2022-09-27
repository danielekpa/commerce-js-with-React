import { ACTIONS } from '../constants/actions/types.actions';

const INITIAL_STATE = {
  loading: false,
  isCartIconOpen: false,
  cartId: '',
  cartItems: [],
  cartCount: 0,
  cartTotal: {},
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case ACTIONS.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartIconOpen: !state.isCartIconOpen
      };
    case ACTIONS.CART_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.SET_CART:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ACTIONS.EMPTY_CART:
      return INITIAL_STATE;
    default:
      return state;
  }
};