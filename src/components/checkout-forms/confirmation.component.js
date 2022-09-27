import { Button, CircularProgress, Divider, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Confirmation = ({ order, classes }) => {
  
  return (order.customer ? (
    <>
      <div>
        <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
        <Divider className={classes.divider} />
        <Typography variant='h5'>Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));
};

const mapStateToProps = ({ checkout: { order }}) => ({ order });

export default connect(mapStateToProps, null)(Confirmation);