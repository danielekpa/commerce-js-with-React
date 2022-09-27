import { commerce } from '../lib/commerce';
import { dispatchAction, setLoadingState } from './cart.action';

export const handleAddToCart = (productId, quantity) => {
  return async (dispatch) => {
    await setLoadingState(dispatch);
    try {
      const cart = await commerce.cart.add(productId, quantity);
      console.log(cart);
      await dispatchAction(dispatch, cart); 
      return Promise.resolve(cart);
    } catch (error) {
      Promise.reject(error);
    }
  };
};