import * as React from "react";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";

import "@styles/globals.css";
import { createEmotionCache } from "@lib/createEmotionCache";
import AlertProvider from "@providers/AlertProvider";
import ThemeProvider from "@providers/ThemeProvider";
import { AuthProvider } from "@providers/AuthProvider";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <AlertProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
