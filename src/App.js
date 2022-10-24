/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { fetchProducts } from './actions/products/fetch-products.action';
import { fetchCart } from './actions/cart/fetch-cart.action';

import { NavBar, Products } from './components';
import { Cart, Checkout } from './routes';

import './App.css';
import { commerce } from './lib/commerce';

const theme = createTheme();
function App({
  fetchCart, fetchProducts, cartItems, cartCount,
}) {
  const [order, SetOrder] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  commerce.customer.about().then((customer) => console.log(customer));
  console.log(commerce.customer.id());
  // commerce.customer
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
            <Route exact path="/" element={<Products />} />
            <Route
              exact
              path="/cart"
              element={(
                <Cart />
              )}
            />
            <Route exact path="/checkout" element={<Checkout order={order} />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ cart: { cartItems, cartCount } }) => ({ cartItems, cartCount });

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProducts, fetchCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
