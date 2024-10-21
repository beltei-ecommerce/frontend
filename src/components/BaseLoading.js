import { CircularProgress } from "@mui/material";

export default function BaseLoading({ loading }) {
  return (
    <div>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: "9999",
            color: "red",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="3rem" />
        </div>
      )}
    </div>
  );
}
