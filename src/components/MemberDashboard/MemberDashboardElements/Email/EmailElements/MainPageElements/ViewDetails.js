import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import classes from "./ViewDetails.module.css";
import { Fragment } from "react";

const ViewDetails = ({ open, setOpen, selectedDomain }) => {
  const auth = useSelector((state) => state.auth);
  const [emailInfo, setEmailInfo] = useState({});

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
    overflowY: "auto !important",
    // p: 0,
    // border: "2px solid #000",
  };

  let timeout;

  useEffect(() => {
    const fetchInfo = async () => {
      if (!open) return;

      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
      );
      myHeaders.append("uuid", auth.id);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const response = await fetch(
        `https://api.inspedium.email/mailbox-info?domain=${selectedDomain}&email=${open}`,
        requestOptions
      );
      const responseData = await response.json();
      setEmailInfo({
        status: responseData.disabled === "0" ? true : false,
        name: responseData.uname,
        space: responseData.quota / 1000,
        timeZone: responseData.timezone,
        dateFormat: responseData.dateformat,
        emailPackage:
          responseData.account_type === "1"
            ? "Business Email"
            : "Enterprise Email",
      });
      // console.log(responseData);
    };

    fetchInfo();
  }, [open]);

  const statusChangeHandler = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log("Send API");
    }, 10000);
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
          View Details
        </Typography>
        {emailInfo?.name ? (
          <Fragment>
            <h3 className={classes.domain}>
              <EmailIcon />
              &nbsp;{emailInfo?.name ? open : "Please Wait..."}
            </h3>
            <div className={classes["create-modal-form"]}>
              <div className={classes.rules}>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <span>Status: </span>
                  <label class={classes.switch}>
                    <input
                      type="checkbox"
                      checked={emailInfo?.status}
                      disabled
                      // onClick={statusChangeHandler}
                      // onChange={}
                    />
                    <span class={`${classes.slider} ${classes.round}`}></span>
                  </label>
                </p>
                <p>
                  <span>Name of User: </span>
                  {emailInfo?.name}
                </p>
                <p>
                  <span>Space: </span>
                  {emailInfo?.space}
                </p>
                <p>
                  <span>Email Package: </span>
                  {emailInfo?.emailPackage}
                </p>
                <p>
                  <span>Time Zone: </span> {emailInfo?.timeZone}
                </p>
                <p>
                  <span>Date Format: </span> {emailInfo?.dateFormat}
                </p>
              </div>
              <div className={classes["submit-buttons"]}>
                <button onClick={() => setOpen(false)} className="color-button">
                  Close
                </button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className={classes.loading}>
            <CircularProgress size={50} />
            <h2>Please Wait...</h2>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ViewDetails;
