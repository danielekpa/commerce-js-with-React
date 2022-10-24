import { commerce } from '../../lib/commerce';
import { dispatchAction, setCartLoading } from './cart.action';

export const fetchCart = () => async (dispatch) => {
  await setCartLoading(dispatch);
  try {
    const cart = await commerce.cart.retrieve();
    await dispatchAction(dispatch, cart);
    return Promise.resolve(cart);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
