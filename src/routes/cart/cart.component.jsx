import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Container, CssBaseline, Grid, Typography,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import useStyles from '../../styles/cart.styles';

import CartItem from '../../components/cart-item/cart-item.component';
import { handleEmptyCart } from '../../actions/cart/empty-cart.action';
import { generateToken } from '../../actions/checkout/generate-checkoutkn.action';
import { refreshOrder } from '../../actions/checkout/refresh-order';

Cart.propTypes = {
  cartItems: PropTypes.array,
  handleEmptyCart: PropTypes.func,
};

function EmptyCard({ classes }) {
  return (
    <Typography variant="subtitle1">
      You hvae no items in your shopping cart,
      <Link to="/" className={classes.link}> start adding some!</Link>
    </Typography>
  );
}

function FilledCart({
  cartItems, classes, setLoading, proceedToCheckout,
}) {
  return (
    <>
      {/* <CssBaseline /> */}
      <Grid container spacing={3}>
        {cartItems?.map((cartItem) => (
          <Grid item key={cartItem.id} xs={12} sm={4}>
            <CartItem item={cartItem} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal:
          {' '}
          {cartTotal?.formatted_with_symbol}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={() => {
              setLoading(true);
              proceedToCheckout();
            }}
          >
            {/* component={Link} to="/checkout" */}
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
}

function Cart({
  cartId, cartItems, cartTotal, handleEmptyCart, generateToken, refreshOrder,
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  console.log(loading);

  const goToCheckout = debounce(() => { if (!loading) { navigate('/checkout'); } }, 1000);

  const proceedToCheckout = () => {
    refreshOrder();
    setLoading(false);

    goToCheckout();
    // debounce(() => goToCheckout(), 1000);
  };

  if (!cartItems) { return 'Loading...'; }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      {!cartItems?.length ? <EmptyCard /> : <FilledCart cartItems={cartItems} classes={classes} setLoading={setLoading} proceedToCheckout={proceedToCheckout} />}
    </Container>
  );
}

const mapStateToProps = ({ cart: { cartId, cartItems, cartTotal } }) => ({ cartId, cartItems, cartTotal });

const mapDispatchToProps = (dispatch) => bindActionCreators({ handleEmptyCart, generateToken, refreshOrder }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
