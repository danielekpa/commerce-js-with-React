import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Grid, Typography } from '@mui/material';

import  useStyles from '../../styles/cart.styles';

import CartItem from '../../components/cart-item/cart-item.component';
import { Link, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handleEmptyCart } from '../../actions/empty-cart.action';
import { generateToken } from '../../actions/generate-checkoutkn.action';
import { refreshOrder } from '../../actions/refresh-order';

Cart.propTypes = {
  cartItems: PropTypes.array,
  handleEmptyCart: PropTypes.func,
};

function Cart({ cartId, cartItems, cartTotal, handleEmptyCart, generateToken, refreshOrder }) {
  const navigate = useNavigate();
  const classes = useStyles();

  const proceedToCheckout = () => {
    refreshOrder();
    generateToken(cartId, 'cart');
    navigate('/checkout');
  };
  const EmptyCard = () => (
    <Typography variant='subtitle1'>You hvae no items in your shopping cart,
      <Link to='/' className={classes.link}> start adding some!</Link>
    </Typography>
  );


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
          Subtotal: {cartTotal?.formatted_with_symbol}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button className={classes.emptyButton} size="large" type='button' variant="contained" color='secondary' onClick={handleEmptyCart}>
            Empty Cart
          </Button>
          <Button className={classes.checkoutButton} size="large" type='button' variant="contained" color='primary' onClick={proceedToCheckout}>
            {/* component={Link} to="/checkout" */}
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

const mapStateToProps = ({ cart : { cartId, cartItems, cartTotal }}) => ({ cartId, cartItems, cartTotal });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleEmptyCart, generateToken, refreshOrder }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);