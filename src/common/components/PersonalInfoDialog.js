import { useState, useRef, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNotifications } from "@toolpad/core/useNotifications";
import * as yup from "yup";
import { InputText, Select } from "../../common/form";
import { Close as CloseIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import { GENDERS } from "../../constants/index.js";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const formSchema = yup.object().shape({
  first_name: yup.string().required("Field required"),
  last_name: yup.string().required("Field required"),
  gender: yup.string().required("Field required"),
});

export default function PersonalInfoDialog({ open, user, onClose }) {
  const dispatch = useDispatch();
  const notifications = useNotifications();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  function onSave() {
    if (!formRef.current) return;

    formRef.current.handleSubmit(); // on validate from
  }
  async function save(payload) {
    setLoading(true);
    try {
      await dispatch.User.updateUser(payload);
      setLoading(false);
      notifications.show("Your personal information is saved successfully", {
        severity: "success",
        autoHideDuration: 4000,
      });
      await dispatch.User.fetchUser();
      onClose();
    } catch {
      setLoading(false);
      notifications.show("Something went wrong while saving", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  }

  return (
    <Fragment>
      <Dialog open={open} maxWidth="md">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Edit personal information
        </DialogTitle>
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 2 }}>
          <Formik
            innerRef={formRef}
            initialValues={{
              first_name: user.first_name,
              last_name: user.last_name,
              gender: user.gender,
              email: user.email,
            }}
            validationSchema={formSchema}
            enableReinitialize
            onSubmit={save}
          >
            {() => (
              <Form>
                <Card
                  elevation={0}
                  sx={{
                    width: 700,
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <p>Personal information</p>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="first_name"
                            label="First name"
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="last_name"
                            label="Last name"
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={Select}
                            name="gender"
                            label="Gender"
                            textValue="value"
                            textShow="label"
                            items={GENDERS}
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="email"
                            label="Email"
                            required
                            disabled={true}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={loading}
            fullWidth
            variant="contained"
            onClick={onSave}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
