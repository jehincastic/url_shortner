import React from "react";
import {
  AlertColor,
  BaseTextFieldProps,
  GridSize,
  SelectChangeEvent,
  SxProps,
  Theme,
  StandardTextFieldProps,
  GridProps,
} from "@mui/material";

export type InputType =
  "text"
  | "textarea"
  | "email"
  | "password"
  | "dropdown"
  | "date"
  | "toggle"
  | "phone"
  | "number"
  | "checkbox";

export interface AlertProps {
  open: boolean;
  horizontal: "left" | "center" | "right";
  vertical: "top" | "bottom";
  severity: AlertColor;
  msg: string;
}

export interface PartialAlertProps {
  open?: boolean;
  horizontal?: "left" | "center" | "right";
  vertical?: "top" | "bottom";
  severity?: AlertColor;
  msg: string;
}

export interface CommonResponse<T> {
  status: "SUCCESS" | "FAILED";
  data: T;
}

export interface JWTInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserJWT extends JWTInfo {
  iat: number;
}

export interface LoginResponse {
  token: string;
  user: JWTInfo,
}

export type AuthResp = {
  authenticated: boolean;
  payload?: UserJWT;
}

export type ThemeType = "light" | "dark";

interface CommonInputForm {
  email: string;
  password: string;
}

export interface LoginInput extends CommonInputForm {
  rememberMe: boolean;
}

export interface SignUpInput extends CommonInputForm {
  firstName: string;
  lastName: string;
}

export interface OptionType {
  value: string;
  label: string;
}

type customValueType = {
  value: string | number | boolean;
  required: boolean;
  disabled: boolean;
}

export interface FieldType {
  label: string;
  name: string;
  type: InputType;
  placeholder?: string;
  options?: OptionType[];
  inputLabel?: BaseTextFieldProps["InputLabelProps"],
  inputProps?: StandardTextFieldProps["InputProps"],
  customFieldStyle?: SxProps<Theme>;
  customControllerStyle?: SxProps<Theme>;
  customLabelStyle?: SxProps<Theme>;
  customHelperTextStyle?: SxProps<Theme>;
  customOptionStyle?: SxProps<Theme>;
  fieldGridStyles?: SxProps<Theme>;
  fieldGridProps?: GridProps;
  customValue: (
    values: any,
    value: string | boolean | number,
    isSubmitting: boolean,
  ) => customValueType;
  customChange?: (
    e: React.ChangeEvent<any> | SelectChangeEvent<string | number | boolean>,
    handleChange: {
      (event: React.ChangeEvent<any>): void;
      <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (ev: string | React.ChangeEvent<any>) => void;
    },
    field: FieldType,
    setFieldValue: (fieldName: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => void;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
}

export interface DynamicFieldsProps {
  isSubmitting: boolean;
  field: FieldType;
  value: number | string | boolean;
  error: undefined | string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  }
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  }
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  touched: boolean | undefined;
  values: string;
}

export interface UrlType {
  shortUrl: string;
  longUrl: string;
  expiresAt: number;
}

export interface UrlInput {
  longUrl: string;
  expiresAt: number;
}


// eslint-disable-next-line no-shadow
export enum MailType {
  SIGNUP="SIGNUP"
}
