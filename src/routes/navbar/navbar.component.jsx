import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  AppBar, Badge, IconButton, Toolbar, Typography,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import { Link, useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import useStyles from '../../styles/navbar.styles';
import logo from '../../assets/home-icon.png';
import { toggleIsCartOpen } from '../../actions/cart/cart.action';

function NavBar({
  cartItems, totalItems, toggleIsCartOpen, isCartIconOpen,
}) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <nav>
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar>
          <Typography component={Link} to="./" variant="h6" className={classes.title} color="inherit">
            <img className={classes.image} src={logo} alt="Commerce.js" height="25px" />
            Commerce JS
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <div className={classes.button} onClick={() => (cartItems.length ? toggleIsCartOpen() : null)}>
              <IconButton aria-label="Show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
          {isCartIconOpen && <CartDropDown cartItems={cartItems} closeCartDropDown={toggleIsCartOpen} />}
        </Toolbar>
      </AppBar>
    </nav>
  );
}

NavBar.propTypes = {
  cartItems: PropTypes.array,
  totalItems: PropTypes.number,
  toggleIsCartOpen: PropTypes.func,
};

const mapStateToProps = ({ cart: { isCartIconOpen } }) => ({ isCartIconOpen });

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleIsCartOpen }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
