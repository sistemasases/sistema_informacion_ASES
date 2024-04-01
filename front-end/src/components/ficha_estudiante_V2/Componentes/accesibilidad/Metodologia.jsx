import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";

const Metodologia = () => {
  return (
    <AcordionesHijos
      acordiones={[
        {
          title: "Macro",
          content: (
            <Columns
              columns={[
                [
                  { type: "text", name: "Práctica pedagógica del docente" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Orientada al desarrollo de capacidades",
                  },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Centrada en los objetivos",
                  },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value:
                      "Centrada en el desarrollo de estrategias de aprendizaje",
                  },
                ],
                [
                  { type: "text", name: "Corriente pedagógica" },
                  { type: "radio", name: "tripleChoice", value: "conductista" },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Constructivista",
                  },
                  {
                    type: "radio",
                    name: "tripleChoice",
                    value: "Socio-critica",
                  },
                ],
              ]}
            />
          ),
        },
        {
          title: "Meso",
          content: (
            <AcordionesHijos
              acordiones={[
                {
                  title: "Competencias específicas",
                  content: (
                    <Columns
                      columns={[
                        [
                          { type: "text", name: "Objetivos" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Conductas observables",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Desarrolla capacidad",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Por capacidades y valores",
                          },
                        ],
                        [
                          {
                            type: "text",
                            name: "Contenidos",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Centrada en el contenido",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Centrada en preparar personas",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value:
                              "Centradas en aprendizajes cognitivos y afectivos.",
                          },
                        ],
                      ]}
                    />
                  ),
                },
                {
                  title: "Metodologías / Didácticas",
                  content: (
                    <Columns
                      columns={[
                        [
                          { type: "text", name: "Tipo de metodología" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Cerrado y obligatorio",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Flexible",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Abierto y flexible",
                          },
                        ],
                        [
                          {
                            type: "text",
                            name: "Estrategias de enseñanza/aprendizaje Canales de comunicación",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Aprender y almacenar",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Preparar personas para convivir",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value:
                              "Orientada al aprendizaje cognitivo y afectivos",
                          },
                        ],
                      ]}
                    />
                  ),
                },
                {
                  title: "Evaluación",
                  content: (
                    <Columns
                      columns={[
                        [
                          { type: "text", name: "Tipos de evaluación" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Cuantitativa",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Cualitativa",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Cualitativa y cuantitativa",
                          },
                        ],
                        [
                          {
                            type: "text",
                            name: "Procedimiento de la evaluación",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Centrada en el producto",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Formativa",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Formativa y sumativa",
                          },
                        ],
                        [
                          {
                            type: "text",
                            name: "Tiempos de la evaluación",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Porcentual",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Continua y cualitativa",
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Cuantitativa/ Heteroevaluación...",
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
        {
          title: "Micro",
          content: (
            <Columns
              columns={[
                [
                  { type: "text", name: "Práctica pedagógica del docente" },
                  { type: "input", name: "" },
                ],
                [
                  { type: "text", name: "Tiempo asincronico" },
                  { type: "input", name: "" },
                ],
                [
                  {
                    type: "text",
                    name: "Tipo de asignatura (electiva- profesional- OL)",
                  },
                  { type: "input", name: "" },
                ],
                [
                  { type: "text", name: "Créditos" },
                  { type: "input", name: "" },
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
                    name: " Uso de imágenes con su descripción",
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
                    name: " Producciones audiovisuales con subtitulado y audiodescripción",
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
                  { type: "checkbox", name: " Utiliza material de audio" },
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
                    name: " Diseño de documentos con procesadores de texto",
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
                    name: " Diseño de documentos con presentaciones",
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
                    name: " Se recomienda utilizar títulos predeterminados, párrafos y listas (viñetas numeradas en lo posible)",
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
                    name: " Incluir saltos de secciones y de página, número de página, títulos en las ilustraciones, etc",
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
                  { type: "checkbox", name: " Nunca simular los elementos" },
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
                    name: " Listar los elementos: imagen 1, imagen 2, etc. con su respectiva descripción",
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
                    name: " El idioma principal de los documentos debe configurarse para que los programas que verbalizan el contenido de la pantalla seleccionen la pronunciación adecuada",
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
                  { type: "checkbox", name: " Pauta Uso del color" },
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
                    name: " Considerar la flexibilización de los plazos de entrega de los trabajos y la modalidad de los mismos",
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
                    name: " Garantizar las condiciones de accesibilidad en las evaluaciones en general y en la toma de exámenes",
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
                    name: " Contar con el programa y cronograma actualizado en formatos accesibles",
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
                    name: " Disponer de los materiales de estudio antes de la clase",
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
                    name: " Adelantar de manera ordenada en unidades o temáticas bien identificadas",
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
                    name: " El resumen de una clase virtual/presencial podría favorecer significativamente el aprendizaje de las/los estudiantes",
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
                    name: " En el caso de compartir videos, verificar que tengan subtitulado y una duración máxima de 15 minutos",
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
                    name: " Ofrecer múltiples maneras de presentar los materiales de estudio",
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
                    name: " Se prioriza subir contenidos en formato descargable y sin uso de datos",
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

export default Metodologia;
