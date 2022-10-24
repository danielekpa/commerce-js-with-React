import {
  Button, CircularProgress, Divider, Typography,
} from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Confirmation({ order, useStyles }) {
  const classes = useStyles();

  return (order.customer?.id ? (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase,
          {order.customer?.firstname}
          {' '}
          {order.customer?.lastname}
        </Typography>
        <br />
        <Divider className={classes.divider} />
        <br />
        <Typography variant="subtitle">
          Order ref:
          {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));
}

const mapStateToProps = ({ checkout: { order } }) => ({ order });

export default connect(mapStateToProps, null)(Confirmation);
