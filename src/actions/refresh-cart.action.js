import { ACTIONS } from '../constants/actions/types.actions';
import { commerce } from '../lib/commerce';
import { createAction } from '../utils/reducer.utils';
import { dispatchAction, setLoadingState } from './cart.action';

export const refreshCart = () => {
  return async (dispatch) => {
    await setLoadingState(dispatch);
    try {
      const newCart = await commerce.cart.refresh();
      await dispatchAction(dispatch, newCart);
      // await dispatch(createAction(ACTIONS.REFRESH_CART, {cart: newCart}));
      return Promise.resolve(newCart);
    } catch (error) {
      Promise.reject(error);
    }
  };
};