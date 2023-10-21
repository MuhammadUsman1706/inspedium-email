import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { Box, Modal, Typography } from "@mui/material";

import classes from "./EmailVerficationToast.module.css";

let verificationTimer = localStorage.getItem("timer");

const EmailVerificationToast = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const emailVerified = getAuth()?.currentUser?.emailVerified;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const sendEmailVerificationHandler = async () => {
    if (verificationTimer > Date.now()) {
      toast.error(
        "Please wait at least 5 minutes before sending another verification email."
      );
      return;
    } else {
      verificationTimer = Date.now() + 5 * 60 * 1000;
      localStorage.setItem("timer", verificationTimer);
    }

    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Authorization", "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75");
    headers.append("uuid", auth.id);

    const response = await fetch(
      `https://api.inspedium.email/sendEmailVerification?userEmail=${auth.email}&userName=${auth.name}`,
      { headers }
    );

    if (response.ok) {
      toast.success(
        "Verfication email has been sent. Please check your email."
      );
    } else {
      toast.error("Verification email couldn't be sent.");
    }
  };

  return (
    <Modal
      open={!emailVerified}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Dear User, please verify your email to continue.
        </Typography>
        <div className={classes["handle-actions"]}>
          <button
            onClick={sendEmailVerificationHandler}
            className="color-button"
          >
            Send Email Verification
          </button>
          <button
            onClick={() => navigate("/")}
            className="color-inverse-button"
          >
            Go Back
          </button>
        </div>
      </Box>
    </Modal>
  );

  //   return (
  //     !emailVerified &&
  //     toast.error(<button className="color-button">LOGIN</button>, {
  //       closeButton: false,
  //       autoClose: false,
  //       draggable: false,
  //       toastId: "customId",
  //     })
  //   );
};

export default EmailVerificationToast;
