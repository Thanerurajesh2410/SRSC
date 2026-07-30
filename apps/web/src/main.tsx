import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App";
import { QueryProvider } from "./providers/QueryProvider";
import { theme } from "./theme/theme";
import { ThemeModeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeModeProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ThemeModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);