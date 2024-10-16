/**
 * @file withSwal.jsx
 * @version 1.0.0
 * @description Este componente se encarga de proporcionar una funcionalidad que muestra
 *              un mensaje de alerta utilizando la librería SweetAlert si no hay un estudiante
 *              seleccionado. El componente envuelto por esta funcionalidad solo se renderiza
 *              si hay un estudiante seleccionado.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth";
import swal from "sweetalert";

// Retorna un componente que solo se renderiza si hay un estudiante seleccionado
const withSwal = (Component) => {
  return (props) => {
    const { shosenStudent } = useAuthStore();

    useEffect(() => {
      if (!shosenStudent) {
        swal("No hay estudiante seleccionado");
      }
    }, [shosenStudent]);

    return <>{shosenStudent && <Component {...props} />}</>;
  };
};

export default withSwal;
