import { commerce } from '../../lib/commerce';
import { dispatchAction, setCartLoading } from './cart.action';

export const handleUpdateCartQty = (productId, quantity) => async (dispatch) => {
  await setCartLoading(dispatch);

  try {
    const cart = await commerce.cart.update(productId, { quantity });
    await dispatchAction(dispatch, cart);
    return Promise.resolve(cart);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};
