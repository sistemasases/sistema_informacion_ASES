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
            { type: "text", name: estudianteSelected.tipo_doc },
            { type: "text", name: "Número documento" },
            { type: "text", name: estudianteSelected.num_doc ? estudianteSelected.num_doc : "No especifica" },
          ],
          [
            { type: "text", name: "Nombres" },
            { type: "text", name: estudianteSelected.nombre ? estudianteSelected.nombre : "No especifica" },
            { type: "text", name: "Apellidos" },
            { type: "text", name: estudianteSelected.apellido ? estudianteSelected.apellido : "No especifica" },
          ],
          [
            { type: "text", name: "Año ingreso Univalle" },
            { type: "text", name: estudianteSelected.anio_ingreso ? estudianteSelected.anio_ingreso : "No especifica" },
            { type: "text", name: "Correo Electrónico" },
            editar
              ? { type: "input", name: estudianteSelected.email }
              : { type: "text", name: estudianteSelected.email ? estudianteSelected.email : "No especifica" },
          ],
          [

            { type: "text", name: "Celular" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.celular ? estudianteSelected.celular : "No especifica" },
            { type: "text", name: "Teléfono residencia" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.telefono_res  ? estudianteSelected.telefono_res : "No especifica" },
          ],
          [
            { type: "text", name: "Dirección residencia" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.dir_res ? estudianteSelected.dir_res : "No especifica" },
            { type: "text", name: "Barrio" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.barrio_res ? estudianteSelected.barrio_res : "No especifica" },
          ],
          [
            { type: "text", name: "Grupo étnico" },
            editar
              ? { type: "select", name: "" , options: []}
              : { type: "text", name: estudianteSelected.el_id_de_etnia ? estudianteSelected.el_id_de_etnia : "No especifica"},
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
              : { type: "text", name: estudianteSelected.el_id_de_identidad_gen ? estudianteSelected.el_id_de_identidad_gen : "No especifica" },
          ],
          [
            { type: "text", name: "Deportes que practica" },
            editar
              ? { type: "input", name: "" }
              : { type: "text", name: estudianteSelected.actividades_ocio_deporte ? estudianteSelected.actividades_ocio_deporte : "No especifica" },
          ],
          [
            { type: "text", name: "Condición de excepción" },
            editar
              ? { type: "select", name: "", options: [] }
              : { type: "text", name: estudianteSelected.el_id_de_cond_excepcion ? estudianteSelected.el_id_de_cond_excepcion : "No aplica" },
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
