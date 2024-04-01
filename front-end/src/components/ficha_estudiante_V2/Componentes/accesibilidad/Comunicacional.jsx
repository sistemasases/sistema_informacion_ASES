import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";

const Comunicacional = () => {
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
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Producción de mensajes no verbales",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Producción de mensajes en lenguaje de signos convencional",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  { type: "text", name: "Mensajes escritos" },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  { type: "text", name: "Otras formas de producciones" },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
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
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Recepción de mensajes no verbales",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Recepción de mensajes en lenguaje de signos convencional",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Ayudas técnicas que favorecen la cotidianidad escolar",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Apoyo natural: guía interprete, interprete, tutor y también profesionales como tiflólogo o monitor",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
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
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Utilización de dispositivos y técnicas de comunicación",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Recepción de mensajes en lenguaje de signos convencional",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  {
                    type: "text",
                    name: "Conversación y utilización de dispositivos y técnicas de comunicación, otros especificados y no especificados",
                  },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  { type: "text", name: "Comunicación, otra especificada" },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
                  },
                ],
                [
                  { type: "text", name: "Comunicación, no especificada" },
                  { type: "radio", name: "binaryChoice", value: "Si" },
                  { type: "radio", name: "binaryChoice", value: "No" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Independiente",
                  },
                  { type: "radio", name: "tripleChoice", value: "Dependiente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Requiere apoyo",
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
