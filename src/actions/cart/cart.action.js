import { ACTIONS } from '../../constants/actions/types.actions';
import { createAction } from '../../utils/reducer.utils';

// export const setCart = (cart) => createAction(ACTIONS.SET_CART_ITEMS, cart);
export const toggleIsCartOpen = () => async (dispatch) => dispatch(createAction(ACTIONS.SET_IS_CART_OPEN));

export const dispatchAction = async (dispatch, cart = []) => await dispatch({
  type: ACTIONS.SET_CART,
  payload: {
    cartId: cart.id, cartItems: cart?.line_items, cartTotal: cart?.subtotal, cartCount: cart?.total_items, error: {},
  },
});

export const setCartLoading = async (dispatch) => await dispatch(createAction(ACTIONS.CART_LOADING, null));
