import React, { useState } from "react";
import { useSelector } from "react-redux";
import CSVReader from "react-csv-reader";
import { toast } from "react-toastify";
import { Box, Button, Modal, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

import classes from "./CreateBulkEmailModal.module.css";

let requestOptions;

const CreateBulkEmailModal = ({
  open,
  setOpen,
  selectedDomain,
  selectedDomainStats,
  refreshData,
}) => {
  let available =
    +selectedDomainStats?.total_mailBox - +selectedDomainStats?.mailbox_created;
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

  const createSingleMailbox = async (mailbox) => {
    const formData = new FormData();
    formData.append("email", `${mailbox.email}@${selectedDomain}`);
    formData.append("full_name", mailbox.fullName);
    formData.append("space", mailbox.quota);
    formData.append("password", mailbox.password);
    formData.append(
      "account_type",
      selectedDomainStats.product_name === "Business Emails" ? "1" : "2"
    );

    requestOptions.body = formData;

    if (
      mailbox.email &&
      mailbox.fullName &&
      mailbox.quota &&
      mailbox.password
    ) {
      var response = await fetch(
        `https://api.inspedium.email/mailbox-create?domain=${selectedDomain}`,
        requestOptions
      );
    } else {
      toast.error(`Invalid fields provided for mailbox: ${mailbox.fullName}`);
      return;
    }

    const responseData = await response.json();
    if (responseData.success === 1) {
      toast.success(responseData.msg);
    } else {
      toast.error(responseData.detail || responseData.msg);
    }
  };

  const createBulkMailboxesHandler = async (event) => {
    event.preventDefault();

    if (!bulkData?.data?.length) {
      toast.error("Please upload a valid CSV.");
    }

    if (available < bulkData?.data?.length) {
      toast.error(
        "Your available mailboxes are insufficient. Please upgrade your domain."
      );
      return;
    }

    console.log(bulkData?.data);

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
      bulkData.data.map(async (mailbox) => {
        await createSingleMailbox(mailbox);
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
          Create Bulk Mailboxes
        </Typography>
        <h3 className={classes.domain}>
          <LanguageIcon />
          &nbsp;{selectedDomain}
        </h3>

        <div className={classes["create-modal-form"]}>
          <div className={classes.details}>
            <h3>File Details: </h3>
            <p>
              File Name:{" "}
              {bulkData?.details?.name ? bulkData?.details?.name : "-"}
            </p>
            <p>Available Mailboxes: {available ? available : "-"}</p>

            <p>
              Mailboxes to create:{" "}
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
              href="https://firebasestorage.googleapis.com/v0/b/inspedium-email.appspot.com/o/MailboxBulkSyntax.csv?alt=media&token=10975f08-20cb-45fd-ac55-ef0d57f67559"
              target="_blank"
              className="color-button"
            >
              Download Reference CSV
            </a>
            <button
              disabled={loading}
              onClick={bulkData ? createBulkMailboxesHandler : csvInputHandler}
              className="color-button"
            >
              {loading
                ? "Please Wait..."
                : bulkData
                ? "Create Mailboxes"
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

export default CreateBulkEmailModal;
