import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider, Theme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "@lib/theme";
import { ThemeType } from "@interfaces/index";

interface ContextInterface {
  theme: Theme;
  themeName: ThemeType;
  setTheme: (newTheme: ThemeType) => void;
}

export const ThemeContext = React.createContext<ContextInterface>({
  themeName: "light",
  theme: theme.light,
  setTheme: () => {},
});

const ThemeProvider: React.FC<{}> = ({ children }) => {
  const [themeName, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    // set theme based on local storage
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme as ThemeType);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme[themeName],
        themeName,
        setTheme,
      }}
    >
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme[themeName]}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


export default ThemeProvider;
