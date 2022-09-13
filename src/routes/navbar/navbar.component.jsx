import React from 'react';
import { PropTypes } from 'prop-types';
import logo from '../../assets/home-icon.png';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import useStyles from '../../styles/navbar.styles';
import { useState } from 'react';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { Link } from 'react-router-dom';

const NavBar = ({ cartItems, totalItems }) => {
  const [isCartIconOpen, setIsCartIconOpen] = useState(false);
  const classes = useStyles();
  // const navigate = useNavigate();

  const cartIconClicked = () => {
    setIsCartIconOpen(!isCartIconOpen);
  };

  // console.log(isCartIconOpen);
  return (
    <nav>
      <AppBar position='fixed' className={classes.navBar}>
        <Toolbar>
          <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
            <img className={classes.image} src={logo} alt='Commerce.js' height='25px' />
            Commerce JS
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}  onClick={cartIconClicked}>
            <IconButton aria-label='Show cart items' color='inherit'>
              <Badge badgeContent={totalItems} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          {isCartIconOpen && <CartDropDown cartItems={cartItems}/>}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

NavBar.propTypes = {
  cartItems: PropTypes.array,
  totalItems: PropTypes.number,
};

export default NavBar;