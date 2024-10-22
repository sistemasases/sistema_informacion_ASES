import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import Login from "./modulos/login/login.jsx";
import FormularioAutorizacion from "./components/formularios_externos/formulario_autorizacion.jsx";
import FormularioAsistenica from "./components/formularios_externos/formulario_asistencia.jsx";
import FormularioPrimerIngreso from "./components/formularios_externos/formulario_primer_ingreso.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //     <React.StrictMode>

  // URL: Asistencias : U2FsdGVkX19rLu/6uWbJJimIQLdYOg9C1x5ik8/+NlWI7bOkLOSOd1Q5Pi0NE/a/
  // URL: Autorización: U2FsdGVkX18hjszpddLoSgU/HywzCP8D13edFaHOV+PmxYYqsxUx7dICZxdkz/bz
  // URL: Primer Ingreso: U2FsdGVkX18g1g+ca30m/FtEBzWwjus8rabYkRwWvI/8iwRBY7myQCC55mq/VtU7

  window.location.pathname ===
    "/U2FsdGVkX18hjszpddLoSgU/HywzCP8D13edFaHOV+PmxYYqsxUx7dICZxdkz/bz" ? (
    <FormularioAutorizacion />
  ) : window.location.pathname ===
    "/U2FsdGVkX19rLu/6uWbJJimIQLdYOg9C1x5ik8/+NlWI7bOkLOSOd1Q5Pi0NE/a/" ? (
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
