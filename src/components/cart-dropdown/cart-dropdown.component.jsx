import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import PropTypes from 'prop-types';
import CartDropDownItem from './cart-dropdown-item/cart-dropdown-item.component';

import useStyles from '../../styles/cart-dropdown.styles';

function CartDropDown({ cartItems, closeCartDropDown }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const goToCheckout = () => {
    // toggleIsCartOpen();
    closeCartDropDown();
    navigate('./cart');
  };

  return (
    <Container className={classes.cartDropDownContainer}>
      <div className={classes.cartItems}>
        {cartItems?.map((cartItem) => (
          <CartDropDownItem item={cartItem} key={cartItem.id} />
        ))}
      </div>
      <Button type="button" variant="contained" onClick={goToCheckout} className={classes.button}>Go TO CHECKOUT</Button>
    </Container>
  );
}

CartDropDown.propTypes = {
  cartItems: PropTypes.array,
  closeCartDropDown: PropTypes.func,
};

export default CartDropDown;
