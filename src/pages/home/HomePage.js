import { useEffect, useState } from "react";
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
} from "@mui/material";

export default function HomePage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const ProductStore = useSelector((store) => store.Product);
  const CategoryStore = useSelector((store) => store.Category);
  const { products } = ProductStore;
  const { categories } = CategoryStore;
  const [tab, setTab] = useState(0);

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);

  async function loadData() {
    try {
      await dispatch.Category.getCategories();
      await dispatch.Product.getProducts({
        page: 1,
        limit: 12,
        includeProductImages: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function changeTab(_, v) {
    setTab(v);
  }

  return (
    <div>
      <BaseHeader />
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
            {categories.map((row) => {
              return (
                <Tab label={row.name} key={row.id} sx={{ color: "white" }} />
              );
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

        <Grid container spacing={2}>
          {products.map((row) => {
            return (
              <Grid item lg={3} md={3} sm={4} key={row.id}>
                <Card
                  elevation={0}
                  sx={{ height: "400px", p: 2, background: "none" }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    alt="product png"
                    src={row.image}
                  />
                  <CardContent style={{ textAlign: "center" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ fontWeight: "bold", color: "white" }}
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
