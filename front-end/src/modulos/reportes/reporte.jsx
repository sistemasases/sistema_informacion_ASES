/**
 * @file reporte.jsx
 * @version 1.0.0
 * @description modulo para visualizar las alertas.
 * @author Steven Bernal
 * @contact steven.bernal@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import { Container, Col, Row, Button, Form } from "react-bootstrap";
import {
  desencriptar,
  desencriptarInt,
  decryptTokenFromSessionStorage,
} from "../utilidades_seguridad/utilidades_seguridad.jsx";
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import myGif from "../reportes/loading_data.gif";
import { useNavigate } from "react-router-dom";
import writeXlsxFile from "write-excel-file";
import { CSVLink } from "react-csv";
import axios from "axios";

// Columnas del reporte
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
];
// Cabecera del csv
var csv_headers = [
  { label: "Código", key: "cod_univalle" },
  { label: "Nombre", key: "nombre" },
  { label: "Apellido", key: "apellido" },
  { label: "Documento", key: "num_doc" },
];
// Contenido del csv
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
];
// Arreglo con información del estudiante
var prueba = [];
// Arreglo con información del estudiante
var restore = [];
// Variable para unir las consultas
var inner_column_data;

const Reporte = () => {
  // Constante que guarda la información del estudiante
  const [state, set_state] = useState({ estudiante: [] });
  // Constante que guarda la información de la busqueda
  const [search, set_Search] = useState({
    busqueda: "",
  });
  // Constante que guarda la información de los cohorte
  const [cohorte_list, set_cohorte_list] = useState({ cohorte: [] });
  //Conexion con el back para extraer todas los estudiantes
  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));
    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };
    const estudiantes_por_rol = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/reportes/estudiante_por_rol/` +
            id_usuario.toString() +
            "/",
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          estudiante: response.data,
        });
        setFiltered(response.data);
      } catch (error) {}
    };
    estudiantes_por_rol();
  }, []);
  // Conexión con el back para traer los estudiantes por filtro
  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    // Funcion que busca el reporte del estudiante logueado.
    const riesgos_estudiante = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/reportes/estudiante_filtros/` +
            id_usuario.toString() +
            "/",
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          estudiante: response.data,
        });
        setFiltered(response.data);
        // Oculta el gif de carga
        document.getElementsByName("loading_data")[0].style.visibility =
          "hidden";
        // Obtiene una lista con la clase de los checks hijos
        var child_checks = document.getElementsByClassName("mb-2");
        // Recorre la lista para habilitarlos una vez termina la consula
        for (let i = 0; i < child_checks.length; i++) {
          child_checks[i].firstElementChild.removeAttribute("disabled");
        }
        // Obtiene una lista con la clase de los checks Padres
        var header_checks = document.getElementsByClassName("h5");
        // Recorre la lista para habilitarlos una vez termina la consula
        for (let i = 0; i < header_checks.length; i++) {
          header_checks[i].firstElementChild.removeAttribute("disabled");
        }
      } catch (error) {}
    };
    riesgos_estudiante();
  }, []);
  // Llenar el csv con la info obtenida
  const csv_conversion = (item) => {
    var label = item.name;
    var key = item.value;
    csv_headers.push({ label: label, key: key });
  };
  // Saca cada item del csv
  const csv_pop = (item) => {
    csv_headers.map((item_csv, index) => {
      if (item_csv.label === item.name) {
        csv_headers.splice(index, 1);
      }
    });
  };
  // Actualiza las columnas
  const schema_push = (item) => {
    let tipo;
    if (
      item.name === "Código univalle" ||
      item.name === "Código programa académico"
    ) {
      tipo = Number;
    } else {
      tipo = String;
    }
    schema.push({
      column: item.name,
      type: tipo,
      value: (student) => student[item.value],
    });
  };
  // Saca cada item del schema
  const schema_pop = (item) => {
    schema.map((item_schema, index) => {
      if (item_schema.column === item.name) {
        schema.splice(index, 1);
      }
    });
  };
  // Cambia la busqueda
  const onSearch = (e) => {
    set_Search({ ...search, busqueda: e.target.value });
  };
  // variable que inicializa los item del reporte
  var empty_stuff = [{ cod_univalle: " ", nombre: " ", apellido: " " }];
  prueba = state.estudiante;
  inner_column_data = 0;
  /**
   * Función para buscar según un evento de busqueda.
   * @param {Event} e Información del evento con el valor a buscar.
   */
  const on_search_base = (e) => {
    var longitud_busqueda = e.target.value;
    if (longitud_busqueda.length == 0) {
      setFiltered(prueba);
      console.log(
        "LA SOLEDAD ES CAPAZ INUNDAR NUESTROS CORAZONES AUNQUE ESTEMOS EN COMPAÑIA"
      );
    } else {
      const data_filtered = prueba.filter(
        (row) =>
          row.cod_univalle
            .toString()
            .toLowerCase()
            .includes(e.target.value.toString().toLowerCase()) ||
          row.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.apellido.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.num_doc
            .toString()
            .includes(e.target.value.toString().toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
      console.log(filtered);
    }
  };
  // Columnas usadas para almacenar la información de la consulta con el back
  const [columnas, set_columnas] = useState({ cabeceras: columns });
  // Filtros para la consulta
  const cabecerasFiltros = [
    { name: "Contacto", isCheck: false },
    { name: "Estados", isCheck: false },
    { name: "Académico", isCheck: false },
    { name: "Asignaciones", isCheck: false },
    { name: "Riesgos", isCheck: false },
    { name: "Condición de Excepción", isCheck: false },
  ];
  // Filtro por contacto
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
  // Filtro por estado
  const filtros_Estados = [
    {
      name: "ASES",
      value: "estado_ases",
      selector: (row) => row.estado_ases,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Registro Académico",
      value: "registro_academico",
      selector: (row) => row.registro_academico,
      sortable: true,
      isCheck: false,
    },
  ];
  // Filtro por programa y sede
  const filtros_Academico = [
    {
      name: "Código programa académico",
      value: "id_programa",
      selector: (row) => row.id_programa,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Programa académico",
      value: "programa_academico",
      selector: (row) => row.programa_academico,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Sede",
      value: "sede",
      selector: (row) => row.sede,
      sortable: true,
      isCheck: false,
    },
  ];
  // Filtro por asignación
  const filtros_Asignaciones = [
    {
      name: "Profesional",
      value: "asignacion_profesional",
      selector: (row) => row.asignacion_profesional,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Practicante",
      value: "asignacion_practicante",
      selector: (row) => row.asignacion_practicante,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Monitor",
      value: "asignacion_monitores",
      selector: (row) => row.asignacion_monitores,
      sortable: true,
      isCheck: false,
    },
  ];
  // Filtro por riesgo
  const filtros_Riesgos = [
    {
      name: "Riesgo individual",
      selector: (row) => row.riesgo_individual,
      value: "riesgo_individual",
      sortable: true,
      isCheck: false,
    },
    {
      name: "Riesgo familiar",
      selector: (row) => row.riesgo_familiar,
      value: "riesgo_familiar",
      sortable: true,
      isCheck: false,
    },
    {
      name: "Riesgo académico",
      selector: (row) => row.riesgo_academico,
      value: "riesgo_academico",
      sortable: true,
      isCheck: false,
    },
    {
      name: "Riesgo económico",
      selector: (row) => row.riesgo_economico,
      value: "riesgo_economico",
      sortable: true,
      isCheck: false,
    },
    {
      name: "Riesgo vida universitaria",
      selector: (row) => row.riesgo_vida_universitaria_ciudad,
      value: "riesgo_vida_universitaria_ciudad",
      sortable: true,
      isCheck: false,
    },
  ];
  // Filtro por condición de excepción
  const filtros_Condicion_Excepcion_prueba = [
    {
      name: "Condición de Excepción",
      value: "condicion_excepcion",
      selector: (row) => row.condicion_excepcion,
      sortable: true,
      isCheck: false,
      width: "180px",
    },
  ];
  // Filtro por cohorte
  const filtro_cohorte = [
    {
      name: "Cohorte",
      value: "cohorte",
      selector: (row) => row.cohorte,
      sortable: true,
      isCheck: false,
      with: "180px",
    },
  ];
  // Constante que guarda la informaciónde las columnas
  const columns_searchable = columns;
  // Setea la información de la cabecera del state
  useEffect(() => {
    set_columnas((prevState) => ({
      ...prevState,
      cabeceras: columns,
    }));
  }, []);
  // Constante para filtrar los estudiantes
  const [filtered, setFiltered] = useState(state.estudiante);
  // Constante si no hay resultados
  const [noResults, setNoResults] = useState(false);
  /**
   * Función para buscar según un evento de busqueda.
   * @param {Event} e Información del evento con el valor a buscar.
   * @param {Event} selected Información del evento con el valor a seleccionado.
   */
  const handle_column_search = (e, selected) => {
    // POR SI LLEGASE A INTENTAR LEER EL EVENTO Y NO ENCONTRASE NADA
    if (e.target.name === undefined) {
      const data_filtered = state.estudiante;
      setFiltered(data_filtered);
      console.log("UNDEFINED");
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: DOCUMENTO
    if (e.target.name === "Tipo de documento") {
      const data_filtered = filtered.filter((row) =>
        row.tipo_doc.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: CORREO
    if (e.target.name === "Correo electrónico") {
      const data_filtered = filtered.filter((row) =>
        row.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: CELULAR
    if (e.target.name === "Celular") {
      const data_filtered = filtered.filter((row) =>
        row.celular.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: DIRECCION
    if (e.target.name === "Dirección") {
      const data_filtered = filtered.filter((row) =>
        row.dir_res.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: ESTADOS
    if (e.target.name === "ASES") {
      const data_filtered = filtered.filter((row) =>
        row.estado_ases.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: REGISTRO
    if (e.target.name === "Registro Académico") {
      const data_filtered = filtered.filter((row) =>
        row.registro_academico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: ACADÉMICO
    if (e.target.name === "Código programa académico") {
      const data_filtered = filtered.filter((row) =>
        row.id_programa.toString().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL POR FILTRO: NOMBRE ACADEMICO
    if (e.target.name === "Programa académico") {
      const data_filtered = filtered.filter((row) =>
        row.programa_academico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
      inner_column_data = e.target.value;
      console.log(inner_column_data);
    }
    // BUSQUEDA INDIVIDUAL POR FILTRO: SEDE
    if (e.target.name === "Sede") {
      const data_filtered = filtered.filter((row) =>
        row.sede.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL DE FILTRO: ASIGNACIONES
    if (e.target.name === "Profesional") {
      const data_filtered = filtered.filter((row) =>
        row.asignacion_profesional
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BUSQUEDA INDIVIDUAL POR FILTRO: PRACTICANTE
    if (e.target.name === "Practicante") {
      const data_filtered = filtered.filter((row) =>
        row.asignacion_practicante
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BUSQUEDA INDIVIDUAL POR FILTRO: MONITOR
    if (e.target.name === "Monitor") {
      const data_filtered = filtered.filter((row) =>
        row.asignacion_monitores
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL DE FILTRO: RIESGOS
    if (e.target.name === "Riesgo individual") {
      const data_filtered = filtered.filter((row) =>
        row.riesgo_individual
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo familiar") {
      const data_filtered = filtered.filter((row) =>
        row.riesgo_familiar.includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo académico") {
      const data_filtered = filtered.filter((row) =>
        row.riesgo_academico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo económico") {
      const data_filtered = filtered.filter((row) =>
        row.riesgo_economico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Riesgo vida universitaria") {
      const data_filtered = filtered.filter((row) =>
        row.riesgo_vida_universitaria_ciudad
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL DE FILTRO: CONDICIONES DE EXCEPCIÓN
    if (e.target.name === "Condición de Excepción") {
      const data_filtered = filtered.filter((row) =>
        row.condicion_excepcion
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;
      setFiltered(filtered_data);
    }
    // BÚSQUEDA INDIVIDUAL DE FILTRO: COHORTE
    if (e.target.name === "Cohorte") {
      const data_filtered = filtered.filter((row) =>
        row.cohorte.toLowerCase().includes(e.target.value.toLowerCase())
      );
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : empty_stuff;

      setFiltered(filtered_data);
    }
  };
  /**
   * Función para agregar una busqueda.
   * @param {Event} selected Información del evento con el valor a seleccionado.
   */
  const add_search_bar = (selected) => {
    const new_search_bar_data = [];
    new_search_bar_data.push({
      name: (
        <Row className="center_tabla_sin_seguimientos">
          <h4 className="texto_mas_pequeño">{selected.name}</h4>
          <input
            name={selected.name}
            internal_name={selected.value}
            onChange={(e) => {
              handle_column_search(e, selected);
            }}
          />
        </Row>
      ),
      value: selected.value,
      selector: selected.selector,
      sortable: true,
      isCheck: selected.isCheck,
    });
    return new_search_bar_data;
  };
  /**
   * Función para manejar los cambios en los filtro.
   * @param {Event} e Información del evento con el valor a filtrar.
   */
  const handleChange = (e) => {
    const seleccionado_contacto = filtros_Contacto.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_riesgos = filtros_Riesgos.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_estados = filtros_Estados.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_academico = filtros_Academico.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_asignaciones = filtros_Asignaciones.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_cabeceras_filtros = cabecerasFiltros.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_condiciones_excepcion_prueba =
      filtros_Condicion_Excepcion_prueba.find(
        (item) => item.name === "Condición de Excepción"
      );
    const seleccionado_cohorte = filtro_cohorte.find(
      (item) => item.name === e.target.name
    );
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
      var searchable_columns = add_search_bar(seleccionado_contacto);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_contacto);
      schema_push(seleccionado_contacto);
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
      document.getElementsByName("Contacto")[0].checked = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_contacto.value) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_contacto);
      schema_pop(seleccionado_contacto);
    }
    // condiciones Para Filtros de Estados
    if (seleccionado_estados === undefined) {
    } else if (
      (seleccionado_estados.name === "ASES" && e.target.checked === true) ||
      (seleccionado_estados.name === "Registro Académico" &&
        e.target.checked === true)
    ) {
      seleccionado_estados.isCheck = true;
      var searchable_columns = add_search_bar(seleccionado_estados);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_estados);
      schema_push(seleccionado_estados);
    } else if (
      (seleccionado_estados.name === "ASES" && e.target.checked === false) ||
      (seleccionado_estados.name === "Registro Académico" &&
        e.target.checked === false)
    ) {
      seleccionado_estados.isCheck = false;
      document.getElementsByName("Estados")[0].checked = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_estados.value) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_estados);
      schema_pop(seleccionado_estados);
    }
    // condiciones para Filtros de Academico
    if (seleccionado_academico === undefined) {
    } else if (
      (seleccionado_academico.name === "Código programa académico" &&
        e.target.checked === true) ||
      (seleccionado_academico.name === "Programa académico" &&
        e.target.checked === true) ||
      (seleccionado_academico.name === "Sede" && e.target.checked === true) ||
      (seleccionado_academico.name === "Promedio acumulado" &&
        e.target.checked === true) ||
      (seleccionado_academico.name === "Estimulos" &&
        e.target.checked === true) ||
      (seleccionado_academico.name === "Bajo rendimiento" &&
        e.target.checked === true)
    ) {
      seleccionado_academico.isCheck = true;
      var searchable_columns = add_search_bar(seleccionado_academico);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_academico);
      schema_push(seleccionado_academico);
    } else if (
      (seleccionado_academico.name === "Código programa académico" &&
        e.target.checked === false) ||
      (seleccionado_academico.name === "Programa académico" &&
        e.target.checked === false) ||
      (seleccionado_academico.name === "Sede" && e.target.checked === false) ||
      (seleccionado_academico.name === "Promedio acumulado" &&
        e.target.checked === false) ||
      (seleccionado_academico.name === "Estimulos" &&
        e.target.checked === false) ||
      (seleccionado_academico.name === "Bajo rendimiento" &&
        e.target.checked === false)
    ) {
      seleccionado_academico.isCheck = false;
      document.getElementsByName("Académico")[0].checked = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_academico.value) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_academico);
      schema_pop(seleccionado_academico);
    }
    // condiciones para Filtros de Asignaciones
    if (seleccionado_asignaciones === undefined) {
    } else if (
      (seleccionado_asignaciones.name === "Profesional" &&
        e.target.checked === true) ||
      (seleccionado_asignaciones.name === "Practicante" &&
        e.target.checked === true) ||
      (seleccionado_asignaciones.name === "Monitor" &&
        e.target.checked === true)
    ) {
      seleccionado_asignaciones.isCheck = true;
      var searchable_columns = add_search_bar(seleccionado_asignaciones);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_asignaciones);
      schema_push(seleccionado_asignaciones);
    } else if (
      (seleccionado_asignaciones.name === "Profesional" &&
        e.target.checked === false) ||
      (seleccionado_asignaciones.name === "Practicante" &&
        e.target.checked === false) ||
      (seleccionado_asignaciones.name === "Monitor" &&
        e.target.checked === false)
    ) {
      seleccionado_asignaciones.isCheck = false;
      document.getElementsByName("Asignaciones")[0].checked = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_asignaciones.value) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_asignaciones);
      schema_pop(seleccionado_asignaciones);
    }
    //  condiciones Para Filtros de Riesgo
    if (seleccionado_riesgos === undefined) {
    } else if (
      (seleccionado_riesgos.name === "Riesgo individual" &&
        e.target.checked === true) ||
      (seleccionado_riesgos.name === "Riesgo familiar" &&
        e.target.checked === true) ||
      (seleccionado_riesgos.name === "Riesgo académico" &&
        e.target.checked === true) ||
      (seleccionado_riesgos.name === "Riesgo económico" &&
        e.target.checked === true) ||
      (seleccionado_riesgos.name === "Riesgo vida universitaria" &&
        e.target.checked === true)
    ) {
      seleccionado_riesgos.isCheck = true;
      var searchable_columns = add_search_bar(seleccionado_riesgos);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_riesgos);
      schema_push(seleccionado_riesgos);
    } else if (
      (seleccionado_riesgos.name === "Riesgo individual" &&
        e.target.checked === false) ||
      (seleccionado_riesgos.name === "Riesgo familiar" &&
        e.target.checked === false) ||
      (seleccionado_riesgos.name === "Riesgo académico" &&
        e.target.checked === false) ||
      (seleccionado_riesgos.name === "Riesgo económico" &&
        e.target.checked === false) ||
      (seleccionado_riesgos.name === "Riesgo vida universitaria" &&
        e.target.checked === false)
    ) {
      seleccionado_riesgos.isCheck = false;
      document.getElementsByName("Riesgos")[0].checked = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_riesgos.value) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_riesgos);
      schema_pop(seleccionado_riesgos);
    }
    // condiciones para Filtros de cohortes
    if (seleccionado_cohorte === undefined) {
    } else if (
      seleccionado_cohorte.name === "Cohorte" &&
      e.target.checked === true
    ) {
      seleccionado_cohorte.isCheck = true;
      var searchable_columns = add_search_bar(seleccionado_cohorte);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_cohorte);
      schema_push(seleccionado_cohorte);
    } else if (
      seleccionado_cohorte.name === "Cohorte" &&
      e.target.checked === false
    ) {
      seleccionado_cohorte.isCheck = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_cohorte.value) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_cohorte);
      schema_pop(seleccionado_cohorte);
    }
    // Condiciones para cabeceras de filtros
    if (seleccionado_cabeceras_filtros === undefined) {
    } else if (
      (seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Asignaciones" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Riesgos" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked === true)
    ) {
      if (
        seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("Tipo de documento")[0].checked = false;
        document.getElementsByName("Correo electrónico")[0].checked = false;
        document.getElementsByName("Celular")[0].checked = false;
        document.getElementsByName("Dirección")[0].checked = false;
        document.getElementsByName("Tipo de documento")[0].checked = true;
        document.getElementsByName("Correo electrónico")[0].checked = true;
        document.getElementsByName("Celular")[0].checked = true;
        document.getElementsByName("Dirección")[0].checked = true;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "tipo_doc" ||
            columns[i].value === "email" ||
            columns[i].value === "celular" ||
            columns[i].value === "dir_res"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "tipo_doc" && item.isCheck === false) ||
            (item.value === "email" && item.isCheck === false) ||
            (item.value === "celular" && item.isCheck === false) ||
            (item.value === "dir_res" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Contacto.length; i++) {
          const element = filtros_Contacto[i];
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
        }

        for (let i = 0; i < filtros_Contacto.length; i++) {
          const element = filtros_Contacto[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("ASES")[0].checked = false;
        document.getElementsByName("Registro Académico")[0].checked = false;
        document.getElementsByName("ASES")[0].checked = true;
        document.getElementsByName("Registro Académico")[0].checked = true;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "estado_ases" ||
            columns[i].value === "registro_academico"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "estado_ases" && item.isCheck === false) ||
            (item.value === "registro_academico" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Estados.length; i++) {
          const element = filtros_Estados[i];
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
        }
        for (let i = 0; i < filtros_Estados.length; i++) {
          const element = filtros_Estados[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked === true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName(
          "Código programa académico"
        )[0].checked = false;
        document.getElementsByName("Programa académico")[0].checked = false;
        document.getElementsByName("Sede")[0].checked = false;
        document.getElementsByName(
          "Código programa académico"
        )[0].checked = true;
        document.getElementsByName("Programa académico")[0].checked = true;
        document.getElementsByName("Sede")[0].checked = true;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "id_programa" ||
            columns[i].value === "programa_academico" ||
            columns[i].value === "sede"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "id_programa" && item.isCheck === false) ||
            (item.value === "programa_academico" && item.isCheck === false) ||
            (item.value === "sede" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Academico.length; i++) {
          const element = filtros_Academico[i];
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
        }
        for (let i = 0; i < filtros_Academico.length; i++) {
          const element = filtros_Academico[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Asignaciones" &&
        e.target.checked === true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("Profesional")[0].checked = false;
        document.getElementsByName("Practicante")[0].checked = false;
        document.getElementsByName("Monitor")[0].checked = false;
        document.getElementsByName("Profesional")[0].checked = true;
        document.getElementsByName("Practicante")[0].checked = true;
        document.getElementsByName("Monitor")[0].checked = true;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "asignacion_profesional" ||
            columns[i].value === "asignacion_practicante" ||
            columns[i].value === "asignacion_monitores"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "asignacion_profesional" &&
              item.isCheck === false) ||
            (item.value === "asignacion_practicante" &&
              item.isCheck === false) ||
            (item.value === "asignacion_monitores" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Asignaciones.length; i++) {
          const element = filtros_Asignaciones[i];
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
        }
        for (let i = 0; i < filtros_Asignaciones.length; i++) {
          const element = filtros_Asignaciones[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Riesgos" &&
        e.target.checked === true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("Riesgo individual")[0].checked = false;
        document.getElementsByName("Riesgo familiar")[0].checked = false;
        document.getElementsByName("Riesgo académico")[0].checked = false;
        document.getElementsByName("Riesgo económico")[0].checked = false;
        document.getElementsByName(
          "Riesgo vida universitaria"
        )[0].checked = false;
        document.getElementsByName("Riesgo individual")[0].checked = true;
        document.getElementsByName("Riesgo familiar")[0].checked = true;
        document.getElementsByName("Riesgo académico")[0].checked = true;
        document.getElementsByName("Riesgo económico")[0].checked = true;
        document.getElementsByName(
          "Riesgo vida universitaria"
        )[0].checked = true;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "riesgo_individuall" ||
            columns[i].value === "riesgo_familiar" ||
            columns[i].value === "riesgo_academico" ||
            columns[i].value === "riesgo_economico" ||
            columns[i].value === "riesgo_vida_universitaria_ciudad"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "riesgo_individuall" && item.isCheck === false) ||
            (item.value === "riesgo_familiar" && item.isCheck === false) ||
            (item.value === "riesgo_academico" && item.isCheck === false) ||
            (item.value === "riesgo_economico" && item.isCheck === false) ||
            (item.value === "riesgo_vida_universitaria_ciudad" &&
              item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Riesgos.length; i++) {
          const element = filtros_Riesgos[i];
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
        }
        for (let i = 0; i < filtros_Riesgos.length; i++) {
          const element = filtros_Riesgos[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked === true
      ) {
        const element = seleccionado_condiciones_excepcion_prueba;
        element.isCheck = true;
        var data_var = add_search_bar(element);
        columns.push(data_var[0]);
        csv_conversion(element);
        schema_push(element);
      }
      // Bloque de eliminación de la tabla
    } else if (
      (seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Asignaciones" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Riesgos" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked === false)
    ) {
      if (
        seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Tipo de documento")[0].checked = false;
        document.getElementsByName("Correo electrónico")[0].checked = false;
        document.getElementsByName("Celular")[0].checked = false;
        document.getElementsByName("Dirección")[0].checked = false;
        for (let i = 0; i < columns.length; i++) {
          if (
            (columns[i].value === "tipo_doc" && columns[i].isCheck === true) ||
            (columns[i].value === "email" && columns[i].isCheck === true) ||
            (columns[i].value === "celular" && columns[i].isCheck === true) ||
            (columns[i].value === "dir_res" && columns[i].isCheck === true)
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "tipo_doc" && item.isCheck === false) ||
            (item.value === "email" && item.isCheck === false) ||
            (item.value === "celular" && item.isCheck === false) ||
            (item.value === "dir_res" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Contacto.length; i++) {
          filtros_Contacto[i].isCheck = false;
          const element = filtros_Contacto[i];
          csv_pop(element);
          schema_pop(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("ASES")[0].checked = false;
        document.getElementsByName("Registro Académico")[0].checked = false;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "estado_ases" ||
            columns[i].value === "registro_academico"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "estado_ases" && item.isCheck === false) ||
            (item.value === "registro_academico" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Estados.length; i++) {
          filtros_Estados[i].isCheck = false;
          const element = filtros_Estados[i];
          csv_pop(element);
          schema_pop(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked === false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName(
          "Código programa académico"
        )[0].checked = false;
        document.getElementsByName("Programa académico")[0].checked = false;
        document.getElementsByName("Sede")[0].checked = false;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "id_programa" ||
            columns[i].value === "programa_academico" ||
            columns[i].value === "sede"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "id_programa" && item.isCheck === false) ||
            (item.value === "programa_academico" && item.isCheck === false) ||
            (item.value === "sede" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Academico.length; i++) {
          filtros_Academico[i].isCheck = false;
          const element = filtros_Academico[i];
          csv_pop(element);
          schema_pop(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Asignaciones" &&
        e.target.checked === false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Profesional")[0].checked = false;
        document.getElementsByName("Practicante")[0].checked = false;
        document.getElementsByName("Monitor")[0].checked = false;
        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "asignacion_profesional" ||
            columns[i].value === "asignacion_practicante" ||
            columns[i].value === "asignacion_monitores"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "asignacion_profesional" &&
              item.isCheck === false) ||
            (item.value === "asignacion_practicante" &&
              item.isCheck === false) ||
            (item.value === "asignacion_monitores" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Asignaciones.length; i++) {
          filtros_Asignaciones[i].isCheck = false;
          const element = filtros_Asignaciones[i];
          csv_pop(element);
          schema_pop(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Riesgos" &&
        e.target.checked === false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Riesgo individual")[0].checked = false;
        document.getElementsByName("Riesgo familiar")[0].checked = false;
        document.getElementsByName("Riesgo académico")[0].checked = false;
        document.getElementsByName("Riesgo económico")[0].checked = false;
        document.getElementsByName(
          "Riesgo vida universitaria"
        )[0].checked = false;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "riesgo_individual" ||
            columns[i].value === "riesgo_familiar" ||
            columns[i].value === "riesgo_academico" ||
            columns[i].value === "riesgo_economico" ||
            columns[i].value === "riesgo_vida_universitaria_ciudad"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "riesgo_individual" && item.isCheck === false) ||
            (item.value === "riesgo_familiar" && item.isCheck === false) ||
            (item.value === "riesgo_academico" && item.isCheck === false) ||
            (item.value === "riesgo_economico" && item.isCheck === false) ||
            (item.value === "riesgo_vida_universitaria_ciudad" &&
              item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });
        for (let i = 0; i < filtros_Riesgos.length; i++) {
          filtros_Riesgos[i].isCheck = false;
          const element = filtros_Riesgos[i];
          csv_pop(element);
          schema_pop(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked === false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        const element = seleccionado_condiciones_excepcion_prueba;
        element.isCheck = false;
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].value === "condicion_excepcion") {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (item.value === "condicion_excepcion" && item.isCheck === false) {
            columns.splice(index, 1);
          }
        });
        csv_pop(element);
        schema_pop(element);
      }
    }
    const nuevasColumnas = columns;
    set_columnas({
      ...columnas,
      cabeceras: nuevasColumnas.filter((item) => item.isCheck === true),
    });
  };
  // constante para la paginación de los resultados
  const paginacionOpciones = {
    rowsPerPageText: "Filas por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Mostrar Todo",
  };
  // estilo de la tabla
  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#223336",
        backgroundColor: "#e7eef0",
      },
    },
  };
  /**
   * Función para pasar el csv a excel.
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
      });
      new_data_excel.push(new_data);
    }
    writeXlsxFile(filtered, {
      schema,
      fileName:
        "Reporte general Campus Virtual Ases universidad del Valle Excel.xlsx",
    });
  };
  let navigate = useNavigate();

  return (
    <>
      <>
        {
          <Container>
            <div>
              <h1>Reporte General</h1>
            </div>
            <br />
            {/* Cabeceras de Filtros */}
            <Row>
              {/* <Col> */}
              {cabecerasFiltros.map((Item, index) => (
                // <div key={index}>
                <Col key={index}>
                  <Form.Check
                    name={Item.name}
                    type="checkbox"
                    disabled
                    label={Item.name}
                    className="h5"
                    style={{ fontWeight: "bold" }}
                    onChange={(e) => handleChange(e)}
                  />
                  {/* <h4>{Item.name}</h4> */}
                </Col>
                // </div>
              ))}
            </Row>

            {/* Columna Filtros de Contacto */}
            <Row>
              <Col>
                {filtros_Contacto.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))}
              </Col>
              {/* Columna Filtros Estados */}
              <Col>
                {filtros_Estados.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      disabled={true}
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))}
              </Col>

              {/* Columna Filtros Académicos */}
              <Col>
                {filtros_Academico.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      disabled
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))}
              </Col>

              {/* Columna Asignaciones */}
              <Col>
                {filtros_Asignaciones.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      disabled
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))}
              </Col>

              {/* Columna Filtros Riesgos */}
              <Col>
                {filtros_Riesgos.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      disabled={true}
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))}
              </Col>
              {/* Columna Filtros Condicion de Excepcion */}

              {/* Columna Filtros Riesgos */}
              <Col>
                {filtro_cohorte.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      disabled={true}
                      label={Item.name}
                      className="h5"
                      style={{ fontWeight: "bold" }}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))}

                {/*   // FRAGMENTO SELECTOR DE COHORTES - WIP */}
                {/* <select>{cohorte_options}</select> */}

                {/* FIN  FRAGMENTO SELECTOR DE COHORTES - WIP */}
              </Col>
              {/* Columna Filtros Condicion de Excepcion */}

              {/* OCULTAS ESTAS DOS COLUMNAS DEL AVERNO */}
              {/* {filtros_Condicion_Excepcion.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))} */}

              {/* {filtros_Condicion_Excepcion_2.map((Item, index) => (
                  <div key={index}>
                    <Form.Check
                      name={Item.name}
                      type="checkbox"
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))} */}
            </Row>

            {/* Buscador */}
            <Form.Control
              type="text"
              placeholder="Búsqueda de Datos"
              // value={}
              onChange={(e) => on_search_base(e)}
            />
            <br />

            {/* <DataTableExtensions
                columns={columnas}
                data={state.data_user_rol}
                filter={true}
                filterPlaceHolder={2}
                filterDigit={1}
                exportHeaders={true}
                ></DataTableExtensions> */}

            {/* Tabla */}
            <DataTable
              id="tabla_Reporte"
              title="Reporte"
              columns={columnas.cabeceras}
              data={filtered}
              // data = {filtered}
              // data={state.estudiante}
              noDataComponent="Cargando Información..."
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="400px"
              highlightOnHover
              onRowClicked={(row) => {
                // redirect(`/ficha_estudiante/${row.id}`);
                navigate(`/ficha_estudiante/${row.id}`);
                // // // // console.log(row);
              }}
              responsive
              striped
              filter={true}
              paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
              customStyles={tableCustomStyles}
            />
            <Row>
              <Col style={{ padding: 10 }}>
                <CSVLink
                  headers={csv_headers}
                  data={filtered}
                  filename="Reporte general Campus Virtual Ases universidad del Valle"
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
              </Col>
            </Row>
          </Container>
        }
      </>
    </>
  );
};

export default Reporte;
