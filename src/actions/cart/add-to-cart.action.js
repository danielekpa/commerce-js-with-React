import { commerce } from '../../lib/commerce';
import { dispatchAction, setCartLoading } from './cart.action';

export const handleAddToCart = (productId, quantity) => async (dispatch) => {
  await setCartLoading(dispatch);
  try {
    const cart = await commerce.cart.add(productId, quantity);
    console.log(cart);
    await dispatchAction(dispatch, cart);
    return Promise.resolve(cart);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};
