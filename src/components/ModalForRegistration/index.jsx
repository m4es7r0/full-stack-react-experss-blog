import React from "react";

import {useSelector, useDispatch} from "react-redux";
import { setUrlImgForRegister } from "../../redux/slices/auth";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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

const ModalForRegistration = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()
  const value = useSelector(state => state.auth.imgUrlForRegister)
  const [url, setUrl] = React.useState(value)

  if (!open) {
    dispatch(setUrlImgForRegister(url))
  }

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
            URL изображения
          </Typography>
          <TextField
            label="image url"
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ModalForRegistration;
