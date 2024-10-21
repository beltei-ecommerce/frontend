import * as yup from "yup";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent } from "@mui/material";
import { Close as CloseIcon, SaveAs as SaveAsIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import { InputText } from "../../../common/form";
import { useNotifications } from "@toolpad/core/useNotifications";
import AdminHeader from "../../../components/AdminHeader.js";
import BaseLoading from "../../../components/BaseLoading.js";

const formSchema = yup.object().shape({
  name: yup.string().required("Field required"),
});

export default function CategoryEditPage() {
  // React hook (Use when page first rendered)
  useEffect(() => {
    reloadCategory(); // eslint-disable-next-line
  }, []);

  // Variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const formRef = useRef(null);
  const { id } = useParams();
  const isCreated = id ? false : true;
  const [title, setTitle] = useState("");
  const [initialForm, setInitialForm] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  // Methods
  async function reloadCategory() {
    if (isCreated) {
      setTitle("Create new category");
      return;
    }

    setLoading(true);
    const { data } = await dispatch.Category.getCategoryById(id);
    setTitle(`N°${id} | ${data.name}`);
    setInitialForm(data);
    setLoading(false);
  }
  function onSave() {
    if (!formRef.current) return;

    formRef.current.handleSubmit(); // on validate from
  }
  async function save(payload) {
    setLoading(true);
    try {
      if (isCreated) {
        await dispatch.Category.createCategory(payload);
      } else {
        await dispatch.Category.updateCategoryById({ id, payload });
      }
      const message = isCreated
        ? "Category successfully created"
        : "Category successfully updated";
      notifications.show(message, {
        severity: "success",
        autoHideDuration: 4000,
      });
      setLoading(false);
      exit();
    } catch {
      setLoading(false);
      const message = isCreated
        ? "Something went wrong while creating"
        : "Something went wrong while updating";
      notifications.show(message, {
        severity: "error",
        autoHideDuration: 4000,
      });
    }
  }
  function exit() {
    return navigate("/admin/category");
  }

  return (
    <div>
      <BaseLoading loading={loading} />
      <Box component="main" sx={{ marginLeft: "4rem", p: 2 }}>
        <AdminHeader title={title} hideBth={false}>
          <Button
            variant="contained"
            style={{ marginRight: "8px" }}
            type="submit"
            startIcon={<SaveAsIcon />}
            onClick={onSave}
          >
            Save
          </Button>
          <Button variant="outlined" startIcon={<CloseIcon />} onClick={exit}>
            Close
          </Button>
        </AdminHeader>
        <Formik
          enableReinitialize
          initialValues={initialForm}
          validationSchema={formSchema}
          innerRef={formRef}
          onSubmit={save}
        >
          {() => (
            <Form>
              <Card elevation={0}>
                <CardContent>
                  <p>Information</p>
                  <Field
                    component={InputText}
                    name="name"
                    label="Name"
                    required
                  />
                </CardContent>
              </Card>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
