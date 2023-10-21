import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import classes from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  const footerNavigationHandler = (event) => {
    if (event.target.id === "service-level-agreement") {
      navigate("terms-of-service");
      setTimeout(() => {
        document.getElementById("SLA").scrollIntoView({ behavior: "smooth" });
      }, 1);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(event.target.id);
  };

  return (
    <footer className={classes.footer}>
      <div className={classes["footer-header"]}>
        <div>
          <img loading="lazy" src={logo} alt="" />
          <p>
            Inspedium.Email guarantees secure, dependable email hosting for
            businesses of all sizes. Our managed cloud hosting service offers
            cutting-edge features to help you securely store, organise and
            access your emails. With us as your partner, rest assured that your
            data is safe and easily accessible, allowing you to dedicate more
            time and energy to building a successful business without worrying
            about the availability of your email!
          </p>
        </div>
        <div>
          <h2>Resources</h2>
          <ul>
            <li id="privacy-policy" onClick={footerNavigationHandler}>
              Privacy Policy
            </li>
            <li id="terms-of-service" onClick={footerNavigationHandler}>
              Terms of Service
            </li>
            <li id="terms-of-service" onClick={footerNavigationHandler}>
              Acceptable Use Policy
            </li>
            <li id="cookies-policy" onClick={footerNavigationHandler}>
              Cookies Policy
            </li>
            <li id="service-level-agreement" onClick={footerNavigationHandler}>
              Service Level Agreement
            </li>
            {/* <li id="refund-policy" onClick={footerNavigationHandler}>
              Refund Policy
            </li> */}
          </ul>
        </div>
        <div className={classes.support}>
          <h2>Support</h2>
          <ul>
            <li>
              <a
                href="https://knowledge.inspedium.email"
                target="_blank"
                to="/pricing"
              >
                Knowledge Base
              </a>
            </li>
            <li>Support Tickets</li>
          </ul>
        </div>
        <div className={classes.company}>
          <h2>Company</h2>
          <ul>
            <li id="about-us" onClick={footerNavigationHandler}>
              About Us
            </li>
            <li id="contact-us" onClick={footerNavigationHandler}>
              Contact Us
            </li>
            <li>
              <button
                onClick={() =>
                  window.open("https://marketing.inspedium.email/", "_blank")
                }
                style={{ margin: 0 }}
                className="color-inverse-button"
              >
                Marketing App
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.copyright}>
        <p>
          Inspedium.Email is a product of Inspedium LLC. | © 2022 Inspedium,
          LLC., All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
