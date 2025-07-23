import React from 'react';
import { TextField } from '@mui/material';

const FormikTextField = ({
  formik,
  name,
  label,
  required = false,
  fullWidth = true,
  type = 'text',
  autoComplete,
  autoFocus = false,
  variant = 'outlined',
  ...props
}) => {
  return (
    <TextField
      variant={variant}
      // margin={margin}
      required={required}
      fullWidth={fullWidth}
      id={name}
      label={label}
      name={name}
      type={type}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  );
};

export default FormikTextField;
