import React from 'react';
import { PropTypes } from 'prop-types';

import { Typography } from '@mui/material';
import useStyles from '../../../styles/cart-dropdown-item.styles';

function CartDropDownItem({ item }) {
  const classes = useStyles();

  return (
    <div className={classes.cartItemContainer}>
      <img className={classes.img} src={item.image.url} alt={item.name} />
      <div className={classes.itemDetails}>
        <Typography variant="body2" color="HighlightText" size="small" className={classes.name}>{item.name}</Typography>
        <Typography variant="body2" color="GrayText" size="small" className={classes.price}>
          {item.quantity}
          {' '}
          x $
          {item.price.formatted_with_symbol}
        </Typography>
      </div>
    </div>
  );
}

CartDropDownItem.propTypes = {
  item: PropTypes.object,
};
export default CartDropDownItem;
