import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "../../components/BaseAlert.js";
import { Formik, Form, Field } from "formik";
import { InputText, InputPassword } from "../form";
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

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useAlert();
  const [loading, setLoading] = useState(false);

  async function connect(form) {
    setLoading(true);
    try {
      const { can_see_menus } = await dispatch.User.login(form);
      setLoading(false);
      if (can_see_menus) {
        return navigate("/admin/product");
      }

      navigate("/");
    } catch ({ status, response }) {
      setLoading(false);
      if (status === 404 && response.data) {
        return showNotification(response.data.message, "error");
      }

      showNotification("Something went wrong while connecting", "error");
    }
  }

  return (
    <div>
      <BaseHeader title="CC COMPUTER" />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
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
                  <p>Welcome user, please sign in to continue</p>
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
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    fullWidth
                    variant="contained"
                  >
                    SIGN IN
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
