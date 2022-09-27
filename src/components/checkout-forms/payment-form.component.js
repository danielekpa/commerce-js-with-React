import React, { memo } from 'react';
import { Button, Divider, Typography } from '@mui/material';
import CheckoutReview from './checkout-review.component';

import { usePaystackPayment } from 'react-paystack';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleCaptureCheckout } from '../../actions/capture-checkout.action';
import { useEffect } from 'react';
import { refreshCart } from '../../actions/refresh-cart.action';
import { refreshOrder } from '../../actions/refresh-order';
 
function PaymentForm({ nextStep, handleCaptureCheckout, checkOutToken, shippingData, order, backStep, refreshCart, refreshOrder }) {

  console.log(order);

  useEffect(() => {
    async function goToConfirmation() {
      await refreshCart();
      nextStep();
    }
    goToConfirmation();
  },[]);  

  const config = {
    reference: (new Date()).getTime().toString(),
    email: 'user@example.com',
    amount: checkOutToken.subtotal?.raw + '00',
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);
  // you can call this function anything
  const handleSuccess = (reference) => {
    // Implementation for wha tever you want to do with reference and after success call.
    console.log(reference);

    const orderData = {
      line_items: checkOutToken.line_items,
      customer: { 
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email
      },
      shipping: { 
        name: 'Primary', 
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.state,
        postal_zip_code: shippingData.zip,
        country: shippingData.country
      },
      fulfillment: { 
        shipping_method: shippingData.shippingOption 
      },
      payment: {
        /* gateway: 'paystack',
        paystack: {
          reference: reference.reference
        } */
        gateway: 'test_gateway',
        card: {
          number: '4242424242424242',
          expiry_month: '02',
          expiry_year: '24',
          cvc: '123',
          postal_zip_code: '94107',
        },
      }
    };

    handleCaptureCheckout(checkOutToken?.id, orderData);
    // order?.id && 
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const handlePayment = () => initializePayment(handleSuccess, handleClose);

  return (
    <>
      <CheckoutReview checkOutToken={checkOutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0'}}>Payment method</Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Button variant='outlined' onClick={backStep}>
          Back
        </Button>
        <Button variant='contained' color='primary' onClick={handlePayment}>
          Pay {checkOutToken.subtotal?.formatted_with_symbol}
        </Button>
      </div>
      {/* <PaystackConsumer {...componentProps} >
        {({initializePayment}) => <button onClick={() => initializePayment(handleSuccess, handleClose)}>Paystack Consumer Implementation</button>}
      </PaystackConsumer> */}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleCaptureCheckout, refreshCart, refreshOrder }, dispatch);
};

const mapStateToProps = ({ checkout: { order }}) => ({ order });

export default connect(mapStateToProps, mapDispatchToProps)(memo(PaymentForm));