import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function BaseHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} color="primary">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <h3>CC COMPUTER</h3>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartCheckoutIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
