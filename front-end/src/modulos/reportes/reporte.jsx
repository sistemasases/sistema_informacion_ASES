import React, { useState, useEffect, Component, useRef } from "react";
import { Container, Col, Row, Button, Form, Alert } from "react-bootstrap";
// import Carousel from "react-bootstrap/Carousel";
// import all_estudiantes_reportes from "../../service/all_estudiantes_reportes";
// import Select from "react-select";
import DataTable from "react-data-table-component";
// import Checkbox from "react-bootstrap/FormCheck";
// import Modal from "react-bootstrap/Modal";
// import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import axios from "axios";
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
    sortable: false,
    isCheck: true,
  },
  {
    name: "Documento",
    selector: (row) => row.num_doc,
    value: "num_doc",
    sortable: false,
    isCheck: true,
  },
];

var csv_headers = [
  { label: "Código", key: "cod_univalle" },
  { label: "Nombre", key: "nombre" },
  { label: "Apellido", key: "apellido" },
  { label: "Documento", key: "num_doc" },
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
];

const Reporte = () => {
  const [state, set_state] = useState({ estudiante: [] });

  //Conexion con el back para extraer todas los estudiantes
  useEffect(() => {
    let rol = sessionStorage.getItem("rol");
    let sede = sessionStorage.getItem("sede_id");
    let id_usuario = sessionStorage.getItem("id_usuario");

    const config = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };

    const estudiantes_por_rol = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/reportes/estudiante_por_rol/" +
            id_usuario.toString() +
            "/",
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          estudiante: response.data,
        });
      } catch (error) {
        console.log("no capto el dato");
      }
    };

    estudiantes_por_rol();
  }, []);

  useEffect(() => {
    let rol = sessionStorage.getItem("rol");
    let sede = sessionStorage.getItem("sede_id");
    let id_usuario = sessionStorage.getItem("id_usuario");

    const riesgos_estudiante = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/reportes/estudiante_filtros/" +
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
      } catch (error) {
        console.log("no capto el dato");
      }
    };
    riesgos_estudiante();
  }, []);

  const [search, set_Search] = useState({
    busqueda: "",
  });

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
      item.name === "Celular" ||
      item.name === "Código programa académico" ||
      item.name === "Promedio acumulado" ||
      item.name === "Riesgo geográfico"
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
    // console.log(search);
  };

  const [columnas, set_columnas] = useState({ cabeceras: columns });
  const cabecerasFiltros = [
    { name: "Contacto", isCheck: false },
    { name: "Estados", isCheck: false },
    { name: "Académico", isCheck: false },
    { name: "Asignaciones", isCheck: false },
    { name: "Riesgos", isCheck: false },
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
    // {
    //   name: "Promedio acumulado",
    //   value: "promedio_acumulado",
    //   selector: (row) => row.promedio_acumulado,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "Estimulos",
    //   value: "estimulos",
    //   selector: (row) => row.estimulos,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "Bajo rendimiento",
    //   value: "bajos_rendimiento",
    //   selector: (row) => row.bajos_rendimiento,
    //   sortable: true,
    //   isCheck: false,
    // },
  ];

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
    {
      name: "Riesgo geográfico",
      selector: (row) => row.ciudad_res,
      value: "ciudad_res",
      sortable: true,
      isCheck: false,
    },
  ];

  const filtros_Condicion_Excepcion = [
    {
      name: "I.N",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "M.A.P",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "C.A",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "C.A.C",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "C.U",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "P.R",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "M.P.M",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    // {
    //   name: "D.N.I",
    //   value: "",
    //   selector: (row) => row,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "M.D.P",
    //   value: "",
    //   selector: (row) => row,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "P.D",
    //   value: "",
    //   selector: (row) => row,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "P.D",
    //   value: "",
    //   selector: (row) => row,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "V.C",
    //   value: "",
    //   selector: (row) => row,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "A.R",
    //   value: "",
    //   selector: (row) => row,
    //   sortable: true,
    //   isCheck: false,
    // },
    // {
    //   name: "n/a",
    //   value: "",
    //   selector: (row) => row,
    //   sortable: true,
    //   isCheck: false,
    // },
  ];

  const filtros_Condicion_Excepcion_2 = [
    {
      name: "D.N.I",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "M.D.P",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "P.D",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "P.D",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "V.C",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "A.R",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
    {
      name: "n/a",
      value: "",
      selector: (row) => row,
      sortable: true,
      isCheck: false,
    },
  ];

  useEffect(() => {
    // set_columnas({
    //   ...columnas,
    //   cabeceras: columns,
    // });
    set_columnas((prevState) => ({ ...prevState, cabeceras: columns }));
  }, []);

  // function usePrevious(columnas) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = columnas;
  //   });
  //   return ref.current;
  // }

  // const columnaPrevia = usePrevious(columnas);
  // var antiguoArray = [];
  // const emptyArray = [];

  const handleChange = (e) => {
    // console.log(columnaPrevia.cabeceras);

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
    const seleccionado_condiciones_excepcion = filtros_Condicion_Excepcion.find(
      (item) => item.name === e.target.name
    );
    const seleccionado_condiciones_excepcion_2 =
      filtros_Condicion_Excepcion_2.find((item) => item.name === e.target.name);
    const seleccionado_cabeceras_filtros = cabecerasFiltros.find(
      (item) => item.name === e.target.name
    );
    //  condiciones Para Filtros de Contacto

    if (seleccionado_contacto === undefined) {
    } else if (
      (seleccionado_contacto.name === "Tipo de documento" &&
        e.target.checked == true) ||
      (seleccionado_contacto.name === "Correo electrónico" &&
        e.target.checked == true) ||
      (seleccionado_contacto.name === "Celular" && e.target.checked == true) ||
      (seleccionado_contacto.name === "Prueba" && e.target.checked == true) ||
      (seleccionado_contacto.name === "Dirección" && e.target.checked == true)
    ) {
      seleccionado_contacto.isCheck = true;
      columns.push(seleccionado_contacto);
      csv_conversion(seleccionado_contacto);
      schema_push(seleccionado_contacto);
    } else if (
      (seleccionado_contacto.name === "Tipo de documento" &&
        e.target.checked == false) ||
      (seleccionado_contacto.name === "Correo electrónico" &&
        e.target.checked == false) ||
      (seleccionado_contacto.name === "Celular" && e.target.checked == false) ||
      (seleccionado_contacto.name === "Prueba" && e.target.checked == false) ||
      (seleccionado_contacto.name === "Dirección" && e.target.checked == false)
    ) {
      seleccionado_contacto.isCheck = false;
      document.getElementsByName("Contacto")[0].checked = false;
      columns.map((item, index) => {
        if (item.name === seleccionado_contacto.name) {
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
    } else if (
      (seleccionado_estados.name === "ASES" && e.target.checked == true) ||
      (seleccionado_estados.name === "Registro Académico" &&
        e.target.checked == true)
    ) {
      seleccionado_estados.isCheck = true;
      columns.push(seleccionado_estados);
      csv_conversion(seleccionado_estados);
      schema_push(seleccionado_estados);
    } else if (
      (seleccionado_estados.name === "ASES" && e.target.checked == false) ||
      (seleccionado_estados.name === "Registro Académico" &&
        e.target.checked == false)
    ) {
      seleccionado_estados.isCheck = false;
      document.getElementsByName("Estados")[0].checked = false;
      columns.map((item, index) => {
        if (item.name === seleccionado_estados.name) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_estados);
      schema_pop(seleccionado_estados);
    }

    // condiciones para Filtros de Academico

    if (seleccionado_academico === undefined) {
    } else if (
      (seleccionado_academico.name == "Código programa académico" &&
        e.target.checked == true) ||
      (seleccionado_academico.name == "Programa académico" &&
        e.target.checked == true) ||
      (seleccionado_academico.name == "Sede" && e.target.checked == true) ||
      (seleccionado_academico.name == "Promedio acumulado" &&
        e.target.checked == true) ||
      (seleccionado_academico.name == "Estimulos" &&
        e.target.checked == true) ||
      (seleccionado_academico.name == "Bajo rendimiento" &&
        e.target.checked == true)
    ) {
      seleccionado_academico.isCheck = true;
      columns.push(seleccionado_academico);
      csv_conversion(seleccionado_academico);
      schema_push(seleccionado_academico);
    } else if (
      (seleccionado_academico.name == "Código programa académico" &&
        e.target.checked == false) ||
      (seleccionado_academico.name == "Programa académico" &&
        e.target.checked == false) ||
      (seleccionado_academico.name == "Sede" && e.target.checked == false) ||
      (seleccionado_academico.name == "Promedio acumulado" &&
        e.target.checked == false) ||
      (seleccionado_academico.name == "Estimulos" &&
        e.target.checked == false) ||
      (seleccionado_academico.name == "Bajo rendimiento" &&
        e.target.checked == false)
    ) {
      seleccionado_academico.isCheck = false;
      document.getElementsByName("Académico")[0].checked = false;
      columns.map((item, index) => {
        if (item.name === seleccionado_academico.name) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_academico);
      schema_pop(seleccionado_academico);
    }

    // condiciones para Filtros de Asignaciones

    if (seleccionado_asignaciones === undefined) {
    } else if (
      (seleccionado_asignaciones.name == "Profesional" &&
        e.target.checked == true) ||
      (seleccionado_asignaciones.name == "Practicante" &&
        e.target.checked == true) ||
      (seleccionado_asignaciones.name == "Monitor" && e.target.checked == true)
    ) {
      seleccionado_asignaciones.isCheck = true;
      columns.push(seleccionado_asignaciones);
      csv_conversion(seleccionado_asignaciones);
      schema_push(seleccionado_asignaciones);
    } else if (
      (seleccionado_asignaciones.name == "Profesional" &&
        e.target.checked == false) ||
      (seleccionado_asignaciones.name == "Practicante" &&
        e.target.checked == false) ||
      (seleccionado_asignaciones.name == "Monitor" && e.target.checked == false)
    ) {
      seleccionado_asignaciones.isCheck = false;
      document.getElementsByName("Asignaciones")[0].checked = false;
      columns.map((item, index) => {
        if (item.name === seleccionado_asignaciones.name) {
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
        e.target.checked == true) ||
      (seleccionado_riesgos.name === "Riesgo familiar" &&
        e.target.checked == true) ||
      (seleccionado_riesgos.name === "Riesgo académico" &&
        e.target.checked == true) ||
      (seleccionado_riesgos.name === "Riesgo económico" &&
        e.target.checked == true) ||
      (seleccionado_riesgos.name === "Riesgo vida universitaria" &&
        e.target.checked == true) ||
      (seleccionado_riesgos.name === "Riesgo geográfico" &&
        e.target.checked == true)
    ) {
      seleccionado_riesgos.isCheck = true;
      columns.push(seleccionado_riesgos);
      csv_conversion(seleccionado_riesgos);
      schema_push(seleccionado_riesgos);
    } else if (
      (seleccionado_riesgos.name === "Riesgo individual" &&
        e.target.checked == false) ||
      (seleccionado_riesgos.name === "Riesgo familiar" &&
        e.target.checked == false) ||
      (seleccionado_riesgos.name === "Riesgo académico" &&
        e.target.checked == false) ||
      (seleccionado_riesgos.name === "Riesgo económico" &&
        e.target.checked == false) ||
      (seleccionado_riesgos.name === "Riesgo vida universitaria" &&
        e.target.checked == false) ||
      (seleccionado_riesgos.name === "Riesgo geográfico" &&
        e.target.checked == false)
    ) {
      seleccionado_riesgos.isCheck = false;
      document.getElementsByName("Riesgos")[0].checked = false;
      columns.map((item, index) => {
        if (item.name === seleccionado_riesgos.name) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_riesgos);
      schema_pop(seleccionado_riesgos);
    }

    // condiciones para Filtros de Excepcion
    if (seleccionado_condiciones_excepcion === undefined) {
    }
    // else if(

    // condiciones para Filtros de Excepcion 2
    if (seleccionado_condiciones_excepcion_2 === undefined) {
    }
    // else if(

    // **
    // condiciones para cabeceras de filtros
    // **

    if (seleccionado_cabeceras_filtros === undefined) {
    } else if (
      (seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked == true) ||
      (seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked == true) ||
      (seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked == true) ||
      (seleccionado_cabeceras_filtros.name === "Asignaciones" &&
        e.target.checked == true) ||
      (seleccionado_cabeceras_filtros.name === "Riesgos" &&
        e.target.checked == true) ||
      (seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked == true)
    ) {
      if (
        seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked == true
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
            columns[i].name === "Tipo de documento" ||
            columns[i].name === "Correo electrónico" ||
            columns[i].name === "Celular" ||
            columns[i].name === "Dirección"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "Tipo de documento" && item.isCheck == false) ||
            (item.name === "Correo electrónico" && item.isCheck == false) ||
            (item.name === "Celular" && item.isCheck == false) ||
            (item.name === "Dirección" && item.isCheck == false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Contacto.length; i++) {
          const element = filtros_Contacto[i];
          element.isCheck = true;
          columns.push(element);
        }

        for (let i = 0; i < filtros_Contacto.length; i++) {
          const element = filtros_Contacto[i];
          csv_conversion(element);
          schema_push(element);
        }
        // console.log(columns);
      } else if (
        seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked == true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("ASES")[0].checked = false;
        document.getElementsByName("Registro Académico")[0].checked = false;
        document.getElementsByName("ASES")[0].checked = true;
        document.getElementsByName("Registro Académico")[0].checked = true;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].name === "ASES" ||
            columns[i].name === "Registro Académico"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "ASES" && item.isCheck == false) ||
            (item.name === "Registro Académico" && item.isCheck == false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Estados.length; i++) {
          const element = filtros_Estados[i];
          element.isCheck = true;
          columns.push(element);
        }

        for (let i = 0; i < filtros_Estados.length; i++) {
          const element = filtros_Estados[i];
          csv_conversion(element);
          schema_push(element);
        }
        // console.log(columns);
      } else if (
        seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked == true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName(
          "Código programa académico"
        )[0].checked = false;
        document.getElementsByName("Programa académico")[0].checked = false;
        document.getElementsByName("Sede")[0].checked = false;
        // document.getElementsByName("Promedio acumulado")[0].checked = false;
        // document.getElementsByName("Estimulos")[0].checked = false;
        // document.getElementsByName("Bajo rendimiento")[0].checked = false;
        document.getElementsByName(
          "Código programa académico"
        )[0].checked = true;
        document.getElementsByName("Programa académico")[0].checked = true;
        document.getElementsByName("Sede")[0].checked = true;
        // document.getElementsByName("Promedio acumulado")[0].checked = true;
        // document.getElementsByName("Estimulos")[0].checked = true;
        // document.getElementsByName("Bajo rendimiento")[0].checked = true;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].name === "Código programa académico" ||
            columns[i].name === "Programa académico" ||
            columns[i].name === "Sede" ||
            columns[i].name === "Promedio acumulado" ||
            columns[i].name === "Estimulos" ||
            columns[i].name === "Bajo rendimiento"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "Código programa académico" &&
              item.isCheck == false) ||
            (item.name === "Programa académico" && item.isCheck == false) ||
            (item.name === "Sede" && item.isCheck == false) ||
            (item.name === "Promedio acumulado" && item.isCheck == false) ||
            (item.name === "Estimulos" && item.isCheck == false) ||
            (item.name === "Bajo rendimiento" && item.isCheck == false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Academico.length; i++) {
          const element = filtros_Academico[i];
          element.isCheck = true;
          columns.push(element);
        }

        for (let i = 0; i < filtros_Academico.length; i++) {
          const element = filtros_Academico[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Asignaciones" &&
        e.target.checked == true
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
            columns[i].name === "Profesional" ||
            columns[i].name === "Practicante" ||
            columns[i].name === "Monitor"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "Profesional" && item.isCheck == false) ||
            (item.name === "Practicante" && item.isCheck == false) ||
            (item.name === "Monitor" && item.isCheck == false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Asignaciones.length; i++) {
          const element = filtros_Asignaciones[i];
          element.isCheck = true;
          columns.push(element);
        }

        for (let i = 0; i < filtros_Asignaciones.length; i++) {
          const element = filtros_Asignaciones[i];
          csv_conversion(element);
          schema_push(element);
        }
      } else if (
        seleccionado_cabeceras_filtros.name === "Riesgos" &&
        e.target.checked == true
      ) {
        seleccionado_cabeceras_filtros.isCheck = true;
        document.getElementsByName("Riesgo individual")[0].checked = false;
        document.getElementsByName("Riesgo familiar")[0].checked = false;
        document.getElementsByName("Riesgo académico")[0].checked = false;
        document.getElementsByName("Riesgo económico")[0].checked = false;
        document.getElementsByName(
          "Riesgo vida universitaria"
        )[0].checked = false;
        document.getElementsByName("Riesgo geográfico")[0].checked = false;
        document.getElementsByName("Riesgo individual")[0].checked = true;
        document.getElementsByName("Riesgo familiar")[0].checked = true;
        document.getElementsByName("Riesgo académico")[0].checked = true;
        document.getElementsByName("Riesgo económico")[0].checked = true;
        document.getElementsByName(
          "Riesgo vida universitaria"
        )[0].checked = true;
        document.getElementsByName("Riesgo geográfico")[0].checked = true;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].name === "Riesgo individual" ||
            columns[i].name === "Riesgo familiar" ||
            columns[i].name === "Riesgo académico" ||
            columns[i].name === "Riesgo económico" ||
            columns[i].name === "Riesgo vida universitaria" ||
            columns[i].name === "Riesgo geográfico"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "Riesgo individual" && item.isCheck == false) ||
            (item.name === "Riesgo familiar" && item.isCheck == false) ||
            (item.name === "Riesgo académico" && item.isCheck == false) ||
            (item.name === "Riesgo económico" && item.isCheck == false) ||
            (item.name === "Riesgo vida universitaria" &&
              item.isCheck == false) ||
            (item.name === "Riesgo geográfico" && item.isCheck == false)
          ) {
            columns.splice(index, 1);
          }
        });

        for (let i = 0; i < filtros_Riesgos.length; i++) {
          const element = filtros_Riesgos[i];
          element.isCheck = true;
          columns.push(element);
        }

        for (let i = 0; i < filtros_Riesgos.length; i++) {
          const element = filtros_Riesgos[i];
          csv_conversion(element);
          schema_push(element);
        }
      }
    } else if (
      (seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked == false) ||
      (seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked == false) ||
      (seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked == false) ||
      (seleccionado_cabeceras_filtros.name === "Asignaciones" &&
        e.target.checked == false) ||
      (seleccionado_cabeceras_filtros.name === "Riesgos" &&
        e.target.checked == false) ||
      (seleccionado_cabeceras_filtros.name === "Condición de Excepción" &&
        e.target.checked == false)
    ) {
      if (
        seleccionado_cabeceras_filtros.name === "Contacto" &&
        e.target.checked == false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Tipo de documento")[0].checked = false;
        document.getElementsByName("Correo electrónico")[0].checked = false;
        document.getElementsByName("Celular")[0].checked = false;
        document.getElementsByName("Dirección")[0].checked = false;

        for (let i = 0; i < columns.length; i++) {
          if (
            (columns[i].name == "Tipo de documento" &&
              columns[i].isCheck == true) ||
            (columns[i].name == "Correo electrónico" &&
              columns[i].isCheck == true) ||
            (columns[i].name == "Celular" && columns[i].isCheck == true) ||
            (columns[i].name == "Dirección" && columns[i].isCheck == true)
          ) {
            columns[i].isCheck = false;
            // columns.splice(i, 1);
          }
        }
        for (let i = 0; i < columns.length; i++) {
          if (
            (columns[i].name === "Tipo de documento" &&
              columns[i].isCheck == false) ||
            (columns[i].name === "Correo electrónico" &&
              columns[i].isCheck == false) ||
            (columns[i].name === "Celular" && columns[i].isCheck == false) ||
            (columns[i].name === "Dirección" && columns[i].isCheck == false)
          ) {
            columns.splice(i, 1);
          }
        }
        // columns.map((item, index) => {
        //   if (
        //     (item.name === "Tipo de documento" && item.isCheck == false) ||
        //     (item.name === "Correo electrónico" && item.isCheck == false) ||
        //     (item.name === "Celular" && item.isCheck == false) ||
        //     (item.name === "Dirección" && item.isCheck == false)
        //   ) {
        //     columns.splice(index, 1);
        //   }
        // });
        for (let i = 0; i < filtros_Contacto.length; i++) {
          filtros_Contacto[i].isCheck = false;
          const element = filtros_Contacto[i];
          csv_pop(element);
          schema_pop(element);
        }
        console.log(columns);
      } else if (
        seleccionado_cabeceras_filtros.name === "Estados" &&
        e.target.checked == false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("ASES")[0].checked = false;
        document.getElementsByName("Registro Académico")[0].checked = false;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].name === "ASES" ||
            columns[i].name === "Registro Académico"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "ASES" && item.isCheck == false) ||
            (item.name === "Registro Académico" && item.isCheck == false)
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

        // console.log(columns);
      } else if (
        seleccionado_cabeceras_filtros.name === "Académico" &&
        e.target.checked == false
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
            columns[i].name === "Código programa académico" ||
            columns[i].name === "Programa académico" ||
            columns[i].name === "Sede" ||
            columns[i].name === "Promedio acumulado" ||
            columns[i].name === "Estimulos" ||
            columns[i].name === "Bajo rendimiento"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "Código programa académico" &&
              item.isCheck == false) ||
            (item.name === "Programa académico" && item.isCheck == false) ||
            (item.name === "Sede" && item.isCheck == false) ||
            (item.name === "Promedio acumulado" && item.isCheck == false) ||
            (item.name === "Estimulos" && item.isCheck == false) ||
            (item.name === "Bajo rendimiento" && item.isCheck == false)
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
        e.target.checked == false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Profesional")[0].checked = false;
        document.getElementsByName("Practicante")[0].checked = false;
        document.getElementsByName("Monitor")[0].checked = false;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].name === "Profesional" ||
            columns[i].name === "Practicante" ||
            columns[i].name === "Monitor"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "Profesional" && item.isCheck == false) ||
            (item.name === "Practicante" && item.isCheck == false) ||
            (item.name === "Monitor" && item.isCheck == false)
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
        e.target.checked == false
      ) {
        seleccionado_cabeceras_filtros.isCheck = false;
        document.getElementsByName("Riesgo individual")[0].checked = false;
        document.getElementsByName("Riesgo familiar")[0].checked = false;
        document.getElementsByName("Riesgo académico")[0].checked = false;
        document.getElementsByName("Riesgo económico")[0].checked = false;
        document.getElementsByName(
          "Riesgo vida universitaria"
        )[0].checked = false;
        document.getElementsByName("Riesgo geográfico")[0].checked = false;

        for (let i = 0; i < columns.length; i++) {
          if (
            columns[i].name === "Riesgo individual" ||
            columns[i].name === "Riesgo familiar" ||
            columns[i].name === "Riesgo académico" ||
            columns[i].name === "Riesgo económico" ||
            columns[i].name === "Riesgo vida universitaria" ||
            columns[i].name === "Riesgo geográfico"
          ) {
            columns[i].isCheck = false;
          }
        }
        columns.map((item, index) => {
          if (
            (item.name === "Riesgo individual" && item.isCheck == false) ||
            (item.name === "Riesgo familiar" && item.isCheck == false) ||
            (item.name === "Riesgo académico" && item.isCheck == false) ||
            (item.name === "Riesgo económico" && item.isCheck == false) ||
            (item.name === "Riesgo vida universitaria" &&
              item.isCheck == false) ||
            (item.name === "Riesgo geográfico" && item.isCheck == false)
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
      fileName: "Reporte general Campus Virtual Ases universidad del Valle Excel.xlsx",
      // filePath: '../dowloads/file.xlsx'
    });
  };

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

              {/* Columna Asignaciones */}
              <Col>
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
              </Col>

              {/* Columna Filtros Riesgos */}
              <Col>
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
              </Col>
              {/* Columna Filtros Condicion de Excepcion */}

              <Col sm={1} xs={1}>
                {filtros_Condicion_Excepcion.map((Item, index) => (
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

              <Col sm={1} xs={1}>
                {filtros_Condicion_Excepcion_2.map((Item, index) => (
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
            </Row>

            {/* Buscador */}
            <Form.Control
              type="text"
              placeholder="Búsqueda de Datos"
              // value={}
              onChange={(e) => onSearch(e)}
            />
            <br />

            {/* Tabla */}
            <DataTable
              id="tabla_Reporte"
              title="Reporte"
              columns={columnas.cabeceras}
              data={state.estudiante.filter((item) => {
                return search.busqueda.toLowerCase() === ""
                  ? item
                  : item.cod_univalle.toLowerCase().includes(search.busqueda) ||
                      item.nombre.toLowerCase().includes(search.busqueda) ||
                      item.apellido.toLowerCase().includes(search.busqueda) ||
                      item.num_doc
                        .toString()
                        .toLowerCase()
                        .includes(search.busqueda);
              })}
              // data={state.estudiante}

              noDataComponent="Cargando Información..."
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="400px"
              highlightOnHover
              responsive
              striped
              filter={true}
              paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
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
