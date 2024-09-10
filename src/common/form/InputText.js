import { useField } from "formik";
import { TextField } from "@mui/material";

const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props.field);

  return (
    <div>
      <TextField
        {...field}
        {...props}
        label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={(meta.touched && meta.error) || " "}
        fullWidth
        variant="outlined"
        size="small"
        margin="dense"
      />
    </div>
  );
};

export default InputText;
