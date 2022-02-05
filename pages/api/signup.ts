import type { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";

import {
  CommonResponse,
  JWTInfo,
  LoginResponse,
  SignUpInput,
} from "@interfaces/index";
import { signJwt } from "@utils/auth";
import prisma from "@lib/prisma";
import validation from "@utils/validation";
import signUpSchema from "@schemas/signup";

const ApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse<LoginResponse | string>>,
) => {
  if (req.method?.toLowerCase() === "post") {
    try {
      const isInputValid = await validation(signUpSchema, req.body);
      if (!isInputValid[0]) {
        return res.status(400).json({
          status: "FAILED",
          data: isInputValid[1],
        });
      }
      const {
        email,
        firstName,
        lastName,
        password: rawPassword,
      } = req.body as SignUpInput;
      const password = await argon2.hash(rawPassword);
      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password,
        },
      });
      const userInfo: JWTInfo = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const token = await signJwt(userInfo);
      return res.status(200).json({
        status: "SUCCESS",
        data: {
          user: userInfo,
          token,
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({
        status: "FAILED",
        data: "Server Error...",
      });
    }
  }
  return res.status(405).json({
    status: "FAILED",
    data: "Invalid Method",
  });
};

export default ApiHandler;