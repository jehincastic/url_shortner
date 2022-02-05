import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import withNavBar from "@hocs/withNavBar";
import Layout from "@components/Layout";
import Card from "@components/Card";
import { useAlert } from "@providers/AlertProvider";
import { UrlType } from "@interfaces/index";
import fetcher from "@utils/fetcher";
import routerConfig from "@config/router";
import {
  copyToClipboard,
  formatDate,
  isExpired,
} from "@utils/index";
import { addNewUrl } from "./add";


const fetchUrls = async (): Promise<UrlType[]> => {
  const urlData = await fetcher<any, UrlType[]>(
    routerConfig.api.getUrls,
    "GET"
  );
  if (urlData.status === "SUCCESS") {
    return urlData.data as UrlType[];
  }
  throw new Error(urlData.data as string);
};

const getExpiryString = (expiresAt: number): string => {
  const timeString = formatDate(
    new Date(expiresAt),
    "MMM dd, yyyy hh:mm a"
  );
  return `Expires at ${timeString}`;
};

const UrlsPage: NextPage = () => {
  const router = useRouter();
  const { setAlertInfo } = useAlert();
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("Fetching Urls...");
  const [urls, setUrls] = useState<UrlType[]>([]);

  useEffect(() => {
    fetchUrls().then((data) => {
      setLoading(false);
      setUrls(data);
    }).catch((err: Error) => {
      setAlertInfo({
        msg: err?.message || "Something went wrong...",
        severity: "error",
      });
      if (err?.message === "Invalid Login") {
        router.push(routerConfig.loginPage);
      }
    });
  }, []);

  return (
    <Layout
      loading={loading}
      loadingText={loadingMsg}
      isPrivate
    >
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{
            textAlign: "center",
          }}
        >
          URL's Page
        </Typography>
        <Grid
          spacing={4}
          container
          sx={{
            mt: 2,
          }}
        >
          {urls.map((url, idx) => {
            const expired = isExpired(url.expiresAt);
            return (
              <Grid
                key={idx}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  mt: 2,
                }}
              >
                <Card
                  title={
                    url.longUrl.length > 20
                      ? `${url.longUrl.slice(0, 20)}...`
                      : url.longUrl
                  }
                  tooltipText={url.longUrl}
                  subTitle={getExpiryString(url.expiresAt)}
                  btnTitle={["Open Link", "Copy Link", "Add 30 Minutes"]}
                  btnProps={[{
                    disabled: expired,
                  }, {
                    disabled: expired,
                  }, {
                    disabled: !expired,
                  }]}
                  btnAction={[
                    () => {
                      window.open(url.shortUrl, "_blank");
                    },
                    () => {
                      copyToClipboard(`${process.env.baseUrl}/${url.shortUrl}`)
                        .then((data) => {
                          if (data) {
                            setAlertInfo({
                              msg: "Copied to clipboard",
                            });
                          } else {
                            setAlertInfo({
                              msg: "Unable To Copy",
                              severity: "error",
                            });
                          }
                        });
                    },
                    () => {
                      setLoadingMsg("Updating Time...");
                      setLoading(true);
                      addNewUrl({
                        longUrl: url.longUrl,
                        expiresAt: 30,
                      }).then(resp => {
                        const [isSuccess, data, time] = resp;
                        if (isSuccess) {
                          setAlertInfo({
                            msg: "Url Updated successfully",
                          });
                          const newUrls = [...urls];
                          newUrls[idx].expiresAt = time;
                          setUrls([...newUrls]);
                        } else {
                          setAlertInfo({
                            msg: data as string,
                            severity: "error",
                          });
                          if (data === "Invalid Login") {
                            router.push(routerConfig.loginPage);
                          }
                        }
                        setLoading(false);
                        setLoadingMsg("Fetching Urls...");
                      });
                    },
                  ]}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Layout>
  );
};

export default withNavBar(UrlsPage);
