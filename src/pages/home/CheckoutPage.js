import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDialogs } from "@toolpad/core/useDialogs";
import { useNotifications } from "@toolpad/core/useNotifications";
import Button from "@mui/material/Button";
import BaseHeader from "../../components/BaseHeader.js";
import AddressDialog from "../../components/home/checkout/AddressDialog.js";
import PaymentDialog from "../../components/PaymentDialog.js";
import {
  Box,
  CardMedia,
  Grid,
  Skeleton,
  IconButton,
  Typography,
  TextField,
  Card,
  Divider,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const dialogs = useDialogs();
  const dispatch = useDispatch();
  const CartStore = useSelector((store) => store.Cart);
  const UserStore = useSelector((store) => store.User);
  const { carts } = CartStore;
  const [disabledCheckoutBtn, setDisabledCheckoutBtn] = useState(false);
  const itemsRef = useRef([]);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!UserStore.token) return;

    loadData(); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const amount = carts.reduce(
      (acc, { quantity, product }) => acc + quantity * Number(product.price),
      0
    );
    setTotalAmount(amount);
  }, [carts]);

  function handleOpenPaymentDialog() {
    setOpenPaymentDialog(!openPaymentDialog);
  }
  function handleOpenAddressDialog() {
    setOpenAddressDialog(!openAddressDialog);
  }
  async function loadData() {
    await dispatch.Cart.getCarts();
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
      <PaymentDialog
        openAddressDialog={openPaymentDialog}
        onClose={() => {
          handleOpenPaymentDialog();
        }}
      />
      <AddressDialog
        openAddressDialog={openAddressDialog}
        onClose={() => {
          handleOpenAddressDialog();
        }}
      />
      <Box sx={{ mx: 24, my: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card elevation={0} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Shipping address
                  </Typography>
                  <Typography variant="body1">
                    Chetra Hong +855 60705802 Trapang Tloeung Market, Veng Sreng
                    Blvd, Phnom Penh / Phnom Penh Phnom Penh, Phnom
                    Penh/Cambodia, Cambodia, 1208
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Button variant="outlined" onClick={handleOpenAddressDialog}>
                    Change
                  </Button>
                </Grid>
              </Grid>
            </Card>
            <Card elevation={0} sx={{ p: 2, mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Payment Methods
              </Typography>
              <Typography variant="body1">Add a new card</Typography>
            </Card>
            <Card elevation={0} sx={{ p: 2, mt: 1 }}>
              {carts.map((row, index) => {
                return (
                  <Card key={row.id} elevation={0}>
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
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        ${Number(row.product.price).toFixed(2)}
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{ p: 2 }} elevation={0}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Summary
              </Typography>
              <Typography variant="body1">
                Subtotal US: <strong>${totalAmount}</strong>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1">
                Total US: <strong>${totalAmount}</strong>
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleOpenPaymentDialog}
              >
                Place order
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
