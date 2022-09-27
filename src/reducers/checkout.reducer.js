import { ACTIONS } from '../constants/actions/types.actions';

const INITIAL_STATE = {
  loading: false,
  checkOutToken: {},
  countries: [],
  order: {},
  // shippingStates: [],
  // shippingOptions: []
};

export const checkOutReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case ACTIONS.GENERATE_CHECKOUT_TKN:
      return{
        ...state,
        ...payload,
      };
    case ACTIONS.ISLOADING_SHIPPING_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_SHIPPING_COUNTRIES:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ACTIONS.SET_CHECKOUT:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ACTIONS.REFRESH_ORDER:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ACTIONS.RESET_CHECKOUT:
      return INITIAL_STATE;
    default:
      return state;
          /*
          case ACTIONS.GET_SHIPPING_OPTIONS:
            return {
              ...state,
              ...payload,
              loading: false,
            }; */
  }
};