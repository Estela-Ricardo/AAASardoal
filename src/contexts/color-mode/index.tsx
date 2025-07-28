// src/contexts/color-mode/index.tsx
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  // Defines the base theme
  const baseTheme =
    // you can change the theme colors here. example: mode === "light" ? RefineThemes.Magenta : RefineThemes.MagentaDark
    mode === "light" ? RefineThemes.Purple : RefineThemes.PurpleDark;

  // Creates a custom theme that overrides default to correct exagerated fontSize
  const customTheme = createTheme({
    ...baseTheme,
    typography: {
      ...baseTheme.typography,
      fontSize: 14,
      h1: {
        fontSize: "1.4rem",
      },
      h2: {
        fontSize: "1.3rem",
      },
      h3: {
        fontSize: "1.2rem",
      },
      h4: {
        fontSize: "1.1rem",
      },
      h5: {
        fontSize: "1rem",
      },
      h6: {
        fontSize: "0.875rem",
      },
      button: {
        textTransform: "none", // removes CAPSLOCK
        fontSize: "0.875rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const isDelete =
              (ownerState.variant === "outlined" || ownerState.variant === "text") && ownerState.color === "error";

            return {
              ...(isDelete && {
                color: "#888",
                 borderColor: "#888",
                '&:hover': {
                  backgroundColor: "rgba(83, 83, 83, 0.2)",
                },
              }),
            };
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.8rem",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontSize: "0.875rem",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },

    },



  });

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider theme={customTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
