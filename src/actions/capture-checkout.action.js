import { ACTIONS } from '../constants/actions/types.actions';
import { commerce } from '../lib/commerce';
import { createAction } from '../utils/reducer.utils';
import { refreshCart } from './refresh-cart.action';

export const handleCaptureCheckout = (checkOutTokenId, newOrder) => {
  return async (dispatch) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkOutTokenId, newOrder);
      console.log(incomingOrder);

      await dispatch(createAction(ACTIONS.SET_CHECKOUT, { order: incomingOrder }));
      Promise.resolve(incomingOrder);
    } catch (error) {
      Promise.reject(error);
      // setErrorMessage(error.data.error.message);
    }
  };
};