import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth";
import swal from "sweetalert";

// Retorna un componente que solo se renderiza si hay un estudiante seleccionado
const withSwal = (Component) => {
  return (props) => {
    const { estudianteSelected } = useAuthStore();

    useEffect(() => {
      if (!estudianteSelected) {
        swal("No hay estudiante seleccionado");
      }
    }, [estudianteSelected]);

    return <>{estudianteSelected && <Component {...props} />}</>;
  };
};

export default withSwal;
