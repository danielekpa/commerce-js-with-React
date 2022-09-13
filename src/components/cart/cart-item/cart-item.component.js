import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import useStyles from '../../../styles/cart-item.styles';
import { PropTypes } from 'prop-types';

CartItem.propTypes = {
  item: PropTypes.object,
};

function CartItem({ item }) {
  const classes = useStyles();

  return ( 
    <Card>
      <CardMedia className={classes.media} image={item.image.url} alt={item.name} />
      <CardContent className={classes.content} >
        <Typography variant='h5'>{item.name}</Typography>
        <Typography variant='h5'>{item.line_total?.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <div className={classes.buttons}>
          <Button type="button" size='small'>-</Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size='small'>+</Button>
        </div>
        <Button variant='contained' type='button' color='secondary' className={classes.button}>Remove</Button>
      </CardActions>
    </Card>
  );
}

export default CartItem;