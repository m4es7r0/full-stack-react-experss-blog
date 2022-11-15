import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "center",
};

const PopUp = ({
  children,
  title,
  component,
  componentProp = null,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {React.cloneElement(children, { onClick: handleOpen })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {component
            ? React.cloneElement(component, { ...componentProp })
            : null}
        </Box>
      </Modal>
    </>
  );
};

export default PopUp;
