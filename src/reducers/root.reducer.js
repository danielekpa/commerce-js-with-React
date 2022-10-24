import { combineReducers } from 'redux';
import { cartReducer } from './cart.reducer';
import { productsReducer } from './products.reducer';
import { checkOutReducer } from './checkout.reducer';

export const rootReducer = combineReducers({
  // user: userReducer,
  cart: cartReducer,
  products: productsReducer,
  checkout: checkOutReducer,
});
