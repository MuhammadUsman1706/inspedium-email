import React, { useState } from "react";
import { useSelector } from "react-redux";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import classes from "./SupportTicket.module.css";

const SupportTicket = () => {
  const auth = useSelector((state) => state.auth);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editorStateContent, setEditorStateContent] = useState();

  const onEditorStateChange = (editorState) => {
    setEditorStateContent(editorState);
  };

  const setTicketInfoHandler = (event) => {
    const data = event?.target?.files
      ? event?.target?.files
      : event?.target?.value;

    setTicketInfo((prevState) => ({
      ...prevState,
      [event.target.name]: data,
    }));
  };

  const ticketSubmitHandler = async (event) => {
    event.preventDefault();
    const htmlCovertedContent = draftToHtml(
      convertToRaw(editorStateContent.getCurrentContent())
    );

    if (!htmlCovertedContent || !ticketInfo.subject) {
      toast.error("Please enter the necessary fields first.");
      return;
    }

    setLoading(true);
    const headers = new Headers();
    headers.append("accept", "application/json");
    headers.append("Authorization", "Bearer 28gYwtmko2V1TA2S3JnIqB2gUnKnrg75");

    // console.log(ticketInfo.file[0].name);

    const formData = new FormData();
    formData.append("email", auth.email);
    formData.append("name", auth.name);
    formData.append("sub", ticketInfo.subject);
    formData.append("msg", htmlCovertedContent);
    ticketInfo?.file &&
      formData.append(
        "attach",
        new Blob(ticketInfo.file),
        ticketInfo.file[0].name
      );

    var requestOptions = {
      method: "POST",
      headers,
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.inspedium.email/createTicket",
        requestOptions
      );

      if (response.ok) {
        toast.success("Ticket successfully created!");
      } else {
        toast.error("Ticket creation unsuccessful.");
      }
    } catch (err) {
      toast.error("An error might have occurred with the network.");
    }
    setLoading(false);
  };

  return (
    <main className={classes["support-ticket"]}>
      <h3>Support Ticket Form</h3>
      <hr />
      <form className={classes["ticket-form"]} onSubmit={ticketSubmitHandler}>
        <label htmlFor="subject">Subject</label>
        <TextField
          placeholder="Your Subject"
          id="subject"
          name="subject"
          variant="outlined"
          onChange={setTicketInfoHandler}
          fullWidth
        />
        <label htmlFor="message">Message</label>
        {/* <TextField
          placeholder="Please type your message/query here..."
          id="message"
          name="message"
          variant="outlined"
          onChange={setTicketInfoHandler}
          fullWidth
          multiline
          rows={5}
        /> */}
        <Editor
          editorState={editorStateContent}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="supportToolbar"
          wrapperClassName="supportWrapper"
          editorClassName="supportEditor"
        />
        <Button
          component="label"
          className={classes["upload-file"]}
          variant="text"
          onClick={
            ticketInfo?.file
              ? () =>
                  setTicketInfo((prevState) => ({ ...prevState, file: null }))
              : null
          }
        >
          {!ticketInfo?.file && (
            <input
              onChange={setTicketInfoHandler}
              hidden
              type="file"
              name="file"
              id="file"
              accept="image/*"
            />
          )}
          <FileUploadIcon /> &nbsp; {ticketInfo?.file ? "Remove " : "Upload "}
          File
        </Button>

        <p>
          {ticketInfo?.file?.length && ticketInfo?.file[0]?.name
            ? `File Name: ${ticketInfo?.file[0]?.name}`
            : ""}
        </p>

        <button
          id={classes["submit-button"]}
          disabled={loading}
          type="submit"
          className="color-button"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </main>
  );
};

export default SupportTicket;
