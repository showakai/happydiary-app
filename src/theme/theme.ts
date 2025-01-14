import "@emotion/react";
import { createTheme } from "@mui/material";

import { deepPurple } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    bgColor: {
      main: string;
      light?: string;
      dark?: string;
    };
    basefontColor: {
      main: string;
      light?: string;
      dark?: string;
    };
    pink: {
      main: string;
    };
  }
  interface PaletteOptions {
    bgColor?: {
      main: string;
      light?: string;
      dark?: string;
    };
    basefontColor?: {
      main: string;
      light?: string;
      dark?: string;
    };
    pink?: {
      main: string;
    };
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: "#F5D2D1",
    },
    secondary: {
      main: deepPurple[200],
    },
    bgColor: {
      main: "#fbf0f1",
      light: "#f0ebf5",
      dark: "#333",
    },
    basefontColor: {
      main: "#444444",
      light: "#444444",
      dark: "#dddddd",
    },
    pink: {
      main: "#da8888",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--headerH": "60px",
          "--bottomNavH": "70px",
          "--topH": "calc(100vh - var(--headerH) - var(--bottomNavH))",
        },
      },
    },
  },
});
