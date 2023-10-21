import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Checkbox,
  FormControlLabel,
  // FormGroup,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import classes from "./CreateGroupModal.module.css";
import { useEffect } from "react";

const CreateGroupModal = ({
  open,
  setOpen,
  selectedDomain,
  refreshData,
  edit,
}) => {
  const [aliasFormData, setAliasFormData] = useState({
    isSmart: true,
    listType: 1,
    listSecType: 3,
    copy: 0,
    password: "",
    allMember: 0,
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

  useEffect(() => {
    if (edit) {
      fetchGroupListDetails();
    }
  }, []);

  const fetchGroupListDetails = async () => {
    var headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Authorization", "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75");
    headers.append("uuid", `${auth.id}`);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.inspedium.email/smartgrouplistDetails?domain=${selectedDomain}&listName=${edit.name}`,
        { headers }
      );
      const { details } = await response.json();
      setAliasFormData({
        isSmart: true,
        listName: edit.name,
        listType: +details.type,
        listSecType: +details.dg_protection,
        allMember: +details.all_members_can_post,
        password: details.password,
        copy: +details.send_to_sender,
      });
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  const setAliasFormDataHandler = (event) => {
    setAliasFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitCreateAliasFormHandler = async (event) => {
    event.preventDefault();
    if (!aliasFormData.listName) {
      toast.error("Please fill the required fields first.");
      return;
    }

    setLoading(true);
    var headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Authorization", "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75");
    headers.append("uuid", `${auth.id}`);

    const requestOptions = {
      method: "POST",
      headers,
      redirect: "follow",
    };

    if (edit)
      var response = await fetch(
        `https://api.inspedium.email/updateSmartGroupList?groupId=${edit.id}&domain=${selectedDomain}&groupName=${aliasFormData.listName}&groupType=${aliasFormData.listType}&groupSecurity=${aliasFormData.listSecType}&password=${aliasFormData.password}&sendCopy=${aliasFormData.copy}&postAll=${aliasFormData.allMember}`,
        requestOptions
      );
    else {
      if (aliasFormData.isSmart)
        var response = await fetch(
          `https://api.inspedium.email/createSmartGroupList?domain=${selectedDomain}&groupName=${aliasFormData.listName}&groupType=${aliasFormData.listType}&groupSecurity=${aliasFormData.listSecType}&password=${aliasFormData.password}&sendCopy=${aliasFormData.copy}&postAll=${aliasFormData.allMember}`,
          requestOptions
        );
      else
        var response = await fetch(
          `https://api.inspedium.email/createGroupList?domain=${selectedDomain}&groupName=${aliasFormData.listName}`,
          requestOptions
        );
    }

    const responseData = await response.json();
    if (responseData.success === 1) {
      toast.success(responseData.list ? responseData.list : responseData.msg);
      // refreshData(`${aliasFormData.listName}@${selectedDomain}`);
      refreshData();
      setOpen(false);
    } else {
      toast.error(responseData.list ? responseData.list : responseData.msg);
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
          {edit ? "Edit" : "Create"} List
        </Typography>
        <form
          onSubmit={submitCreateAliasFormHandler}
          className={classes["create-modal-form"]}
        >
          {!edit && (
            <FormControl fullWidth>
              <InputLabel id="isSmart">Type</InputLabel>
              <Select
                labelId="isSmart"
                id="isSmart"
                name="isSmart"
                value={aliasFormData.isSmart}
                label="Type"
                onChange={setAliasFormDataHandler}
              >
                <MenuItem value={true}>Smart</MenuItem>
                <MenuItem value={false}>Normal</MenuItem>
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth>
            <label htmlFor="listName" id="listName">
              List Name
            </label>
            <OutlinedInput
              labelId="listName"
              id="listName"
              name="listName"
              placeholder="Enter List Name"
              // label="List Name"
              variant="outlined"
              onChange={setAliasFormDataHandler}
              value={aliasFormData?.listName}
              endAdornment={
                <InputAdornment position="end">
                  @{selectedDomain}
                </InputAdornment>
              }
            />
          </FormControl>

          {aliasFormData.isSmart && (
            <Fragment>
              <FormControl fullWidth>
                <label id="listType">List Type</label>
                <Select
                  labelId="listType"
                  id="listType"
                  onChange={setAliasFormDataHandler}
                  value={aliasFormData.listType}
                  placeholder="List Type"
                  name="listType"
                >
                  <MenuItem value={1}>Specify Members</MenuItem>
                  <MenuItem value={2}>All Users from Domain</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <label id="listSecType">List Security Type</label>
                <Select
                  labelId="listSecType"
                  id="listSecType"
                  name="listSecType"
                  onChange={setAliasFormDataHandler}
                  value={aliasFormData.listSecType}
                  placeholder="List Security Type"
                >
                  <MenuItem value={1}>Only Members can Post</MenuItem>
                  <MenuItem value={2}>Password Protected</MenuItem>
                  <MenuItem value={3}>No Protection</MenuItem>
                </Select>
              </FormControl>
              {aliasFormData.listSecType === 2 && (
                <div>
                  <label htmlFor="password" id="password">
                    Password
                  </label>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={aliasFormData.password}
                    variant="outlined"
                    onChange={setAliasFormDataHandler}
                  />
                </div>
              )}
              {aliasFormData.listType === 2 &&
                aliasFormData.listSecType === 1 && (
                  <FormControl fullWidth>
                    <label htmlFor="allMember" id="allMember">
                      All Member can Post
                    </label>
                    <Select
                      labelId="allMember"
                      id="allMember"
                      name="allMember"
                      onChange={setAliasFormDataHandler}
                      value={aliasFormData.allMember}
                      placeholder="All Member can Post"
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                    </Select>
                  </FormControl>
                )}
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      setAliasFormData((prevState) => ({
                        ...prevState,
                        copy: Number(event.target.checked),
                      }))
                    }
                    sx={{
                      "&.Mui-checked": {
                        color: "#00505d",
                      },
                      margin: "-1rem 0",
                    }}
                    checked={aliasFormData.copy ? true : false}
                  />
                }
                label="Send a copy of the message to the sender"
              />
            </Fragment>
          )}

          <div className={classes["submit-buttons"]}>
            <button type="submit" disabled={loading} className="color-button">
              {loading ? "Please Wait..." : "Submit"}
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

export default CreateGroupModal;
