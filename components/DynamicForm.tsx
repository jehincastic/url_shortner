import { Formik, Form, FormikHelpers } from "formik";
import yup from "yup";
import Grid, { GridProps } from "@mui/material/Grid";
import Box, { BoxProps } from "@mui/material/Box";

import Button, { ButtonCompProps } from "@components/Button";
import { FieldType } from "@interfaces/index";
import DynamicFields from "@components/DynamicFields";
import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

interface DynamicFormProps<T> {
  submit: (values: T, formikHelpers: FormikHelpers<T>) => Promise<boolean>;
  initialValues: T;
  buttonText: string;
  fields: FieldType[];
  schema: yup.AnyObjectSchema;
  formStyle?: CSSProperties;
  containerProps?: GridProps;
  containerStyle?: SxProps<Theme>;
  commonFieldGridStyles?: SxProps<Theme>;
  commonFieldGridProps?: GridProps;
  buttonBoxProps?: BoxProps;
  buttonBoxStyles?: SxProps<Theme>;
  buttonProps?: ButtonCompProps;
  buttonStyles?: SxProps<Theme>;
};

function DynamicForm <T extends any>(props: DynamicFormProps<T>) {
  const {
    schema,
    submit,
    fields,
    initialValues,
    buttonText,
    formStyle = {
      width: "100%",
    },
    containerProps,
    containerStyle = {
      mt: 2,
    },
    commonFieldGridStyles,
    commonFieldGridProps,
    buttonBoxProps,
    buttonBoxStyles = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      pt: 4,
    },
    buttonStyles,
    buttonProps,
  } = props;
  return (
    <Formik<any>
      enableReinitialize
      validationSchema={schema}
      onSubmit={submit}
      initialValues={initialValues}
    >
      {({
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
        handleBlur,
        setFieldValue,
      }) => (
        <Form style={formStyle}>
          <Grid
            spacing={4}
            container
            sx={containerStyle}
            {...containerProps}
          >
            {
              fields.map((field, idx) => {
                const fieldStyles = field.fieldGridStyles;
                let sx: SxProps<Theme> | undefined;
                if (commonFieldGridStyles) {
                  sx = commonFieldGridStyles;
                }
                if (fieldStyles) {
                  Object.assign(sx, fieldStyles);
                }
                const {
                  xs = 12,
                  sm = 12,
                  md = 12,
                } = field;
                return (
                  <Grid
                    key={idx}
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                    sx={sx}
                    {...commonFieldGridProps}
                    {...field.fieldGridProps}
                  >
                    <DynamicFields
                      isSubmitting={isSubmitting}
                      field={field}
                      handleBlur={handleBlur}
                      value={values[field.name]}
                      error={errors[field.name] as (undefined | string)}
                      handleChange={handleChange}
                      touched={touched[field.name] as (boolean | undefined)}
                      setFieldValue={setFieldValue}
                      values={values}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
          <Box
            sx={buttonBoxStyles}
            {...buttonBoxProps}
          >
            <Button
              variant="contained"
              loading={isSubmitting}
              type="submit"
              sx={buttonStyles}
              {...buttonProps}
            >
              {buttonText}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
