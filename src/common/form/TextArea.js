import { useField } from "formik";

const TextArea = ({ label, ...props }) => {
  const [field, ] = useField(props.field);

  return (
    <div style={{ paddingBottom: "20px" }}>
      <textarea
        {...field}
        {...props}
        placeholder={label}
        style={{
          width: "100%",
          fontFamily: "IBM Plex Sans, sans-serif",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          boxSizing: "border-box",
          padding: "12px",
          minHeight: "200px",
          letterSpacing: "1px",
        }}
      />
    </div>
  );
};

export default TextArea;
