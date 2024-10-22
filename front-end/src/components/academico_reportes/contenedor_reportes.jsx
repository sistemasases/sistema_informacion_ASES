import React, { useState, useEffect } from "react";
import { Container, Accordion, Row, Button, Col } from "react-bootstrap";
import Pestañas from "./pestañas";
import Tabla_resumen from "./tabla_resumen";
import TablaReportes from "./tabla_reportes";
import Bar_chart from "./barchart";
import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { CSVLink } from "react-csv";
import writeXlsxFile from "write-excel-file";

// Cabeceras para el archivo CSV de Profesores
var csv_headers = [
  { label: "Curso", key: "curso" },
  { label: "Profesor", key: "profesor" },
  { label: "Correo", key: "correo" },
  { label: "Items", key: "items" },
  { label: "Calificados", key: "calificados" },
  { label: "Sin Calificar", key: "sin" },
];

// Cabeceras para el archivo CSV de Estudiantes
var csv_headers_estudiantes = [
  { label: "Codigo", key: "codigo" },
  { label: "Nombre", key: "nombre" },
  { label: "Correo", key: "correo" },
  { label: "Items Ganados", key: "items_ganados" },
  { label: "Items Perdidos", key: "items_perdidos" },
];

// Contenido del xlsx Profesores
var schema = [
  {
    column: "Curso",
    type: String,
    value: (student) => student.curso,
  },
  {
    column: "Profesor",
    type: String,
    value: (student) => student.profesor,
  },
  {
    column: "Correo",
    type: String,
    value: (student) => student.correo,
  },
  {
    column: "Items",
    type: Number,
    value: (student) => student.items,
  },
  {
    column: "Calificados",
    type: Number,
    value: (student) => student.calificados,
  },
  {
    column: "Sin Calificar",
    type: Number,
    value: (student) => student.sin,
  },
];

// Contenido del xlsx Estudiantes
var schema_estudiantes = [
  {
    column: "Código univalle",
    type: String,
    value: (student) => student.codigo,
  },
  {
    column: "Nombre",
    type: String,
    value: (student) => student.nombre,
  },
  {
    column: "Correo",
    type: String,
    value: (student) => student.correo,
  },
  {
    column: "Items Ganados",
    type: Number, // Cambiar a Number
    value: (student) => student.items_ganados,
  },
  {
    column: "Items Perdidos",
    type: Number, // Cambiar a Number
    value: (student) => student.items_perdidos,
  },
];

const Contenedor_reportes = () => {
  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  const [state, set_state] = useState({
    reporte: [],
    reporte_estudiantes: [],
  });

  const [activeTab, setActiveTab] = useState("Reporte de Cursos por Docente"); // Estado para la pestaña activa

  useEffect(() => {
    if (activeTab === "Reporte de Cursos por Docente") {
      const profesores_data = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/academico/reporte_calificador/` +
              desencriptarInt(sessionStorage.getItem("sede_id")) +
              "/",
            config
          );
          const reporte = response.data;

          if (reporte.length > 0) {
            set_state((prevState) => ({
              ...prevState,
              reporte,
            }));
          } else {
            set_state((prevState) => ({
              ...prevState,
              reporte: [],
            }));
          }
        } catch (error) {
          console.log("No se pudo obtener el dato");
        }
      };
      profesores_data();
    }
    if (activeTab === "Reporte de Items por Estudiante") {
      const estudiantes_data = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/academico/reporte_calificador_estudiante/` +
              desencriptarInt(sessionStorage.getItem("sede_id")) +
              "/",
            config
          );
          const reporte_estudiantes = response.data;
          //   console.log(reporte_estudiantes);
          if (reporte_estudiantes.length > 0) {
            set_state((prevState) => ({
              ...prevState,
              reporte_estudiantes,
            }));
          } else {
            set_state((prevState) => ({
              ...prevState,
              reporte_estudiantes: [],
            }));
          }
        } catch (error) {
          console.log("No se pudo obtener el dato");
        }
      };
      estudiantes_data();
      //   console.log(state.reporte_estudiantes);
    }
  }, [activeTab]);

  const titulosProfesores = [
    "Total de cursos",
    "Cursos con al menos un item",
    "Cursos con al menos un item calificado",
    "Cursos sin items registrados",
  ];

  const titulosItems = [
    "Total Estudiantes*",
    "Estud. con uno o más items perdidos",
    "Estud. con más items perdidos que ganados",
  ];

  const itemsProfesores = [
    [
      state.reporte.length,
      state.reporte.filter((item) => item.items_count > 0).length,
      state.reporte.filter((item) => item.items_calificados_count > 0).length,
      state.reporte.filter((item) => item.items_count === 0).length,
    ],
  ];

  const itemsItems = [
    [
      state.reporte_estudiantes.filter((item) => item.items_matriculados > 0)
        .length,
      state.reporte_estudiantes.filter((item) => item.items_perdidos > 0)
        .length,
      state.reporte_estudiantes.filter(
        (item) => item.items_perdidos > item.items_ganados
      ).length,
    ],
  ];

  const datosProfesores = titulosProfesores.map((titulo, index) => ({
    name: titulo,
    cursos: parseInt(itemsProfesores[0][index]),
  }));

  const datosItems = titulosItems.map((titulo, index) => ({
    name: titulo,
    cursos: parseInt(itemsItems[0][index]),
  }));

  const columns_profesores = [
    { name: "Curso", selector: (row) => row.curso, sortable: true, grow: 2 },
    {
      name: "Profesor",
      selector: (row) => row.profesor,
      sortable: true,
      grow: 2,
    },
    { name: "Correo", selector: (row) => row.correo, sortable: true, grow: 2 },
    {
      name: "Items",
      selector: (row) => row.items,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Calificados",
      selector: (row) => row.calificados,
      sortable: true,
      maxWidth: "100px",
    },
    { name: "Sin Calificar", selector: (row) => row.sin, sortable: true },
  ];

  const data_profesores = state.reporte.map((item) => ({
    curso: item.nombre + " (" + item.cod_materia + "-" + item.franja + ")",
    profesor: item.profesor,
    correo: item.profesor_email,
    items: item.items_count,
    calificados: item.items_calificados_count,
    sin: item.items_count - item.items_calificados_count,
  }));

  const columns_estudiantes = [
    { name: "Código*", selector: (row) => row.codigo, sortable: true, grow: 1 },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true, grow: 2 },
    { name: "Correo", selector: (row) => row.correo, sortable: true, grow: 2 },
    {
      name: "Items Ganados",
      selector: (row) => row.items_ganados,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Items Perdidos",
      selector: (row) => row.items_perdidos,
      sortable: true,
      maxWidth: "200px",
    },
  ];

  const data_estudiantes = state.reporte_estudiantes.map((item) => ({
    codigo: item.cod_univalle,
    nombre: item.nombre + " " + item.apellido,
    correo: item.email,
    items_ganados: item.items_ganados,
    items_perdidos: item.items_perdidos,
  }));

  /**
   * Función para Imprimir el excel.
   */
  const imprimir_excel = (data, type) => {
    if (type["type"] == "estudiantes") {
      try {
        writeXlsxFile(data, {
          schema: schema_estudiantes,
          fileName: "Reporte calificador - Estudiantes.xlsx",
        });
      } catch (error) {
        console.error("Error al generar el archivo Excel:", error);
      }
    }

    if (type["type"] == "docentes") {
      writeXlsxFile(data, {
        schema,
        fileName: "Reporte calificador - Docentes.xlsx",
      });
    }
  };

  const listaPestañas = [
    {
      title: "Reporte de Cursos por Docente",
      content: (
        <Container>
          <Accordion defaultActiveKey={["0"]}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Resumen</Accordion.Header>
              <Accordion.Body>
                <Tabla_resumen
                  titulos={titulosProfesores}
                  items={itemsProfesores}
                />
                <Bar_chart data={datosProfesores} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Reporte de Cursos por Docente</Accordion.Header>
              <Accordion.Body>
                <TablaReportes
                  columns={columns_profesores}
                  data={data_profesores}
                />
                <Row>
                  <Col xs={2} style={{ paddingRight: 2, marginRight: 2 }}>
                    <CSVLink
                      style={{ margin: 5 }}
                      headers={csv_headers}
                      data={data_profesores}
                      filename="Reporte calificador - Profesores.csv"
                    >
                      {/* headers={columns} */}
                      <Button style={{ margin: 1 }}> Imprimir CSV</Button>
                    </CSVLink>
                  </Col>
                  <Col xs={2}>
                    <Button
                      style={{ margin: 1 }}
                      name="imprimir_excel"
                      onClick={() => {
                        imprimir_excel(data_profesores, {
                          type: "docentes",
                        });
                      }}
                    >
                      Imprimir Excel
                    </Button>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      ),
    },
    {
      title: "Reporte de Items por Estudiante",
      content: (
        <Container>
          <p>
            *Estudiantes ASES matriculados en cursos con items y calificaciones
            registradas
          </p>
          <Accordion defaultActiveKey={["0"]}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Resumen</Accordion.Header>
              <Accordion.Body>
                <Tabla_resumen titulos={titulosItems} items={itemsItems} />
                <Bar_chart data={datosItems} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Reporte de Cursos por Items</Accordion.Header>
              <Accordion.Body>
                <TablaReportes
                  columns={columns_estudiantes}
                  data={data_estudiantes}
                />
                <Row>
                  <Col xs={2} style={{ paddingRight: 2, marginRight: 2 }}>
                    <CSVLink
                      style={{ margin: 5 }}
                      headers={csv_headers_estudiantes}
                      data={data_estudiantes}
                      filename="Reporte calificador - Estudiantes.csv"
                    >
                      {/* headers={columns} */}
                      <Button style={{ margin: 1 }}> Imprimir CSV</Button>
                    </CSVLink>
                  </Col>
                  <Col xs={2}>
                    <Button
                      style={{ margin: 1 }}
                      name="imprimir_excel"
                      onClick={() => {
                        imprimir_excel(data_estudiantes, {
                          type: "estudiantes",
                        });
                      }}
                    >
                      Imprimir Excel
                    </Button>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      ),
    },
  ];

  return (
    <div className="contenedor-reportes">
      <Pestañas
        lista_Pestañas={listaPestañas}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />
    </div>
  );
};

export default Contenedor_reportes;
