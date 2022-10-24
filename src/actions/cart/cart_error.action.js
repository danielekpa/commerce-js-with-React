import { ACTIONS } from '../../constants/actions/types.actions';

export const dispatchCartError = async (dispatch, errorMessage = '') => await dispatch({
  type: ACTIONS.CART_ERROR,
  payload: { hasError: true, errorMessage },
});
