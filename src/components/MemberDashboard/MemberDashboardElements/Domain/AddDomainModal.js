import React from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";

import classes from "./AddDomainModal.module.css";

const AddDomainModal = ({ open, setOpen }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "DM Sans",
    maxWidth: "90%",
    // p: 0,
    // border: "2px solid #000",
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{
            margin: 0,
            background: "linear-gradient(317.25deg, #00505D 0%, #52BD94 100%)",
            padding: "0.5rem 1rem",
            color: "white",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Add Domain
        </Typography>
        <form className={classes["create-modal-form"]}>
          <label htmlFor="domainName">Domain Name</label>
          <TextField
            id="domainName"
            name="domainName"
            placeholder="Enter Domain"
            label=""
            variant="outlined"
          />
          <div className={classes["submit-buttons"]}>
            <button className="color-button">Add</button>
            <button className="color-inverse-button">Cancel</button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddDomainModal;
