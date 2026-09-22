import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "@/App";
import { theme } from "@/theme/theme";
import AppGlobalStyles from "@/theme/AppGlobalStyles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppGlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>
);
