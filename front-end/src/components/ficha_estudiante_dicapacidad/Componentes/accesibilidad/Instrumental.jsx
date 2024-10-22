import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const Instrumental = () => {

  const [selection, setSelection] = useState(() => {
    const initialSelection = {};
    for (let i = 17; i <= 40; i++) {
      initialSelection[i] = { binaryChoice: '', tripleChoiceDisabled: false, tripleChoice: '' };
    }
    return initialSelection;
  });


  const handleRadioChange = (event) => {
    const { id, value, name } = event.target;
    setSelection(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name.includes('binaryChoice') ? 'binaryChoice' : 'tripleChoice']: value,
        tripleChoiceDisabled: name.includes('binaryChoice') && value === "No"
      }
    }));
  };

  const createColumns = (id, name) => (
    [
      { type: "text", name },
      { type: "radio", name: `binaryChoice-${id}`, value: "Si", onChange: handleRadioChange, id: id.toString(), checked: selection[id].binaryChoice === "Si" },
      { type: "radio", name: `binaryChoice-${id}`, value: "No", onChange: handleRadioChange, id: id.toString(), checked: selection[id].binaryChoice === "No" },
      {
        type: "radio",
        name: `tripleChoice-${id}`,
        value: "Independiente",
        disabled: selection[id].tripleChoiceDisabled,
        onChange: handleRadioChange,
        id: id.toString(),
        checked: selection[id].tripleChoice === "Independiente"
      },
      {
        type: "radio",
        name: `tripleChoice-${id}`,
        value: "Dependiente",
        disabled: selection[id].tripleChoiceDisabled,
        onChange: handleRadioChange,
        id: id.toString(),
        checked: selection[id].tripleChoice === "Dependiente"
      },
      {
        type: "radio",
        name: `tripleChoice-${id}`,
        value: "Requiere apoyo",
        disabled: selection[id].tripleChoiceDisabled,
        onChange: handleRadioChange,
        id: id.toString(),
        checked: selection[id].tripleChoice === "Requiere apoyo"
      },
    ]
  )

  return (
    <AcordionesHijos
      acordiones={[
        {
          title: "Tareas y demandas generales",
          content: (
            <Columns
              columns={[
                createColumns(17, "Bañarse, ducharse"),
                createColumns(18, "Cuidado del intestino y la vejiga"),
                createColumns(19, "Vestirse"),
                createColumns(20, "Comer"),
                createColumns(21, "Movilidad funcional"),
                createColumns(22, "Cuidado de los dispositivos de atención personal"),
                createColumns(23, "Higiene y arreglo personal"),
                createColumns(24, "Actividad sexual"),
                createColumns(25, "Aseo e higiene en el inodoro"),
              ]}
            />
          ),
        },
        {
          title: "Actividades instrumentales de la vida diaria",
          content: (
            <Columns
              columns={[
                createColumns(26, "Cuidado de los otros (incluyendo seleccionar y supervisar a los cuidadores)"),
                createColumns(27, "Cuidado de mascotas"),
                createColumns(28, "Facilitar la crianza de los niños"),
                createColumns(29, "Gestión de la Comunicación"),
                createColumns(30, "Movilidad en la comunidad"),
                createColumns(31, "Manejo de finanzas"),
                createColumns(32, "Manejo y mantenimiento de la salud"),
                createColumns(33, "Establecimiento y manejo del hogar"),
                createColumns(34, "Preparación de la comida y la limpieza"),
                createColumns(35, "Práctica de la religión/ Aspectos espirituales"),
                createColumns(36, "Mantenimiento de la seguridad y responder a la emergencia"),
                createColumns(37, "Compras"),
              ]}
            />
          ),
        },
        {
          title: "Actividades básicas de la vida diaria",
          content: (
            <Columns
              columns={[
                createColumns(38, "Alt. de descanso/bienestar"),
                createColumns(39, "Medicamentos para descansar"),
                [
                  { type: "text", name: "Horas de descanso día" },
                  { type: "number", name: "No. horas" },
                ],
                createColumns(40, "Influye en sus actividades"),
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
