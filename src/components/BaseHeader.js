import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import {
  // AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  Login as LoginIcon,
} from "@mui/icons-material";

export default function BaseHeader({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  function goToLogin(path) {
    return navigate(path);
  }

  return (
    <AppBar position="relative" elevation={0} color="secondary">
      <Toolbar>
        <Typography
          sx={{
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          onClick={() => goToLogin("/")}
        >
          <img src={logo} alt="logo" style={{ height: "50px" }} />
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {children}
        <Box sx={{ flexGrow: 1 }} />
        {location.pathname !== "/login" && (
          <Box>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => goToLogin("/cart")}
            >
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
              onClick={() => goToLogin("/login")}
            >
              <LoginIcon />
            </IconButton>

            {/* <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton> */}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
