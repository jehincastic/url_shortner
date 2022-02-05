import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

import { useAuth } from "@providers/AuthProvider";
import routerConfig from "@config/router";

interface LayoutProps {
  loading?: boolean;
  loadingText?: string;
  showChildOnLoading?: boolean;
  isPrivate?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  loading,
  showChildOnLoading,
  loadingText = "Loading",
  children,
  isPrivate = false,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isPrivate && !user.loading && !user.loggedIn) {
      router.push(routerConfig.loginPage);
    }
  }, [user]);

  if (loading || user.loading) {
    return (
      <>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
            display: "flex",
            flexDirection: "column",
          }}
          open={user.loading || !!loading}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 3 }} variant="h6" gutterBottom component="div">
            {user.loading ? "Fetching User..." : loadingText}
          </Typography>
        </Backdrop>
        {showChildOnLoading && children}
      </>
    );
  }
  if (isPrivate) {
    return (
      <>
        {user.loggedIn && children}
      </>
    );
  }
  return (
    <>
      {children}
    </>
  );
};

export default Layout;
