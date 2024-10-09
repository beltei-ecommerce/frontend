import * as React from "react";
import { useDispatch } from "react-redux";
import { useNotifications } from "@toolpad/core/useNotifications";
import * as yup from "yup";
import { InputText } from "../../../common/form";
import { Close as CloseIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import {
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from "@mui/material";

const formSchema = yup.object().shape({
  name: yup.string().required("Field required"),
  telephone: yup.string().required("Field required"),
  address1: yup.string().required("Field required"),
  city: yup.string().required("Field required"),
  post_code: yup.string().required("Field required"),
  country: yup.string().required("Field required"),
  region: yup.string().required("Field required"),
});

export default function AddAddressDialog({ openAddressDialog, onClose, loadData }) {
  const dispatch = useDispatch();
  const notifications = useNotifications();
  const formRef = React.useRef(null);
  function onSave() {
    if (!formRef.current) return;

    formRef.current.handleSubmit(); // on validate from
  }
  async function save(payload) {
    await dispatch.Address.createAddress(payload);
    notifications.show("Address is created", {
      severity: "success",
      autoHideDuration: 4000,
    });
    loadData();
    onClose();
  }
  return (
    <React.Fragment>
      <Dialog open={openAddressDialog} maxWidth="md">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Add new address
        </DialogTitle>
        <IconButton
          aria-label="close"
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
              name: "",
              telephone: "+855 ",
              company: "",
              address1: "",
              address2: "",
              city: "",
              post_code: "",
              country: "",
              region: "",
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
                      <p>Contact information</p>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="name"
                            label="Contact name"
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="telephone"
                            label="Phone number"
                            required
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <p>Address</p>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Field
                            component={InputText}
                            name="company"
                            label="Company"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="address1"
                            label="Address 1"
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="address2"
                            label="Address 2"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="city"
                            label="City"
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="post_code"
                            label="Post code"
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="country"
                            label="Country"
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={InputText}
                            name="region"
                            label="Region"
                            required
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
          <Button variant="contained" fullWidth onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
