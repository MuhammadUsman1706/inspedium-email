import React, { useState } from "react";
import { logInUser } from "../../../redux/auth-actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import classes from "./LoginModal.module.css";

const LoginModal = ({ setOpen, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    borderRadius: "8px",
  };

  const userInfoChangeHandler = (event) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const forgotpasswordHandler = async () => {
    if (!userInfo.email) {
      toast.error("Please enter an email first.");
    }

    const response = await fetch(
      `https://api.inspedium.email/passwordReset?email=${userInfo.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      toast.success(
        "Password reset email successfully sent! Please check the spam section as well!"
      );
    } else {
      toast.error("Email address not valid!");
    }
  };

  const loginUserHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await dispatch(
      logInUser(userInfo.email, userInfo.password)
    );
    setLoading(false);
    if (response) {
      setOpen(false);
      navigate("/member-dashboard");
    }
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
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            margin: 0,
            background: "linear-gradient(317.25deg, #00505D 0%, #52BD94 100%)",
            padding: "1rem 1rem",
            color: "white",
            fontFamily: "DM Sans",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Login
        </Typography>
        <form
          onSubmit={loginUserHandler}
          className={classes["create-modal-form"]}
        >
          <label htmlFor="email">Email</label>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            required
            label=""
            variant="outlined"
            onChange={userInfoChangeHandler}
          />

          <label htmlFor="password">Password</label>
          <OutlinedInput
            //   placeholder="oldPassword"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            required
            onChange={userInfoChangeHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  id="password"
                  onClick={() => setShowPassword((prevState) => !prevState)}

                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            // label="userName"
            variant="outlined"
          />

          <Button
            sx={{
              marginTop: "0.3rem",
              padding: 0,
              // color: "#00505d",
            }}
            onClick={forgotpasswordHandler}
            variant="text"
          >
            Forgot Password
          </Button>

          <div className={classes["submit-buttons"]}>
            <button type="submit" className="color-button" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
            <button
              onClick={() => setOpen(false)}
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

export default LoginModal;
