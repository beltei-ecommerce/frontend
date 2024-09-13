import { Box, Typography, Stack, Button } from "@mui/material";
import {
  Add as AddIcon,
  FilterAlt as FilterAltIcon,
} from "@mui/icons-material";

export default function AdminHeader({
  children,
  title,
  hideBth = true,
  onCreate,
  onFilter,
}) {
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
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Stack spacing={0.5} direction="row">
        {children}
        {hideBth && (
          <div>
            <Button
              variant="contained"
              style={{ marginRight: "12px" }}
              startIcon={<AddIcon />}
              onClick={onCreate}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={onFilter}
            >
              Filter
            </Button>
          </div>
        )}
      </Stack>
    </div>
  );
}
