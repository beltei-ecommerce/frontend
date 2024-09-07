// import React, { useState, useEffect } from "react";

// import Alert from "@mui/material/Alert";
// import IconButton from "@mui/material/IconButton";
// import Collapse from "@mui/material/Collapse";
// import CloseIcon from "@mui/icons-material/Close";

// const CustomAlert = ({ message, type, duration, onClose }) => {
//   const [visible, setVisible] = useState(true);
//   const alertStyle = {
//     // overflow: "hidden",
//     // position: "fixed",
//     // bottom: "100px",
//     // right: 0,
//     // marginRight: "5px",
//     // zIndex: "999",
//   };

//   useEffect(() => {
//     if (duration) {
//       const timer = setTimeout(() => {
//         setVisible(false);
//         if (onClose) onClose();
//       }, duration);
//       return () => clearTimeout(timer);
//     }
//   }, [duration, onClose]);

//   if (!visible) return null;

//   return (
//     <div style={alertStyle}>
//       {/* <Collapse in={visible}> */}
//         <Alert
//           severity={type || "success"}
//           action={
//             <IconButton
//               aria-label="close"
//               color="inherit"
//               size="small"
//               onClick={() => {
//                 setVisible(false);
//               }}
//             >
//               <CloseIcon fontSize="inherit" />
//             </IconButton>
//           }
//           sx={{ mb: 2 }}
//         >
//           {message}
//         </Alert>
//       {/* </Collapse> */}
//     </div>
//   );
// };

// export default CustomAlert;
