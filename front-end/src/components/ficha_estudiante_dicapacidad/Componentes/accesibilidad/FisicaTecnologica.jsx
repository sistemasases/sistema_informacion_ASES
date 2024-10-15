import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const FisicaTecnologica = () => {
  const [isYesSelected, setIsYesSelected] = useState(false);
  const [elementId, setElementId] = useState("");

  const [selection, setSelection] = useState(() => {
    const initialSelection = {};
    for (let i = 51; i <= 61; i++) {
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
      {
        type: "input",
        name: "tipo de apoyo",
        disabled: selection[id].tripleChoiceDisabled,
        onChange: handleRadioChange,
        id: id.toString(),
      }
    ]
  )
  return (
    <AcordionesHijos
      acordiones={[
        {
          title: "Accesibilidad Física",
          content: (
            <AcordionesHijos
              acordiones={[
                {
                  title: "Zonas comunes",
                  content: (
                    <Columns
                      columns={[
                        createColumns(51, "Aulas de clase"),
                        createColumns(52, "Edificios"),
                        createColumns(53, "Laboratorios"),
                        createColumns(54, "Facultades zonas"),
                      ]}
                    />
                  ),
                },
                {
                  title: "Espacios recreativos",
                  content: (
                    <Columns
                      columns={[
                        createColumns(55, "Cafeteria"),
                        createColumns(56, "Parqueadero"),
                        createColumns(57, "CDU"),
                        createColumns(58, "Auditorios"),
                      ]}
                    />
                  ),
                },
              ]}
              claseAcor={
                "acordion subacordion subsubacordion subsubsubacordion"
              }
            />
          ),
        },
        {
          title: "Accesibilidad Tecnológica",
          content: (
            <AcordionesHijos
              acordiones={[
                {
                  title:
                    "Experiencia y manejo de las herramientas tecnológicas",
                  content: (
                    <Columns
                    columns={[
                      createColumns(59, "Acceso básico"),
                      createColumns(60, "Acceso intermedio"),
                      createColumns(61, "Acceso avanzado"),
                    ]}
                    />
                  ),
                },
                {
                  title: "Características de las herramientas",
                  content: (
                    <Columns
                      columns={[
                        [
                          {
                            type: "text",
                            name: "Accesibilidad básica de los sistemas hadware y sotfware",
                          },
                          {
                            type: "radio",
                            name: "oneChoice",
                            value: "Comandos de funcionamiento básico",
                          },
                        ],
                        [
                          {
                            type: "text",
                            name: "Accesibilidad Intermedia al software para los procesos académicos",
                          },
                          {
                            type: "radio",
                            name: "quadrupleChoice",
                            value: "Paquete Office",
                          },
                          {
                            type: "radio",
                            name: "quadrupleChoice",
                            value: "Exploradores Web",
                          },
                          {
                            type: "radio",
                            name: "quadrupleChoice",
                            value: "Correo Electrónico",
                          },
                          {
                            type: "radio",
                            name: "quadrupleChoice",
                            value: "Drive",
                          },
                        ],
                        [
                          {
                            type: "text",
                            name: "Accesibilidad avanzada al software según la carrera",
                          },
                          {
                            type: "radio",
                            name: "quintupleChoice",
                            value: "Adobe Illustrator",
                          },
                          {
                            type: "radio",
                            name: "quintupleChoice",
                            value: "Adobe Photoshop",
                          },
                          {
                            type: "radio",
                            name: "quintupleChoice",
                            value: "R Studio",
                          },
                          {
                            type: "radio",
                            name: "quintupleChoice",
                            value: "Stata",
                          },
                          {
                            type: "radio",
                            name: "quintupleChoice",
                            value: "Spss Statistics",
                          },
                        ],
                      ]}
                    />
                  ),
                },
                {
                  title: "Obtención de las herramientas",
                  content: (
                    <Columns
                      columns={[[{ type: "text", name: "No disponible" }]]}
                    />
                  ),
                },
              ]}
              claseAcor={
                "acordion subacordion subsubacordion subsubsubacordion"
              }
            />
          ),
        },
        {
          title: "Ajustes razonables",
          content: (
            <AcordionesHijos
              acordiones={[
                {
                  title: "Entorno socioeducativo",
                  content: (
                    <Columns
                      columns={[
                        [
                          { type: "checkbox", name: " Acceso a zonas comunes" },
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
                          { type: "checkbox", name: " Acceso a la Biblioteca" },
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
                          { type: "checkbox", name: " Acceso a la Cafetería" },
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
                          { type: "checkbox", name: " Edificios" },
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
                          { type: "checkbox", name: " Aulas de clase" },
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
                          { type: "checkbox", name: " Espacios recreativos" },
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
                          { type: "checkbox", name: " Laboratorios" },
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
                            name: " Espacios recreativos, sociales y culturales",
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
                            name: " Usos de equipamientos urbanos",
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
                            name: " Uso de elementos de señalización",
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
                          { type: "checkbox", name: " Uso de Señalética" },
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
                            name: " A nivel Tecnológico la Experiencia y conocimiento del manejo de las herramientas tecnológicas",
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
                {
                  title: "Actividades de cuidado",
                  content: (
                    <Columns
                      columns={[
                        [
                          {
                            type: "checkbox",
                            name: " Abarca el cuidado de uno mismo",
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
                            name: " Lavarse y secarse a sí mismo",
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
                            name: " El cuidado del cuerpo y partes del cuerpo",
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
                          { type: "checkbox", name: " Vestirse" },
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
                          { type: "checkbox", name: " Comer y beber" },
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
                          { type: "checkbox", name: " Cuidado de la salud" },
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
                {
                  title: "Entorno físico-arquitectónico",
                  content: (
                    <Columns
                      columns={[
                        [
                          {
                            type: "checkbox",
                            name: " Los accesorios y dispositivos en las instalaciones sanitarias",
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
              claseAcor={
                "acordion subacordion subsubacordion subsubsubacordion"
              }
            />
          ),
        },
      ]}
      claseAcor={"acordion subacordion subsubacordion"}
    />
  );
};

export default FisicaTecnologica;
