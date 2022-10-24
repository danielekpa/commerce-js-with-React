import { ACTIONS } from '../../constants/actions/types.actions';
import { commerce } from '../../lib/commerce';
import { createAction } from '../../utils/reducer.utils';
import { setCartLoading } from './cart.action';

export const handleEmptyCart = () => async (dispatch) => {
  await setCartLoading(dispatch);
  try {
    const cart = await commerce.cart?.empty();
    await dispatch(createAction(ACTIONS.EMPTY_CART, { cart }));
    return Promise.resolve(cart);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};
