import * as yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNotifications } from "@toolpad/core/useNotifications";
import { Formik, Form, Field } from "formik";
import { InputPassword } from "../form/index.js";
import BaseHeader from "../../components/BaseHeader.js";

import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import HttpsIcon from "@mui/icons-material/Https";

const formSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password too short")
    .required("Field required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Field required"),
});

export default function ResetPasswordPage() {
  // React hook (Use when page first rendered)
  useEffect(() => {
    verifyResetPassword(); // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  async function verifyResetPassword() {
    try {
      await dispatch.User.verifyResetPassword({ token });
    } catch ({ response }) {
      if (response.data) {
        notifications.show(response.data.message, {
          severity: "error",
          autoHideDuration: 3000,
        });
        return navigate("/login");
      }

      notifications.show("Something went wrong while checking", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  }
  async function save(form) {
    setLoading(true);
    try {
      await dispatch.User.resetPassword({
        ...form,
        token,
      });
      setLoading(false);

      notifications.show("Password is changed successfully", {
        severity: "success",
        autoHideDuration: 4000,
      });
      navigate("/login");
    } catch {
      setLoading(false);
      notifications.show("Something went wrong while reseting", {
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
            password: "",
            password_confirmation: "",
          }}
          validationSchema={formSchema}
          onSubmit={save}
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
                    Reset new password
                  </Typography>
                  <p>Please reset a new password for your account.</p>

                  <Field
                    name="password"
                    component={InputPassword}
                    type="password"
                    label="Password"
                    required
                  />
                  <Field
                    name="password_confirmation"
                    component={InputPassword}
                    type="password"
                    label="Confirm Password"
                    required
                  />
                </CardContent>
                <CardActions>
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    fullWidth
                    variant="contained"
                  >
                    RESET
                  </LoadingButton>
                </CardActions>
              </Card>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
