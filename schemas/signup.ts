import * as yup from "yup";

import loginSchema from "@schemas/login";
import { phoneRequiredSchema } from "@schemas/phone";

const signUpSchema = loginSchema.concat(
  yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
      .max(40)
      .required("First Name is Required."),
    lastName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
      .max(40)
      .required("Last Name is Required."),
  })
);


export default signUpSchema;
