import { ACTIONS } from '../../constants/actions/types.actions';
import { commerce } from '../../lib/commerce';
import { createAction } from '../../utils/reducer.utils';
import { refreshCart } from '../cart/refresh-cart.action';
import { dispatchCheckoutError } from './checkout_error.action';
import { setCheckoutLoading } from './checkout_loading.action';

export const handleCaptureCheckout = (checkOutTokenId, newOrder) => async (dispatch) => {
  await setCheckoutLoading(dispatch);
  try {
    const incomingOrder = await commerce.checkout.capture(checkOutTokenId, newOrder);
    console.log(incomingOrder);

    await dispatch(createAction(ACTIONS.SET_CHECKOUT, { order: incomingOrder, loading: false }));
    Promise.resolve(incomingOrder);
  } catch (error) {
    console.log(error.message);
    dispatchCheckoutError(dispatch, error.message);
    Promise.reject(error);
    // setErrorMessage(error.data.error.message);
  }
};
