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
import { converToLocal, copyToClipboard, formatDate } from "@utils/index";
import fetcher from "@utils/fetcher";
import routerConfig from "@config/router";


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
  const timeString = formatDate(converToLocal(new Date(expiresAt)));
  return `Expires at ${timeString}`;
};

const isExpired = (expiresAt: number): boolean => {
  const localDate = converToLocal(new Date(expiresAt));
  if (localDate.getTime() < Date.now()) {
    return true;
  }
  return false;
}

const UrlsPage: NextPage = () => {
  const router = useRouter();
  const { setAlertInfo } = useAlert();
  const [loading, setLoading] = useState(true);
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
      loadingText="Fetching Urls..."
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
                md={3}
                sx={{
                  mt: 2,
                }}
              >
                <Card
                  title={url.longUrl}
                  subTitle={getExpiryString(url.expiresAt)}
                  btnTitle={["Open Link", "Copy Link"]}
                  btnProps={[{
                    disabled: expired,
                  }, {
                    disabled: expired,
                  }]}
                  btnAction={[
                    () => {
                      window.open(url.shortUrl, "_blank");
                    },
                    () => {
                      copyToClipboard(url.shortUrl).then((data) => {
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
                      })
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
