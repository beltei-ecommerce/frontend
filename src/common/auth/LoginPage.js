import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNotifications } from "@toolpad/core/useNotifications";
import { Formik, Form, Field } from "formik";
import { InputText, InputPassword } from "../form/index.js";
import BaseHeader from "../../components/BaseHeader.js";

import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import HttpsIcon from "@mui/icons-material/Https";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Field required"),
  password: yup.string().required("Field required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false);

  function goTo(path) {
    return navigate(path);
  }
  async function connect(form) {
    setLoading(true);
    try {
      const { can_see_menus } = await dispatch.User.login(form);
      setLoading(false);

      await dispatch.User.fetchUser();
      if (can_see_menus) {
        return navigate("/admin/product");
      }

      navigate("/");
    } catch ({ status, response }) {
      setLoading(false);
      if (status === 404 && response.data) {
        return notifications.show(response.data.message, {
          severity: "error",
        });
      }

      notifications.show("Something went wrong while connecting", {
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
            password: "",
          }}
          validationSchema={formSchema}
          onSubmit={connect}
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
                    Account Login
                  </Typography>
                  <p>Welcome to Public of Gamer, please sign in to continue</p>

                  <Field
                    component={InputText}
                    name="email"
                    label="Email"
                    required
                  />
                  <Field
                    component={InputPassword}
                    name="password"
                    label="Password"
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
                      SIGN IN
                    </LoadingButton>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div>
                        <p>Don't have an account yet,</p>
                        <Typography
                          component="strong"
                          sx={(theme) => ({
                            color: theme.palette.primary.main,
                            cursor: "pointer",
                          })}
                          onClick={() => goTo("/signup")}
                        >
                          Sign up now
                        </Typography>
                      </div>
                      <div>
                        <p>Don't remember password,</p>
                        <Typography
                          component="strong"
                          sx={(theme) => ({
                            color: theme.palette.primary.main,
                            cursor: "pointer",
                          })}
                          onClick={() => goTo("/forgot_password")}
                        >
                          Forgot password
                        </Typography>
                      </div>
                    </div>
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
