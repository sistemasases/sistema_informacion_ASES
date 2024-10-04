import React, { useState, useEffect } from "react";
import { Container, Accordion } from "react-bootstrap";
import Pestañas from "./pestañas";
import Tabla_resumen from "./tabla_resumen";
import TablaReportes from "./tabla_reportes";
import Bar_chart from "./barchart";
import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

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
            `${process.env.REACT_APP_API_URL}/academico/reporte_calificador/`,
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
            `${process.env.REACT_APP_API_URL}/academico/reporte_calificador_estudiante/`,
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
