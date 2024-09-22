import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BaseHeader from "../../components/BaseHeader.js";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Tab,
  Tabs,
  TextField,
  Skeleton,
} from "@mui/material";

export default function HomePage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const ProductStore = useSelector((store) => store.Product);
  const CategoryStore = useSelector((store) => store.Category);
  const { products } = ProductStore;
  const { categories } = CategoryStore;
  const [tab, setTab] = useState(0);
  const [categoryId, setSategoryId] = useState(null);

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (categoryId === null) return;

    loadProducts({}); // eslint-disable-next-line
  }, [categoryId]);

  async function loadData() {
    await dispatch.Category.getCategories();
    await loadProducts({});
  }
  async function loadProducts({ name = null }) {
    await dispatch.Product.getProducts({
      page: 1,
      limit: 12,
      name,
      include_product_images: true,
      ...(categoryId && {
        fk_category_id: categoryId,
      }),
    });
  }
  async function changeTab(_, v) {
    setTab(v);
    setSategoryId(v);
  }
  const search = useCallback(
    // Prevent load data a lot of times
    debounce(function s(event) {
      loadProducts({ name: event.target.value });
    }, 900)
  );

  return (
    <div>
      <BaseHeader>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for products..."
          style={{ background: "white", width: "500px" }}
          onChange={search}
        />
      </BaseHeader>
      <div className="banner-container">
        <div className="banner"></div>
      </div>
      <Box sx={{ mx: 3, my: 2 }}>
        <div
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Tabs
            value={tab}
            onChange={changeTab}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            {[{ name: "POPULAR" }, ...categories].map((row, index) => {
              return <Tab label={row.name} key={index} value={row.id} />;
            })}
          </Tabs>
        </div>

        <Typography
          gutterBottom
          variant="h4"
          component="div"
          style={{
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          HOT PRODUCTS
        </Typography>

        {!products.length && (
          <Typography
            variant="body1"
            sx={{ color: "grey", textAlign: "center", mb: "40px" }}
          >
            No available products yet
          </Typography>
        )}

        <Grid container spacing={2}>
          {products.map((row) => {
            return (
              <Grid item lg={3} md={3} sm={4} key={row.id}>
                <Card
                  variant="outlined"
                  sx={{ height: "400px", p: 2, background: "none" }}
                >
                  {!row.image && (
                    <div>
                      <Skeleton
                        sx={{ background: "#7878785d" }}
                        variant="rectangular"
                        width="100%"
                        height={175}
                      />
                      <Skeleton sx={{ background: "#7878785d" }} width="100%" />
                      <Skeleton sx={{ background: "#7878785d" }} width="60%" />
                    </div>
                  )}

                  {row.image && (
                    <CardMedia
                      component="img"
                      height="220"
                      alt="product png"
                      src={row.image}
                    />
                  )}

                  <CardContent style={{ textAlign: "center" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ fontWeight: "bold" }}
                    >
                      {row.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "grey" }}>
                      {row.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}
