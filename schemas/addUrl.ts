import * as yup from "yup";

const addUrlSchema = yup.object().shape({
  longUrl: yup
    .string()
    .url("Please enter a valid URL")
    .required("URL is Required."),
  expiresAt: yup
    .number()
    .min(0, "Please enter a valid number")
    .required("Expiration Time is Required."),
});

export default addUrlSchema;
