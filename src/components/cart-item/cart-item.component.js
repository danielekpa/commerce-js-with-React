import React, { memo, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, TextField, Typography } from '@mui/material';

import { CheckCircle as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';
// import CancelIcon from '@mui/icons-material/Cancel';

import useStyles from '../../styles/cart-item.styles';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';

import { handleUpdateCartQty } from '../../actions/update-cart.action';
import { handleRemoveFromCart } from '../../actions/remove-from-cart.action';
import { connect } from 'react-redux';
import { useState } from 'react';
import {debounce} from 'lodash';
import { useCallback } from 'react';
import { useMemo } from 'react';

CartItem.propTypes = {
  item: PropTypes.object,
};

function CartItem({ item, handleUpdateCartQty, handleRemoveFromCart, loading }) {
  const [loadedItem, setIsLoadedItem] = useState(null);
  const [quantity, setQuantity] = useState(item.quantity);

  const classes = useStyles();

  const handleUpdateCart = (id, qty) => {
    setIsLoadedItem(id);
    handleUpdateCartQty(id, qty);
  };

  const debouncedHandler = useCallback(debounce(handleUpdateCart, 1000), []);


  return ( 
    <Card>
      <CardMedia className={classes.media} image={item.image.url} alt={item.name} />
      <CardContent className={classes.content} >
        <Typography variant='h5'>{item.name}</Typography>
        <Typography variant='h5'>{item.line_total?.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <div className={classes.buttons}>
          <Button type="button" size='small' disabled={!!loadedItem} onClick={() => {
            setQuantity((quantity)=> quantity - 1);
            debouncedHandler(item.id, quantity - 1);
          }}
          >
          -
          </Button>
          {
            loading && loadedItem === item.id ? 
              <CircularProgress size={20} thickness={3} /> 
              :
              <Typography>{quantity}</Typography>
          } 
          <Button type="button" size='small' disabled={!!loadedItem} onClick={() => {
            setQuantity((quantity)=> quantity + 1);
            debouncedHandler(item.id, quantity + 1);
          }}
          >
          +
          </Button>
          
        </div>
        <Button variant='contained' type='button' color='secondary' className={classes.button}onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = ({ cart: { loading }}) => ({ loading });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( { handleUpdateCartQty, handleRemoveFromCart }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CartItem));