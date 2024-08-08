import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const Programatica = () => {

  const [selection, setSelection] = useState(() => {
    const initialSelection = {};
    for (let i = 41; i <= 50; i++) {
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

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSelection(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        inputValue: value
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

  const createColumnsWithInput = (id, name) => (
    [
      { type: "text", name },
      { type: "radio", name: `binaryChoice-${id}`, value: "Si", onChange: handleRadioChange, id: id.toString(), checked: selection[id].binaryChoice === "Si" },
      { type: "radio", name: `binaryChoice-${id}`, value: "No", onChange: handleRadioChange, id: id.toString(), checked: selection[id].binaryChoice === "No" },
      {
        type: "input",
        name: "Cuál?",
        disabled: selection[id].tripleChoiceDisabled,
        onChange: handleInputChange,
        id: id.toString(),
        value: selection[id].inputValue
      },
    ]
  )

  return (
    <AcordionesHijos
      acordiones={[
        {
          title: "Vida Comunitaria",
          content: (
            <Columns
              columns={[
                createColumns(41, "Participa en organizaciones benéficas"),
                createColumns(42, "Participa en Clubes"),
                createColumns(43, "Participa en organizaciones sociales profesionales"),
              ]}
            />
          ),
        },
        {
          title: "Ocio y tiempo libre",
          content: (
            <Columns
              columns={[
                createColumnsWithInput(44, "Participa en actividades recreativas o de ocio"),
                createColumnsWithInput(45, "Participa en deportes"),
                createColumnsWithInput(46, "Participa en actividades de entretenimiento (museos, cines y teatro)"),
                createColumnsWithInput(47, "Toca algún instrumento"),
                createColumnsWithInput(48, "Viaja por si sola"),
              ]}
            />
          ),
        },
        {
          title: "Religión y espiritualidad",
          content: (
            <Columns
              columns={[
                createColumnsWithInput(49, "Participa en actividades organizaciones o prácticas religiosas"),
              ]}
            />
          ),
        },
        {
          title: "Derechos humanos",
          content: (
            <Columns
              columns={[
                createColumnsWithInput(50, "Reconoce los derechos humanos"),
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
                    name: " Realizar procesos de sensibilización sobre la importancia de agremiaciones y colectivos",
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
                    name: " Indagar sobre espacios de participación que motiven al estudiante con discapacidad",
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
                    name: " Indagar sobre espacios de participación a nivel deportivo que motiven al estudiante",
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
                    name: " Establecer redes interinstitucionales para la participación de eventos a nivel deportivo, cultural y religioso para la inclusión del estudiante",
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

export default Programatica;
