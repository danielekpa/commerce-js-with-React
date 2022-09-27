/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CircularProgress } from  '@mui/material';
import { CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import  useStyles from '../../styles/product.styles';
import { withStyles } from '@mui/styles';

const Product = ({ product, isLoadedItem, loading, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card spacing={0} className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color='textSecondary' />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {isLoadedItem ? <CircularProgress size={25} thickness={3} variant="indeterminate" /> : (
          <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
            <AddShoppingCart />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default withStyles(() => useStyles)(Product);