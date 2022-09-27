import { commerce } from '../lib/commerce';
import { dispatchAction, setLoadingState } from './cart.action';

export const fetchCart = () => {
  return async (dispatch) => {
    await setLoadingState(dispatch);
    try {
      const cart = await commerce.cart.retrieve();

      await dispatchAction(dispatch, cart);
      return Promise.resolve(cart);
    } catch (error) {
      return Promise.reject(error); 
    }
  };
};