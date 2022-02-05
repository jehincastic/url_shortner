import * as yup from "yup";

export const phoneSchema = yup.object().shape({
  phone: yup
    .number()
    .typeError("That doesn't look like a Phone Number")
    .positive("Phone Number can't start with a minus")
    .integer("Phone Number can't include a decimal point")
    .min(6000000000, "Invalid Phone Number")
    .max(9999999999, "Invalid Phone Number"),
});

export const phoneRequiredSchema = yup.object().shape({
  phone: yup
    .number()
    .typeError("That doesn't look like a Phone Number")
    .positive("Phone Number can't start with a minus")
    .integer("Phone Number can't include a decimal point")
    .min(6000000000, "Invalid Phone Number")
    .max(9999999999, "Invalid Phone Number")
    .required("Phone Number is Required."),
});
