import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Login from "./modulos/login/login.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

const clientId =
  "89440335404-hi6o4s7mrs0agugn32ql15tk65f6rvef.apps.googleusercontent.com";

root.render(
  //     <React.StrictMode>
  <Login />
  //     </React.StrictMode>
);
