import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Product from '../product/product.component';
import { Grid } from '@mui/material';
import { connect } from 'react-redux';

import  useStyles from '../../styles/products.styles';
import { bindActionCreators } from 'redux';


import { handleAddToCart } from '../../actions/add-to-cart.action.js';

const Products = ({ products, loading, handleAddToCart }) => {

  const [loadedItem, setIsLoadedItem] = useState(null);
  const classes = useStyles();

  const onAddToCart = (id, qty) => {
    setIsLoadedItem(id);
    handleAddToCart(id, qty);
  };
  
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Grid container justifyContent='flex-start' spacing={4}>
        {products?.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} loading={loading} onAddToCart={onAddToCart} isLoadedItem={loading && loadedItem === product.id} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  onAddToCart: PropTypes.func,
  handleAddToCart: PropTypes.func,
};

const mapStateToProps = ({ products: { products },  cart: { loading }  }) => ({products, loading});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleAddToCart }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);