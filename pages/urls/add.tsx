import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";

import withNavBar from "@hocs/withNavBar";
import Layout from "@components/Layout";
import { useAlert } from "@providers/AlertProvider";
import { UrlType, UrlInput } from "@interfaces/index";
import fetcher from "@utils/fetcher";
import DynamicForm from "@components/DynamicForm";
import addUrlForm from "@config/forms/addUrl";
import addUrlSchema from "@schemas/addUrl";
import { addTime, copyToClipboard } from "@utils/index";
import routerConfig from "@config/router";


export const addNewUrl = async (data: UrlInput): Promise<[boolean, string, number]> => {
  try {
    const expiresAt = addTime(data.expiresAt).getTime();
    const inputData: UrlInput = {
      ...data,
      expiresAt,
    };
    const urlData = await fetcher<UrlInput, string>(
      routerConfig.api.addUrl,
      "POST",
      inputData,
    );
    if (urlData.status === "SUCCESS") {
      return [true, urlData.data, expiresAt];
    }
    throw new Error(urlData.data);
  } catch (err: any) {
    return [false, err?.message || "Something went wrong", 0];
  }
};

const AddUrl: NextPage = () => {
  const router = useRouter();
  const { setAlertInfo } = useAlert();

  return (
    <Layout
      isPrivate
      showChildOnLoading
    >
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          mx: "auto",
        }}
      >
        <DynamicForm<UrlInput>
          submit={async (values, actions) => {
            const [isSuccess, data] = await addNewUrl(values);
            if (isSuccess) {
              await copyToClipboard(`${process.env.baseUrl}/${data}`);
              setAlertInfo({
                msg: "Url added successfully",
              });
              router.push(routerConfig.urlsPage);
            } else {
              setAlertInfo({
                msg: data as string,
                severity: "error",
              });
              if (data === "Invalid Login") {
                router.push(routerConfig.loginPage);
              }
            }
            actions.setSubmitting(false);
            return isSuccess;
          }}
          initialValues={{
            longUrl: "",
            expiresAt: 30,
          }}
          schema={addUrlSchema}
          buttonText="Add Or Update Url"
          buttonProps={{
            variant: "text",
          }}
          fields={addUrlForm}
        />
      </Box>
    </Layout>
  );
};

export default withNavBar(AddUrl);
