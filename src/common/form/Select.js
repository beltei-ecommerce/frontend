import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";

export default function BasicSelect({
  field,
  form,
  label,
  items,
  textValue,
  textShow,
  ...props
}) {
  return (
    <FormControl {...props} fullWidth size="small" margin="dense">
      <InputLabel id={field.name}>{label}</InputLabel>

      <Select {...field} labelId={field.name}>
        {items.map((item) => {
          return (
            <MenuItem value={item.id} key={item[textValue]}>
              {item[textShow]}
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText>
        {(form.touched[field.name] && form.errors[field.name]) || " "}
      </FormHelperText>
    </FormControl>
  );
}
