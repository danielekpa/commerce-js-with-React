import React, { memo } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const CustomSelect = ({ inputLabel, selectVal, onChangeHandler, items = [], name }) => {

  const { control, register } = useFormContext();
  
  return (
    <>
      <InputLabel>{inputLabel}</InputLabel>
      <Controller render={({ field: { value = selectVal, onChange, ref, onBlur },  }) => (
        <Select {...register} inputRef={ref} required value={value} fullWidth onBlur={onBlur} onChange={(e) => {
          onChangeHandler(e.target.value);
          onChange(e.target.value);
        }} 
        >
          {items?.map((item) => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      )} control={control} name={name} 
      />
    </>
  );
};

export default memo(CustomSelect);