import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth";
import swal from "sweetalert";
import Columns from "../Columns";
import withSwal from "../withSwal";

const General = () => {
  const { estudianteSelected } = useAuthStore();
  const [editar, setEditar] = useState(false);
  const [nombreBoton, setNombreBoton] = useState("Editar información");

  useEffect(() => {
    if (editar) {
      setNombreBoton("Guardar información");
    } else {
      setNombreBoton("Editar información");
    }
  }, [editar]);
  // La idea esar al estudiante seleccionado almacenado en el useAuthStore, el cual es visible para 
  // todos los componenetes y modificar ciertos detalles

  return (
    <div>
      <button
        className="btn btn-primary button"
        onClick={() => setEditar(!editar)}
      >
        {nombreBoton}
      </button>
      <p className="title">
        Información del estudiante:
        {/* {estudianteSelected.nombre} */}
      </p>
      <Columns
        twobold="si"
        columns={[
          [
            { type: "text", name: "Nombres" },
            { type: "text", name: "Sin nombre" },
            { type: "text", name: "Apellidos" },
            { type: "text", name: "Sin apellido" },
          ],
          [
            { type: "text", name: "Puntaje Icfes" },
            editar
              ? { type: "number", name: "" }
              : { type: "text", name: "Sin nombre" },
            { type: "text", name: "Año ingreso Univalle" },
            { type: "text", name: "Sin apellido" },
          ],
          [
            { type: "text", name: "Teléfono residencia" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin nombre" },
            { type: "text", name: "Celular" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin nombre" },
          ],
          [
            { type: "text", name: "Email alternativo" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "sinnombre@gmail.com" },
          ],
          [
            { type: "text", name: "Estrato" },
            { type: "text", name: "Sin estrato" },
            { type: "text", name: "Dirección residencia" },
            { type: "text", name: "Sin direccion" },
          ],
          [
            { type: "text", name: "Barrio" },
            { type: "text", name: "Sin estrato" },
            { type: "text", name: "Municipio actual" },
            { type: "text", name: "Sin direccion" },
          ],
          [
            { type: "text", name: "País de origen" },
            { type: "text", name: "Sin estrato" },
            { type: "text", name: "Grupo étnico" },
            editar
              ? { type: "select", name: "", options: [] }
              : { type: "text", name: "Sin direccion" },
          ],
          [
            { type: "text", name: "Actividad simultánea" },
            editar
              ? { type: "select", name: "", options: [] }
              : { type: "text", name: "Sin estrato" },
            { type: "text", name: "Sexo" },
            editar
              ? { type: "select", name: "", options: ["op1", "op2"] }
              : { type: "text", name: "Sin direccion" },
          ],
          [
            { type: "text", name: "Identidad de género" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin genero" },
            { type: "text", name: "Estado civil" },
            editar
              ? { type: "select", name: "", options: [] }
              : { type: "text", name: "Cantidad hijo(s)" },
          ],
          [
            { type: "text", name: "Cantidad hijo(s)" },
            editar ? { type: "input", name: "" } : { type: "text", name: "0" },
            { type: "text", name: "Deportes que practica" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin deportes" },
          ],
          [
            { type: "text", name: "Condición de excepciòn" },
            editar
              ? { type: "select", name: "", options: [] }
              : { type: "text", name: "Excepción" },
          ],
        ]}
      />
      <p className="title">Personas con quién vive </p>
      <Columns
        twobold="si"
        columns={[
          [
            { type: "text", name: "Nombre Completo" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin nombre" },
            { type: "text", name: "Parentesco" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin apellido" },
          ],
        ]}
      />
      <p className="title">Información general del acudiente de emergencia </p>
      <Columns
        twobold="si"
        columns={[
          [
            { type: "text", name: "Nombre Completo" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin nombre" },
            { type: "text", name: "Parentesco y Teléfono" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin apellido" },
          ],
        ]}
      />
      <p className="title">Observaciones </p>
      <Columns
        columns={[
          [
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin observaciones" },
          ],
        ]}
      />
    </div>
  );
};

export default General;
// export default withSwal(General); // This is the original line
