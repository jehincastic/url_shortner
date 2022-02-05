import type { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LockOutlined } from "@mui/icons-material";
import Link from "@mui/material/Link";
import NextLink from "next/link";

import { useAuth } from "@providers/AuthProvider";
import { AlertContext } from "@providers/AlertProvider";
import { LoginInput, LoginResponse } from "@interfaces/index";
import fetcher from "@utils/fetcher";
import DynamicForm from "@components/DynamicForm";
import loginSchema from "@schemas/login";
import loginForm from "@config/forms/login";
import Layout from "@components/Layout";
import withNavBar from "@hocs/withNavBar";
import routerConfig from "@config/router";

const Login: NextPage = () => {
  const { user, setUser } = useAuth();
  const { setAlertInfo } = useContext(AlertContext);
  const router = useRouter();

  useEffect(() => {
    if (user.loggedIn) {
      router.push(routerConfig.homePage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loginFn = async (formVal: LoginInput) => {
    const response = await fetcher<LoginInput, LoginResponse | string>(
      routerConfig.api.login,
      "POST",
      formVal,
    );
    if (response.status === "FAILED") {
      setAlertInfo({
        msg: response.data as string,
        severity: "error",
      });
    } else {
      const {
        token,
        user: userInfo,
      } = response.data as LoginResponse;
      localStorage.setItem(process.env.tokenKey || "", token);
      setAlertInfo({
        msg: "Logged In Successfully...",
      });
      setUser({
        ...userInfo,
        loggedIn: true,
        loading: false,
      });
    }
    return true;
  };

  return (
    <Layout loading={user.loading} loadingText="Fetching Info..." showChildOnLoading>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <DynamicForm<LoginInput>
            submit={async (values, actions) => {
              const val = await loginFn(values);
              actions.setSubmitting(false);
              return val;
            }}
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            schema={loginSchema}
            buttonText="Login"
            fields={loginForm}
          />
          <Grid sx={{ my: 2 }} container>
            <Grid item xs>
              <NextLink href={routerConfig.signUpPage} passHref>
                <Link variant="body2">
                  New Here?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default withNavBar(Login);
