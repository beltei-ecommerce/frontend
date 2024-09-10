import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";

import { InputText, InputPassword } from "../form";
import { useAlert } from "../../components/BaseAlert.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import HttpsIcon from "@mui/icons-material/Https";
import Typography from "@mui/material/Typography";

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
      await dispatch.User.login(form);
      setLoading(false);

      navigate("/");
    } catch ({ status, response }) {
      setLoading(false);
      if (status == 404 && response.data) {
        return showNotification(response.data.message, "error");
      }

      showNotification("Something went wrong while connecting", "error");
    }
  }

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
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
              <Card variant="outlined" sx={{ width: 500, textAlign: "center" }}>
                <CardContent>
                  <HttpsIcon fontSize="large" />
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                      fontSize: "clamp(2rem, 10vw, 2rem)",
                    }}
                  >
                    Sign in
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
                    Continue
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
