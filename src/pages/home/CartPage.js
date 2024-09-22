import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDialogs } from "@toolpad/core/useDialogs";
import { useNotifications } from "@toolpad/core/useNotifications";
import Button from "@mui/material/Button";
import BaseHeader from "../../components/BaseHeader.js";
import {
  Box,
  CardMedia,
  Grid,
  Skeleton,
  IconButton,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function CartPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const dialogs = useDialogs();
  const dispatch = useDispatch();
  const CartStore = useSelector((store) => store.Cart);
  const UserStore = useSelector((store) => store.User);
  const { carts } = CartStore;
  const [disabledCheckoutBtn, setDisabledCheckoutBtn] = useState(false);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!UserStore.token) return;

    loadData(); // eslint-disable-next-line
  }, []);

  async function loadData() {
    await dispatch.Cart.getCarts();
  }
  function goToProducts() {
    return navigate("/");
  }
  async function onDeleteItem(id) {
    const confirmed = await dialogs.confirm(
      "Are you sure to delete your item?",
      {
        okText: "Yes",
        cancelText: "No",
      }
    );
    if (!confirmed) return;

    try {
      await dispatch.Cart.deleteCartById(id);
      notifications.show("Your item deleted", {
        severity: "success",
        autoHideDuration: 4000,
      });
      await loadData();
    } catch (error) {
      console.log(error);
    }
  }
  async function onChangeItem(id, event) {
    try {
      const disabled = itemsRef.current.find(
        (item) =>
          !item.firstChild.firstChild.value ||
          item.firstChild.firstChild.value < 1
      );
      setDisabledCheckoutBtn(!!disabled);

      if (!event.target.value) return;
      if (event.target.value < 1) {
        notifications.show("Input quantity is imposible", {
          severity: "error",
          autoHideDuration: 3000,
        });
        return;
      }

      const payload = { quantity: event.target.value };
      await dispatch.Cart.updateCartById({ id, payload });
      notifications.show("Your quantity updated", {
        severity: "success",
        autoHideDuration: 4000,
      });
      await loadData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <BaseHeader />
      <Box sx={{ m: 3 }}>
        {carts.length > 0 && (
          <div style={{ marginBottom: 20, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={goToProducts}
              disabled={disabledCheckoutBtn}
            >
              Check out
            </Button>
          </div>
        )}

        {!carts.length && (
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="body1"
              sx={{ color: "grey", textAlign: "center", mb: "40px" }}
            >
              You don't have items yet, please go to add one.
            </Typography>

            <Button variant="outlined" onClick={goToProducts}>
              View Products
            </Button>
          </div>
        )}

        {carts.length > 0 && (
          <Box sx={{ mb: 4 }}>
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
              <Grid item xs={1}>
                Unit Price
              </Grid>
              <Grid item xs={1}>
                Total
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Box>
        )}

        {carts.map((row, index) => {
          return (
            <Card sx={{ mt: 1 }} key={row.id} variant="outlined">
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {!row.product.image && (
                    <div style={{ width: 100, marginTop: 4 }}>
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
                      height="104"
                      alt="product png"
                      src={row.product.image}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {row.product.name}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {row.product.product_code}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    ref={(el) => (itemsRef.current[index] = el)}
                    variant="outlined"
                    size="small"
                    placeholder="Quantity"
                    type="number"
                    sx={{ width: 140 }}
                    defaultValue={row.quantity}
                    onChange={(event) => onChangeItem(row.id, event)}
                  />
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  ${Number(row.product.price).toFixed(2)}
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    ${Number(row.quantity * row.product.price).toFixed(2)}
                  </span>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDeleteItem(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
