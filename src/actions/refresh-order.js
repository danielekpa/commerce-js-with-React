import { ACTIONS } from '../constants/actions/types.actions';
import { createAction } from '../utils/reducer.utils';

export const refreshOrder = () => {
  return async (dispatch) => {
    // await dispatchAction(dispatch, newCart);
    await dispatch(createAction(ACTIONS.REFRESH_ORDER, { order: {} }));
  };
};