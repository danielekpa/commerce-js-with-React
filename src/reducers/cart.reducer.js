import { ACTIONS } from '../constants/actions/types.actions';

const defaultErrorState = {
  hasError: false,
  erroMessage: '',
};

const INITIAL_STATE = {
  loading: false,
  isCartIconOpen: false,
  cartId: '',
  cartItems: [],
  cartCount: 0,
  cartTotal: {},
  ...defaultErrorState,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_IS_CART_OPEN:
      return {
        ...state,
        // ...defaultErrorState,
        isCartIconOpen: !state.isCartIconOpen,
      };
    case ACTIONS.CART_LOADING:
      return {
        ...state,
        ...defaultErrorState,
        loading: true,
      };
    case ACTIONS.SET_CART:
      return {
        ...state,
        // ...defaultErrorState,
        ...payload,
        loading: false,
      };
    case ACTIONS.CART_ERROR:
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
