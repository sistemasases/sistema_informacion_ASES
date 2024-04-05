import "../../../Scss/ficha_estudiante_V2/acceso_denegado.css";

const AccesoDenegado = () => {
  return (
    <div className="container_denegado">
      <h1>Acceso denegado</h1>
      <p>No tienes los permisos necesarios para ver esta página.</p>
      <p>
        Por favor, contacta al administrador del sistema para obtener acceso.
      </p>
    </div>
  );
};

export default AccesoDenegado;
