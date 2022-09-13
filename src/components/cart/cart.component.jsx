import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Grid, Typography } from '@mui/material';

import  useStyles from '../../styles/cart.styles';
import { useState } from 'react';
import CartItem from './cart-item/cart-item.component';

Cart.propTypes = {
  cart: PropTypes.object,
};

function Cart({ cart }) {
  const [cartItems, setCartItems] = useState(cart.line_items);

  useEffect(() => setCartItems(cart.line_items),[cart]);

  const classes = useStyles();

  const EmptyCard = () => (
    <Typography variant='subtitle1'>You hvae no items in your shopping cart, start adding some!</Typography>
  );

  // console.log(cart, cartItems);

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cartItems?.map((cartItem) => (
          <Grid item key={cartItem.id} xs={12} sm={4}>
            <CartItem item={cartItem} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button className={classes.emptyButton} size="large" type='button' variant="contained" color='secondary'>
            Empty Cart
          </Button>
          <Button className={classes.checkoutButton} size="large" type='button' variant="contained" color='primary'>
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if (!cartItems) {return 'Loading...';}
 
  return (
    <Container>
      <div className={classes.toolbar}/>
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      {!cartItems?.length ? <EmptyCard /> : <FilledCart />}
    </Container>
  );
}

export default Cart;