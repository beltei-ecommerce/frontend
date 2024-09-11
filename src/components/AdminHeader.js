import { Box, Typography, Stack, Button } from "@mui/material";
import {
  Add as AddIcon,
  FilterAlt as FilterAltIcon,
} from "@mui/icons-material";

export default function AdminHeader(props) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
    >
      <Typography
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
        }}
      >
        {props.title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Stack spacing={1} direction="row">
        {props.children}
        <Button variant="contained" startIcon={<AddIcon />}>
          Create
        </Button>
        <Button variant="outlined" startIcon={<FilterAltIcon />}>
          Filter
        </Button>
      </Stack>
    </div>
  );
}
