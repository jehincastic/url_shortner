import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";


import { DynamicFieldsProps } from "@interfaces/index";

interface ToggleProps extends DynamicFieldsProps {}

const Toggle: React.FC<ToggleProps> = ({
  field,
  value,
  handleChange,
  isSubmitting,
  setFieldValue,
}) => {
  return (
    <FormControlLabel
      sx={field.customControllerStyle || {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      control={
        <Switch
          id={field.name}
          disabled={isSubmitting}
          checked={!!value}
          sx={field.customFieldStyle}
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

export default Toggle;
