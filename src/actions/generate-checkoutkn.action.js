import { ACTIONS } from '../constants/actions/types.actions';
import { commerce } from '../lib/commerce';
import { createAction } from '../utils/reducer.utils';

export const generateToken = (cartId, type) => {
  return async (dispatch) => {
    try {
      const token = await commerce.checkout.generateToken(cartId, { type });
      dispatch(createAction(ACTIONS.GENERATE_CHECKOUT_TKN, {checkOutToken: token}));
      Promise.resolve(token);
    } catch (error){
      Promise.reject(error);
    }
  };
};
