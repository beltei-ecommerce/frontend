import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AddAddressDialog from "./AddAddressDialog.js";

export default function AddressDialog({ openAddressDialog, onClose }) {
  const dispatch = useDispatch();
  const AddressStore = useSelector((store) => store.Address);
  const { addresses } = AddressStore;
  const [openAddAddressDialog, setOpenAddAddressDialog] = React.useState(false);

  React.useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);

  async function loadData() {
    await dispatch.Address.fetchAddresses();
  }
  function handleOpenAddressDialog() {
    setOpenAddAddressDialog(!openAddAddressDialog);
  }
  return (
    <React.Fragment>
      <AddAddressDialog
        openAddressDialog={openAddAddressDialog}
        onClose={() => {
          handleOpenAddressDialog();
        }}
        loadData={() => {
          loadData();
        }}
      />
      <Dialog open={openAddressDialog} maxWidth="md">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Shipping address
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {addresses.map((address) => {
            return (
              <Card variant="outlined" sx={{ p: 2, mt: 1 }}>
                {address.name} / {address.address1}
              </Card>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            onClick={handleOpenAddressDialog}
          >
            Add new address
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
