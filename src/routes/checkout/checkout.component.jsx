import React, { useState, useEffect } from 'react';
import {
  CssBaseline, Paper, Step, StepLabel, Stepper, Typography,
} from '@mui/material';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../../components/checkout-forms/address-form.component';
import PaymentForm from '../../components/checkout-forms/payment-form.component';
import Confirmation from '../../components/checkout-forms/confirmation.component';

import useStyles from '../../styles/checkout.styles';

import { generateToken } from '../../actions/checkout/generate-checkoutkn.action';
import { fetchShippingCountries } from '../../actions/checkout/fetch-shipping-countries.action';

const steps = ['Shipping address', 'Payment details'];

function Checkout({
  cartId, checkOutToken, fetchShippingCountries, generateToken, ckoutHasErr, cartHasErr,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  const navigate = useNavigate();

  useEffect(() => {
    if (cartId) {
      generateToken(cartId, 'cart');
    }
  }, [cartId]);

  useEffect(() => {
    if (checkOutToken?.id) {
      fetchShippingCountries(checkOutToken);
    }
  }, [checkOutToken]);

  useEffect(() => {
    if (ckoutHasErr || cartHasErr) {
      navigate('/');
    }
  }, [ckoutHasErr, cartHasErr]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (formData) => {
    console.log(formData);
    setShippingData(formData);

    nextStep();
  };

  function CheckoutForm() {
    return activeStep === 0 ? <AddressForm next={next} /> : <PaymentForm shippingData={shippingData} checkOutToken={checkOutToken} nextStep={nextStep} backStep={backStep} />;
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.toolBar}>Checkout</div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step, i) => (
              <Step key={`step+${i}}`}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation useStyles={useStyles} /> : <CheckoutForm />}
        </Paper>
      </main>
    </>
  );
}

const mapStateToProps = ({ checkout: { checkOutToken, hasError: ckoutHasErr }, cart: { cartId, hasError: cartHasErr } }) => ({
  cartId, checkOutToken, ckoutHasErr, cartHasErr,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchShippingCountries, generateToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
