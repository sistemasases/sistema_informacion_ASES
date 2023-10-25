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
import myGif from "../reportes/loading_data.gif";
var columns = [
  {
    name: "Código",
    selector: (row) => row.cod_univalle,
    value: "cod_univalle",
    sortable: true,
    isCheck: true,
    width: "110px",
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    value: "nombre",
    sortable: true,
    isCheck: true,
  },
  {
    name: "Apellido",
    selector: (row) => row.apellido,
    value: "apellido",
    sortable: true,
    isCheck: true,
  },
  {
    name: "Documento",
    selector: (row) => row.num_doc,
    value: "num_doc",
    sortable: true,
    isCheck: true,
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
  // {
  //   name: "Encuesta de admitidos",
  //   selector: (row) => row.encuesta_admitidos,
  //   value: "encuesta_admitidos",
  //   sortable: true,
  //   isCheck: false,
  //   width: "190px",
  // },
  {
    name: "Ficha Semana Anterior",
    selector: (row) => row.fecha_seguimiento,
    value: "fecha_seguimiento",
    sortable: true,
    isCheck: false,
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
    width: "190px",
  },
  {
    name: "Riesgo individual",
    selector: (row) => row.riesgo_individual,
    value: "riesgo_individual",
    sortable: true,
    isCheck: false,
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

const Alertas = () => {
  const [state, set_state] = useState({ estudiante: [] });
  const [search, set_Search] = useState({
    busqueda: "",
  });
  const [columnas, set_columnas] = useState({ cabeceras: columns });

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
        // console.log(response.data);
        // document.getElementsByName("loading_data")[0].style.visibility =
        //   "hidden";
        setFiltered(response.data);
      } catch (error) {}
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
        // console.log(response.data);
        document.getElementsByName("loading_data")[0].style.visibility =
          "hidden";
        setFiltered(response.data);
      } catch (error) {
        // console.log(error);
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

  const [filtered, setFiltered] = useState(state.estudiante);

  useEffect(() => {
    set_columnas((prevState) => ({
      ...prevState,
      cabeceras: columns,
    }));
  }, []);

  // Añadir columnas por Checks
  const handleChange = (e) => {
    // console.log(e.target.name);
    const seleccionado_contacto = filtros_Contacto.find(
      (item) => item.name === e.target.name
    );

    //  condiciones Para Filtros de Contacto

    if (seleccionado_contacto === undefined) {
    } else if (
      (seleccionado_contacto.name === "Tipo de documento" &&
        e.target.checked === true) ||
      (seleccionado_contacto.name === "Correo electrónico" &&
        e.target.checked === true) ||
      (seleccionado_contacto.name === "Celular" && e.target.checked === true) ||
      (seleccionado_contacto.name === "Dirección" && e.target.checked === true)
    ) {
      seleccionado_contacto.isCheck = true;
      //   var searchable_columns = add_search_bar(seleccionado_contacto);
      //   columns.push(searchable_columns[0]);
      columns.push(seleccionado_contacto);
      //   csv_conversion(seleccionado_contacto);
      //   schema_push(seleccionado_contacto);
    } else if (
      (seleccionado_contacto.name === "Tipo de documento" &&
        e.target.checked === false) ||
      (seleccionado_contacto.name === "Correo electrónico" &&
        e.target.checked === false) ||
      (seleccionado_contacto.name === "Celular" &&
        e.target.checked === false) ||
      (seleccionado_contacto.name === "Dirección" && e.target.checked === false)
    ) {
      seleccionado_contacto.isCheck = false;
      //   document.getElementsByName("Contacto")[0].checked = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_contacto.value) {
          columns.splice(index, 1);
        }
      });
      //   csv_pop(seleccionado_contacto);
      //   schema_pop(seleccionado_contacto);
    }

    // DONT TOCUH IT ;D
    // Añadir columnas a la tabla
    const nuevasColumnas = columns;
    set_columnas({
      ...columnas,
      cabeceras: nuevasColumnas.filter((item) => item.isCheck === true),
    });
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

  //   vVariable de navegación para
  let navigate = useNavigate();

  return (
    <>
      <>
        {
          <Container>
            <div>
              <h1>Alertas Académicas</h1>
            </div>
            {/* Columna Filtros de Contacto */}

            {/* Tabla */}
            <DataTable
              id="tabla_alertas"
              title="Alertas"
              columns={columnas.cabeceras}
              // data = {filtered}
              data={state.estudiante}
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
          </Container>
        }
      </>
    </>
  );
};

export default Alertas;
