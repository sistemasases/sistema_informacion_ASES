import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const Comunicacional = () => {
  
  const [selection, setSelection] = useState(() => {
    const initialSelection = {};
    for (let i = 1; i <= 16; i++) {
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
      claseCon={"accordion-content"}
      acordiones={[
        {
          title: "Producción",
          content: (
            <Columns
              columns={[
                createColumns(1, "Hablar"),
                createColumns(2, "Producción de mensajes no verbales"),
                createColumns(3, "Producción de mensajes en lenguaje de signos convencional"),
                createColumns(4, "Mensajes escritos"),
                createColumns(5, "Otras formas de producciones"),
              ]}

            />
          ),
        },
        {
          title: "Recepción",
          content: (
            <Columns
              columns={[
                createColumns(6, "Discusión"),
                createColumns(7, "Recepción de mensajes no verbales"),
                createColumns(8, "Recepción de mensajes en lenguaje de signos convencional"),
                createColumns(9, "Ayudas técnicas que favorecen la cotidianidad escolar"),
                createColumns(10, "Apoyo natural: guía interprete, interprete, tutor y también profesionales como tiflólogo o monitor"),
              ]}

            />
          ),
        },
        {
          title: "Comunicación interpersonal",
          content: (
            <Columns
              columns={[
                createColumns(11, "Recepción de mensajes hablados"),
                createColumns(12, "Utilización de dispositivos y técnicas de comunicación"),
                createColumns(13, "Recepción de mensajes en lenguaje de signos convencional"),
                createColumns(14, "Conversación y utilización de dispositivos y técnicas de comunicación, otros especificados y no especificados"),
                createColumns(15, "Comunicación, otra especificada"),
                createColumns(16, "Comunicación, no especificada"),
              ]}
            />
          ),
        },
        {
          title: "Ajustes razonables",
          content: (
            <AcordionesHijos
              claseCon={"accordion-content"}
              acordiones={[
                {
                  title: "Apoyo en productos y tecnologías",
                  content: (
                    <Columns
                      columns={[
                        [
                          {
                            type: "checkbox",
                            name: " Mediaciones discursivas en el acto pedagógico",
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
                            name: " Diseño de estrategias y apoyos diferenciados",
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
                            name: " Implementar nuevas estrategias de apoyo",
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
                            name: " Ofrecimiento de un espacio de escucha para las inquietudes",
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
                            name: " Orientación sobre las herramientas didácticas y de accesibilidad",
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
                            name: " La accesibilidad de las plataformas como apoyo el formato virtual",
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
                            name: " Verificar los niveles de accesibilidad de la plataforma educativa que utilice la Universidad",
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
                            name: " Incorporar los recursos de accesibilidad que las plataformas utilizan",
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
                            name: " Uso de los dispositivos o Apps",
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
                            name: " Apuntes de clase –de Voz a Texto-",
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
                  title: "Apoyo en recursos técnicos y materiales",
                  content: (
                    <Columns
                      columns={[
                        [
                          { type: "checkbox", name: " NVDA" },
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
                          { type: "checkbox", name: " JAWS" },
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
                          { type: "checkbox", name: " ORCA" },
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
                            name: " Aplicaciones/Herramientas que soportan AT-SPI",
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
                          { type: "checkbox", name: " BALABOLKA" },
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
                            name: " Transformación de un archivo de texto a audio",
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
                            name: " Software de adaptación de los textos escritos a las necesidades de las personas con trastornos del espectro autista",
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
                            name: " Otros programas de texto a voz",
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
                            name: " El dictado por voz para textos largos de Google",
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
                            name: " Apoyo en tecnologías digitales",
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
                  title: "Servicios y sistemas de apoyo",
                  content: (
                    <Columns
                      columns={[
                        [
                          {
                            type: "checkbox",
                            name: " Adecuación de textos y de bibliografía",
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
                            name: " Adecuar materiales de estudio en distintas formas",
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
                            name: " Actualización del material en tiempo y forma, el material de estudio",
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

export default Comunicacional;
