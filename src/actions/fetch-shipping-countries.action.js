import { ACTIONS } from '../constants/actions/types.actions';
import { commerce } from '../lib/commerce';
import { createAction } from '../utils/reducer.utils';
import { setCountryLoading } from './shipping-checkout.action';

export const fetchShippingCountries = (checkoutTknId) => {
  return async (dispatch) => {
    await setCountryLoading(dispatch);
    try {
      const response = await commerce.services.localeListShippingCountries(checkoutTknId);
      const { countries } = response;
      await dispatch(createAction(ACTIONS.GET_SHIPPING_COUNTRIES, { countries }));
      return Promise.resolve(response);
      // setShippingCountries(countries);
      // setShippingCountry(Object.keys(countries)[0]);
    } catch (error) {
      return Promise.reject(error);
    } 
  };
};