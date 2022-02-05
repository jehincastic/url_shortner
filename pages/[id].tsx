import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import { useAlert } from "@providers/AlertProvider";
import fetcher from "@utils/fetcher";
import routerConfig from "@config/router";

const UrlPage: NextPage = () => {
  const router = useRouter();
  const {
    setAlertInfo,
  } = useAlert();
  
  useEffect(() => {
    if (router.query.id) {
      fetcher<{}, string>(
        `${routerConfig.api.getSingleUrl}/${router.query.id}`,
        "GET",
      ).then(data => {
        if (data.status === "SUCCESS") {
          window.location.href = data.data;
        } else {
          setAlertInfo({
            msg: data.data as string,
            severity: "error",
          });
        }
      }).catch(err => {
        setAlertInfo({
          msg: err.message,
          severity: "error",
        });
      });
    }
  }, [router]);

  return (
    <Layout
      loading
      loadingText="Fetching Data..."
    />
  );
};

export default UrlPage;
