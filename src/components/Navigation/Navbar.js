import React, { Fragment, useEffect, useState } from "react";
import LoginModal from "../Landing/Auth/LoginModal";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/logo.png";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [drawerState, setDrawerState] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleDrawer = () => setDrawerState((prevState) => !prevState);

  const navigateToBuyNowHandler = () => {
    navigate("/buynow");
  };

  useEffect(() => {
    if (locationState?.showLoginModal) {
      setShowLoginModal(true);
      window.history.replaceState({}, document.title);
    }
  }, []);

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      id={classes["dropdown-box"]}
    >
      <div className={classes["dropdown-logo"]}>
        <img
          loading="lazy"
          src={logo}
          alt="Inspedium Email"
          title="Inspedium Email"
        />
        <span style={{ color: "white" }}>
          <ClearIcon />
        </span>
      </div>
      {/* <Divider /> */}
      <List className={classes["dropdown-list"]}>
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/features">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Features" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/pricing">
          <ListItem disablePadding>
            <ListItemButton>
              {/* <ListItemIcon></ListItemIcon> */}
              <ListItemText primary="Pricing" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/contact-us">
          <ListItem disablePadding>
            <ListItemButton>
              {/* <ListItemIcon></ListItemIcon> */}
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/about-us">
          <ListItem disablePadding>
            <ListItemButton>
              {/* <ListItemIcon></ListItemIcon> */}
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding>
          <ListItemButton className={classes["dropdown-buttons"]}>
            <button
              onClick={() => navigate("/buynow")}
              className={classes["color-button"]}
            >
              Buy Now
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className={classes["color-inverse-button"]}
            >
              Log In
            </button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header className={classes.navbar}>
      <div className={classes.logo}>
        <img loading="lazy" src={logo} alt="" />
      </div>
      <div className={classes.links}>
        <Link to="/">Home</Link>
        <Link to="/features">Feature</Link>
        <Link to="/pricing">Pricing</Link>
        <a href="https://knowledge.inspedium.email" target="_blank">
          Knowledge Base
        </a>
        <a href="https://marketing.inspedium.email/" target="_blank">
          Marketing App
        </a>
        <Link to="/contact-us">Contact Us</Link>
        {/* <Link to="/about-us">About Us</Link> */}
      </div>
      <div className={classes.auth}>
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/member-dashboard")}
            className={classes["color-button"]}
          >
            Dashboard
          </button>
        ) : (
          <Fragment>
            <button
              onClick={navigateToBuyNowHandler}
              className={classes["color-button"]}
            >
              Buy Now
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className={classes["color-inverse-button"]}
            >
              Log In
            </button>
          </Fragment>
        )}
      </div>
      <div className={classes.dropdown}>
        <Button
          style={{
            padding: 0,
            color: "white",
          }}
          onClick={toggleDrawer}
        >
          <MenuIcon fontSize="medium" />
        </Button>
        <Drawer
          PaperProps={{
            sx: {
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            },
          }}
          anchor={"top"}
          open={drawerState}
          onClose={toggleDrawer}
        >
          {list()}
        </Drawer>
        <LoginModal open={showLoginModal} setOpen={setShowLoginModal} />
      </div>
    </header>
  );
};

export default Navbar;
