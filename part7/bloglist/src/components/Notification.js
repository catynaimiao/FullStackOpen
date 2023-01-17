import { Alert, Box } from "@mui/material";
import { useSelector } from "react-redux";

const style = { mt: 2, width: 3 / 4, mx: "auto" };

const Notification = () => {
  const { text, type } = useSelector((data) => data.notification);

  return (
    <>
      {text ? (
        <Box sx={style}>
          <Alert severity={type}>{text}</Alert>
        </Box>
      ) : null}
    </>
  );
};

export default Notification;
