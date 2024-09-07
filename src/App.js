import { ThemeProvider } from "@mui/material/styles";
import BaseHeader from "./components/BaseHeader.js";
import { theme } from "./plugins/mui.js";
import Router from "./router/index.js";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <BaseHeader />
        <Router />
      </>
    </ThemeProvider>
  );
}
