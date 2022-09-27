import { commerce } from '../lib/commerce';
import { dispatchAction, setLoadingState } from './cart.action';

export const handleUpdateCartQty = (productId, quantity) => {
  return async (dispatch) => {
    await setLoadingState(dispatch);

    try {
      const cart = await commerce.cart.update(productId, { quantity });
      await dispatchAction(dispatch, cart);
      return Promise.resolve(cart);
    } catch (error) {
      Promise.reject(error);
    }
  };
};