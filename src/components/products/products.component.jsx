import React from 'react';
import Product from '../product/product.component';
import { Grid } from '@mui/material';

import  useStyles from '../../styles/products.styles';

import PropTypes from 'prop-types';
Products.propTypes = {
  products: PropTypes.array,
  onAddToCart: PropTypes.func,
};

function Products({ products, onAddToCart }) {
  const classes = useStyles();
  
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Grid container justifyContent='flex-start' spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;