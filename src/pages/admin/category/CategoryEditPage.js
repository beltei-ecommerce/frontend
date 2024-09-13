import * as yup from "yup";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent } from "@mui/material";
import { Close as CloseIcon, SaveAs as SaveAsIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import { InputText } from "../../../common/form";
import { useAlert } from "../../../components/BaseAlert.js";
import AdminHeader from "../../../components/AdminHeader.js";

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
  const { showNotification } = useAlert();
  const formRef = useRef(null);
  const { id } = useParams();
  const isCreated = id ? false : true;
  const [title, setTitle] = useState("");
  const [initialForm, setInitialForm] = useState({ name: "" });

  // Methods
  async function reloadCategory() {
    if (isCreated) {
      setTitle("Create new category");
      return;
    }

    const { data } = await dispatch.Category.getCategoryById(id);
    setTitle(`N°${id} | ${data.name}`);
    setInitialForm(data);
  }
  function onSave() {
    if (!formRef.current) return;

    formRef.current.handleSubmit(); // on validate from
  }
  async function save(payload) {
    try {
      if (isCreated) {
        await dispatch.Category.createCategory(payload);
      } else {
        await dispatch.Category.updateCategoryById({ id, payload });
      }
      showNotification(
        isCreated
          ? "Category successfully created"
          : "Category successfully updated",
        "success"
      );
      exit();
    } catch {
      return showNotification(
        isCreated
          ? "Something went wrong while creating"
          : "Something went wrong while updating",
        "error"
      );
    }
  }
  function exit() {
    return navigate("/admin/category");
  }

  return (
    <div>
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
