import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";

const Instrumental = () => {
  return (
    <AcordionesHijos
      acordiones={[
        {
          title: "Tareas y demandas generales",
          content: (
            <Columns
              columns={[
                [
                    { type: "text", name: "Bañarse, ducharse" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    {
                        type: "text",
                        name: "Cuidado del intestino y la vejiga",
                    },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    {
                        type: "text",
                        name: "Vestirse",
                    },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Comer" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Alimentación" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Movilidad funcional" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Cuidado de los dispositivos de atención personal." },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Higiene y arreglo personal" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Actividad sexual" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Aseo e higiene en el inodoro" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
              ]}
            />
          ),
        },
        {
          title: "Actividades instrumentales de la vida diaria",
          content: (
            <Columns
              columns={[
                [
                    { type: "text", name: "Cuidado de los otros (incluyendo seleccionar y supervisar a los cuidadores)" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    {
                        type: "text",
                        name: "Cuidado de mascotas",
                    },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    {
                        type: "text",
                        name: "Facilitar la crianza de los niños",
                    },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Gestión de la Comunicación" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Movilidad en la comunidad" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Manejo de finanzas" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Manejo y mantenimiento de la salud" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Establecimiento y manejo del hogar" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Preparación de la comida y la limpieza" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Práctica de la religión/ Aspectos espirituales" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Mantenimiento de la seguridad y responder a la emergencia" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
                [
                    { type: "text", name: "Compras" },
                    { type: "radio", name: "binaryChoice", value: "Si"},
                    { type: "radio", name: "binaryChoice", value: "No"},
                    { type: "radio", name: "tripleChoice", value: "Independiente"},
                    { type: "radio", name: "tripleChoice", value: "Dependiente"},
                    { type: "radio", name: "tripleChoice", value: "Requiere apoyo"},
                ],
              ]}
            />
          ),
        },
        { title: "Actividades básicas de la vida diaria", content: (
          <Columns
            columns={[
              [
                { type: "text", name: "Alt. de descanso/bienestar" },
                { type: "radio", name: "binaryChoice", value: "Si"},
                { type: "radio", name: "binaryChoice", value: "No"},
              ],
              [
                { type: "text", name: "Medicamentos para descansar" },
                { type: "radio", name: "binaryChoice", value: "Si"},
                { type: "radio", name: "binaryChoice", value: "No"},
                { type: "input", name: "Cuál o cuales?" },
              ],
              [
                { type: "text", name: "Horas de descanso día" },
                { type: "number", name: "No. horas" },
              ],
              [
                { type: "text", name: "Influye en sus actividades" },
                { type: "radio", name: "binaryChoice", value: "Si"},
                { type: "radio", name: "binaryChoice", value: "No"},
              ],
            ]}
          />
        ), },
        {
          title: "Ajustes razonables",
          content: (
            <Columns
              columns={[
                [
                    { type: "checkbox", name: " Uso del tipo de iluminación requerida en los espacios (sensores de activación de luz)" },
                    { type: "text", name: "Intensidad" },
                    { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                ],
                [
                    { type: "checkbox", name: " Descripción auditiva y visual de los espacios" },
                    { type: "text", name: "Intensidad" },
                    { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                ],
                [
                    { type: "checkbox", name: " Categorización de utensilios para eventos y espacios (baño)" },
                    { type: "text", name: "Intensidad" },
                    { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                ],
                [
                    { type: "checkbox", name: " Socialización y establecimiento de rutinas (uso de aditamentos, horarios para ingreso al baño)" },
                    { type: "text", name: "Intensidad" },
                    { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                ],
                [
                    { type: "checkbox", name: " Uso de recursos audiovisuales para la orientación y movilidad" },
                    { type: "text", name: "Intensidad" },
                    { type: "select", name: "", options: ["Intermitente", "Limitado", "Extenso", "Generalizado"] },
                ],
              ]}
            />
          ),
        },
      ]}
      claseAcor={"acordion subacordion subsubacordion"}
    />
  );
};

export default Instrumental;
