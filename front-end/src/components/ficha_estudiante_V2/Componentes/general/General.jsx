import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth";
import Columns from "../Columns";
import withSwal from "../withSwal";

// Componente de General
// Este componente se encarga de mostrar la información general de un estudiante
// permite editar ciertos detalles de la información
const General = () => {
  const { user, shosenStudent } = useAuthStore();
  const [editar, setEditar] = useState(false);
  const [nombreBoton, setNombreBoton] = useState("Editar información");

  useEffect(() => {
    if (editar) {
      setNombreBoton("Guardar información");
    } else {
      setNombreBoton("Editar información");
    }
  }, [editar]);
  // La idea usar al estudiante seleccionado almacenado en el useAuthStore, el cual es visible para
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
      {shosenStudent && (
        <>
          <Columns
            twobold="si"
            columns={[
              [
                { type: "text", name: "Nombres" },
                { type: "text", name: shosenStudent.nombre },
                { type: "text", name: "Apellidos" },
                { type: "text", name: shosenStudent.apellido },
              ],
              [
                { type: "text", name: "Puntaje Icfes" },
                editar
                  ? { type: "number", name: "" }
                  : { type: "text", name: shosenStudent.puntaje_icfes },
                { type: "text", name: "Año ingreso Univalle" },
                {
                  type: "text",
                  name: new Date(
                    Date.parse(shosenStudent.anio_ingreso)
                  ).getFullYear(),
                },
              ],
              [
                { type: "text", name: "Teléfono residencia" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: shosenStudent.telefono_ini },
                { type: "text", name: "Celular" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: shosenStudent.celular },
              ],
              [
                { type: "text", name: "Email alternativo" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: shosenStudent.email },
              ],
              [
                { type: "text", name: "Estrato" },
                { type: "text", name: shosenStudent.estrato },
                { type: "text", name: "Dirección residencia" },
                { type: "text", name: shosenStudent.dir_res },
              ],
              [
                { type: "text", name: "Barrio" },
                { type: "text", name: shosenStudent.barrio_res },
                { type: "text", name: "Municipio actual" },
                { type: "text", name: shosenStudent.ciudad_res },
              ],
              [
                { type: "text", name: "País de origen" },
                { type: "text", name: "Sin país" },
                { type: "text", name: "Grupo étnico" },
                editar
                  ? { type: "select", name: "", options: [] }
                  : { type: "text", name: shosenStudent.id_etnia },
              ],
              [
                { type: "text", name: "Actividad simultánea" },
                editar
                  ? { type: "select", name: "", options: [] }
                  : { type: "text", name: shosenStudent.id_act_simultanea },
                { type: "text", name: "Sexo" },
                editar
                  ? {
                      type: "select",
                      name: "",
                      options: ["Femenino", "Masculino"],
                    }
                  : { type: "text", name: shosenStudent.sexo },
              ],
              [
                { type: "text", name: "Identidad de género" },
                editar
                  ? { type: "input", name: "" }
                  : {
                      type: "text",
                      name: shosenStudent.el_id_de_identidad_gen,
                    },
                { type: "text", name: "Estado civil" },
                editar
                  ? { type: "select", name: "", options: [] }
                  : { type: "text", name: shosenStudent.el_id_de_estado_civil },
              ],
              [
                { type: "text", name: "Cantidad hijo(s)" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: shosenStudent.hijos },
                { type: "text", name: "Deportes que practica" },
                editar
                  ? { type: "input", name: "" }
                  : {
                      type: "text",
                      name: shosenStudent.actividades_ocio_deporte,
                    },
              ],
              [
                { type: "text", name: "Condición de excepciòn" },
                editar
                  ? { type: "select", name: "", options: [] }
                  : { type: "text", name: shosenStudent.id_cond_excepcion },
              ],
            ]}
          />
          <p className="title">Personas con quién vive </p>
          <Columns
            twobold="si"
            columns={[
              shosenStudent.vive_con.map((vive) => [
                { type: "text", name: "Nombre Completo" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: vive.nombre },
                { type: "text", name: "Parentesco" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: vive.parentesco },
              ]),
            ]}
          />
          <p className="title">
            Información general del acudiente de emergencia{" "}
          </p>
          <Columns
            twobold="si"
            columns={[
              [
                { type: "text", name: "Nombre Completo" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: shosenStudent.acudiente },
                { type: "text", name: "Parentesco y Teléfono" },
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: shosenStudent.telefono_acudiente },
              ],
            ]}
          />
          <p className="title">Observaciones </p>
          <Columns
            columns={[
              [
                editar
                  ? { type: "input", name: "" }
                  : { type: "text", name: shosenStudent.observacion },
              ],
            ]}
          />
        </>
      )}
    </div>
  );
};

export default withSwal(General); // This is the original line
