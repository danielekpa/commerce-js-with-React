import { ACTIONS } from '../constants/actions/types.actions';
import { commerce } from '../lib/commerce';
import { createAction } from '../utils/reducer.utils';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await commerce.products?.list() || [];
      const { data } = response;
      await dispatch(createAction(ACTIONS.SET_PRODUCTS, { products: data }));
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};