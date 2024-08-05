import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const Comunicacional = () => {
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
      claseCon={"accordion-content"}
      acordiones={[
        {
          title: "Producción",
          content: (
            <Columns
              columns={[
                [
                  { type: "text", name: "Hablar" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "1" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "1" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "1",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente",
                    disabled: !isYesSelected && elementId === "1", },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "1",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Producción de mensajes no verbales",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "2" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "2" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "2",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "2" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "2",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Producción de mensajes en lenguaje de signos convencional",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "3" },
                  { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "3" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                    disabled: !isYesSelected && elementId === "3",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente", disabled: !isYesSelected && elementId === "3", },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                    disabled: !isYesSelected && elementId === "3",
                  },
                ],
                [
                  { type: "text", name: "Mensajes escritos" },
                  { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "4"  },
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
                  { type: "text", name: "Otras formas de producciones" },
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
              ]}
            />
          ),
        },
        {
          title: "Recepción",
          content: (
            <Columns
              columns={[
                [
                  { type: "text", name: "Recepción de mensajes hablados" },
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
                    name: "Recepción de mensajes no verbales",
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
                  {
                    type: "text",
                    name: "Recepción de mensajes en lenguaje de signos convencional",
                  },
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
                  {
                    type: "text",
                    name: "Ayudas técnicas que favorecen la cotidianidad escolar",
                  },
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
                  {
                    type: "text",
                    name: "Apoyo natural: guía interprete, interprete, tutor y también profesionales como tiflólogo o monitor",
                  },
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
          title: "Comunicación interpersonal",
          content: (
            <Columns
              columns={[
                [
                  { type: "text", name: "Discusión" },
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
                    name: "Utilización de dispositivos y técnicas de comunicación",
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
                    name: "Recepción de mensajes en lenguaje de signos convencional",
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
                  {
                    type: "text",
                    name: "Conversación y utilización de dispositivos y técnicas de comunicación, otros especificados y no especificados",
                  },
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
                  { type: "text", name: "Comunicación, otra especificada" },
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
                  { type: "text", name: "Comunicación, no especificada" },
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
