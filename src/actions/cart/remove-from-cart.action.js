import { commerce } from '../../lib/commerce';
import { dispatchAction, setCartLoading } from './cart.action';

export const handleRemoveFromCart = (productId) => async (dispatch) => {
  await setCartLoading(dispatch);
  try {
    const cart = await commerce.cart.remove(productId);
    await dispatchAction(dispatch, cart);
    return Promise.resolve(cart);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};
