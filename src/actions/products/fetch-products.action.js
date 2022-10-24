import { ACTIONS } from '../../constants/actions/types.actions';
import { commerce } from '../../lib/commerce';
import { createAction } from '../../utils/reducer.utils';

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await commerce.products?.list() || [];
    const { data } = response;
    await dispatch(createAction(ACTIONS.SET_PRODUCTS, { products: data }));
    return Promise.resolve(response);
  } catch (error) {
    console.log(error);
    // await dispatch(createAction(ACTIONS.CHECKOUT_ERROR), { error});

    return Promise.reject(error);
  }
};
