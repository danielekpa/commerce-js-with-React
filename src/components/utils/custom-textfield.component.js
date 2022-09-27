import React from 'react';
import { Grid, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';


export const CustomFormInput = ({ name, label }) => {
  const { control, register } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField label={label} variant='standard' onBlur={onBlur} // notify when input is touched
          onChange={onChange} // send value to hook form
          checked={value}
          inputRef={ref}
          required
          {...register(name)}
          fullWidth
        />
      )} control={control} name={name}  
      />
    </Grid>
  );
};
