import React, { useState, useEffect, Component, useRef } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import all_estudiantes_reportes from "../../service/all_estudiantes_reportes";
import Select from "react-select";
import DataTable, { createTheme } from "react-data-table-component";
import Checkbox from "react-bootstrap/FormCheck";
import Modal from "react-bootstrap/Modal";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import axios from "axios";
import { CSVLink } from "react-csv";
// import ExportExcel from "react-export-excel";
import ReactExport from "react-export-excel";

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
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelSheet;
const ExcelColumn = ReactExport.ExcelColumn;

const Reporte = () => {
  // const opciones = [];

  const [state, set_state] = useState({ estudiante: [] });

  //Conexion con el back para extraer todas los estudiantes
  useEffect(() => {
    all_estudiantes_reportes.all_estudiantes_reportes().then((res) => {
      set_state({
        ...state,
        estudiante: res,
      });
    });
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
    var label = item.name;
    var key = item.value;
    csv_headers.map((item_csv, index) => {
      if (item_csv.label === item.name) {
        csv_headers.splice(index, 1);
      }
    });
  };
  const onSearch = (e) => {
    set_Search({ ...search, busqueda: e.target.value });
    console.log(search);
  };

  const [columnas, set_columnas] = useState({ cabeceras: columns });
  const cabecerasFiltros = [
    { name: "Contacto" },
    { name: "Estados" },
    { name: "Académico" },
    { name: "Asignaciones" },
    { name: "Riesgos" },
    { name: "Condición de Excepción" },
  ];
  const filtros_Contacto = [
    // { title: "Filtro contacto", name: "no-checkbox" },
    // {
    //   name: "Prueba",
    //   selector: (row) => row.riesgo_individual,
    //   sortable: true,
    //   isCheck: false,
    // },
    {
      name: "Tipo de documento",
      selector: (row) => row.tipo_doc,
      value: "tipo_doc",
      sortable: true,
      isCheck: false,
    },
    {
      name: "Correo electronico",
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
      name: "Direccion",
      value: "dir_res",
      // id: "4",
      selector: (row) => row.dir_res,
      sortable: true,
      isCheck: false,
    },
  ];
  const filtros_Estados = [
    {
      name: "ASES",
      value: "ases",
      selector: (row) => row.ases,
      sortable: true,
      isCheck: false,
    },
    {
      name: "ICETEX",
      value: "icetex",
      selector: (row) => row.icetex,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Resgistro Académico",
      value: "registro_academico",
      selector: (row) => row.registro_academico,
      sortable: true,
      isCheck: false,
    },
  ];
  const filtros_Academico = [
    {
      name: "Código programa académico",
      value: "codigo_programa_academico",
      selector: (row) => row.codigo_programa_academico,
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
      name: "Facultad",
      value: "facultad",
      selector: (row) => row.facultad,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Promedio acumulado",
      value: "promedio_acumulado",
      selector: (row) => row.promedio_acumulado,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Estimulos",
      value: "estimulos",
      selector: (row) => row.estimulos,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Bajos rendimiento",
      value: "bajos_rendimiento",
      selector: (row) => row.bajos_rendimiento,
      sortable: true,
      isCheck: false,
    },
  ];

  const filtros_Asignaciones = [
    {
      name: "Profesional",
      value: "profesional",
      selector: (row) => row.profesional,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Practicante",
      value: "practicante",
      selector: (row) => row.practicante,
      sortable: true,
      isCheck: false,
    },
    {
      name: "Monitor",
      value: "monitor",
      selector: (row) => row.monitor,
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

    // console.log("Seleccionado 2 es:");
    // console.log(seleccionado_riesgos);
    // console.log(seleccionado_contacto);
    // console.log(columns);

    // console.log("Array Columns Antes:");
    // console.log(columns);

    //  condiciones Para Filtros de Contacto

    if (seleccionado_contacto === undefined) {
    } else if (
      (seleccionado_contacto.name === "Tipo de documento" &&
        e.target.checked == true) ||
      (seleccionado_contacto.name === "Correo electronico" &&
        e.target.checked == true) ||
      (seleccionado_contacto.name === "Celular" && e.target.checked == true) ||
      (seleccionado_contacto.name === "Prueba" && e.target.checked == true) ||
      (seleccionado_contacto.name === "Direccion" && e.target.checked == true)
    ) {
      // columns.push(seleccionado_contacto);
      seleccionado_contacto.isCheck = true;
      columns.push(seleccionado_contacto);
      csv_conversion(seleccionado_contacto);
      // columnas.cabeceras.push(seleccionado_contacto);
      // set_columnas({ ...columnas, cabeceras: columns });
      // console.log("Array Columns Despues:");
      // console.log(columns);
      // console.log("Columnas.cabeceras:");
      // console.log(columnas.cabeceras);
    } else if (
      (seleccionado_contacto.name === "Tipo de documento" &&
        e.target.checked == false) ||
      (seleccionado_contacto.name === "Correo electronico" &&
        e.target.checked == false) ||
      (seleccionado_contacto.name === "Celular" && e.target.checked == false) ||
      (seleccionado_contacto.name === "Prueba" && e.target.checked == false) ||
      (seleccionado_contacto.name === "Direccion" && e.target.checked == false)
    ) {
      seleccionado_contacto.isCheck = false;
      columns.map((item, index) => {
        if (item.name === seleccionado_contacto.name) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_contacto);
    }

    //  condiciones Para Filtros de Estados
    if (seleccionado_estados === undefined) {
    }
    // else if (

    // condiciones para Filtros de Academico
    if (seleccionado_academico === undefined) {
    }
    // else if(

    // condiciones para Filtros de Asignaciones
    if (seleccionado_asignaciones === undefined) {
    }
    // else if(

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
      // console.log("Array Columns Despues:");
      // console.log(columns);
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
      columns.map((item, index) => {
        if (item.name === seleccionado_riesgos.name) {
          columns.splice(index, 1);
        }
      });
      csv_pop(seleccionado_riesgos);
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
    // FIN DE CONDICIONES PARA FILTROS
    // **

    // console.log("Array Columns Despues:");
    // console.log(columns);
    const nuevasColumnas = columns;
    set_columnas({
      ...columnas,
      cabeceras: nuevasColumnas.filter((item) => item.isCheck === true),
    });
    // console.log("Array Cabeceras:");
    // console.log(columnas.cabeceras);
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Mostrar Todo",
  };

  // const get_headers = () => {
  //   const headers = [];
  //   columnas.cabeceras.map((item, index) => {
  //     headers.push(item.name);
  //   });
  //   console.log(headers);
  //   return headers;
  // };

  // const get_headers_keys = () => {
  //   const headers = [];
  //   columnas.cabeceras.map((item, index) => {
  //     headers.push(item.value);
  //   });
  //   headers.map((item, index) => {});
  //   console.log(headers);
  //   return csv_headers;
  // };

  return (
    <>
      <>
        {
          <Container>
            <div>
              <h1>Consulta de reportes en general </h1>
            </div>

            <br />
            {/* Cabeceras de Filtros */}
            <Row>
              {/* <Col> */}
              {cabecerasFiltros.map((Item, index) => (
                <Col key={index}>
                  <h4>{Item.name}</h4>
                </Col>
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
              placeholder="Búsqueda de Datos - WIP"
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
              // data={state.estudiante.filter((estudiante) => {
              //   return search.toLowerCase() === ""
              //     ? estudiante
              //     : // : estudiante.nombre
              //       //     .toLowerCase()
              //       //     .includes(search.toLowerCase()) ||
              //       //     estudiante.apellido
              //       //       .toLowerCase()
              //       //       .includes(search.toLowerCase()) ||
              //       estudiante.cod_univalle().includes(search.toLowerCase()) ||
              //         estudiante.num_doc().includes(search.toLowerCase());
              // })}
              noDataComponent="Cargando Información."
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="400px"
              highlightOnHover
              responsive
              striped
              filter={true}
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
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

                <ExcelFile
                  element={
                    <Button style={{ margin: 5 }} name="imprimir_excel">
                      Imprimir Excel
                    </Button>
                  }
                  filename="Reporte general Campus Virtual Ases universidad del Valle Excel"
                >
                  <ExcelSheet data={state.estudiante} name={"Reporte General"}>
                    {csv_headers.map((item) => (
                      <ExcelColumn label={item.label} value={item.key} />
                    ))}
                  </ExcelSheet>
                </ExcelFile>
              </Col>
            </Row>
          </Container>
        }
      </>
    </>
  );
};

export default Reporte;
