import type { NextApiRequest, NextApiResponse } from "next";

import { CommonResponse } from "@interfaces/index";
import Prisma from "@lib/prisma";
import { converToUtc } from "@utils/index";

const ApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<CommonResponse<string>>,
) => {
  if (req.method?.toLowerCase() === "get") {
    try {
      const { id: shortUrl } = req.query;
      const data = await Prisma.url.findFirst({
        where: {
          shortUrl: shortUrl as string,
        },
      });
      const currentUtcTime = converToUtc(new Date()).getTime();
      if (data && Number(data.expiresAt) > currentUtcTime) {
        return res.status(200).json({
          status: "SUCCESS",
          data: data.longUrl,
        });
      }
      return res.status(404).json({
        status: "FAILED",
        data: "Invalid URL",
      });
    } catch (err: any) {
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
