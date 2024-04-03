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
