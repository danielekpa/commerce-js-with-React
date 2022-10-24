import { ACTIONS } from '../constants/actions/types.actions';

const defaultErrorState = {
  hasError: false,
  erroMessage: '',
};

const INITIAL_STATE = {
  loading: false,
  checkOutToken: {},
  countries: [],
  order: {},
  ...defaultErrorState,
};

export const checkOutReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.GENERATE_CHECKOUT_TKN:
      return {
        ...state,
        // ...defaultErrorState,
        ...payload,
      };
    case ACTIONS.CHECKOUT_LOADING:
      return {
        ...state,
        ...defaultErrorState,
        loading: true,
      };
    case ACTIONS.GET_SHIPPING_COUNTRIES:
      return {
        ...state,
        // ...defaultErrorState,
        ...payload,
      };
    case ACTIONS.SET_CHECKOUT:
      return {
        ...state,
        // ...defaultErrorState,
        ...payload,
        loading: false,
      };
    case ACTIONS.REFRESH_ORDER:
      return {
        ...state,
        // ...defaultErrorState,
        ...payload,
        loading: false,
      };
    case ACTIONS.CHECKOUT_ERROR:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ACTIONS.RESET_CHECKOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
