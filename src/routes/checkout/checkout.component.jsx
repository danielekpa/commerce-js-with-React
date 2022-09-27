import React, { useState, useEffect }  from 'react';
import { Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';

import AddressForm from '../../components/checkout-forms/address-form.component';
import PaymentForm from '../../components/checkout-forms/payment-form.component';
import Confirmation from '../../components/checkout-forms/confirmation.component';

import useStyles from '../../styles/checkout.styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchShippingCountries } from '../../actions/fetch-shipping-countries.action';

const steps = ['Shipping address', 'Payment details'];

function Checkout({ checkOutToken, fetchShippingCountries }) {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    fetchShippingCountries(checkOutToken);
  }, [checkOutToken]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (formData) => {
    console.log(formData);
    setShippingData(formData);

    nextStep();
  };

  console.log(checkOutToken);
  
  const CheckoutForm = () => activeStep === 0 ? <AddressForm next={next} /> : <PaymentForm shippingData={shippingData} checkOutToken={checkOutToken} nextStep={nextStep} backStep={backStep} />;
  
  return (
    <>
      <div className={classes.toolBar}>Checkout</div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step, i) => (
              <Step key={`step+${i}}`}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation classes={classes} /> : <CheckoutForm />}
        </Paper>
      </main>
    </>
  );
}

const mapStateToProps = ({ checkout: { checkOutToken }}) => ({ checkOutToken });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchShippingCountries }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);