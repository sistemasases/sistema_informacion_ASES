/**
 * @file General.jsx
 * @version 1.0.0
 * @description Este componente se encarga de mostrar la información general de un estudiante.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth";
import Columns from "../Columns";
import withSwal from "../withSwal";

// Componente de General
// Este componente se encarga de mostrar la información general de un estudiante
// permite editar ciertos detalles de la información
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
        className="full-size-button color_red"
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
            { type: "text", name: "Tipo Documento" },
            { type: "text", name: "tipo_documento" },
            { type: "text", name: "Número documento" },
            { type: "text", name: "numero_documento" },
          ],
          [
            { type: "text", name: "Nombres" },
            { type: "text", name: "Sin nombre" },
            { type: "text", name: "Apellidos" },
            { type: "text", name: "Sin apellido" },
          ],
          [
            { type: "text", name: "Año ingreso Univalle" },
            { type: "text", name: "año_ingreso" },
            { type: "text", name: "Correo Electrónico" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin correo" },
          ],
          [
            
            { type: "text", name: "Celular" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin Celular" },
              { type: "text", name: "Teléfono residencia" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin teléfono" },
          ],
          [
            { type: "text", name: "Dirección residencia" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin dirección" },
              { type: "text", name: "Barrio" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin barrio" },
          ],
          [
            { type: "text", name: "Grupo étnico" },
            editar
              ? { type: "select", name: "", options: [] }
              : { type: "text", name: "Sin grupo etnico" },
          ],
          [
            { type: "text", name: "Sexo" },
            editar
              ? { type: "select", name: "", options: ["op1", "op2"] }
              : { type: "text", name: "Sin sexo" },
          ],
          [
            { type: "text", name: "Identidad de género" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "Sin genero" },
          ],
          [
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
    </div>
  );
};

export default General;
// export default withSwal(General); // This is the original line
