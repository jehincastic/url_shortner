import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import { DynamicFieldsProps } from "@interfaces/index";

interface DropdownProps extends DynamicFieldsProps {}

const Dropdown: React.FC<DropdownProps> = ({
  field,
  value,
  error,
  setFieldValue,
  touched,
  handleBlur,
  isSubmitting,
  handleChange,
  values,
}) => {
  return (
    <FormControl
      fullWidth
      {...field.customValue(values, value, isSubmitting)}
      variant="standard"
      error={touched && Boolean(error)}
      disabled={isSubmitting}
      onBlur={handleBlur}
      sx={field.customControllerStyle}
    >
      <InputLabel
        id={`${field.name}-label`}
        sx={field.customLabelStyle}
      >
        {field.label}
      </InputLabel>
      <Select
        id={field.name}
        label={field.label}
        value={value}
        sx={field.customFieldStyle}
        onChange={(e) => {
          if (field.customChange) {
            field.customChange(e, handleChange, field, setFieldValue);
          } else {
            setFieldValue(field.name, e.target.value);
          }
        }}
      >
        {
          field.options?.map((o, i) => (
            <MenuItem
              key={i}
              value={o.value}
              sx={field.customOptionStyle}
            >
              {o.label}
            </MenuItem>
          ))
        }
      </Select>
      <FormHelperText sx={field.customHelperTextStyle}>{touched && error}</FormHelperText>
    </FormControl>
  );
};

export default Dropdown;
