import { FieldType } from "@interfaces/index";
import InputAdornment from "@mui/material/InputAdornment";

const signupForm: FieldType[] = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 6,
    md: 6,
  }, {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 6,
    md: 6,
  }, {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
  }, {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
  }, {
    label: "I agree to terms and conditions.",
    name: "agreeToTerms",
    type: "checkbox",
    customValue: (_, value, isSubmitting) => ({
      required: true,
      disabled: isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
  }
];

export default signupForm;
