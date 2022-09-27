import { ACTIONS } from '../constants/actions/types.actions';

const INITIAL_STATE = {
  products: [],
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};