import { ACTIONS } from '../constants/actions/types.actions';
import { commerce } from '../lib/commerce';
import { createAction } from '../utils/reducer.utils';
import { setLoadingState } from './cart.action';

export const handleEmptyCart = () => {
  return async (dispatch) => {
    await setLoadingState(dispatch);
    try {
      const cart = await commerce.cart?.empty();
      await dispatch(createAction(ACTIONS.EMPTY_CART, {cart: cart}));
      return Promise.resolve(cart);
    } catch (error) {
      Promise.reject(error);
    }
  };
};