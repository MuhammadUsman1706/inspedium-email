import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../../../redux/auth-actions";
// import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import TicketIcon from "@mui/icons-material/ConfirmationNumber";
import logo from "../../../assets/images/logo.png";

import classes from "./SideBar.module.css";

const SideBar = ({
  domainId,
  dashboardMenu,
  setDashboardMenu,
  setDomainId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logUserOutHandler = () => {
    try {
      dispatch(logOutUser());
      navigate("/");
    } catch (err) {
      toast.error("Dear User, couldn't log you out 💔. We love you dearly!");
    }
  };

  const setDashboardMenuHandler = (event) => {
    setDashboardMenu(event.target.id);
    setDomainId(null);
  };

  return (
    <div
      style={{
        maxWidth: "fit-content",
        borderRadius: 0,
      }}
      className={classes["side-bar"]}
    >
      <div className={classes.logo}>
        <Link to="/">
          <img loading="lazy" src={logo} alt="Inspedium Email Logo" />
        </Link>
      </div>

      <div className={classes.menu}>
        <button
          id="Domain"
          onClick={(event) => setDashboardMenuHandler(event)}
          className={
            dashboardMenu === "Domain" || domainId
              ? classes["active-menu-button"]
              : classes["menu-button"]
          }
        >
          <LanguageIcon />
          Domain
        </button>
        <button
          id="Email"
          onClick={(event) => setDashboardMenuHandler(event)}
          className={
            dashboardMenu === "Email"
              ? classes["active-menu-button"]
              : classes["menu-button"]
          }
        >
          <EmailIcon />
          Email
        </button>
        <button
          id="Profile"
          onClick={(event) => setDashboardMenuHandler(event)}
          className={
            dashboardMenu === "Profile"
              ? classes["active-menu-button"]
              : classes["menu-button"]
          }
        >
          <PersonIcon />
          Profile
        </button>
        <button
          style={{
            whiteSpace: "nowrap",
          }}
          id="Support Ticket"
          onClick={(event) => setDashboardMenuHandler(event)}
          className={
            dashboardMenu === "Support Ticket"
              ? classes["active-menu-button"]
              : classes["menu-button"]
          }
        >
          <TicketIcon />
          Support Ticket
        </button>
        <button
          id="Payment Info"
          onClick={(event) => setDashboardMenuHandler(event)}
          className={
            dashboardMenu === "Payment Info"
              ? classes["active-menu-button"]
              : classes["menu-button"]
          }
        >
          <CreditCardIcon />
          Payment Info
        </button>
        <button
          id="Invoices"
          onClick={(event) => setDashboardMenuHandler(event)}
          className={
            dashboardMenu === "Invoices"
              ? classes["active-menu-button"]
              : classes["menu-button"]
          }
        >
          <ReceiptIcon />
          Invoices
        </button>
      </div>
      <button
        onClick={logUserOutHandler}
        className={`${classes["menu-button"]} ${classes["logout-button"]}`}
      >
        <LogoutIcon />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
