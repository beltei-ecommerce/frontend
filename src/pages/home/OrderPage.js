import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDialogs } from "@toolpad/core/useDialogs";
import { useNotifications } from "@toolpad/core/useNotifications";
import BaseHeader from "../../components/BaseHeader.js";
import {
  Box,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
  Card,
  Button,
} from "@mui/material";

export default function CartPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const dialogs = useDialogs();
  const dispatch = useDispatch();
  const OrderStore = useSelector((store) => store.Order);
  const { orders } = OrderStore;

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);

  async function loadData() {
    await dispatch.Order.getOrders();
  }
  function goTo(path) {
    return navigate(path);
  }
  async function onRemveOrder({ id }) {
    const confirmed = await dialogs.confirm(
      "Are you sure to remve your order?",
      {
        okText: "Yes",
        cancelText: "No",
      }
    );
    if (!confirmed) return;
    await dispatch.Order.deleteOrderById(id);
    notifications.show("Your order removed", {
      severity: "success",
      autoHideDuration: 4000,
    });
    await loadData();
  }

  return (
    <div>
      <BaseHeader />
      <Box sx={{ mx: 36, my: 3 }}>
        {!orders.length && (
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="body1"
              sx={{ color: "grey", textAlign: "center", mb: "40px" }}
            >
              You don't have order yet, please go to add one.
            </Typography>

            <Button variant="outlined" onClick={() => goTo("/")}>
              Explor items
            </Button>
          </div>
        )}

        {orders.map((row) => {
          return (
            <Card sx={{ mt: 1, px: 3 }} key={row.id} elevation={0}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ textAlign: "left", marginTop: "12px" }}>
                  <small>Order ID: {row.id}</small>
                  <br />
                  <small>Order date: {row.created_at}</small>
                </div>
                <div>
                  <p style={{ textAlign: "right" }}>
                    <strong>Total: US ${Number(row.amount).toFixed(2)}</strong>
                    <Button
                      variant="outlined"
                      sx={{ ml: 2 }}
                      onClick={() => onRemveOrder(row)}
                    >
                      Remove
                    </Button>
                  </p>
                </div>
              </div>
              {row.orderProducts.map((item) => {
                return (
                  <Grid container spacing={1} key={item.id}>
                    <Grid
                      item
                      xs={2}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {!item.product.image && (
                        <div style={{ width: 100, marginTop: 4 }}>
                          <Skeleton
                            sx={{ background: "#7878785d" }}
                            variant="rectangular"
                            width="100%"
                            height={57}
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

                      {item.product.image && (
                        <CardMedia
                          component="img"
                          height="104"
                          alt="product png"
                          src={item.product.image}
                        />
                      )}
                    </Grid>

                    <Grid item xs={8}>
                      <p>{item.product.name}</p>
                      <p>Brand: {item.product.category.name}</p>
                      <p>
                        US ${Number(item.unit_price).toFixed(2)}{" "}
                        <strong>x{item.quantity}</strong>
                      </p>
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: "right" }}>
                      <p>
                        Total: US $
                        {Number(item.quantity * item.unit_price).toFixed(2)}
                      </p>
                    </Grid>
                  </Grid>
                );
              })}
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
