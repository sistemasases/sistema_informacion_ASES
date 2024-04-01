import React, { useState, useEffect, Component, useRef } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Alert,
  Dropdown,
} from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  desencriptar,
  desencriptarInt,
  decryptTokenFromSessionStorage,
} from "../utilidades_seguridad/utilidades_seguridad.jsx";
import { CSVLink } from "react-csv";
import writeXlsxFile from "write-excel-file";
import myGif from "../reportes/loading_data.gif";

var columns = [
  {
    name: "Código",
    selector: (row) => row.cod_univalle,
    value: "cod_univalle",
    sortable: true,
    isCheck: true,
    width: "110px",
    conditionalCellStyles: [],
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    value: "nombre",
    sortable: true,
    isCheck: true,
    width: "110px",
    conditionalCellStyles: [],
  },
  {
    name: "Apellido",
    selector: (row) => row.apellido,
    value: "apellido",
    sortable: true,
    isCheck: true,
    width: "110px",
    conditionalCellStyles: [],
  },
  {
    name: "Documento",
    selector: (row) => row.num_doc,
    value: "num_doc",
    sortable: true,
    isCheck: true,
    width: "110px",
    conditionalCellStyles: [],
  },
  {
    name: "Acuerdo de tratamiento de datos",
    selector: (row) => row.firma_tratamiento_datos,
    value: "acuerdo_tratamiento_datos",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.firma_tratamiento_datos == "SIN FIRMAR",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.firma_tratamiento_datos == "NO AUTORIZA",
        style: {
          backgroundColor: "yellow",
          color: "#552CC4",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Encuesta de admitidos",
    selector: (row) => row.encuesta_admitido,
    value: "encuesta_admitido",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      // {
      //   when: (row) => row.encuesta_admitido == "DILIGENCIADO",
      //   style: {
      //     backgroundColor: "green",
      //     color: "white",
      //     "&:hover": {
      //       cursor: "pointer",
      //     },
      //   },
      // },
      {
        when: (row) => row.encuesta_admitido == "SIN DILIGENCIAR",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Ficha Semana Anterior",
    selector: (row) => row.fecha_seguimiento,
    value: "fecha_seguimiento",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.fecha_seguimiento == "FICHA FALTANTE",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Riesgo individual",
    selector: (row) => row.riesgo_individual,
    value: "riesgo_individual",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_individual == "ALTO",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_individual == "MEDIO",
        style: {
          backgroundColor: "yellow",
          color: "#552CC4",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_individual == "BAJO",
        style: {
          backgroundColor: "#4BF619",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Riesgo familiar",
    selector: (row) => row.riesgo_familiar,
    value: "riesgo_familiar",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_familiar == "ALTO",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_familiar == "MEDIO",
        style: {
          backgroundColor: "yellow",
          color: "#552CC4",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_familiar == "BAJO",
        style: {
          backgroundColor: "#4BF619",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Riesgo académico",
    selector: (row) => row.riesgo_academico,
    value: "riesgo_academico",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_academico == "ALTO",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_academico == "MEDIO",
        style: {
          backgroundColor: "yellow",
          color: "#552CC4",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_academico == "BAJO",
        style: {
          backgroundColor: "#4BF619",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Riesgo económico",
    selector: (row) => row.riesgo_economico,
    value: "riesgo_economico",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_economico == "ALTO",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_economico == "MEDIO",
        style: {
          backgroundColor: "yellow",
          color: "#552CC4",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_economico == "BAJO",
        style: {
          backgroundColor: "#4BF619",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "Riesgo vida universitaria",
    selector: (row) => row.riesgo_vida_universitaria_ciudad,
    value: "riesgo_vida_universitaria_ciudad",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_vida_universitaria_ciudad == "ALTO",
        style: {
          backgroundColor: "red",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_vida_universitaria_ciudad == "MEDIO",
        style: {
          backgroundColor: "yellow",
          color: "#552CC4",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_vida_universitaria_ciudad == "BAJO",
        style: {
          backgroundColor: "#4BF619",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  // {
  //   name: "Riesgo geográfico",
  //   selector: (row) => row.ciudad_res,
  //   value: "ciudad_res",
  //   sortable: true,
  //   isCheck: false,
  // },

  // {
  //   name: "Mensaje del profesional",
  //   selector: (row) => row.mensaje_profesional,
  //   value: "mensaje_profesional",
  //   sortable: true,
  //   isCheck: false,
  //   width: "190px",
  // },
  // {
  //   name: "Mensaje del practicante",
  //   selector: (row) => row.mensaje_practicante,
  //   value: "mensaje_practicante",
  //   sortable: true,
  //   isCheck: false,
  //   width: "190px",
  // },
  // {
  //   name: "Alerta académica",
  //   selector: (row) => row.alerta_academica,
  //   value: "alerta_academica",
  //   sortable: true,
  //   isCheck: false,
  //   width: "190px",
  // },
];

var new_columns = [];

var prueba = [];
var restore = [];

const Alertas = () => {
  const [state, set_state] = useState({ estudiante: [] });
  const [filtered, setFiltered] = useState(state.estudiante);
  const [search, set_Search] = useState({
    busqueda: "",
  });
  const [columnas, set_columnas] = useState({ cabeceras: [] });

  const filtros_Contacto = [
    {
      name: "Tipo de documento",
      selector: (row) => row.tipo_doc,
      value: "tipo_doc",
      sortable: true,
      isCheck: false,
    },
    {
      name: "Correo electrónico",
      value: "email",
      selector: (row) => row.email,
      sortable: true,
      isCheck: false,
    },

    {
      name: "Celular",
      value: "celular",
      selector: (row) => row.celular,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Dirección",
      value: "dir_res",
      selector: (row) => row.dir_res,
      sortable: true,
      isCheck: false,
    },
  ];

  //Conexion con el back para extraer todas los estudiantes
  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

    const datos_estudiantes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/alertas/estudiantes_info/` +
            id_usuario.toString() +
            "/",
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          estudiante: response.data,
        });
        setFiltered(response.data);
      } catch (error) {
        // console.log(error);
      }
    };

    datos_estudiantes();
  }, []);

  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

    const datos_estudiantes_extra = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/alertas/estudiante_datos_alertas/` +
            id_usuario.toString() +
            "/",
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          estudiante: response.data,
        });
        document.getElementsByName("loading_data")[0].style.visibility =
          "hidden";
        setFiltered(response.data);
      } catch (error) {
        // // console.log(error);
        if (error.message == "Network Error") {
          alert(
            "No se ha podido establecer conexión con el servidor. Se refrescará la página."
          );
          window.location.reload();
        }
      }
    };

    datos_estudiantes_extra();
  }, []);

  useEffect(() => {
    set_columnas((prevState) => ({
      ...prevState,
      cabeceras: columns,
    }));
  }, []);

  const onSearch = (e) => {
    set_Search({ ...search, busqueda: e.target.value });
    // // // // // console.log(search);
  };

  var empty_stuff = [{ cod_univalle: " ", nombre: " ", apellido: " " }];

  // console.log(state.estudiante);
  // console.log("Filtered es:");
  // console.log(filtered);
  prueba = state.estudiante;
  restore = state.estudiante;
  const [show, setShow] = useState(false);
  const [search_bar_data, set_search_bar_data] = useState([]);
  const handle_column_search = (e) => {
    restore = prueba;
    // console.log(e.target.name);
    // console.log(e.target.value);
    // // console.log(state.estudiante);
    // console.log(filtered);
    if (e.target.name === "Código") {
      // console.log(prueba);
      const hola = prueba.filter((row) =>
        row.cod_univalle.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      setFiltered(filtered_data);
      // console.log("Filtraste en Código");
    }
    if (e.target.name === "Nombre") {
      const hola = prueba.filter((row) =>
        row.nombre.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      setFiltered(filtered_data);
      // console.log("Filtraste en Nombre");
    }
    if (e.target.name === "Apellido") {
      const hola = prueba.filter((row) =>
        row.apellido.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      setFiltered(filtered_data);
      // console.log("Filtraste en Apellido");
    }
    if (e.target.name === "Documento") {
      const hola = prueba.filter((row) =>
        row.num_doc.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      setFiltered(filtered_data);
      // console.log("Filtraste en Documento");
    }
    if (e.target.name === "Acuerdo de tratamiento de datos") {
      const hola = prueba.filter((row) =>
        row.firma_tratamiento_datos
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      setFiltered(filtered_data);
      // console.log("Filtraste en Acuerdo de tratamiento de datos");
    }
    if (e.target.name === "Encuesta de admitidos") {
      const hola = prueba.filter((row) =>
        row.encuesta_admitido
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      setFiltered(filtered_data);
      // console.log("Filtraste en Encuesta de admitidos");
    }
    if (e.target.name === "Ficha Semana Anterior") {
      const hola = prueba.filter((row) =>
        row.fecha_seguimiento
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      setFiltered(filtered_data);
      // console.log("Filtraste en Ficha Semana Anterior");
    }
    if (e.target.name === "Riesgo individual") {
      const hola = prueba.filter((row) =>
        row.riesgo_individual
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;
      // console.log("Filtraste en Riesgo individual");
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo familiar") {
      const hola = prueba.filter((row) =>
        row.riesgo_familiar.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;

      // console.log("Filtraste en Riesgo familiar");
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo académico") {
      const hola = prueba.filter((row) =>
        row.riesgo_academico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;

      // console.log("Filtraste en Riesgo académico");
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo económico") {
      const hola = prueba.filter((row) =>
        row.riesgo_economico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;

      // console.log("Filtraste en Riesgo económico");
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo vida universitaria") {
      const hola = prueba.filter((row) =>
        row.riesgo_vida_universitaria_ciudad
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data = hola.length > 0 ? hola : empty_stuff;

      // console.log("Filtraste en Riesgo vida universitaria");
      setFiltered(filtered_data);
    }
  };

  var new_search_bar_data = [];
  const add_search_bar = () => {
    for (let i = 0; i < columns.length; i++) {
      const element = columns[i];
      element.name = (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">{element.name}</h4>
          <input
            name={element.name}
            internal_name={element.value}
            onChange={(e) => {
              handle_column_search(e);
            }}
            maxlength="20"
          />
        </Row>
      );
      new_columns.push(element);
    }

    // return new_columns;
  };

  //   Estilo visual de la tabla
  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#223336",
        backgroundColor: "#e7eef0",
      },
    },

    // rows: {
    //   style: {
    //     color: "#000000",
    //     backgroundColor: "#F7E6E6"
    //   },
    //   stripedStyle: {
    //     color: "#000000",
    //     backgroundColor: "#F5DDDD "
    //   }
    // },
    // border: {
    //   style: {
    //     color: "#0000",
    //   }
    // }
  };

  //   Opciones de paginacion de la tabla
  const paginacionOpciones = {
    rowsPerPageText: "Filas por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Mostrar Todo",
  };

  var csv_headers = [
    { label: "Código", key: "cod_univalle" },
    { label: "Nombre", key: "nombre" },
    { label: "Apellido", key: "apellido" },
    { label: "Documento", key: "num_doc" },
    {
      label: "Acuerdo de tratamiento de datos",
      key: "firma_tratamiento_datos",
    },
    { label: "Encuesta de admitidos", key: "encuesta_admitido" },
    { label: "Ficha Semana Anterior", key: "fecha_seguimiento" },
    { label: "Riesgo individual", key: "riesgo_individual" },
    { label: "Riesgo familiar", key: "riesgo_familiar" },
    { label: "Riesgo académico", key: "riesgo_academico" },
    { label: "Riesgo económico", key: "riesgo_economico" },
    {
      label: "Riesgo vida universitaria",
      key: "riesgo_vida_universitaria_ciudad",
    },
    // { label: "Riesgo geográfico", key: "ciudad_res" },
    // { label: "Mensaje del profesional", key: "mensaje_profesional" },
    // { label: "Mensaje del practicante", key: "mensaje_practicante" },
    // { label: "Alerta académica", key: "alerta_academica" },
  ];

  var schema = [
    {
      column: "Código univalle",
      type: String,
      value: (student) => student.cod_univalle,
    },
    {
      column: "Nombre",
      type: String,
      value: (student) => student.nombre,
    },
    {
      column: "Apellido",
      type: String,
      value: (student) => student.apellido,
    },
    {
      column: "Documento",
      type: Number,
      value: (student) => student.num_doc,
    },
    {
      column: "Acuerdo de tratamiento de datos",
      type: String,
      value: (student) => student.firma_tratamiento_datos,
    },
    {
      column: "Encuesta de admitidos",
      type: String,
      value: (student) => student.encuesta_admitido,
    },
    {
      column: "Ficha Semana Anterior",
      type: String,
      value: (student) => student.fecha_seguimiento,
    },
    {
      column: "Riesgo individual",
      type: String,
      value: (student) => student.riesgo_individual,
    },
    {
      column: "Riesgo familiar",
      type: String,
      value: (student) => student.riesgo_familiar,
    },
    {
      column: "Riesgo académico",
      type: String,
      value: (student) => student.riesgo_academico,
    },
    {
      column: "Riesgo económico",
      type: String,
      value: (student) => student.riesgo_economico,
    },
    {
      column: "Riesgo vida universitaria",
      type: String,
      value: (student) => student.riesgo_vida_universitaria_ciudad,
    },
    // {
    //   column: "Riesgo geográfico",
    //   type: String,
    //   value: (student) => student.ciudad_res,
    // },
    // {
    //   column: "Mensaje del profesional",
    //   type: String,
    //   value: (student) => student.mensaje_profesional,
    // },
    // {
    //   column: "Mensaje del practicante",
    //   type: String,
    //   value: (student) => student.mensaje_practicante,
    // },
    // {
    //   column: "Alerta académica",
    //   type: String,
    //   value: (student) => student.alerta_academica,
    // },
  ];

  const imprimir_excel = () => {
    let new_data_excel = [];

    for (let i = 0; i < filtered.length; i++) {
      let new_data = [];
      new_data.push({
        cod_univalle: state.estudiante[i].cod_univalle,
        nombre: state.estudiante[i].nombre,
        apellido: state.estudiante[i].apellido,
        num_doc: state.estudiante[i].num_doc,
        firma_tratamiento_datos: state.estudiante[i].firma_tratamiento_datos,
        encuesta_admitidos: state.estudiante[i].encuesta_admitidos,
        fecha_seguimiento: state.estudiante[i].fecha_seguimiento,
        riesgo_individual: state.estudiante[i].riesgo_individual,
        riesgo_familiar: state.estudiante[i].riesgo_familiar,
        riesgo_academico: state.estudiante[i].riesgo_academico,
        riesgo_economico: state.estudiante[i].riesgo_economico,
        riesgo_vida_universitaria_ciudad:
          state.estudiante[i].riesgo_vida_universitaria_ciudad,
        // ciudad_res: state.estudiante[i].ciudad_res,
        // mensaje_profesional: state.estudiante[i].mensaje_profesional,
        // mensaje_practicante: state.estudiante[i].mensaje_practicante,
        // alerta_academica: state.estudiante[i].alerta_academica,
      });
      new_data_excel.push(new_data);
    }

    writeXlsxFile(filtered, {
      schema, // (optional) column widths, etc.
      fileName: "Alertas Académicas.xlsx",
      // filePath: '../dowloads/file.xlsx'
    });
  };

  //  Variable de navegación
  let navigate = useNavigate();
  add_search_bar();

  return (
    <>
      <>
        {
          <Container>
            <div>
              <h1>Sistema de Alertas</h1>
            </div>
            {/* Columna Filtros de Contacto */}

            {/* Tabla */}
            <DataTable
              id="tabla_alertas"
              title="Alertas"
              columns={new_columns}
              data={filtered}
              // data={state.estudiante}
              noDataComponent="Cargando Información..."
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="400px"
              highlightOnHover
              onRowClicked={(row) => {
                navigate(`/ficha_estudiante/${row.id}`);
              }}
              responsive
              striped
              filter={true}
              paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
              customStyles={tableCustomStyles}
            />

            <br></br>

            <Row>
              <Col sm={12} md={12} lg={12}>
                <CSVLink
                  headers={csv_headers}
                  data={filtered}
                  filename="Alertas Académicas"
                >
                  {/* headers={columns} */}
                  <Button style={{ margin: 5 }}> Imprimir CSV</Button>
                </CSVLink>

                <Button
                  style={{ margin: 5 }}
                  name="imprimir_excel"
                  onClick={imprimir_excel}
                >
                  Imprimir Excel
                </Button>
              </Col>
            </Row>
            {/* GIF DE CARGA */}
            <img
              src={myGif}
              name="loading_data"
              alt="my-gif"
              style={{
                float: "right",
                height: 100,
                width: 100,
                position: "fixed",
                right: 0,
                bottom: 0,
                visibility: "visible",
              }}
            />
            <br></br>
          </Container>
        }
      </>
    </>
  );
};

export default Alertas;
