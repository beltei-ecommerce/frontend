import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BaseHeader from "../../components/BaseHeader.js";
import {
  Box,
  Card,
  CardActionArea,
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
      await dispatch.Product.getProducts({ page: 1, limit: 12 });
      await dispatch.Category.getCategories();
    } catch (error) {
      console.log(error);
    }
  }

  function changeTab(_, v) {
    setTab(v);
  }

  return (
    <div>
      <BaseHeader title="CC COMPUTER" />
      <h1 style={{ textAlign: "center" }}>Welcome to CC COMPUTER</h1>
      <Box sx={{ mx: 3 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
              return <Tab label={row.name} key={row.id} />;
            })}
          </Tabs>
        </div>

        <Grid container spacing={2}>
          {products.map((row) => {
            return (
              <Grid item lg={2} md={3} sm={4} key={row.id}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image=""
                      alt="Laptop png"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {row.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}
