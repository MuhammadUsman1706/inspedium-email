import React, { useState } from "react";
import { toast } from "react-toastify";
import contactFormBackground from "../../../assets/images/contact-form-background.png";
import inquiry from "../../../assets/images/inquiry.png";
import contact from "../../../assets/images/contact.png";
import question from "../../../assets/images/question.png";
import { TextField } from "@mui/material";
import PhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationIcon from "@mui/icons-material/LocationOn";

import classes from "./ContactUs.module.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (formData) {
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email", formData.email);
      urlencoded.append("name", formData.name);
      urlencoded.append("msg", formData.message);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `https://api.inspedium.email/contact-us?email=${formData.email}&name=${formData.name}&msg=${formData.message}`,
        requestOptions
      );

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        toast.success("Message successfully sent!");
      }

      //   const responseData = await response.json();
      //   console.log(responseData);
    } else {
      toast.error("Please fill the form first.");
    }
    setLoading(false);
  };

  const setFormValueHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={classes["contact-us"]}>
      <section className={classes.text}>
        <h1>Contact Us</h1>
        <p>
          We appreciate your interest in Inspedium.Email. If you would like to
          contact us for any reason, please do not hesitate to do so. We would
          be happy to answer any questions or inquiries that you may have. Our
          contact information is listed below, and we look forward to hearing
          from you soon.
        </p>
      </section>

      <div className={classes["contact-cards"]}>
        <div>
          <img
            loading="lazy"
            src={inquiry}
            alt=""
            className={classes["contact-card-icon"]}
          />
          <h1 style={{ display: "inline" }}>General Inquiries</h1>
          <div className={classes["contact-card-text"]}>
            <p>For General Enquiries Send us an E-Mail at</p>
            <span>info@inspedium.email</span>
          </div>
        </div>
        <div>
          <img
            loading="lazy"
            src={contact}
            alt=""
            className={classes["contact-card-icon"]}
          />
          <h1 style={{ display: "inline" }}>Contact Support</h1>
          <div className={classes["contact-card-text"]}>
            <p>For Support Requests, Send us an E-Mail at</p>
            <span>support@inspedium.email</span>
          </div>
        </div>
        <div>
          <img
            loading="lazy"
            src={question}
            alt=""
            className={classes["contact-card-icon"]}
          />
          <h1 style={{ display: "inline" }}>Pre-Sales Questions</h1>
          <div className={classes["contact-card-text"]}>
            <p>For Support Requests, Send us an E-Mail at</p>
            <span>sales@inspedium.email</span>
          </div>
        </div>
      </div>

      <section className={classes["contact-form"]}>
        <div className={classes.inputs}>
          <h1>Say Hi!</h1>
          <p>We'd like to talk with you.</p>
          <form onSubmit={submitFormHandler}>
            <label htmlFor="name">Name</label>
            <TextField
              id="name"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              size="small"
              fullWidth
              onChange={setFormValueHandler}
              required
            />
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              name="email"
              value={formData.email}
              type="email"
              placeholder="Email Address"
              size="small"
              fullWidth
              onChange={setFormValueHandler}
              required
            />
            <label htmlFor="message">Your Message</label>
            <TextField
              id="message"
              name="message"
              value={formData.message}
              placeholder="I want to say that..."
              size="small"
              multiline
              minRows={3}
              fullWidth
              onChange={setFormValueHandler}
              required
            />
            <button
              disabled={loading}
              type="submit"
              className={classes["color-button"]}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        <div className={classes["form-image"]}>
          <div className={classes["form-text"]}>
            <h1>Contact Information</h1>
            <p>
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
            <ul>
              <li>
                <span>
                  <PhoneIcon />
                </span>
                +1 (315) 554-9664
              </li>
              <li>
                <span>
                  <EmailIcon />
                </span>
                info@inspedium.email
              </li>
              <li>
                <span>
                  <LocationIcon />
                </span>
                19 Holly Cove Ln, Dover, DE 19901, United States
              </li>
            </ul>
          </div>
          <img loading="lazy" src={contactFormBackground} alt="" />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
