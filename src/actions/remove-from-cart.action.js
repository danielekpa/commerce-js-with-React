import { commerce } from '../lib/commerce';
import { dispatchAction, setLoadingState } from './cart.action';

export const handleRemoveFromCart = (productId) => {
  return async (dispatch) => {
    await setLoadingState(dispatch);
    try {
      const cart = await commerce.cart.remove(productId);
      await dispatchAction(dispatch, cart);
      return Promise.resolve(cart);
    } catch (error) {
      Promise.reject(error);
    }
  };
};