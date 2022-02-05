import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { DynamicFieldsProps } from "@interfaces/index";

interface CheckboxProps extends DynamicFieldsProps {}

const CheckboxComp: React.FC<CheckboxProps> = ({
  field,
  value,
  handleChange,
  isSubmitting,
  setFieldValue,
  values,
}) => {
  return (
    <FormControlLabel
      sx={field.customControllerStyle}
      control={
        <Checkbox
          color="primary"
          name={field.name}
          sx={field.customFieldStyle}
          {...field.customValue(values, value, isSubmitting)}
          onChange={(e) => {
            if (field.customChange) {
              field.customChange(e, handleChange, field, setFieldValue);
            } else {
              handleChange(e);
            }
          }}
        />
      }
      label={field.label}
    />
  );
};

export default CheckboxComp;
