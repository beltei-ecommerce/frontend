import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./plugins/mui.js";
import Router from "./router/index.js";
import { useSelector } from "react-redux";

import BaseMenu from "./components/BaseMenu.js";
import { BaseAlertProvider } from "./components/BaseAlert.js";

export default function App() {
  const { canSeeMenu } = useSelector((store) => store.User);

  return (
    <ThemeProvider theme={theme}>
      <>
        <BaseAlertProvider>
          {canSeeMenu && <BaseMenu />}

          <Router />
        </BaseAlertProvider>
      </>
    </ThemeProvider>
  );
}
