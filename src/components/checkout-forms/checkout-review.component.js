import { List, ListItem, ListItemText, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const CheckoutReview = ({ checkOutToken }) => {
  return (
    <>
      <Typography variant='h6' gutterBottom>Order summary</Typography>
      <List disablePadding>
        {checkOutToken?.line_items?.map((product) => (
          <ListItem style={{ padding: '10px 0'}} key={product.name}>
            <ListItemText primary={product.product_name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant='body2'>{product.line_total?.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700}}>
            {checkOutToken?.subtotal?.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

CheckoutReview.propTypes = {
  checkOutToken: PropTypes.object,
};

export default CheckoutReview;