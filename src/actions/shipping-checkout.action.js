import { ACTIONS } from '../constants/actions/types.actions';
import { createAction } from '../utils/reducer.utils';

export const setCountryLoading = async (dispatch) => await dispatch(createAction(ACTIONS.ISLOADING_SHIPPING_DETAILS, null));