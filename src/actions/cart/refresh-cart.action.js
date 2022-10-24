import { commerce } from '../../lib/commerce';
import { dispatchAction, setCartLoading } from './cart.action';

export const refreshCart = () => async (dispatch) => {
  await setCartLoading(dispatch);
  try {
    const newCart = await commerce.cart.refresh();
    await dispatchAction(dispatch, newCart);
    // await dispatch(createAction(ACTIONS.REFRESH_CART, {cart: newCart}));
    return Promise.resolve(newCart);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};
