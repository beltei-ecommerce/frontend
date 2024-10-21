import * as yup from "yup";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid } from "@mui/material";
import { Close as CloseIcon, SaveAs as SaveAsIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import { InputText, TextArea, Select } from "../../../common/form";
import { useNotifications } from "@toolpad/core/useNotifications";
import AdminHeader from "../../../components/AdminHeader.js";
import BaseLoading from "../../../components/BaseLoading.js";

const formSchema = yup.object().shape({
  name: yup.string().required("Field required"),
});

export default function ProductEditPage() {
  // React hook (Use when page first rendered)
  useEffect(() => {
    reloadProduct(); // eslint-disable-next-line
  }, []);

  // Variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const CategoryStore = useSelector((store) => store.Category);
  const { categories } = CategoryStore;
  const formRef = useRef(null);
  const { id } = useParams();
  const isCreated = id ? false : true;
  const [title, setTitle] = useState("");
  const [initialForm, setInitialForm] = useState({
    fk_category_id: "",
    name: "",
    product_code: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Methods
  async function reloadProduct() {
    setLoading(true);
    await dispatch.Category.getCategories();

    if (isCreated) {
      setTitle("Create new product");
    } else {
      const { data } = await dispatch.Product.getProductById(id);
      setTitle(`N°${id} | ${data.name}`);
      setInitialForm(data);
    }

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
        await dispatch.Product.createProduct(payload);
      } else {
        await dispatch.Product.updateProductById({ id, payload });
      }
      const message = isCreated
        ? "Product successfully created"
        : "Product successfully updated";
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
    return navigate("/admin/product");
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
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <Card elevation={0}>
                    <CardContent>
                      <p>Information</p>
                      <Grid container>
                        <Grid item xs={12}>
                          <Field
                            component={InputText}
                            name="name"
                            label="Name"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            component={InputText}
                            name="product_code"
                            label="Code"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            component={Select}
                            name="fk_category_id"
                            label="Category"
                            textValue="id"
                            textShow="name"
                            items={categories}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            component={InputText}
                            name="price"
                            label="Price"
                            type="number"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            component={TextArea}
                            name="description"
                            label="Description"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={6}>
                  <Card elevation={0}>Images</Card>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
