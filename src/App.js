import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./plugins/mui.js";
import Router from "./router/index.js";
import { useSelector } from "react-redux";
import store from "./common/loading/store.js";
import { LinearProgress } from "@mui/material";

import BaseMenu from "./components/BaseMenu.js";
import { BaseAlertProvider } from "./components/BaseAlert.js";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

export default function App() {
  const { canSeeMenu } = useSelector((store) => store.User);
  const loading = store.getState().Loading.loading;

  return (
    <ThemeProvider theme={theme}>
      <>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: "9999",
              color: "red",
              width: "100%",
              height: "100%",
            }}
          >
            <LinearProgress />
          </div>
        )}
        <NotificationsProvider>
          <DialogsProvider>
            <BaseAlertProvider>
              {canSeeMenu && <BaseMenu />}

              <Router />
            </BaseAlertProvider>
          </DialogsProvider>
        </NotificationsProvider>
      </>
    </ThemeProvider>
  );
}
