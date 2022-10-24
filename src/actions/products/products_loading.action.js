import { ACTIONS } from '../../constants/actions/types.actions';
import { createAction } from '../../utils/reducer.utils';

export const setProductsLoading = async (dispatch) => await dispatch(createAction(ACTIONS.PRODUCTS_LOADING, null));
