import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

import { UserJWT, AuthResp, JWTInfo } from "@interfaces/index";

const {
  VERIFICATION_SECRET: secret,
  JWT_SECRET: privateKey,
} = process.env;

export const hashToken = (token: string) => createHash("sha256")
  .update(`${token}${secret}`)
  .digest("hex");

export const splitToken = (bearer?: string) => {
  const token = bearer?.split("Bearer ")[1];
  return token || "";
};

export const verifyJwt = (token: string): UserJWT => {
  const payload = jwt.verify(token, privateKey || "") as UserJWT;
  return payload;
};

export const isAuthenticated = (bearerToken?: string): AuthResp => {
  try {
    const token = splitToken(bearerToken);
    if (token) {
      const userInfo = verifyJwt(token);
      return {
        authenticated: true,
        payload: userInfo,
      };
    }
    return {
      authenticated: false,
    };
  } catch (err) {
    return {
      authenticated: false,
    };
  }
};

export const signJwt = (
  user: JWTInfo,
): Promise<string> => new Promise((res, rej) => {
  jwt.sign(
    user,
    privateKey || "",
    (err: Error | null, token: string | undefined) => {
      if (err) {
        rej(err);
      } else if (token) {
        res(token);
      } else {
        rej(new Error("Invalid Input..."));
      }
    },
  );
});

export const getUserInfo = (req: NextApiRequest): [boolean, UserJWT | string] => {
  try {
    const {
      authorization,
    } = req.headers;
    const token = splitToken(authorization);
    if (token) {
      const userInfo = verifyJwt(token);
      return [true, userInfo];
    }
    throw new Error("Invalid Login");
  } catch (err: any) {
    return [false, err.message || "Invalid Login"];
  }
};
