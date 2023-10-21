import React from "react";
import CookieIcon from "@mui/icons-material/Cookie";
import CookieBanner from "react-cookie-banner";

const CookieBannerContainer = () => {
  const styles = {
    banner: {
      fontFamily: "Source Sans Pro",
      height: 57,
      background:
        "rgba(52, 64, 81, 0.88) url('https://react-components.buildo.io/cookie.png2') 20px 50% no-repeat",
      backgroundSize: "30px 30px",
      backgroundColor: "",
      fontSize: "15px",
      fontWeight: 600,
      position: "fixed",
      bottom: 0,
    },
    button: {
      border: "1px solid white",
      borderRadius: 4,
      width: 66,
      height: 32,
      lineHeight: "32px",
      background: "transparent",
      color: "white",
      fontSize: "14px",
      fontWeight: 600,
      opacity: 1,
      right: 20,
      marginTop: -18,
    },
    message: {
      display: "block",
      padding: "9px 67px",
      lineHeight: 1.3,
      textAlign: "left",
      marginRight: 244,
      color: "white",
    },
    link: {
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div>
      <CookieBanner
        message={
          "Inspedium Email uses cookies to guarantee users the employment of its site features, offering a better purchasing experience. By continuing to browse the site you're agreeing to our use of cookies."
        }
        buttonMessage="Close"
        dismissOnScroll={false}
        dismissOnClick
        styles={styles}
        link={
          <a href="http://nocookielaw.com/">
            More information on our use of cookies
          </a>
        }
        //   onAccept={() => setState({ accepted: true })}
      />
    </div>
  );
};

export default CookieBannerContainer;

{
  /* <div>
      <div>
        <span>
          <CookieIcon />
        </span>
        <div>
          Buildo uses cookies to guarantee users the employment of its site
          features, offering a better purchasing experience. By continuing to
          browse the site you're agreeing to our use of cookies. More
          information on our use of cookies
        </div>
      </div>
      <div>
        <button className="color-inverse-button"></button>
      </div>
    </div> */
}
