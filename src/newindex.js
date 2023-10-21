import React from "react";
import ReactDOM from "react-dom/client";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import store from "./redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
// import { Helmet } from "react-helmet";
import App from "./App";

import "./index.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// );

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  return `<div>${content}</div>`;
};

reportWebVitals();
