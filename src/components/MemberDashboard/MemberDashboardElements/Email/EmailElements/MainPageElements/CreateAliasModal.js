import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import classes from "./CreateAliasModal.module.css";

const CreateAliasModal = ({
  open,
  setOpen,
  domain,
  selectedDomain,
  refreshData,
}) => {
  const [aliasFormData, setAliasFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "DM Sans !important",
    maxWidth: "90%",
  };

  const setAliasFormDataHandler = (event) => {
    setAliasFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitCreateAliasFormHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", `${auth.id}`);
    const formData = new FormData();
    formData.append("alias", aliasFormData.aliasName);
    formData.append("forward", aliasFormData.forwardTo);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    requestOptions.body = formData;

    if (aliasFormData.aliasName && aliasFormData.forwardTo) {
      var response = await fetch(
        `https://api.inspedium.email/addEmail-alias?domain=${selectedDomain}`,
        requestOptions
      );
    } else {
      toast.error("Please fill all the fields first.");
      setLoading(false);
      return;
    }

    const responseData = await response.json();
    // console.log(responseData);

    // setAliasFormData({});

    if (responseData.success === 1) {
      toast.success(
        responseData.detail ? responseData.detail : responseData.msg
      );
      refreshData();
      setOpen(false);
    } else {
      toast.error(responseData.detail ? responseData.detail : responseData.msg);
    }
    setLoading(false);
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
          Create Alias
        </Typography>
        <form
          onSubmit={submitCreateAliasFormHandler}
          className={classes["create-modal-form"]}
        >
          <label htmlFor="aliasName">Alias</label>
          <OutlinedInput
            id="aliasName"
            name="aliasName"
            placeholder="Enter Alias"
            label=""
            variant="outlined"
            onBlur={setAliasFormDataHandler}
            endAdornment={
              <InputAdornment position="end">{domain}</InputAdornment>
            }
          />
          <label htmlFor="forwardTo">Forward to</label>
          <TextField
            id="forwardTo"
            name="forwardTo"
            placeholder="Enter Email"
            label=""
            variant="outlined"
            onChange={setAliasFormDataHandler}
          />
          <div className={classes["submit-buttons"]}>
            <button type="submit" disabled={loading} className="color-button">
              {loading ? "Adding... Please Wait" : "Add"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="color-inverse-button"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateAliasModal;
