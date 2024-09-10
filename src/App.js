import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./plugins/mui.js";
import Router from "./router/index.js";

import BaseHeader from "./components/BaseHeader.js";
import { BaseAlertProvider } from "./components/BaseAlert.js";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <BaseAlertProvider>
          <BaseHeader />
          <Router />
        </BaseAlertProvider>
      </>
    </ThemeProvider>
  );
}
