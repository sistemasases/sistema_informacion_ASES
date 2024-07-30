import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Login from "./modulos/login/login.jsx";
import Registro_estudiante from "./modulos/campus_diverso/registro_estudiante.jsx";

// Verifica la URL actual
const getCurrentPath = () => {
    return window.location.pathname;
  };
  
  // Renderiza el componente según la ruta actual
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  const currentPath = getCurrentPath();
  
  if (currentPath === '/campus-diverso/formulario') {
    // Renderiza Registro_estudiante solo para la ruta específica
    root.render(<Registro_estudiante />);
  } else {
    // Para cualquier otra ruta, renderiza Login
    root.render(<Login />);
  }