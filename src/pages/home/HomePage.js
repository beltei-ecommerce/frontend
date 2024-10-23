import React, { useEffect, useState } from "react";
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
  Skeleton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";

let currentPage = 1;

export default function HomePage() {
  const dispatch = useDispatch();
  const ProductStore = useSelector((store) => store.Product);
  const CategoryStore = useSelector((store) => store.Category);
  const { products } = ProductStore;
  const { categories } = CategoryStore;
  const [tab, setTab] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setHasMore(products.length < totalCount);
  }, [products, totalCount]);

  async function loadData() {
    currentPage = 1;
    await dispatch.Category.getCategories();
    await loadProducts({});
  }
  async function loadProducts({
    name = null,
    fk_category_id = null,
    isScrollMore = false,
  }) {
    setLoading(true);
    try {
      const {
        data: { count },
      } = await dispatch.Product.getProducts({
        isScrollMore,
        page: currentPage,
        limit: 4,
        name,
        include_product_images: true,
        ...(fk_category_id && { fk_category_id }),
      });
      setTotalCount(count);
      currentPage += 1;

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }
  async function search() {
    setTab(0);
    setCategoryId(null);
    // setTotalCount(0);
    currentPage = 1;
    await loadProducts({ name: searchText });
  }
  async function changeTab(_, v) {
    setTab(v);
    setSearchText("");
    setCategoryId(v);
    currentPage = 1;
    setTotalCount(0);
    await loadProducts({ fk_category_id: v });
  }
  function handleChangeSearchText(event) {
    setSearchText(event.target.value);
  }
  async function handleScroll() {
    await loadProducts({
      isScrollMore: true,
      name: searchText,
      fk_category_id: categoryId,
    });
  }
  function goToProduct({ id }) {
    return window.open(`/item/${id}`, "_blank");
  }

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={handleScroll}
      hasMore={hasMore}
    >
      <div>
        <BaseHeader>
          <FormControl
            variant="outlined"
            size="small"
            style={{ background: "white", width: "500px" }}
          >
            <OutlinedInput
              type="text"
              placeholder="Search for products..."
              value={searchText}
              onChange={handleChangeSearchText}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={search}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
              scrollButtons={true}
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
              {!products.length && searchText
                ? "Your result search is no available products yet"
                : "No available products yet"}
            </Typography>
          )}

          <Grid container spacing={2}>
            {products.map((row) => {
              return (
                <Grid item lg={3} md={3} sm={4} key={row.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "400px",
                      p: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => goToProduct(row)}
                  >
                    {!row.image && (
                      <div>
                        <Skeleton
                          sx={{ background: "#7878785d" }}
                          variant="rectangular"
                          width="100%"
                          height={175}
                        />
                        <Skeleton
                          sx={{ background: "#7878785d" }}
                          width="100%"
                        />
                        <Skeleton
                          sx={{ background: "#7878785d" }}
                          width="60%"
                        />
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

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </div>
    </InfiniteScroll>
  );
}
