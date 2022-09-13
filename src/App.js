import React, { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, } from '@mui/styles';
import './App.css';
import { NavBar, Products, Cart } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const theme = createTheme();
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products?.list() || '';
    setProducts(data);
  };

  const fetchCart = async () => {
    const cartItems = await commerce.cart.retrieve();
    setCart(cartItems);
  };

  const handleAddToCart = async (productId, quantity) => {
    const cartItem = await commerce.cart.add(productId, quantity);
    setCart(cartItem.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [cart]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar totalItems={cart?.total_items} cartItems={cart?.line_items} />
          <Routes>
            <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
            <Route exact path='/cart' element={<Cart cart={cart} />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
