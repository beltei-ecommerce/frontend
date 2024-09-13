import React, { createContext, useContext, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomAlertContext = createContext();

export const BaseAlertProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showNotification = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const close = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <CustomAlertContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={close}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </CustomAlertContext.Provider>
  );
};

export const useAlert = () => useContext(CustomAlertContext);
