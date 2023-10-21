import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <GoogleReCaptchaProvider
        reCaptchaKey="6LfImLwkAAAAACAfnqVNzZrSo0-_Tjuh-dbzUf8-"
        useEnterprise={true}
      >
        <App />
      </GoogleReCaptchaProvider>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
