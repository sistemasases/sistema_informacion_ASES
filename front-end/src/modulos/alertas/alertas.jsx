/**
 * @file alertas.jsx
 * @version 1.0.0
 * @description modulo para visualizar las alertas.
 * @author Steven Bernal
 * @contact steven.bernal@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import {
  desencriptar,
  desencriptarInt,
  decryptTokenFromSessionStorage,
  encriptar,
  encriptarInt,
} from "../utilidades_seguridad/utilidades_seguridad.jsx";
import { Container, Col, Row, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import myGif from "../reportes/loading_data.gif";
import writeXlsxFile from "write-excel-file";
import { CSVLink } from "react-csv";
import axios from "axios";
import {
  FaExclamationCircle,
  FaBell,
  FaPen,
  FaFolder,
  FaFolderOpen,
  FaUsers,
  FaGraduationCap,
  FaCoins,
  FaUniversity,
  FaUser
} from "react-icons/fa";
import All_sede_service from "../../service/all_sede";
import Select from "react-select";

// variable con las columnas a usar dentro de las notificaciones
var columns = [
  {
    name: "CÓDIGO",
    selector: (row) => row.cod_univalle,
    value: "cod_univalle",
    sortable: true,
    isCheck: true,
    width: "110px",
    style: {
      position: "sticky",
      left: 0,
      backgroundColor: "#FFFFFF",
      zIndex: 1,

    },
    conditionalCellStyles: [],
  },
  {
    name: "NOMBRE",
    selector: (row) => row.nombre,
    value: "nombre",
    sortable: true,
    isCheck: true,
    width: "110px",
    style: {
      position: "sticky",
      left: "110px",
      backgroundColor: "#FFFFFF",
      zIndex: 1,

    },
    conditionalCellStyles: [],
  },
  {
    name: "APELLIDO",
    selector: (row) => row.apellido,
    value: "apellido",
    sortable: true,
    isCheck: true,
    width: "115px",
    conditionalCellStyles: [],
  },
  {
    name: "DOCUMENTO",
    selector: (row) => row.num_doc,
    value: "num_doc",
    sortable: true,
    isCheck: true,
    width: "135px",
    conditionalCellStyles: [],
  },
  {
    name: "ACUERDO DE TRATAMIENTO DE DATOS",
    selector: (row) => row.firma_tratamiento_datos,
    value: "acuerdo_tratamiento_datos",
    sortable: true,
    isCheck: false,
    width: "210px",
    conditionalCellStyles: [
      {
        when: (row) => row.firma_tratamiento_datos == "SIN FIRMAR",
        style: {
          backgroundColor: "#F5CCC6",
          color: "#640704ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.firma_tratamiento_datos == "NO AUTORIZA",
        style: {
          backgroundColor: "#ADB0B5",
          // color: "#552CC4",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.firma_tratamiento_datos == "AUTORIZA",
        style: {
          backgroundColor: "#DAEAD0",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "ENCUESTA DE ADMITIDOS",
    selector: (row) => row.encuesta_admitido,
    value: "encuesta_admitido",
    sortable: true,
    isCheck: false,
    width: "195px",
    conditionalCellStyles: [
      {
        when: (row) => row.encuesta_admitido == "DILIGENCIADO",
        style: {
          backgroundColor: "#D4ECF0",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.encuesta_admitido == "SIN DILIGENCIAR",
        style: {
          backgroundColor: "#AFB1B6",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "FICHA SEMANA ANTERIOR",
    selector: (row) => row.fecha_seguimiento,
    value: "fecha_seguimiento",
    sortable: true,
    isCheck: false,
    width: "195px",
    conditionalCellStyles: [
      {
        when: (row) => row.fecha_seguimiento == "FICHA FALTANTE",
        style: {
          backgroundColor: "#C1A5E4",
          color: "#44136bff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.fecha_seguimiento == "SEGUIMIENTO RECIENTE",
        style: {
          backgroundColor: "#BCE3AE",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.fecha_seguimiento == "INASISTENCIA",
        style: {
          backgroundColor: "#779AB8",
          color: "black",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "RIESGO INDIVIDUAL",
    selector: (row) => row.riesgo_individual,
    cell: (row) => {
      if (row.riesgo_individual === "ALTO") {
        return (
          <span>
            <FaBell style={{ marginRight: "8px" }} />
            ALTO
          </span>
        );
      }

      if (row.riesgo_individual === "MEDIO") {
        return (
          <span>
            <FaExclamationCircle style={{ marginRight: "8px" }} />
            MEDIO
          </span>
        );
      }

      return row.riesgo_individual;
    },
    value: "riesgo_individual",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_individual == "ALTO",
        style: {
          backgroundColor: "#d88237ff",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_individual == "MEDIO",
        style: {
          backgroundColor: "#FFF2CC",
          color: "#6e5604ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_individual == "BAJO",
        style: {
          backgroundColor: "#D9EAD3",
          color: "#127203ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "RIESGO FAMILIAR",
    selector: (row) => row.riesgo_familiar,
    cell: (row) => {
      if (row.riesgo_familiar === "ALTO") {
        return (
          <span>
            <FaBell style={{ marginRight: "8px" }} />
            ALTO
          </span>
        );
      }

      if (row.riesgo_familiar === "MEDIO") {
        return (
          <span>
            <FaExclamationCircle style={{ marginRight: "8px" }} />
            MEDIO
          </span>
        );
      }

      return row.riesgo_familiar;
    },
    value: "riesgo_familiar",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_familiar == "ALTO",
        style: {
          backgroundColor: "#d88237ff",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_familiar == "MEDIO",
        style: {
          backgroundColor: "#FFF2CC",
          color: "#6e5604ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_familiar == "BAJO",
        style: {
          backgroundColor: "#D9EAD3",
          color: "#127203ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "RIESGO ACADÉMICO",
    selector: (row) => row.riesgo_academico,
    cell: (row) => {
      if (row.riesgo_academico === "ALTO") {
        return (
          <span>
            <FaBell style={{ marginRight: "8px" }} />
            ALTO
          </span>
        );
      }

      if (row.riesgo_academico === "MEDIO") {
        return (
          <span>
            <FaExclamationCircle style={{ marginRight: "8px" }} />
            MEDIO
          </span>
        );
      }

      return row.riesgo_academico;
    },
    value: "riesgo_academico",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_academico == "ALTO",
        style: {
          backgroundColor: "#d88237ff",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_academico == "MEDIO",
        style: {
          backgroundColor: "#FFF2CC",
          color: "#6e5604ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_academico == "BAJO",
        style: {
          backgroundColor: "#D9EAD3",
          color: "#127203ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "RIESGO ECONÓMICO",
    selector: (row) => row.riesgo_economico,
    cell: (row) => {
      if (row.riesgo_economico === "ALTO") {
        return (
          <span>
            <FaBell style={{ marginRight: "8px" }} />
            ALTO
          </span>
        );
      }

      if (row.riesgo_economico === "MEDIO") {
        return (
          <span>
            <FaExclamationCircle style={{ marginRight: "8px" }} />
            MEDIO
          </span>
        );
      }

      return row.riesgo_economico;
    },
    value: "riesgo_economico",
    sortable: true,
    isCheck: false,
    width: "190px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_economico == "ALTO",
        style: {
          backgroundColor: "#d88237ff",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_economico == "MEDIO",
        style: {
          backgroundColor: "#FFF2CC",
          color: "#6e5604ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_economico == "BAJO",
        style: {
          backgroundColor: "#D9EAD3",
          color: "#127203ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
  {
    name: "RIESGO VIDA UNIVERSITARIA",
    selector: (row) => row.riesgo_vida_universitaria_ciudad,
    cell: (row) => {
      if (row.riesgo_vida_universitaria_ciudad === "ALTO") {
        return (
          <span>
            <FaBell style={{ marginRight: "8px" }} />
            ALTO
          </span>
        );
      }

      if (row.riesgo_vida_universitaria_ciudad === "MEDIO") {
        return (
          <span>
            <FaExclamationCircle style={{ marginRight: "8px" }} />
            MEDIO
          </span>
        );
      }

      return row.riesgo_vida_universitaria_ciudad;
    },
    value: "riesgo_vida_universitaria_ciudad",
    sortable: true,
    isCheck: false,
    width: "205px",
    conditionalCellStyles: [
      {
        when: (row) => row.riesgo_vida_universitaria_ciudad == "ALTO",
        style: {
          backgroundColor: "#d88237ff",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_vida_universitaria_ciudad == "MEDIO",
        style: {
          backgroundColor: "#FFF2CC",
          color: "#6e5604ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.riesgo_vida_universitaria_ciudad == "BAJO",
        style: {
          backgroundColor: "#D9EAD3",
          color: "#127203ff",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    ],
  },
];

/**
 * Función principal.
 * @return {HTML} Visualización de las alertas.
 */
const Alertas = () => {
  //Rol de usuario actual
  const userRole = desencriptar(sessionStorage.getItem("rol"));
  //opciones del select
  const opciones = [];
  //lista de sedes
  const [stateSedes, setSedes] = useState({ sedes: [] });
  //estado para deshabilitar botón y select durante peticiones
  const [isDisabled, setIsDisabled] = useState(false);
  // variable para setear las columnas
  var new_columns = [];
  // variable para guardar los estudiantes
  var prueba = [];
  // variable para guardar los estudiantes
  var restore = [];
  // constante para guarda los estudiantes
  const [state, set_state] = useState({ estudiante: [] });
  // constante para guarda los estudiantes filtrados
  const [filtered, setFiltered] = useState(state.estudiante);
  // constante para utilizar la busqueda
  const [search, set_Search] = useState({
    busqueda: "",
  });
  // constante para las cabeceras
  const [columnas, set_columnas] = useState({ cabeceras: [] });
  // constante para filtrar por documento
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

  useEffect(() => {
    sessionStorage.getItem("selectedSede")
      ? sessionStorage.removeItem("selectedSede")
      : sessionStorage.setItem("selectedSede", "");
  }, []);

  // Cargar sedes desde la API
  useEffect(() => {
    All_sede_service.all_sede()
      .then((res) => {
        if (res && Array.isArray(res)) {
          setSedes({
            ...stateSedes,
            sedes: res,
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos de las sedes:", error);
      });
  }, []);

  // Mapear las sedes al formato requerido por react-select
  const handle_sedes = () => {
    opciones.length = 0;

    // Opción para ver todas las sedes
    opciones.push({
      value: "TODAS",
      label: "Todas las sedes",
      id: "TODAS",
    });

    for (var i = 0; i < stateSedes.sedes.length; i++) {
      const dato = {
        value: stateSedes.sedes[i]["nombre"],
        label: stateSedes.sedes[i]["nombre"],
        id: stateSedes.sedes[i]["id"],
      };
      opciones.push(dato);
    }
  };


  const handleShow = (e) => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede;

    if (e.id === "TODAS") {
      sessionStorage.setItem("selectedSede", encriptar("TODAS"));
      sede = "TODAS";
    } else {
      sessionStorage.setItem("selectedSede", encriptarInt(e.id));
      sede = e.id;
    }

    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    const traer_estudiantes_selector = async () => {
      const loadingGif = document.getElementsByName("loading_data")[0];
      if (loadingGif) loadingGif.style.visibility = "visible";
      setIsDisabled(true);

      const botonElement = document.getElementsByName("bring_them_on")[0];
      if (botonElement) botonElement.setAttribute("disabled", "true");

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
        setFiltered(response.data);
      } catch (error) {
        console.error("Error al cargar estudiantes por sede:", error);
      } finally {
        if (loadingGif) loadingGif.style.visibility = "hidden";
        if (botonElement) botonElement.removeAttribute("disabled");
        setIsDisabled(false);
      }
    };
    traer_estudiantes_selector();
  };


  // Botón Traer todos
  const traer_todos = () => {
    const loadingGif = document.getElementsByName("loading_data")[0];
    if (loadingGif) loadingGif.style.visibility = "visible";

    const botonElement = document.getElementsByName("bring_them_on")[0];
    if (botonElement) botonElement.setAttribute("disabled", "true");
    setIsDisabled(true);

    let rolTodo = encriptar("traer_todos_estudiantes");
    // let sede = sessionStorage.getItem("selectedSede")
    //   ? desencriptarInt(sessionStorage.getItem("selectedSede"))
    //   : desencriptarInt(sessionStorage.getItem("sede_id"));
    let selectedSedeRaw = sessionStorage.getItem("selectedSede");
    let sede;
    if (selectedSedeRaw) {
      let desencriptado = desencriptar(selectedSedeRaw);
      sede = desencriptado === "TODAS" ? "TODAS" : parseInt(desencriptado);
    } else {
      sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    }

    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    const traer_todos_estudiantes_boton = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/alertas/estudiante_datos_alertas/` +
          id_usuario.toString() +
          "/",
          { params: { usuario_rol: desencriptar(rolTodo), sede: sede } }
        );
        set_state({
          ...state,
          estudiante: response.data,
        });
        setFiltered(response.data);
      } catch (error) {
        console.error("Error al traer todos los estudiantes:", error);
      } finally {
        if (loadingGif) loadingGif.style.visibility = "hidden";
        if (botonElement) botonElement.removeAttribute("disabled");
        setIsDisabled(false);
      }
    };
    traer_todos_estudiantes_boton();
  };



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

  // Extraer los permisos de los roles
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

  // Actualiza todas las columnas
  useEffect(() => {
    set_columnas((prevState) => ({
      ...prevState,
      cabeceras: columns,
    }));
  }, []);

  // Constante para actualizar la busqueda
  const onSearch = (e) => {
    set_Search({ ...search, busqueda: e.target.value });
  };

  // Variable que sirve como guia para la información del estudiante
  var empty_stuff = [{ cod_univalle: " ", nombre: " ", apellido: " " }];

  prueba = state.estudiante;

  restore = state.estudiante;

  // Constante para actualizar la busqueda
  const [show, setShow] = useState(false);
  // Constante para actualizar la busqueda
  const [search_bar_data, set_search_bar_data] = useState([]);
  /**
   * Busqueda y filtro para los estudiantes.
   * @param {Event} e Evento de la busqueda.
   */
  /**
 * Busqueda y filtro para los estudiantes.
 * @param {Event} e Evento de la busqueda.
 */
  const handle_column_search = (e) => {
    const colName = (e.target.name || "").toUpperCase();
    const term = (e.target.value || "").toLowerCase().trim();

    // Si el cuadro de búsqueda está vacío, restaura todos los datos
    if (!term) {
      setFiltered(state.estudiante);
      return;
    }

    const filtered_data = state.estudiante.filter((row) => {
      let cellValue = "";

      if (colName === "CÓDIGO") cellValue = row.cod_univalle;
      else if (colName === "NOMBRE") cellValue = row.nombre;
      else if (colName === "APELLIDO") cellValue = row.apellido;
      else if (colName === "DOCUMENTO") cellValue = row.num_doc;
      else if (colName === "ACUERDO DE TRATAMIENTO DE DATOS") cellValue = row.firma_tratamiento_datos;
      else if (colName === "ENCUESTA DE ADMITIDOS") cellValue = row.encuesta_admitido;
      else if (colName === "FICHA SEMANA ANTERIOR") cellValue = row.fecha_seguimiento;
      else if (colName === "RIESGO INDIVIDUAL") cellValue = row.riesgo_individual;
      else if (colName === "RIESGO FAMILIAR") cellValue = row.riesgo_familiar;
      else if (colName === "RIESGO ACADÉMICO") cellValue = row.riesgo_academico;
      else if (colName === "RIESGO ECONÓMICO") cellValue = row.riesgo_economico;
      else if (colName === "RIESGO VIDA UNIVERSITARIA") cellValue = row.riesgo_vida_universitaria_ciudad;

      // Convierte a String de forma segura para evitar errores con números o nulls
      return (cellValue || "").toString().toLowerCase().includes(term);
    });

    setFiltered(filtered_data.length > 0 ? filtered_data : empty_stuff);
  };

  // variable para actualizar la data de la busqueda
  var new_search_bar_data = [];
  /**
   * Añade una busqueda extra.
   */
  const add_search_bar = () => {
    // for (let i = 0; i < columns.length; i++) {
    //   const element = columns[i];
    //   element.name = (
    //     <Row className="center_tabla_sin_seguimientos">
    //       <h4 className="texto_mas_pequeño">{element.name}</h4>
    //       <input
    //         name={element.name}
    //         internal_name={element.value}
    //         onChange={(e) => {
    //           handle_column_search(e);
    //         }}
    //         maxlength="20"
    //       />
    //     </Row>
    //   );
    //   new_columns.push(element);
    // }

    // const updatedColumns = columns.map((column) => ({
    //   ...column,
    //   name: (
    //     <Row className="center_tabla_sin_seguimientos">
    //       <h4 className="texto_mas_pequeño">{column.name}</h4>
    //       <input
    //         name={column.name}
    //         internal_name={column.value}
    //         onChange={(e) => {
    //           handle_column_search(e);
    //         }}
    //         maxLength={20}
    //       />
    //     </Row>
    //   ),
    // }));
    const updatedColumns = columns.map((column) => ({
      ...column,
      name: (
        <div
          className="center_tabla_sin_seguimientos"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "4px 0",
          }}
        >
          <h4
            className="texto_mas_pequeño"
            style={{
              minHeight: "36px", // Altura mínima uniforme para los títulos
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: 0,
              textAlign: "center",
            }}
          >
            {column.name}
          </h4>
          <input
            name={column.name}
            internal_name={column.value}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              handle_column_search(e);
            }}
            maxLength={20}
            style={{
              width: "100%",
              marginTop: "auto", // Empuja todos los inputs al fondo, nivelándolos
            }}
          />
        </div>
      ),
    }));

    for (let i = 0; i < updatedColumns.length; i++) {
      const element = updatedColumns[i];
      new_columns.push(element);
    }
  };

  //   Estilo visual de la tabla
  const tableCustomStyles = {
    responsiveWrapper: {
      style: {
        // Estilos para la barra de scroll horizontal y vertical
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F1F5F9",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#CBD5E1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#94A3B8",
        },
      },
    },
    headRow: {
      style: {
        color: "#223336",
        backgroundColor: "#e7eef0",
        minHeight: "30px",
      },
    },
    headCells: {
      style: {
        alignItems: "stretch", // Permite que el contenido ocupe todo el alto disponible
        //paddingTop: "6px",
        paddingBottom: "6px",

        "& .rdt_TableCol_Sortable": {
          alignItems: "flex-start",
        },

        "& .rdt_TableCol_Sortable span, & .rdt_TableCol_Sortable svg": {
          marginTop: "10px"
        },
        "&:nth-child(1)": {
          position: "sticky",
          left: 0,
          backgroundColor: "#e7eef0",
          zIndex: 10
        },
        "&:nth-child(2)": {
          position: "sticky",
          left: "110px",
          backgroundColor: "#e7eef0",
          zIndex: 10
        },
      },
    },
  };

  //   Opciones de paginacion de la tabla
  const paginacionOpciones = {
    rowsPerPageText: "Filas por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Mostrar Todo",
  };

  // Cabecera del csv
  var csv_headers = [
    { label: "Sede", key: "sede" },
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
  ];

  // variable con la info del csv
  var schema = [
    {
      column: "Sede",
      type: String,
      value: (student) => student.sede || "",
    },
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
  ];

  /**
   * Pasa el csv a formato excel.
   */
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
      });
      new_data_excel.push(new_data);
    }

    writeXlsxFile(filtered, {
      schema, // (optional) column widths, etc.
      fileName: "Alertas Académicas.xlsx",
      // filePath: '../dowloads/file.xlsx'
    });
  };

  add_search_bar();

  /**
   * @function cambiar_ruta
   * @param e Es el nombre de la ruta
   * @description Cambia la vista según los links seleccionados
   */
  const cambiar_ruta = (e) => {
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  };

  //Conteo para el resumen
  const conteos = React.useMemo(() => {
    const data = filtered || [];
    return {
      trataminetoSinFirmar: data.filter(
        (e) => e.firma_tratamiento_datos === "SIN FIRMAR").length,
      encuestasSinDiligenciar: data.filter(
        (e) => e.encuesta_admitido === "SIN DILIGENCIAR").length,
      fichasFaltantes: data.filter(
        (e) => e.fecha_seguimiento === "FICHA FALTANTE").length,
      riesgoIndividualAlto: data.filter(
        (e) => e.riesgo_individual === "ALTO").length,
      riesgoFamiliarAlto: data.filter(
        (e) => e.riesgo_familiar === "ALTO").length,
      riesgoAcademicoAlto: data.filter(
        (e) => e.riesgo_academico === "ALTO").length,
      riesgoEconomicoAlto: data.filter(
        (e) => e.riesgo_economico === "ALTO").length,
      riesgoVidaUniversitariaAlto: data.filter(
        (e) => e.riesgo_vida_universitaria_ciudad === "ALTO").length,
    };
  }, [filtered]);

  //Cards para el resumen
  const cardsResumen = [
    {
      titulo: "TRATAMIENTO DE DATOS SIN FIRMAR",
      valor: conteos.trataminetoSinFirmar,
      icono: <FaPen size={22} />,
      bgCard: "#FDE8E8",
      bgIcon: "#F9A8A8",
      colorIcon: "#C81E1E",
    },
    {
      titulo: "ENCUESTA DE ADMITIDOS SIN DILIGENCIAR",
      valor: conteos.encuestasSinDiligenciar,
      icono: <FaFolder size={22} />,
      bgCard: "#E9ECEF",
      bgIcon: "#CED4DA",
      colorIcon: "#495057",
    },
    {
      titulo: "FICHAS FALTANTES DE LA SEMANA ANTERIOR",
      valor: conteos.fichasFaltantes,
      icono: <FaFolderOpen size={22} />,
      bgCard: "#EDE5F7",
      bgIcon: "#D6BCFA",
      colorIcon: "#6B46C1",
    },
    {
      titulo: "RIESGOS ALTOS INDIVIDUAL",
      valor: conteos.riesgoIndividualAlto,
      icono: <FaUser size={22} />,
      bgCard: "#FDEAEA",
      bgIcon: "#FCA5A5",
      colorIcon: "#DC2626",
    },
    {
      titulo: "RIESGOS ALTOS FAMILIAR",
      valor: conteos.riesgoFamiliarAlto,
      icono: <FaUsers size={22} />,
      bgCard: "#FDEAEA",
      bgIcon: "#FCA5A5",
      colorIcon: "#DC2626",
    },
    {
      titulo: "RIESGOS ALTOS ACADÉMICO",
      valor: conteos.riesgoAcademicoAlto,
      icono: <FaGraduationCap size={22} />,
      bgCard: "#FDEAEA",
      bgIcon: "#FCA5A5",
      colorIcon: "#DC2626",
    },
    {
      titulo: "RIESGOS ALTOS ECONÓMICO",
      valor: conteos.riesgoEconomicoAlto,
      icono: <FaCoins size={22} />,
      bgCard: "#FDEAEA",
      bgIcon: "#FCA5A5",
      colorIcon: "#DC2626",
    },
    {
      titulo: "RIESGOS ALTOS VIDA UNIVERSITARIA",
      valor: conteos.riesgoVidaUniversitariaAlto,
      icono: <FaUniversity size={22} />,
      bgCard: "#FDEAEA",
      bgIcon: "#FCA5A5",
      colorIcon: "#DC2626",
    },
  ];

  return (
    <>
      <>
        {
          <Container fluid className="px-5">
            <div>
              <h1>Sistema de Alertas</h1>
            </div>
            {/* Barra de traer todos y selector de sedes*/}
            {(userRole === "super_ases" ||
              userRole === "socioeducativo" ||
              userRole === "socioeducativo_reg" ||
              userRole === "dir_investigacion" ||
              userRole === "sistemas") && (
                <div>
                  <hr />
                  <Row className="mb-3">
                    <Col sm={2}>
                      <Button
                        name="bring_them_on"
                        title="Traer todos los estudiantes puede tomar más tiempo del esperado. Por favor, sea paciente."
                        onClick={() => traer_todos()}
                        disabled={isDisabled}
                      >
                        Traer todos
                      </Button>
                    </Col>
                    <Col title="Traer todos los estudiantes puede tomar más tiempo del esperado. Por favor, sea paciente.">
                      <Select
                        name="sede_alertas"
                        options={opciones}
                        onMenuOpen={handle_sedes}
                        onChange={(e) => handleShow(e)}
                        isDisabled={isDisabled}
                        placeholder="Seleccione una sede"
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                      />
                    </Col>
                  </Row>
                  <hr />
                </div>
              )}

            {/* Columna Filtros de Contacto */}

            {/* Título fuera de la tabla */}
            <h3 className="mb-3">Alertas</h3>

            {/* Tabla */}
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #dee2e6",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <DataTable
                id="tabla_alertas"
                //title="Alertas"
                columns={new_columns}
                data={filtered}
                // data={state.estudiante}
                noDataComponent="Cargando Información..."
                pagination
                paginationComponentOptions={paginacionOpciones}
                fixedHeader
                fixedHeaderScrollHeight="580px"
                highlightOnHover
                onRowClicked={(row) => {
                  cambiar_ruta(`/ficha_estudiante/${row.id}`);
                }}
                responsive
                striped
                filter={true}
                paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
                customStyles={tableCustomStyles}
              />
            </div>

            {/* PANEL RESUMEN DE CONTEOS */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px 20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #DCE5ED",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              <h5
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#2C3E50",
                  letterSpacing: "0.5px",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                }}
              >
                Resumen de Conteos
              </h5>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))",
                  gap: "12px",
                }}
              >
                {cardsResumen.map((card, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: card.bgCard,
                      borderRadius: "8px",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: "4px"
                      /*minHeight: "100px",*/
                    }}
                  >
                    {/* Fila superior: Icono + Título */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "6px",
                          backgroundColor: card.bgIcon,
                          color: card.colorIcon,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {card.icono}
                      </div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: "700",
                          color: "#475569",
                          lineHeight: "1.2",
                          textTransform: "uppercase",
                        }}
                      >
                        {card.titulo}
                      </span>
                    </div>

                    {/* Fila inferior: Número grande */}
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#1E293B",
                        textAlign: "center",
                        /*marginTop: "px",*/
                      }}
                    >
                      {card.valor}
                    </div>
                  </div>
                ))}
              </div>
            </div>


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
