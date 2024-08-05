import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const Programatica = () => {
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
          title: "Vida Comunitaria",
          content: (
            <Columns
              columns={[
                [
                  {
                    type: "text",
                    name: "Participa en organizaciones benéficas",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "1" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "1" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "1" },
                ],
                [
                  { type: "text", name: "Participa en Clubes" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "2" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "2" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "2" },
                ],
                [
                  {
                    type: "text",
                    name: "Participa en organizaciones sociales profesionales",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "3" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "3" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "3" },
                ],
              ]}
            />
          ),
        },
        {
          title: "Ocio y tiempo libre",
          content: (
            <Columns
              columns={[
                [
                  {
                    type: "text",
                    name: "Participa en actividades recreativas o de ocio",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "4" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "4" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "4" },
                ],
                [
                  { type: "text", name: "Participa en deportes" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "5" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "5" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "5" },
                ],
                [
                  {
                    type: "text",
                    name: "Participa en actividades de entretenimiento (museos, cines y teatro)",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "6" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "6" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "6" },
                ],
                [
                  { type: "text", name: "Toca algún instrumento" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "7" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "7" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "7" },
                ],
                [
                  { type: "text", name: "Viaja por si sola" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "8" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "8" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "8" },
                ],
              ]}
            />
          ),
        },
        {
          title: "Religión y espiritualidad",
          content: (
            <Columns
              columns={[
                [
                  {
                    type: "text",
                    name: "Participa en actividades organizaciones o prácticas religiosas",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "9" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "9" },
                  { type: "input", name: "Cuál?", disabled: !isYesSelected && elementId === "9" },
                ],
              ]}
            />
          ),
        },
        {
          title: "Derechos humanos",
          content: (
            <Columns
              columns={[
                [
                  { type: "text", name: "Reconoce los derechos humanos" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "10" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "10" },
                  { type: "input", name: "Cuales?", disabled: !isYesSelected && elementId === "10" },
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
