import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const Instrumental = () => {
  const [isYesSelected, setIsYesSelected] = useState(false);
  const [elementId, setElementId] = useState("");

  const handleRadioChange = (event) => {
    if (event.target.value === "Si") {
      setElementId(event.target.id);
      setIsYesSelected(true);
      console.log(event.target.id)
    } else if (event.target.value === "No") {
      setElementId(event.target.id);
      setIsYesSelected(false);
      console.log(event.target.id)
    }
  };

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
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "1" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "1" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "1"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "1"},
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "1"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Cuidado del intestino y la vejiga",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "2" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "2" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "2"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "2" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "2"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Vestirse",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "3" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "3" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "3"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "3" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "3"
                  },
                ],
                [
                  { type: "text", name: "Comer" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "4" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "4" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "4"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "4" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "4"
                  },
                ],
                [
                  { type: "text", name: "Alimentación" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "5" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "5" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "5"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "5" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "5"
                  },
                ],
                [
                  { type: "text", name: "Movilidad funcional" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "6" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "6" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "6"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "6" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "6"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Cuidado de los dispositivos de atención personal.",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "7" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "7" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "7"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "7" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "7"
                  },
                ],
                [
                  { type: "text", name: "Higiene y arreglo personal" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "8" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "8" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "8"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "8" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "8"
                  },
                ],
                [
                  { type: "text", name: "Actividad sexual" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "9" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "9" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "9"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "9" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "9"
                  },
                ],
                [
                  { type: "text", name: "Aseo e higiene en el inodoro" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "10" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "10" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "10"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "10" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "10"
                  },
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
                  {
                    type: "text",
                    name: "Cuidado de los otros (incluyendo seleccionar y supervisar a los cuidadores)",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "11" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "11" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "11"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "11" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "11"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Cuidado de mascotas",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "12" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "12" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "12"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "12" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "12"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Facilitar la crianza de los niños",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "13" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "13" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "13"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "13" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "13"
                  },
                ],
                [
                  { type: "text", name: "Gestión de la Comunicación" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "14" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "14" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "14"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "14" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "14"
                  },
                ],
                [
                  { type: "text", name: "Movilidad en la comunidad" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "15" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "15" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "15"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "15" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "15"
                  },
                ],
                [
                  { type: "text", name: "Manejo de finanzas" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "16" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "16" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "16"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "16" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "16"
                  },
                ],
                [
                  { type: "text", name: "Manejo y mantenimiento de la salud" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "17" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "17" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "17"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "17" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "17"
                  },
                ],
                [
                  { type: "text", name: "Establecimiento y manejo del hogar" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "18" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "18" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "18"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "18" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "18"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Preparación de la comida y la limpieza",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "19" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "19" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "19"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "19" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "19"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Práctica de la religión/ Aspectos espirituales",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "20" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "20" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "20"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "20" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "20"
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Mantenimiento de la seguridad y responder a la emergencia",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "21" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "21" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "21"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "21" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "21"
                  },
                ],
                [
                  { type: "text", name: "Compras" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "22" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "22" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "22"
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "22" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "22"
                  },
                ],
              ]}
            />
          ),
        },
        {
          title: "Actividades básicas de la vida diaria",
          content: (
            <Columns
              columns={[
                [
                  { type: "text", name: "Alt. de descanso/bienestar" },
                  { type: "radio", name: "binaryChoice", value: "Si"},
                  { type: "radio", name: "binaryChoice", value: "No"},
                ],
                [
                  { type: "text", name: "Medicamentos para descansar" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "23" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "23" },
                  { type: "input", name: "Cuál o cuales?", disabled: !isYesSelected && elementId === "23"  },
                ],
                [
                  { type: "text", name: "Horas de descanso día" },
                  { type: "number", name: "No. horas" },
                ],
                [
                  { type: "text", name: "Influye en sus actividades" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "n" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "n" },
                ],
              ]}
            />
          ),
        },
        {
          title: "Ajustes razonables",
          content: (
            <Columns
              columns={[
                [
                  {
                    type: "checkbox",
                    name: " Uso del tipo de iluminación requerida en los espacios (sensores de activación de luz)",
                  },
                  { type: "text", name: "Intensidad" },
                  {
                    type: "select",
                    name: "",
                    options: [
                      "Intermitente",
                      "Limitado",
                      "Extenso",
                      "Generalizado",
                    ],
                  },
                ],
                [
                  {
                    type: "checkbox",
                    name: " Descripción auditiva y visual de los espacios",
                  },
                  { type: "text", name: "Intensidad" },
                  {
                    type: "select",
                    name: "",
                    options: [
                      "Intermitente",
                      "Limitado",
                      "Extenso",
                      "Generalizado",
                    ],
                  },
                ],
                [
                  {
                    type: "checkbox",
                    name: " Categorización de utensilios para eventos y espacios (baño)",
                  },
                  { type: "text", name: "Intensidad" },
                  {
                    type: "select",
                    name: "",
                    options: [
                      "Intermitente",
                      "Limitado",
                      "Extenso",
                      "Generalizado",
                    ],
                  },
                ],
                [
                  {
                    type: "checkbox",
                    name: " Socialización y establecimiento de rutinas (uso de aditamentos, horarios para ingreso al baño)",
                  },
                  { type: "text", name: "Intensidad" },
                  {
                    type: "select",
                    name: "",
                    options: [
                      "Intermitente",
                      "Limitado",
                      "Extenso",
                      "Generalizado",
                    ],
                  },
                ],
                [
                  {
                    type: "checkbox",
                    name: " Uso de recursos audiovisuales para la orientación y movilidad",
                  },
                  { type: "text", name: "Intensidad" },
                  {
                    type: "select",
                    name: "",
                    options: [
                      "Intermitente",
                      "Limitado",
                      "Extenso",
                      "Generalizado",
                    ],
                  },
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
