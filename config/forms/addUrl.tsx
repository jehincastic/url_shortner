import InputAdornment from "@mui/material/InputAdornment";

import { FieldType } from "@interfaces/index";

const addUrlForm: FieldType[] = [
  {
    label: "Your Url",
    name: "longUrl",
    type: "text",
    placeholder: "URL",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 6,
    md: 6,
  },{
    label: "Expires In",
    name: "expiresAt",
    type: "number",
    customValue: (_, value, isSubmitting) => ({
      required: false,
      disabled: !_.longUrl || isSubmitting,
      value,
    }),
    xs: 12,
    sm: 6,
    md: 6,
    inputProps: {
      endAdornment: <InputAdornment position="start">in Mins</InputAdornment>,
      inputProps: {
        min: 0,
      }
    },
  }
];

export default addUrlForm;
