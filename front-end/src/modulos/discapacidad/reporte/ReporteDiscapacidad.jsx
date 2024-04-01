import React, { useState, useEffect, Component, useRef } from "react";
import { Container, Col, Row, Button, Form, Alert } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";
import { CSVLink } from "react-csv";
import writeXlsxFile from "write-excel-file";
import myGif from "./loading_data.gif";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  desencriptar,
  desencriptarInt,
  decryptTokenFromSessionStorage,
} from "../../utilidades_seguridad/utilidades_seguridad.jsx";
//import { Columna } from "./Columna.jsx";

// Columnas para el datatable
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

// header de un archivo CSV
var csv_headers = [
  { label: "Código", key: "cod_univalle" },
  { label: "Nombre", key: "nombre" },
  { label: "Apellido", key: "apellido" },
  { label: "Documento", key: "num_doc" },
];

// Se utiliza generalmente para ayudar a procesar y validar los datos del archivo CSV. Indica como se debe procesar los datos
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

const Reporte = () => {
  const [state, set_state] = useState({ estudiante: [] });
  const [search, set_Search] = useState({
    busqueda: "",
  });

  //Conexión con el back para extraer los estudiantes, consulta corta
  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    //let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

    const estudiantes_por_rol = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/discapacidad/estudiantes/`,
          { headers: config },
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          estudiante: response.data,
        });
        setFiltered(response.data);
      } catch (error) {
        // // console.log("no capto el dato");
      }
    };

    estudiantes_por_rol();
  }, []);

  //Conexion con el back para extraer los estudiantes, consulta larga
  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    // Funcion que busca el reporte del estudiante logueado.
    const datos_adicionales_estudiantes = async () => {
      try {
        const config = {
          Authorization: "Bearer " + decryptTokenFromSessionStorage(),
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/discapacidad/estudiantes-extra/`,
          { headers: config },
          //id_usuario.toString() +
          //"/",
          { params: { usuario_rol: rol, sede: sede } }
        );

        set_state({
          ...state,
          estudiante: response.data,
        });
        setFiltered(response.data);
        document.getElementsByName("loading_data")[0].style.visibility =
          "hidden";
      } catch (error) {
        // // console.log("no capto el dato");
      }
    };
    datos_adicionales_estudiantes();
  }, []);

  const csv_conversion = (item) => {
    var label = item.name;
    var key = item.value;
    csv_headers.push({ label: label, key: key });
  };

  const csv_pop = (item) => {
    csv_headers.map((item_csv, index) => {
      if (item_csv.label === item.name) {
        csv_headers.splice(index, 1);
      }
    });
  };

  const schema_push = (item) => {
    let tipo;
    if (
      item.name === "Código univalle" ||
      // item.name === "Celular" ||
      item.name === "Código programa académico"
      // ||
      // item.name === "Promedio acumulado" ||
      // item.name === "Riesgo geográfico"
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

  const schema_pop = (item) => {
    schema.map((item_schema, index) => {
      if (item_schema.column === item.name) {
        schema.splice(index, 1);
      }
    });
  };

  const onSearch = (e) => {
    set_Search({ ...search, busqueda: e.target.value });
    // // // console.log(search);
  };

  const [columnas, set_columnas] = useState({ cabeceras: columns });

  const cabecerasFiltros = [
    { name: "Contacto", isCheck: false },
    { name: "Estados", isCheck: false },
    { name: "Académico", isCheck: false },
    { name: "Discapacidad", isCheck: false },
    { name: "Condición de Excepción", isCheck: false },
  ];

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
    {
      name: "Es discapacidad",
      value: "estado_discapacidad",
      selector: (row) => row.estado_discapacidad,
      sortable: true,
      isCheck: false,
    },
  ];

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

  const filtros_Discapacidad = [
    {
      name: "Tipo de discapacidad",
      value: "tipo_discapacidad",
      selector: (row) => row.tipo_discapacidad,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Adquisición",
      value: "adquisicion",
      selector: (row) => row.adquisicion,
      sortable: true,
      isCheck: false,
    },
  ];

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

  const columns_searchable = columns;

  // Actualiza las columnas a usar
  useEffect(() => {
    set_columnas((prevState) => ({
      ...prevState,
      cabeceras: columns,
    }));
  }, []);

  const [filtered, setFiltered] = useState(state.estudiante);
  const [noResults, setNoResults] = useState(false);

  const handle_column_search = (e, selected) => {
    // POR SI LLEGASE A INTENTAR LEER EL EVENTO Y NO ENCONTRASE NADA
    if (e.target.name === undefined) {
      // // console.log("no hay nada");
      const data_filtered = state.estudiante;
      setFiltered(data_filtered);
    }

    // BÚSQUEDA INDIVIDUAL POR FILTRO: CONTACTO
    if (e.target.name === "Tipo documento") {
      const data_filtered = filtered.filter((row) =>
        row.tipo_doc.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Correo electrónico") {
      // // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Celular") {
      // // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.celular.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Dirección") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.dir_res.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }

    // BÚSQUEDA INDIVIDUAL POR FILTRO: ESTADOS
    if (e.target.name === "ASES") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.estado_ases.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Registro Académico") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.registro_academico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Es discapacidad") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.estado_discapacidad
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }

    // BÚSQUEDA INDIVIDUAL POR FILTRO: ACADÉMICO
    if (e.target.name === "Código programa académico") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.id_programa.toString().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Programa académico") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.programa_academico
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      // // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
      // // // // console.log(filtered);
    }
    if (e.target.name === "Sede") {
      // // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.sede.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }

    // BÙSQUEDA INDIVIDUAL DE FILTRO: DISCAPACIDAD
    if (e.target.name === "Tipo de discapacidad") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.tipo_discapacidad.toString().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
    if (e.target.name === "Adquisición") {
      // // // console.log(state.estudiante);
      const data_filtered = filtered.filter((row) =>
        row.adquisicion.toString().includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }

    // BÚSQUEDA INDIVIDUAL DE FILTRO: CONDICIONES DE EXCEPCIÓN
    if (e.target.name === "Condición de Excepción") {
      const data_filtered = filtered.filter((row) =>
        row.condicion_excepcion
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      // // // console.log(data_filtered);
      const filtered_data =
        data_filtered.length > 0 ? data_filtered : state.estudiante;
      setFiltered(filtered_data);
    }
  };

  const add_search_bar = (selected) => {
    // // // console.log(filtered);
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
    // columns.push(new_search_bar_data);
    return new_search_bar_data;
  };

  const handleChange = (e) => {
    // // // console.log(columnaPrevia.cabeceras);

    const seleccionado_contacto = filtros_Contacto.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_estados = filtros_Estados.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_academico = filtros_Academico.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_discapacidad = filtros_Discapacidad.find(
      (item) => item.name === e.target.name
    );
    // const seleccionado_asignaciones = filtros_Asignaciones.find(
    //   (item) => item.name === e.target.name
    // );
    // const seleccionado_condiciones_excepcion = filtros_Condicion_Excepcion.find(
    //   (item) => item.name === e.target.name
    // );
    // const seleccionado_condiciones_excepcion_2 =
    //   filtros_Condicion_Excepcion_2.find((item) => item.name === e.target.name);

    const seleccionado_cabeceras_filtros = cabecerasFiltros.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_condiciones_excepcion_prueba =
      filtros_Condicion_Excepcion_prueba.find(
        (item) => item.name === "Condición de Excepción"
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

    // **
    //  condiciones Para Filtros de Estados
    // **

    if (seleccionado_estados === undefined) {
    }
    // Si algunas de las opciones de estados is checked, haga lo siguiente
    else if (
      (seleccionado_estados.name === "ASES" && e.target.checked === true) ||
      (seleccionado_estados.name === "Registro Académico" &&
        e.target.checked === true) ||
      (seleccionado_estados.name === "Es discapacidad" &&
        e.target.checked === true)
    ) {
      seleccionado_estados.isCheck = true;
      var searchable_columns = add_search_bar(seleccionado_estados);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_estados);
      schema_push(seleccionado_estados);
    }
    // Sino, haga lo siguiente
    else if (
      (seleccionado_estados.name === "ASES" && e.target.checked === false) ||
      (seleccionado_estados.name === "Registro Académico" &&
        e.target.checked === false) ||
      (seleccionado_estados.name === "Es discapacidad" &&
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

    // condiciones para Filtros de discapacidad

    if (seleccionado_discapacidad === undefined) {
    } else if (
      (seleccionado_discapacidad.name === "Tipo de discapacidad" &&
        e.target.checked === true) ||
      (seleccionado_discapacidad.name === "Adquisición" &&
        e.target.checked === true)
    ) {
      seleccionado_discapacidad.isCheck = true;
      var searchable_columns = add_search_bar(seleccionado_discapacidad);
      columns.push(searchable_columns[0]);
      csv_conversion(seleccionado_discapacidad);
      schema_push(seleccionado_discapacidad);
    } else if (
      (seleccionado_discapacidad.name === "Tipo de discapacidad" &&
        e.target.checked === false) ||
      (seleccionado_discapacidad.name === "Adquisición" &&
        e.target.checked === false)
    ) {
      seleccionado_discapacidad.isCheck = false;
      document.getElementsByName("Discapacidad")[0].checked = false;
      columns.map((item, index) => {
        if (item.value === seleccionado_discapacidad.value) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_discapacidad);
      schema_pop(seleccionado_discapacidad);
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

    // **
    // Condiciones para cabeceras de filtros
    // **

    if (seleccionado_cabeceras_filtros === undefined) {
    } else if (
      (seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Discapacidad" &&
        e.target.checked === true) ||
      (seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked === true)
    ) {
      if (
        seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === true
      ) {
        // // console.log(seleccionado_cabeceras_filtros);
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
            // // console.log("HOLA");
            columns[i].isCheck = false;
          }
        }
        // // // console.log(columns);
        // Se utiliza para eliminar del arreglo columnas algún elemento de contactos, que tenga el check en false
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
          // // console.log(element);
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
        }

        for (let i = 0; i < filtros_Contacto.length; i++) {
          const element = filtros_Contacto[i];
          csv_conversion(element);
          schema_push(element);
        }
        // // console.log(columns);
      } else if (
        seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("ASES")[0].checked = false;
        document.getElementsByName("Registro Académico")[0].checked = false;
        document.getElementsByName("Es discapacidad")[0].checked = false;
        document.getElementsByName("ASES")[0].checked = true;
        document.getElementsByName("Registro Académico")[0].checked = true;
        document.getElementsByName("Es discapacidad")[0].checked = true;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "estado_ases" ||
            columns[i].value === "registro_academico" ||
            columns[i].value === "estado_discapacidad"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "estado_ases" && item.isCheck === false) ||
            (item.value === "registro_academico" && item.isCheck === false) ||
            (item.value === "estado_discapacidad" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Estados.length; i++) {
          const element = filtros_Estados[i];
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
          // columns.push(element);
        }

        for (let i = 0; i < filtros_Estados.length; i++) {
          const element = filtros_Estados[i];
          csv_conversion(element);
          schema_push(element);
        }
        // // // console.log(columns);
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
          // columns.push(element);
        }

        for (let i = 0; i < filtros_Academico.length; i++) {
          const element = filtros_Academico[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Discapacidad" &&
        e.target.checked === true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("Tipo de discapacidad")[0].checked = false;
        document.getElementsByName("Adquisición")[0].checked = false;
        document.getElementsByName("Tipo de discapacidad")[0].checked = true;
        document.getElementsByName("Adquisición")[0].checked = true;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "tipo_discapacidad" ||
            columns[i].value === "adquisicion"
          ) {
            // // console.log("HOLA");
            columns[i].isCheck = false;
          }
        }
        // // // console.log(columns);
        // Se utiliza para eliminar del arreglo columnas algún elemento de contactos, que tenga el check en false
        columns.map((item, index) => {
          if (
            (item.value === "tipo_discapacidad" && item.isCheck === false) ||
            (item.value === "adquisicion" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Discapacidad.length; i++) {
          const element = filtros_Discapacidad[i];
          // // console.log(element);
          element.isCheck = true;
          var data_var = add_search_bar(element);
          columns.push(data_var[0]);
        }

        for (let i = 0; i < filtros_Discapacidad.length; i++) {
          const element = filtros_Discapacidad[i];
          csv_conversion(element);
          schema_push(element);
        }
        // // console.log(columns);
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
      // **
      //    Bloque de eliminación de la tabla
      // **
    } else if (
      (seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Discapacidad" &&
        e.target.checked === false) ||
      (seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked === false)
    ) {
      if (
        seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked === false
      ) {
        // // console.log("WE'RE OVER HERE!");
        // // console.log(columns);
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Tipo de documento")[0].checked = false;
        document.getElementsByName("Correo electrónico")[0].checked = false;
        document.getElementsByName("Celular")[0].checked = false;
        document.getElementsByName("Dirección")[0].checked = false;

        // // console.log(columns);

        for (let i = 0; i < columns.length; i++) {
          if (
            (columns[i].value === "tipo_doc" && columns[i].isCheck === true) ||
            (columns[i].value === "email" && columns[i].isCheck === true) ||
            (columns[i].value === "celular" && columns[i].isCheck === true) ||
            (columns[i].value === "dir_res" && columns[i].isCheck === true)
          ) {
            // // console.log("is HeRe!!");
            columns[i].isCheck = false;
            // columns.splice(i, 1);
          }
        }
        // // console.log(columns);
        // // console.log("IS DEAD THSI SH**");

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

        // // console.log("After Unselect All");
        // // console.log(columns);
      } else if (
        seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked === false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("ASES")[0].checked = false;
        document.getElementsByName("Registro Académico")[0].checked = false;
        document.getElementsByName("Es discapacidad")[0].checked = false;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "estado_ases" ||
            columns[i].value === "registro_academico" ||
            columns[i].value === "estado_discapacidad"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "estado_ases" && item.isCheck === false) ||
            (item.value === "registro_academico" && item.isCheck === false) ||
            (item.value === "estado_discapacidad" && item.isCheck === false)
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

        // // // console.log(columns);
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
        // document.getElementsByName("Promedio acumulado")[0].checked = false;
        // document.getElementsByName("Estimulos")[0].checked = false;
        // document.getElementsByName("Bajo rendimiento")[0].checked = false;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].value === "id_programa" ||
            columns[i].value === "programa_academico" ||
            columns[i].value === "sede"
            // ||
            // columns[i].value === "" ||
            // columns[i].value === "" ||
            // columns[i].value === ""
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.value === "id_programa" && item.isCheck === false) ||
            (item.value === "programa_academico" && item.isCheck === false) ||
            (item.value === "sede" && item.isCheck === false)
            //  ||
            // (item.value === "" && item.isCheck === false) ||
            // (item.value === "" && item.isCheck === false) ||
            // (item.value === "" && item.isCheck === false)
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
      }

      if (
        seleccionado_cabeceras_filtros.name === "Discapacidad" &&
        e.target.checked === false
      ) {
        // // console.log("WE'RE OVER HERE!");
        // // console.log(columns);
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Tipo de discapacidad")[0].checked = false;
        document.getElementsByName("Adquisición")[0].checked = false;

        // // console.log(columns);

        for (let i = 0; i < columns.length; i++) {
          if (
            (columns[i].value === "tipo_discapacidad" &&
              columns[i].isCheck === true) ||
            (columns[i].value === "adquisicion" && columns[i].isCheck === true)
          ) {
            // // console.log("is HeRe!!");
            columns[i].isCheck = false;
            // columns.splice(i, 1);
          }
        }
        // // console.log(columns);
        // // console.log("IS DEAD THSI SH**");

        columns.map((item, index) => {
          if (
            (item.value === "tipo_discapacidad" && item.isCheck === false) ||
            (item.value === "adquisicion" && item.isCheck === false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Discapacidad.length; i++) {
          filtros_Discapacidad[i].isCheck = false;
          const element = filtros_Discapacidad[i];
          csv_pop(element);
          schema_pop(element);
        }

        // // console.log("After Unselect All");
        // // console.log(columns);
      } else if (
        seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked === false
      ) {
        // console.log("NA");
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

    // **
    // FIN DE CONDICIONES PARA FILTROS
    // **

    const nuevasColumnas = columns;
    set_columnas({
      ...columnas,
      cabeceras: nuevasColumnas.filter((item) => item.isCheck === true),
    });
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Mostrar Todo",
  };

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#223336",
        backgroundColor: "#e7eef0",
      },
    },
  };

  const imprimir_excel = () => {
    let new_data_excel = [];

    for (let i = 0; i < state.estudiante.length; i++) {
      let new_data = [];
      new_data.push({
        cod_univalle: state.estudiante[i].cod_univalle,
        nombre: state.estudiante[i].nombre,
        apellido: state.estudiante[i].apellido,
        num_doc: state.estudiante[i].num_doc,
      });
      new_data_excel.push(new_data);
    }

    writeXlsxFile(state.estudiante, {
      schema, // (optional) column widths, etc.
      fileName:
        "Reporte general Campus Virtual Ases universidad del Valle Excel.xlsx",
      // filePath: '../dowloads/file.xlsx'
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
              {/* <Columna tipo_filtro={filtros_Contacto} funcion={handleChange}/> */}
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
                      label={Item.name}
                      className="mb-2"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                ))}
              </Col>

              {/* Columna Discapacidad */}
              <Col>
                {filtros_Discapacidad.map((Item, index) => (
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

              {/* Columna Asignaciones */}
              {/* <Col>
                {filtros_Asignaciones.map((Item, index) => (
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
              </Col> */}

              {/* Columna Filtros Riesgos */}
              {/* <Col>
                {filtros_Riesgos.map((Item, index) => (
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
              </Col> */}
              {/* Columna Filtros Condicion de Excepcion */}

              {/* OCULTAS ESTAS DOS COLUMNAS DEL AVERNO */}
              <Col sm={1} xs={1}>
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
                <p> </p>
              </Col>

              <Col sm={1} xs={1}>
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
                <p> </p>
              </Col>
            </Row>

            {/* Buscador */}
            <Form.Control
              type="text"
              placeholder="Búsqueda de Datos"
              // value={}
              onChange={(e) => onSearch(e)}
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
              data={filtered.filter((item) => {
                return search.busqueda.toLowerCase() === ""
                  ? item
                  : item.cod_univalle.toLowerCase().includes(search.busqueda) ||
                      item.nombre.toLowerCase().includes(search.busqueda) ||
                      item.apellido.toLowerCase().includes(search.busqueda) ||
                      item.num_doc
                        .toString()
                        .toLowerCase()
                        .includes(search.busqueda) ||
                      // item.asignacion_profesional
                      //   .toLowerCase()
                      //   .includes(search.busqueda) ||
                      //    ||
                      // item.asignacion_practicante
                      //   .toLowerCase()
                      //   .includes(search.busqueda) ||
                      // item.asignacion_monitores
                      //   .toLowerCase()
                      //   .includes(search.busqueda)
                      item.sede.toLowerCase().includes(search.busqueda);
              })}
              // data = {filtered}
              // data={state.estudiante}
              noDataComponent="Cargando Información..."
              //  Habilita la paginación en la tabla
              pagination
              // Aquí se pasan opciones relacionadas con la paginación de la tabla.
              paginationComponentOptions={paginacionOpciones}
              // Esta opción fija la cabecera de la tabla en la parte superior de la tabla, lo que facilita la visualización de las columnas cuando se desplaza hacia abajo en una tabla larga.
              fixedHeader
              // Establece la altura máxima para la cabecera fija. En este caso, la cabecera permanecerá fija hasta que la altura de desplazamiento alcance los 400 píxeles.
              fixedHeaderScrollHeight="400px"
              // Resalta la fila en la que el cursor del mouse está posicionado.
              highlightOnHover
              // Define una función que se ejecutará cuando el usuario haga clic en una fila de la tabla. En este caso, parece redirigir al usuario a una página específica relacionada con la fila haciendo uso de la función navigate.
              onRowClicked={(row) => {
                // redirect(`/ficha_estudiante_discapacidad/${row.id}`);
                navigate(`/ficha_estudiante_discapacidad/${row.id}`);
                // // // console.log(row);
              }}
              // Hace que la tabla sea sensible, lo que significa que se adaptará y mostrará una barra de desplazamiento horizontal si el contenido es demasiado ancho para ajustarse en la pantalla.
              responsive
              // Alterna el estilo de las filas para que tengan colores diferentes, lo que facilita la lectura de las filas.
              striped
              // Habilita la función de filtro para que los usuarios puedan buscar y filtrar datos en la tabla.
              filter={true}
              // La línea está configurando las opciones disponibles para que el usuario elija cuántas filas desea mostrar por página al utilizar la funcionalidad de paginación en la tabla.
              paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
              // Permite aplicar estilos personalizados a la tabla utilizando un objeto llamado tableCustomStyles.
              customStyles={tableCustomStyles}
            />
            <Row>
              <Col style={{ padding: 10 }}>
                <CSVLink
                  headers={csv_headers}
                  data={state.estudiante}
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
