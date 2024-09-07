import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4d4e9c",
    },
    secondary: {
      main: green[500],
    },
  },
});
