import {
  RouterProvider,
  //   Routes,
} from "react-router-dom";
// import Top from "./components/pages/Top";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
// import All from "./components/pages/All";
// import { useState } from "react";
// import { DailyContents } from "./types/types";
// import Login from "./components/pages/Login";
import routesLink from "./route/routesLink";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  return (
    <>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={routesLink} />
        </ThemeProvider>
      </AppContextProvider>
    </>
  );
};

export default App;
