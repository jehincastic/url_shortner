import * as yup from "yup";

const validation = async (schema: yup.AnyObjectSchema, data: any) => {
  try {
    // Validate request body against schema
    await schema.validate(data);
    return true;
  } catch (err) {
    // Handle schema validation error
    return false;
  }
};

export default validation;
