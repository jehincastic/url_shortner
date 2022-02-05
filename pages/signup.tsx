import type { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { LockOutlined } from "@mui/icons-material";

import { useAuth } from "@providers/AuthProvider";
import signUpSchema from "@schemas/signup";
import { useAlert } from "@providers/AlertProvider";
import fetcher from "@utils/fetcher";
import { LoginResponse, SignUpInput } from "@interfaces/index";
import DynamicForm from "@components/DynamicForm";
import signupForm from "@config/forms/signup";
import Layout from "@components/Layout";
import withNavBar from "@hocs/withNavBar";
import routerConfig from "@config/router";

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
};

const Signup: NextPage = () => {
  const { user, setUser } = useAuth();
  const { setAlertInfo } = useAlert();
  const router = useRouter();

  useEffect(() => {
    if (user.loggedIn) {
      router.push(routerConfig.homePage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signUpFn = async (formVal: SignUpForm) => {
    if (formVal.agreeToTerms) {
      const input: SignUpInput = {
        firstName: formVal.firstName,
        lastName: formVal.lastName,
        email: formVal.email,
        password: formVal.password,
      };
      const response = await fetcher<SignUpInput, string | LoginResponse>(
        routerConfig.api.signup,
        "POST",
        input,
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
          msg: `Welcome ${userInfo.firstName} ${userInfo.lastName}`,
        });
        setUser({
          ...userInfo,
          loggedIn: true,
          loading: false,
        });
      }
      return true;
    }
    setAlertInfo({
      msg: "Please accept the terms and conditions.",
      severity: "error",
    });
    return false;
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
            Sign up
          </Typography>
          <DynamicForm<SignUpForm>
            submit={async (values, actions) => {
              const val = await signUpFn(values);
              actions.setSubmitting(false);
              return val;
            }}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              agreeToTerms: false,
            }}
            schema={signUpSchema}
            buttonText="Sign Up"
            fields={signupForm}
          />
          <Grid
            container
            justifyContent="flex-end"
            sx={{
              my: 2,
            }}
          >
            <Grid item>
              <NextLink href={routerConfig.loginPage} passHref>
                <Link variant="body2">
                  Already have an account? Sign in
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default withNavBar(Signup);
