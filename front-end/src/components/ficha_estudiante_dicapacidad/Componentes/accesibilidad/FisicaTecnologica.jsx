import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";
import React, { useState } from 'react';

const FisicaTecnologica = () => {
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
          title: "Accesibilidad Física",
          content: (
            <AcordionesHijos
              acordiones={[
                {
                  title: "Zonas comunes",
                  content: (
                    <Columns
                      columns={[
                        [
                          { type: "text", name: "Aulas de clase" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "1" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "1" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "1"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "1"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "1"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "1" },
                        ],
                        [
                          { type: "text", name: "Edificios" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "2" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "2" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "2"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "2"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "2"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "2" },
                        ],
                        [
                          { type: "text", name: "Laboratorios" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "3" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "3" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "3"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "3"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "3"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "3" },
                        ],
                        [
                          { type: "text", name: "Facultades zonas" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "4" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "4" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "4"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "4"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "4"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "4" },
                        ],
                      ]}
                    />
                  ),
                },
                {
                  title: "Espacios recreativos",
                  content: (
                    <Columns
                      columns={[
                        [
                          { type: "text", name: "Cafetería" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "5" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "5" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "5"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "5"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "5"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "5" },
                        ],
                        [
                          { type: "text", name: "Parqueadero" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "6" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "6" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "6"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "6"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "6"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "6" },
                        ],
                        [
                          { type: "text", name: "CDU" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "7" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "7" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "7"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "7"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "7"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "7" },
                        ],
                        [
                          { type: "text", name: "Auditorios" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "8" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "8" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "8"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "8"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "8"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "8" },
                        ],
                        [
                          { type: "text", name: "Plazoletas" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "9" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "9" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "9"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "9"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "9"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "9" },
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
                        [
                          { type: "text", name: "Acceso básico" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "10" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "10" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "10"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "10"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "10"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "10" },
                        ],
                        [
                          { type: "text", name: "Acceso intermedio" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "11" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "11" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "11"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "11"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "11"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "11" },
                        ],
                        [
                          { type: "text", name: "Acceso avanzado" },
                          { type: "radio", name: "binaryChoice", value: "Si", onChange: handleRadioChange, id: "12" },
                          { type: "radio", name: "binaryChoice", value: "No", onChange: handleRadioChange, id: "12" },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Independiente",
                            disabled: !isYesSelected && elementId === "12"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Dependiente",
                            disabled: !isYesSelected && elementId === "12"
                          },
                          {
                            type: "radio",
                            name: "tripleChoice",
                            value: "Requiere apoyo",
                            disabled: !isYesSelected && elementId === "12"
                          },
                          { type: "input", name: "tipo de apoyo", disabled: !isYesSelected && elementId === "12" },
                        ],
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
