import React, { useEffect, useState } from 'react';
import { Cart, Checkout } from './routes';
import { NavBar, Products} from './components';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProducts } from './actions/fetch-products.action';
import { fetchCart } from './actions/fetch-cart.action';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider, } from '@mui/styles';

import './App.css';
import { commerce } from './lib/commerce';

const theme = createTheme();
function App({ fetchCart, fetchProducts, cartItems, cartCount }) {
  const [order, SetOrder] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  // const refreshCart = async () => {
  //   const newCart = await commerce.cart.refresh();
  // };

  /* const handleCaptureCheckout = async (checkOutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkOutTokenId, newOrder);
      SetOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }; */

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar totalItems={cartCount} cartItems={cartItems} />
          <Routes>
            <Route exact path='/' element={<Products />} />
            <Route exact path='/cart' element={(
              <Cart />
            )}
            />
            <Route exact path='/checkout' element={<Checkout order={order} />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ cart: { cartItems, cartCount } }) => ({ cartItems, cartCount  });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProducts, fetchCart }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
