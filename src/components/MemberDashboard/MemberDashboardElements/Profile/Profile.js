import React, { useState } from "react";
import {
  setUserDetails,
  setUserPassword,
} from "../../../../redux/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import classes from "./Profile.module.css";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const [password, setPassword] = useState({});

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    reTypePassword: false,
  });

  const setUserInfoHandler = (event) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const setUserPasswordHandler = (event) => {
    setPassword((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const setShowPasswordHandler = (event) => {
    const targetId = event.currentTarget.id;
    setShowPassword((prevState) => ({
      ...prevState,
      [targetId]: !prevState[targetId],
    }));
  };

  const changeUserInfoFormHandler = async (event) => {
    event.preventDefault();
    if (userInfo.phone && !isPossiblePhoneNumber(userInfo.phone)) {
      toast.error("Please enter a valid phone number!");
      return;
    }
    setLoading(true);
    await dispatch(setUserDetails(auth.id, userInfo));
    setLoading(false);
  };

  const changeUserPasswordHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (password.newPassword !== password.reTypePassword) {
      toast.error("Password fields are not same!");
    } else if (!regex.test(password.newPassword)) {
      toast.error(
        "Password must be of 8 characters, must contain a lower and uppercase character and must have a special character!"
      );
    } else {
      await dispatch(
        setUserPassword(auth.email, password.oldPassword, password.newPassword)
      );
    }
    setLoading(false);
  };

  return (
    <div className={classes.profile}>
      <form onSubmit={changeUserInfoFormHandler} className={classes.info}>
        <h3>Info</h3>
        <hr />
        <div className={classes["info-form"]}>
          <div>
            <label htmlFor="name">Name</label>
            <TextField
              placeholder="john.smith"
              id="name"
              // label="userName"
              variant="outlined"
              defaultValue={auth.name}
              onChange={setUserInfoHandler}
            />
            <label htmlFor="contactName">Contact Person</label>
            <TextField
              placeholder="John Smith"
              id="contactName"
              // label="userName"
              variant="outlined"
              defaultValue={auth?.contactName}
              onChange={setUserInfoHandler}
            />
            <label htmlFor="phone">Phone</label>
            {/* <TextField
              placeholder="Phone Number"
              id="phone"
              // label="userName"
              variant="outlined"
              defaultValue={auth.phone}
              onChange={setUserInfoHandler}
            /> */}
            <PhoneInput
              placeholder="Phone number"
              id="phone"
              value={userInfo?.phone ? userInfo?.phone : auth.phone}
              defaultCountry="PK"
              countryCallingCodeEditable={false}
              international
              withCountryCallingCode={true}
              // onChange={setUserInfoHandler}
              onChange={(value) =>
                setUserInfo((prevState) => ({
                  ...prevState,
                  phone: value,
                }))
              }
            />
            <label htmlFor="city">City</label>
            <TextField
              placeholder="City"
              id="city"
              // label="userName"
              variant="outlined"
              defaultValue={auth.city}
              onChange={setUserInfoHandler}
            />
            <label htmlFor="province">State/Province</label>
            <TextField
              placeholder="State/Province"
              id="province"
              // label="userName"
              variant="outlined"
              defaultValue={auth.province}
              onChange={setUserInfoHandler}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <TextField
              placeholder="Email"
              id="email"
              // label="userName"
              variant="outlined"
              defaultValue={auth.email}
              disabled
            />
            <label htmlFor="company">Company Name</label>
            <TextField
              placeholder="Company Name"
              id="company"
              // label="userName"
              variant="outlined"
              defaultValue={auth.company}
              onChange={setUserInfoHandler}
            />
            <label htmlFor="address">Address</label>
            <TextField
              placeholder="Address"
              id="address"
              // label="userName"
              variant="outlined"
              defaultValue={auth.address}
              onChange={setUserInfoHandler}
            />
            <label htmlFor="country">Country</label>
            <TextField
              placeholder="Country"
              id="country"
              // label="userName"
              variant="outlined"
              defaultValue={auth.country}
              onChange={setUserInfoHandler}
            />
            <label htmlFor="zipCode">Zip Code</label>
            <TextField
              placeholder="Zip Code"
              id="zipCode"
              // label="userName"
              variant="outlined"
              defaultValue={auth.zipCode}
              onChange={setUserInfoHandler}
            />
          </div>
        </div>
        <button disabled={loading} type="submit" className="color-button">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
      <form onSubmit={changeUserPasswordHandler} className={classes.password}>
        <h3>Change Password</h3>
        <hr />
        <label htmlFor="oldPassword">Old Password</label>
        <OutlinedInput
          //   placeholder="oldPassword"
          type={showPassword.oldPassword ? "text" : "password"}
          id="oldPassword"
          onChange={setUserPasswordHandler}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                id="oldPassword"
                onClick={setShowPasswordHandler}

                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
              >
                {showPassword.oldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          variant="outlined"
        />
        <label htmlFor="newPassword">New Password</label>
        <OutlinedInput
          type={showPassword.newPassword ? "text" : "password"}
          id="newPassword"
          variant="outlined"
          onChange={setUserPasswordHandler}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                id="newPassword"
                onClick={setShowPasswordHandler}

                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
              >
                {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <label htmlFor="reTypePassword">Re-Type Password</label>
        <OutlinedInput
          type={showPassword.reTypePassword ? "text" : "password"}
          id="reTypePassword"
          onChange={setUserPasswordHandler}
          variant="outlined"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                id="reTypePassword"
                onClick={setShowPasswordHandler}

                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
              >
                {showPassword.reTypePassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <button type="submit" disabled={loading} className="color-button">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
