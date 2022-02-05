import type { NextApiRequest, NextApiResponse } from "next";

import { UrlType, CommonResponse, UserJWT } from "@interfaces/index";
import { getUserInfo } from "@utils/auth";
import Prisma from "@lib/prisma";

const ApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse<UrlType[] | string>>,
) => {
  if (req.method?.toLowerCase() === "get") {
    try {
      const [isAuthenticated, info] = getUserInfo(req);
      if (isAuthenticated) {
        const userInfo = info as UserJWT;
        const dbData = await Prisma.url.findMany({
          where: {
            userId: userInfo.id,
          },
        });
        const returnData: UrlType[] = dbData.map((item) => {
          return {
            shortUrl: item.shortUrl,
            longUrl: item.longUrl,
            expiresAt: Number(item.expiresAt),
          };
        });
        return res.status(200).json({
          status: "SUCCESS",
          data: returnData,
        });
      }
      return res.status(401).json({
        status: "FAILED",
        data: info as string,
      });
    } catch (err) {
      return res.status(500).json({
        status: "SUCCESS",
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
