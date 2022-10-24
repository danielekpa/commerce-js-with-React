import { ACTIONS } from '../../constants/actions/types.actions';
import { commerce } from '../../lib/commerce';
import { createAction } from '../../utils/reducer.utils';
import { dispatchCheckoutError } from './checkout_error.action';
import { setCheckoutLoading } from './checkout_loading.action';

export const generateToken = (cartId, type) => async (dispatch) => {
  await setCheckoutLoading(dispatch);
  try {
    const token = await commerce.checkout.generateToken(cartId, { type });
    dispatch(createAction(ACTIONS.GENERATE_CHECKOUT_TKN, { checkOutToken: token, error: {} }));
    Promise.resolve(token);
  } catch (error) {
    console.log(error.message);
    dispatchCheckoutError(dispatch, error.message);
    Promise.reject(error);
  }
};
