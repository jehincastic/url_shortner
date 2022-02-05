import { FieldType } from "@interfaces/index";

const loginForm: FieldType[] = [
  {
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
  },{
    label: "Remember Me",
    name: "rememberMe",
    type: "checkbox",
    customValue: (_, value, isSubmitting) => ({
      required: false,
      disabled: !_.email || isSubmitting,
      value,
    }),
    xs: 12,
    sm: 12,
    md: 12,
  }
];

export default loginForm;
