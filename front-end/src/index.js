import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Login from "./modulos/login/login.jsx";
import FormularioActualizacion from "./components/formularios_externos/formulario_autorizacion.jsx";
import FormularioAsistenica from "./components/formularios_externos/formulario_asistencia.jsx";
import FormularioPrimerIngreso from "./components/formularios_externos/formulario_primer_ingreso.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

const clientId =
  "89440335404-hi6o4s7mrs0agugn32ql15tk65f6rvef.apps.googleusercontent.com";

root.render(
  //     <React.StrictMode>

  // Primer Ingreso hex: 4945a92ba5a1c8c7bdf5793bd4d263f7cb9748796ebb5a8a5fb793392e8d7c25
  window.location.pathname === "/formulario_autorizacion" ? (
    <FormularioActualizacion />
  ) : window.location.pathname === "/formulario_asistencia" ? (
    <FormularioAsistenica />
  ) : window.location.pathname ===
    "/U2FsdGVkX18g1g+ca30m/FtEBzWwjus8rabYkRwWvI/8iwRBY7myQCC55mq/VtU7" ? (
    <FormularioPrimerIngreso />
  ) : (
    <Login />
  )
  // <Login />
  //     </React.StrictMode>
);
