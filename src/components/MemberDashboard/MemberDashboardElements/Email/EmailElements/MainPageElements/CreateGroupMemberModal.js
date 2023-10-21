import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";

import classes from "./CreateGroupModal.module.css";

const CreateGroupMemberModal = ({
  open,
  setOpen,
  selectedDomain,
  viewGroup,
  refreshData,
}) => {
  const [aliasFormData, setAliasFormData] = useState({
    canPost: 0,
    receive: 1,
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
    // p: 0,
    // border: "2px solid #000",
  };

  const setAliasFormDataHandler = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setAliasFormData((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const submitCreateAliasFormHandler = async (event) => {
    event.preventDefault();
    if (!aliasFormData.memberAddress) {
      toast.error("Please fill the required field first.");
      return;
    }

    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", `${auth.id}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    if (viewGroup.isSmart)
      var response = await fetch(
        `https://api.inspedium.email/addSmartListMember?domain=${selectedDomain}&groupID=${
          viewGroup.id
        }&newMember=${aliasFormData.memberAddress}&canPost=${Number(
          aliasFormData.canPost
        )}&recive=${Number(aliasFormData.receive)}`,
        requestOptions
      );
    else
      var response = await fetch(
        `https://api.inspedium.email/addListMember?domain=${selectedDomain}&groupName=${viewGroup.name}&newMember=${aliasFormData.memberAddress}`,
        requestOptions
      );

    const responseData = await response.json();

    if (responseData.success === 1) {
      toast.success(responseData.msg || responseData.list);
      refreshData(aliasFormData);
      setOpen(false);
    } else {
      toast.error(responseData.list || responseData.msg);
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
          Add
        </Typography>
        <form
          onSubmit={submitCreateAliasFormHandler}
          className={classes["create-modal-form"]}
        >
          <div>
            <label htmlFor="memberAddress">Email Address</label>
            <OutlinedInput
              fullWidth
              id="memberAddress"
              name="memberAddress"
              placeholder="Enter Member Email"
              variant="outlined"
              onChange={setAliasFormDataHandler}
              // endAdornment={
              //   <InputAdornment position="end">@{selectedDomain}</InputAdornment>
              // }
            />
          </div>

          {viewGroup.isSmart && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    name="canPost"
                    checked={aliasFormData.canPost}
                    onChange={setAliasFormDataHandler}
                    sx={{
                      "&.Mui-checked": {
                        color: "#00505d",
                      },
                      margin: "-1rem 0 ",
                    }}
                  />
                }
                label="Can Post"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="receive"
                    checked={aliasFormData.receive}
                    onChange={setAliasFormDataHandler}
                    sx={{
                      "&.Mui-checked": {
                        color: "#00505d",
                      },
                      margin: "-1rem 0",
                    }}
                  />
                }
                label="Receive Messages"
              />
            </Fragment>
          )}
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

export default CreateGroupMemberModal;
