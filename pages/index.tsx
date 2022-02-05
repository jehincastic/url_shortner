import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

import Layout from "@components/Layout";
import withNavBar from "@hocs/withNavBar";
import { useAuth } from "@providers/AuthProvider";
import Button from "@components/Button";
import routerConfig from "@config/router";

const Home: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <Layout>
      <Box
        sx={{
          width: "90%",
          margin: "10% auto",
          textAlign: "center",
        }}
      >
        {
          user.loggedIn ? (
            <>
              <Typography variant="h3" gutterBottom component="div">
                Welcome Back {user.firstName}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h3" gutterBottom component="div">
                Welcome to the {process.env.appName}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  router.push(routerConfig.signUpPage);
                }}
              >
                Get Started
              </Button>
            </>
          )
        }
      </Box>
    </Layout>
  );
};

export default withNavBar(Home);
