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
import LanguageIcon from "@mui/icons-material/Language";

import classes from "./CreateEmailModal.module.css";

const CreateEmailModal = ({
  open,
  setOpen,
  domain,
  selectedDomain,
  selectedDomainStats,
  refreshData,
}) => {
  const [emailFormData, setEmailFormData] = useState({
    alotSpace: "5",
  });
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
    overflowY: "scroll !important",
    // p: 0,
    // border: "2px solid #000",
  };

  const setEmailFormDataHandler = (event) => {
    setEmailFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitCreateEmailFormHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", auth.id);
    const formData = new FormData();
    formData.append("email", `${emailFormData.email}@${selectedDomain}`);
    formData.append("full_name", emailFormData.fullName);
    formData.append("space", emailFormData.alotSpace);
    formData.append("password", emailFormData.password);
    formData.append(
      "account_type",
      selectedDomainStats.product_name === "Business Emails" ? "1" : "2"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    requestOptions.body = formData;
    if (
      emailFormData.email &&
      emailFormData.fullName &&
      emailFormData.alotSpace &&
      emailFormData.password
    ) {
      var response = await fetch(
        `https://api.inspedium.email/mailbox-create?domain=${selectedDomain}`,
        requestOptions
      );
    } else {
      toast.error("Please fill all the fields first.");
      setLoading(false);
      return;
    }

    const responseData = await response.json();
    if (responseData.success === 1) {
      toast.success(responseData.msg);
      refreshData();
      setOpen(false);
    } else {
      toast.error(responseData.detail || responseData.msg);
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
          Create Email
        </Typography>
        <h3 className={classes.domain}>
          <LanguageIcon />
          &nbsp;{selectedDomain}
        </h3>
        <form
          onSubmit={submitCreateEmailFormHandler}
          className={classes["create-modal-form"]}
        >
          <label htmlFor="fullName">Full Name</label>
          <TextField
            id="fullName"
            name="fullName"
            placeholder="Enter Full Name"
            label=""
            variant="outlined"
            onBlur={setEmailFormDataHandler}
            // endAdornment={
            //   <InputAdornment position="end">{domain}</InputAdornment>
            // }
          />
          <label htmlFor="email">Email</label>
          <OutlinedInput
            id="email"
            name="email"
            placeholder="Enter Email Address"
            label=""
            variant="outlined"
            onBlur={setEmailFormDataHandler}
            endAdornment={
              <InputAdornment position="end">@{selectedDomain}</InputAdornment>
            }
          />
          <label htmlFor="alotSpace">Email Space</label>
          <OutlinedInput
            id="alotSpace"
            name="alotSpace"
            type="number"
            defaultValue={5}
            placeholder="Enter Email Address"
            label=""
            variant="outlined"
            onBlur={setEmailFormDataHandler}
            endAdornment={<InputAdornment position="end">GB</InputAdornment>}
          />
          <label htmlFor="password">Password</label>
          <TextField
            id="password"
            name="password"
            type="password"
            label=""
            onChange={setEmailFormDataHandler}
            variant="outlined"
          />
          <div className={classes.rules}>
            <p>Must be at least 8 characters long.</p>
            <p>Must contain a lowercase letter.</p>
            <p>Must contain an uppercase letter.</p>
            <p>Must contain a number.</p>
            <p>Must contain a special character.</p>
          </div>
          <div className={classes["submit-buttons"]}>
            <button disabled={loading} type="submit" className="color-button">
              {loading ? "Adding... Please Wait" : "Add"}
            </button>
            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className="color-inverse-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateEmailModal;
