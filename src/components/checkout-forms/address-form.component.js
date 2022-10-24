import React, {
  useEffect, useState, useCallback, useMemo, memo,
} from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CustomFormInput } from '../utils/custom-textfield.component';
import CustomSelectComponent from '../utils/custom-select.component';

import { commerce } from '../../lib/commerce';

function AddressForm({
  loading: loadingState, countries, checkOutToken, next,
}) {
  const [loading, setLoading] = useState(loadingState);
  const [shippingCountry, setShippingCountry] = useState(Object.keys(countries)[0]);
  const [shippingStates, setShippingStates] = useState([]);
  const [shippingState, setShippingState] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  useEffect(() => setShippingCountry(Object?.keys(countries)[0]), [countries]);

  const form = useForm();

  const fetchShippingCtryState = useCallback(async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    setShippingStates(subdivisions);
    setShippingState(Object.keys(subdivisions)[0]);
  }, []);

  const fetchShippingOptions = useCallback(async (checkoutTknId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTknId, { country, region });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  }, []);

  const noShippingParams = () => !shippingState || !shippingOption;

  useEffect(() => {
    noShippingParams() ? setLoading(true) : setLoading(false);
    shippingCountry && fetchShippingCtryState(shippingCountry);
    shippingState && fetchShippingOptions(checkOutToken?.id, shippingCountry);
  }, [shippingCountry, shippingState, shippingOption]);

  const shippingCountries = Object.entries(countries)?.map(([code, name]) => ({ id: code, name }));

  const states = Object.entries(shippingStates)?.map(([code, name]) => ({ id: code, name }));

  const options = !!shippingOptions.length && shippingOptions?.map((option) => ({ id: option?.id, name: `${option?.description} - ${option?.price?.formatted_with_symbol}` }));

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      {loading ? <p>loading...</p> : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((data) => next({ ...data, shippingOption }))}>
            <Grid container spacing={3}>
              <CustomFormInput name="firstName" label="First name" />
              <CustomFormInput name="lastName" label="Last name" />
              <CustomFormInput name="address1" label="Address" />
              <CustomFormInput name="email" label="Email" />
              <CustomFormInput name="city" label="City" />
              <CustomFormInput name="zip" label="ZIP / Postal code" />
              <Grid item xs={12} sm={6}>
                {
                  !!shippingCountries.length && <CustomSelectComponent name="country" inputLabel="Shipping Country" selectVal={shippingCountry} onChangeHandler={(val) => setShippingCountry(val)} items={shippingCountries} />
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                {
                  !!states.length && <CustomSelectComponent name="state" inputLabel="Shipping Subdivision" selectVal={shippingState} onChangeHandler={(val) => setShippingState(val)} items={states} />
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                {
                  !!options.length && <CustomSelectComponent name="shippingOption" inputLabel="Shipping Options" selectVal={shippingOption} onChangeHandler={(val) => setShippingOption(val)} items={options} />
                }
              </Grid>
            </Grid>
            <br />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" component={Link} to="/cart">Back to Cart</Button>
              <Button variant="contained" color="primary" type="submit">Next</Button>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
}

const mapStateToProps = ({ checkout: { loading, checkOutToken, countries } }) => ({ countries, loading, checkOutToken });

export default connect(mapStateToProps, null)(memo(AddressForm));
