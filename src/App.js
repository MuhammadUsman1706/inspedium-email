import React, { Fragment, useEffect, lazy, Suspense } from "react";
// import ReactGA from "react-ga";
import ReactGA from "react-ga4";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import AdminAuth from "./components/Landing/Auth/AdminAuth";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsofServicesPage from "./pages/TermsOfServicesPage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import AuthPage from "./pages/AuthPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";
// import EmailVerificationToast from "./components/Misc/EmailVerificationToast";
// import CookieBannerContainer from "./components/Misc/CookieBannerContainer";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "./redux/auth-actions";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import backgroundImage from "./assets/images/background-image.png";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const EmailVerificationToast = lazy(() =>
  import("./components/Misc/EmailVerificationToast")
);

ReactGA.initialize("G-2FT3ET4R89"); // Sir Zahid New
// ReactGA.initialize("G-4Y2C0VC5FV"); // Sir Zahid Old
// ReactGA.initialize("G-Z941CKX41F");

function App() {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const uid = localStorage.getItem("uid");
  const dispatch = useDispatch();

  useEffect(() => {
    // Implement Session
    const userId = localStorage.getItem("uid");
    const userEmail = localStorage.getItem("userEmail");
    if (userId) {
      dispatch(logInUser(userEmail, null, userId));
      // .then(
      //   (response) => response && navigate("/member-dashboard")
      // );
    }
  }, []);

  useEffect(() => {
    // ReactGA.pageview(location.pathname);
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: location.pathname.replace("/", "").replaceAll("-", " "),
    });
  }, [location]);

  return (
    <Fragment>
      <div className="background-image">
        {location.pathname !== "/member-dashboard" && (
          <img
            src={backgroundImage}
            className={location.pathname !== "/" && "halfscreen"}
            id={
              (location.pathname === "/about-us" ||
                location.pathname === "/privacy-policy" ||
                location.pathname === "/cookies-policy" ||
                location.pathname === "/terms-of-service") &&
              "about-screen"
            }
            alt="background-image"
          />
        )}
      </div>
      {location.pathname !== "/member-dashboard" && <Navbar />}
      <ToastContainer />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsofServicesPage />} />
        <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
        <Route path="/buynow" element={<AuthPage />} />
        <Route
          path="/8gjrnvqZUIn3Fhcy42ELenQHZ6zU7lKO3g5EY3ehJ9NHzuTY/:fakeUid"
          element={<AdminAuth />}
        />
        <Route
          path="/buynow/:emailPackage/:planDuration/:price"
          element={<AuthPage />}
        />
        {isLoggedIn && (
          <Route path="/member-dashboard" element={<MemberDashboardPage />} />
        )}

        {!uid && !isLoggedIn && (
          <Route
            path="/member-dashboard"
            element={
              <Navigate to="/" replace state={{ showLoginModal: true }} />
            }
          />
        )}

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      {location.pathname !== "/member-dashboard" && <Footer />}
      {isLoggedIn && location.pathname === "/member-dashboard" && (
        <Suspense fallback="Loading">
          <EmailVerificationToast />
        </Suspense>
      )}
      {/* <CookieBannerContainer /> */}
    </Fragment>
  );
}

export default App;
