import { ACTIONS } from '../../constants/actions/types.actions';
import { commerce } from '../../lib/commerce';
import { createAction } from '../../utils/reducer.utils';
import { dispatchCheckoutError } from './checkout_error.action';
import { setCheckoutLoading } from './checkout_loading.action';

export const fetchShippingCountries = (checkoutTknId) => async (dispatch) => {
  await setCheckoutLoading(dispatch);
  try {
    const response = await commerce.services.localeListShippingCountries(checkoutTknId);
    const { countries } = response;
    await dispatch(createAction(ACTIONS.GET_SHIPPING_COUNTRIES, { countries, loading: false }));
    return Promise.resolve(response);
    // setShippingCountries(countries);
    // setShippingCountry(Object.keys(countries)[0]);
  } catch (error) {
    console.log(error.message);
    dispatchCheckoutError(dispatch, error.message);
    return Promise.reject(error);
  }
};
