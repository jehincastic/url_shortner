import React from "react";

import { DynamicFieldsProps } from "@interfaces/index";
import TextField from "@components/TextField";
import DropdownField from "@components/Dropdown";
import ToogleField from "@components/Toggle";
import CheckboxField from "@components/Checkbox";

const DynamicFields: React.FC<DynamicFieldsProps> = ({
  field,
  value,
  error,
  handleChange,
  touched,
  handleBlur,
  setFieldValue,
  isSubmitting,
  values
}) => {
  switch(field.type){
  case "text":
  case "email":
  case "password":
  case "textarea":
  case "number":
  case "date":
    return (
      <TextField
        handleBlur={handleBlur}
        isSubmitting={isSubmitting}
        field={field}
        value={value}
        error={error}
        handleChange={handleChange}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
      />
    );
  case "toggle":
    return (
      <ToogleField
        handleBlur={handleBlur}
        isSubmitting={isSubmitting}
        field={field}
        value={value}
        error={error}
        handleChange={handleChange}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
      />
    );
  case "dropdown":
    return (
      <DropdownField
        handleBlur={handleBlur}
        isSubmitting={isSubmitting}
        field={field}
        value={value}
        error={error}
        handleChange={handleChange}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
      />
    );
  case "checkbox":
    return (
      <CheckboxField
        handleBlur={handleBlur}
        isSubmitting={isSubmitting}
        field={field}
        value={value}
        error={error}
        handleChange={handleChange}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
      />
    );
  default:
    return (
      <TextField
        isSubmitting={isSubmitting}
        handleBlur={handleBlur}
        field={field}
        value={value}
        error={error}
        handleChange={handleChange}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
      />
    );
  }
};

export default DynamicFields;
