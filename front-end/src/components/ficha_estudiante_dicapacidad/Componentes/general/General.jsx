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
      </p>
      <Columns
        twobold="si"
        columns={[
          [
            { type: "text", name: "Tipo Documento" },
            { type: "text", name: estudianteSelected.tipo_documento },
            { type: "text", name: "Número documento" },
            { type: "text", name: estudianteSelected.documento ? estudianteSelected.documento : "No especifica" },
          ],
          [
            { type: "text", name: "Nombres" },
            { type: "text", name: estudianteSelected.nombre ? estudianteSelected.nombre : "No especifica" },
            { type: "text", name: "Apellidos" },
            { type: "text", name: estudianteSelected.apellido ? estudianteSelected.apellido : "No especifica" },
          ],
          [
            { type: "text", name: "Año ingreso Univalle" },
            { type: "text", name: estudianteSelected.ano_ingreso ? estudianteSelected.ano_ingreso : "No especifica" },
            { type: "text", name: "Correo Electrónico" },
            editar
              ? { type: "input", name: estudianteSelected.correo }
              : { type: "text", name: estudianteSelected.correo ? estudianteSelected.correo : "No especifica" },
          ],
          [

            { type: "text", name: "Celular" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.celular ? estudianteSelected.celular : "No especifica" },
            { type: "text", name: "Teléfono residencia" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.telefono ? estudianteSelected.telefono : "No especifica" },
          ],
          [
            { type: "text", name: "Dirección residencia" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.direccion_residencia ? estudianteSelected.direccion_residencia : "No especifica" },
            { type: "text", name: "Barrio" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.barrio ? estudianteSelected.barrio : "No especifica" },
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
              : { type: "text", name: estudianteSelected.sexo ? estudianteSelected.sexo : "No especifica" },
          ],
          [
            { type: "text", name: "Identidad de género" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.identidad_genero ? estudianteSelected.identidad_genero : "No especifica" },
          ],
          [
            { type: "text", name: "Deportes que practica" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.deporte ? estudianteSelected.deporte : "No especifica" },
          ],
          [
            { type: "text", name: "Condición de excepción" },
            editar
              ? { type: "select", name: "", options: [] }
              : { type: "text", name: estudianteSelected.condicion ? estudianteSelected.condicion : "No aplica" },
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
              : { type: "text", name: "No especifica" },
          ],
        ]}
      />
      <Columns
        twobold="si"
        columns={[
          [
            { type: "text", name: "Parentesco" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "No especifica" },
            { type: "text", name: "Teléfono" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: "No especifica" },
          ],
        ]}
      />
    </div>
  );
};

export default General;
// export default withSwal(General); // This is the original line
