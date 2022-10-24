import { ACTIONS } from '../../constants/actions/types.actions';

export const dispatchCheckoutError = async (dispatch, errorMessage = '') => await dispatch({
  type: ACTIONS.CHECKOUT_ERROR,
  payload: { hasError: true, errorMessage },
});
