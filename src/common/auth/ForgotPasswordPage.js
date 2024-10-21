import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNotifications } from "@toolpad/core/useNotifications";
import { Formik, Form, Field } from "formik";
import { InputText } from "../form/index.js";
import BaseHeader from "../../components/BaseHeader.js";

import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import HttpsIcon from "@mui/icons-material/Https";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Field required"),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false);

  async function send(form) {
    setLoading(true);
    try {
      const { message } = await dispatch.User.sendRequestResetPassword(form);
      setLoading(false);

      notifications.show(message, {
        severity: "success",
        // autoHideDuration: 4000,
      });
      navigate("/login");
    } catch ({ status, response }) {
      setLoading(false);
      if (status === 404 && response.data) {
        return notifications.show(response.data.message, {
          severity: "error",
          autoHideDuration: 3000,
        });
      }

      notifications.show("Something went wrong while sending", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  }

  return (
    <div>
      <BaseHeader />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={formSchema}
          onSubmit={send}
        >
          {() => (
            <Form>
              <Card
                elevation={0}
                sx={{
                  width: 500,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <HttpsIcon fontSize="large" />
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                      fontSize: "clamp(2rem, 10vw, 2rem)",
                    }}
                  >
                    Forgot Password
                  </Typography>
                  <p>Enter your email to reset a new password</p>

                  <Field
                    component={InputText}
                    name="email"
                    label="Email"
                    required
                  />
                </CardContent>
                <CardActions>
                  <div style={{ width: "100%" }}>
                    <LoadingButton
                      type="submit"
                      loading={loading}
                      fullWidth
                      variant="contained"
                    >
                      SEND
                    </LoadingButton>
                  </div>
                </CardActions>
              </Card>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
