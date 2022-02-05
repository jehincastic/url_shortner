import type { NextApiRequest, NextApiResponse } from "next";

import { UrlInput, UrlType, CommonResponse, UserJWT } from "@interfaces/index";
import { getUserInfo } from "@utils/auth";
import addUrlSchema from "@schemas/addUrl";
import validation from "@utils/validation";
import Prisma from "@lib/prisma";
import { generateHash } from "@utils/index";

const ApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse<UrlType | string>>,
) => {
  if (req.method?.toLowerCase() === "post") {
    try {
      const [isAuthenticated, info] = getUserInfo(req);
      if (isAuthenticated) {
        const isInputValid = await validation(addUrlSchema, req.body);
        if (!isInputValid[0]) {
          return res.status(400).json({
            status: "FAILED",
            data: isInputValid[1],
          });
        }
        const {
          longUrl,
          expiresAt,
        } = req.body as UrlInput;
        const userInfo = info as UserJWT;
        const shortHash = generateHash(longUrl, userInfo.id);
        const data = await Prisma.url.upsert({
          where: {
            longUrl_userId: {
              userId: userInfo.id,
              longUrl,
            },
          },
          update: {
            expiresAt,
          },
          create: {
            longUrl,
            shortUrl: shortHash,
            userId: userInfo.id,
            expiresAt,
          }
        });
        return res.status(200).json({
          status: "SUCCESS",
          data: data.shortUrl,
        });
      }
      return res.status(401).json({
        status: "FAILED",
        data: info as string,
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        return res.status(400).json({
          status: "FAILED",
          data: "Url already shortened",
        });
      }
      return res.status(500).json({
        status: "FAILED",
        data: "Something went wrong",
      });
    }
  }
  return res.status(405).json({
    status: "FAILED",
    data: "Invalid Method",
  });
};

export default ApiHandler;
