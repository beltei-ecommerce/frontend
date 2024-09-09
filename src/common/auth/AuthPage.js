import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Update specific input field
  const onFormChange = (e) =>
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function connect() {
    try {
      await dispatch.User.login(form);
      navigate("/");
    } catch ({ status, response }) {
      console.log(response);
    }
  }

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Card sx={{ width: 500, padding: "8px" }}>
          <CardContent>
            <TextField
              name="email"
              fullWidth
              required
              size="small"
              margin="normal"
              label="Email"
              helperText={form.email}
              onChange={onFormChange}
            />
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={onFormChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              style={{ width: "100%" }}
              onClick={connect}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
