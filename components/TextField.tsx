import React from "react";
import TextFieldInput from "@mui/material/TextField";

import { DynamicFieldsProps } from "@interfaces/index";

interface TextFieldProps extends DynamicFieldsProps {}

const TextField: React.FC<TextFieldProps> = ({
  field,
  value,
  error,
  handleChange,
  touched,
  handleBlur,
  isSubmitting,
  setFieldValue,
  values,
}) => {
  return (
    <TextFieldInput
      fullWidth
      sx={field.customFieldStyle}
      onBlur={handleBlur}
      error={touched && Boolean(error)}
      id={field.name}
      label={field.label}
      type={field.type}
      variant="standard"
      {...field.customValue(values, value, isSubmitting)}
      onChange={(e) => {
        if (field.customChange) {
          field.customChange(e, handleChange, field, setFieldValue);
        } else {
          handleChange(e);
        }
      }}
      helperText={touched && error}
      placeholder={field.placeholder}
      InputLabelProps={field.inputLabel || {}}
      InputProps={field.inputProps || {}}
    />
  );
};

export default TextField;
