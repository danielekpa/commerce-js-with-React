import { ACTIONS } from '../../constants/actions/types.actions';
import { createAction } from '../../utils/reducer.utils';

export const setCheckoutLoading = async (dispatch) => await dispatch(createAction(ACTIONS.CHECKOUT_LOADING, null));
