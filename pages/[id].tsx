import type { NextPage } from "next";
import { GetServerSideProps } from 'next'
import { useEffect } from "react";

import Layout from "@components/Layout";
import Prisma from "@lib/prisma";
import { useAlert } from "@providers/AlertProvider";
import { isExpired } from "@utils/index";

const UrlPage: NextPage<{msg: string}> = ({
  msg,
}) => {
  const {
    setAlertInfo,
  } = useAlert();
  
  useEffect(() => {
    setAlertInfo({
      msg,
      severity: "error",
    });
  }, []);

  return (
    <Layout
      loading
      loadingText="Fetching Data..."
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}) => {
  const shortUrl = query.id;
  if (typeof shortUrl === "string") {
    try {
      const data = await Prisma.url.findFirst({
        where: {
          shortUrl,
        },
      });
      if (data && !isExpired(Number(data.expiresAt))) {
        return {
          redirect: {
            permanent: false,
            destination: data.longUrl,
          },
          props:{},
        };
      }
    } catch (err) {
      return {
        props: {
          msg: "Something went wrong",
        },
      }
    }
  }
  return {
    notFound: true,
  }
}

export default UrlPage;
