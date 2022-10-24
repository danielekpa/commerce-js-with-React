import { ACTIONS } from '../constants/actions/types.actions';

const defaultErrorState = {
  hasError: false,
  erroMessage: '',
};

const INITIAL_STATE = {
  products: [],
  loading: false,
  ...defaultErrorState,
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ACTIONS.PRODUCTS_LOADING:
      return {
        ...state,
        ...defaultErrorState,
        loading: true,
      };
    default:
      return state;
  }
};
