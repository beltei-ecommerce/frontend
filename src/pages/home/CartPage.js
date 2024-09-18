import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseHeader from "../../components/BaseHeader.js";
import { Box, CardMedia, Grid, Divider, Skeleton } from "@mui/material";

export default function CartPage() {
  const dispatch = useDispatch();
  const CartStore = useSelector((store) => store.Cart);
  const { carts } = CartStore;

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);

  async function loadData() {
    await dispatch.Cart.getCarts();
  }

  return (
    <div>
      <BaseHeader />
      <Box sx={{ marginTop: "60px" }}>
        <Box sx={{ mx: 4, mb: 4 }}>
          <Grid container spacing={1}>
            <Grid item xs={2} />
            <Grid item xs={3}>
              Name
            </Grid>
            <Grid item xs={2}>
              Code
            </Grid>
            <Grid item xs={2}>
              Quantity
            </Grid>
            <Grid item xs={2}>
              Unit Price
            </Grid>
            <Grid item xs={1}>
              Total
            </Grid>
          </Grid>
        </Box>

        {carts.map((row) => {
          return (
            <Box sx={{ mx: 4, mt: 1 }} key={row.id}>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {!row.product.image && (
                    <div style={{ width: "100px" }}>
                      <Skeleton
                        sx={{ background: "#7878785d" }}
                        variant="rectangular"
                        width="100%"
                        height={57}
                      />
                      <Skeleton sx={{ background: "#7878785d" }} width="100%" />
                      <Skeleton sx={{ background: "#7878785d" }} width="60%" />
                    </div>
                  )}

                  {row.product.image && (
                    <CardMedia
                      component="img"
                      height="100"
                      alt="product png"
                      src={row.product.image}
                    />
                  )}
                </Grid>
                <Grid item xs={3}>
                  {row.product.name}
                </Grid>
                <Grid item xs={2}>
                  {row.product.product_code}
                </Grid>
                <Grid item xs={2}>
                  {row.quantity}
                </Grid>
                <Grid item xs={2}>
                  ${Number(row.product.price).toFixed(2)}
                </Grid>
                <Grid item xs={1}>
                  {Number(row.quantity * row.product.price).toFixed(2)}
                </Grid>
              </Grid>
              <Divider sx={{ background: "grey" }} />
            </Box>
          );
        })}
      </Box>
    </div>
  );
}
