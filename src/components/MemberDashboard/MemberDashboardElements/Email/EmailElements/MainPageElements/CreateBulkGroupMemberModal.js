import React, { useState } from "react";
import { useSelector } from "react-redux";
import CSVReader from "react-csv-reader";
import { toast } from "react-toastify";
import { Box, Button, Modal, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";

import classes from "./CreateBulkGroupMemberModal.module.css";

let requestOptions;

const CreateBulkGroupMemberModal = ({
  open,
  setOpen,
  selectedDomain,
  viewGroup,
  refreshData,
}) => {
  const [bulkData, setBulkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "DM Sans !important",
    maxWidth: "90%",
    overflowY: "scroll !important",
    // p: 0,
    // border: "2px solid #000",
  };

  const csvInputHandler = () => {
    const csvInput = document.getElementById("react-csv-reader-input");
    csvInput.click();
  };

  const createSingleGroupMember = async (groupMember, index) => {
    if (groupMember.email) {
      if (viewGroup.isSmart)
        var response = await fetch(
          `https://api.inspedium.email/addSmartListMember?domain=${selectedDomain}&groupID=${viewGroup.id}&newMember=${groupMember.email}&canPost=0&recive=1`,
          requestOptions
        );
      else
        var response = await fetch(
          `https://api.inspedium.email/addListMember?domain=${selectedDomain}&groupName=${viewGroup.name}&newMember=${groupMember.email}`,
          requestOptions
        );
    } else {
      toast.error(
        `Couldn't read a parameter from CSV at line no. ${index + 2}`
      );
      return;
    }

    const responseData = await response.json();
    if (responseData.success === 1) {
      toast.success(responseData.msg || responseData.list);
      // refreshData(groupMember.email);
    } else {
      toast.error(responseData.list || responseData.msg);
    }
  };

  const createBulkGroupMembers = async (event) => {
    event.preventDefault();

    if (!bulkData?.data?.length) {
      toast.error("Please upload a valid CSV.");
    }

    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75"
    );
    myHeaders.append("uuid", auth.id);

    requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    await Promise.all(
      bulkData.data.map(async (groupMember, index) => {
        await createSingleGroupMember(groupMember, index);
      })
    );

    refreshData();

    setLoading(false);
    setOpen(false);
    toast.success("Bulk Creation Completed.");
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
          Create Bulk Group Members
        </Typography>
        <br />
        <h3 className={classes.domain}>
          <LanguageIcon />
          &nbsp;
          <p>{selectedDomain}</p>
        </h3>
        <h3 className={classes.domain}>
          <EmailIcon />
          &nbsp;
          <p>
            {viewGroup.name}
            {viewGroup.isSmart && `@${selectedDomain}`}
          </p>
        </h3>

        <div className={classes["create-modal-form"]}>
          <div className={classes.details}>
            <h3>File Details: </h3>
            <p>
              File Name:{" "}
              {bulkData?.details?.name ? bulkData?.details?.name : "-"}
            </p>

            <p>
              Members to create:{" "}
              {bulkData?.data?.length ? bulkData?.data?.length : "-"}
            </p>
            {bulkData && (
              <Button
                onClick={() => setBulkData(null)}
                sx={{
                  padding: 0,
                  marginTop: "1rem",
                  color: "#00505d",
                }}
                variant="text"
              >
                Remove CSV
              </Button>
            )}
          </div>
          <div className={classes.buttons}>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/inspedium-email.appspot.com/o/GroupMemberBulkSyntax.csv?alt=media&token=6c7ea56f-7cc8-4102-87c8-a5b73d98a7d9"
              target="_blank"
              className="color-button"
            >
              Download Reference CSV
            </a>
            <button
              disabled={loading}
              onClick={bulkData ? createBulkGroupMembers : csvInputHandler}
              className="color-button"
            >
              {loading
                ? "Please Wait..."
                : bulkData
                ? "Create Group Members"
                : "Upload CSV"}
              {!bulkData && (
                <CSVReader
                  onFileLoaded={(data, details) =>
                    setBulkData({ data, details })
                  }
                  inputStyle={{ display: "none" }}
                  cssClass="csvInput"
                  parserOptions={{
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateBulkGroupMemberModal;
