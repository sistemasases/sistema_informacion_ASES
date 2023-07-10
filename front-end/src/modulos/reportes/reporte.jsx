import React, { useState, useEffect, Component, useRef } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import All_estudiantes from "../../service/all_estudiantes";
import Select from "react-select";
import DataTable, { createTheme } from "react-data-table-component";
import Checkbox from "react-bootstrap/FormCheck";
import Modal from "react-bootstrap/Modal";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

var columns = [
  {
    name: "Código",
    selector: (row) => row.cod_univalle,
    sortable: true,
    isCheck: true,
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    sortable: true,
    isCheck: true,
  },
  {
    name: "Apellido",
    selector: (row) => row.apellido,
    sortable: false,
    isCheck: true,
  },
  {
    name: "Documento",
    selector: (row) => row.num_doc,
    sortable: false,
    isCheck: true,
  },
];
const Reporte = () => {
  const opciones = [];

  const [state, set_state] = useState({ estudiante: [] });

  //Conexion con el back para extraer todas los estudiantes
  useEffect(() => {
    All_estudiantes.all_estudiantes().then((res) => {
      set_state({
        ...state,
        estudiante: res,
      });
    });
  }, []);

  // const prueba = ({ item }) => {
  //   const [search, set_Search] = useState({
  //     busqueda: "",
  //   });
  //   const ejecutarBusqueda = (e) => {
  //     set_Search({
  //       ...search,
  //       [e.target.name]: e.target.value,
  //     });
  //     console.log(e.target.value);
  //   };
  // };

  const [search, set_Search] = useState();
  //   {
  //   // busqueda: "Z",
  // }

  const onSearch = (e) => {
    // e.persist();
    set_Search(e.target.value);

    
  };

  const [columnas, set_columnas] = useState({ cabeceras: columns });
  const cabecerasFiltros = [
    { name: "Contacto" },
    { name: "Estados" },
    { name: "Académico" },
    // { name: "Filtro contacto", name: "no-checkbox" },
    // { name: "Estados", name: "no-checkbox" },
    // { name: "Académico", name: "no-checkbox" },
  ];
  const filtros = [
    // { title: "Filtro contacto", name: "no-checkbox" },
    {
      name: "Tipo de documento",
      selector: (row) => row.tipo_doc,
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
      selector: (row) => row.dir_res,
      sortable: true,
      isCheck: false,
    },
    // {
    //   name: "Sexo",
    //   value: "sexo",
    //   selector: (row) => row.sexo,
    //   sortable: false,
    //   isCheck: false,
    // },
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
    const seleccionado = filtros.find((item) => item.name === e.target.name);
    console.log(seleccionado);
    console.log(columns);
    // antiguoArray = columns;
    // columns = emptyArray;
    // columns = antiguoArray;
    console.log("Array Columns Antes:");
    console.log(columns);
    if (
      (seleccionado.name === "Tipo de documento" && e.target.checked == true) ||
      (seleccionado.name === "Celular" && e.target.checked == true) ||
      (seleccionado.name === "Direccion" && e.target.checked == true)
      // ||
      // (seleccionado.name === "Correo electronico" && e.target.checked == true)
    ) {
      // columns.push(seleccionado);
      seleccionado.isCheck = true;
      columns.push(seleccionado);
      // columnas.cabeceras.push(seleccionado);
      // set_columnas({ ...columnas, cabeceras: columns });
      console.log("Array Columns Despues:");
      console.log(columns);
      console.log("Columnas.cabeceras:");
      console.log(columnas.cabeceras);
    } else if (
      (seleccionado.name === "Tipo de documento" &&
        e.target.checked == false) ||
      (seleccionado.name === "Celular" && e.target.checked == false) ||
      (seleccionado.name === "Direccion" && e.target.checked == false)
    ) {
      seleccionado.isCheck = false;
      columns.map((item, index) => {
        if (item.name === seleccionado.name) {
          columns.splice(index, 1);
        }
      });
    }
    if (
      seleccionado.name === "Correo electronico" &&
      e.target.checked == true
    ) {
      seleccionado.isCheck = true;
      columns.push(seleccionado);

      console.log("Array Columns Despues:");
      console.log(columns);
    } else if (
      seleccionado.name === "Correo electronico" &&
      e.target.checked == false
    ) {
      seleccionado.isCheck = false;
      columns.map((item, index) => {
        if (item.name === seleccionado.name) {
          columns.splice(index, 1);
        }
      });
    }

    console.log("Array Columns Despues:");
    console.log(columns);
    const nuevasColumnas = columns;
    set_columnas({
      ...columnas,
      cabeceras: nuevasColumnas.filter((item) => item.isCheck === true),
    });
    console.log("Array Cabeceras:");
    console.log(columnas.cabeceras);

    // TRY #4;
    // I´m kinda done now
    // TRY #3;
    // console.log(e.target.name);
    // console.log(columns);
    // // const seleccionado = filtros.find((item) => item.name === e.target.name);
    // console.log(seleccionado);
    // if (
    //   seleccionado == columns.find((item) => item.name === seleccionado.name)
    // ) {
    //   columnas.cabeceras.map((item, index) => {
    //     if (item.name === seleccionado.name) {
    //       columnas.cabeceras.splice(index, 1);
    //     }
    //   });
    //   console.log("ya existe");
    //   console.log("algo se borró, supuestamente de la tabla: ");
    //   console.log(columns);
    //   console.log("cabecera eliminada es: ");
    //   console.log(seleccionado.name);
    //   // console.log(columnas.cabeceras);
    // } else {
    //   console.log("la opcion seleccionada es:");
    //   console.log(seleccionado);
    //   columns.push(seleccionado);
    //   console.log("las cabeceras del state columnas son:");
    //   // Esto Actualiza la cabecera segun lo seleccionado
    //   columnas.cabeceras = columns;
    //   // set_columnas({ ...columnas, cabeceras: columns });
    //   console.log(columnas.cabeceras);
    // }
    // // set_columnas({ ...columnas, cabeceras: columns });
    // // set_columnas({ ...columnas, cabeceras: columns }, [columns]);
    // // colPruebas = columnas.cabeceras;
    // console.log("el seleccionado es:");
    // console.log(seleccionado);
    // console.log("las columnas del array Columns son:");
    // console.log(columns);
    // console.log("JUEPT");
    // console.log("las cabeceras del state columnas son:");
    // console.log(columnas.cabeceras);

    // seleccionado.name = "";
    // Try #2
    // const updatedCheckedState = Checked.map((item, index) =>
    //   index === posicion ? !item : item
    // );
    // setChecked(updatedCheckedState);
    // if (updatedCheckedState[posicion] === true) {
    //   columns.push({
    //     name: filtros[posicion].name,
    //     selector: (row) => row.filtros[posicion].value,
    //     sortable: false,
    //   });
    //   console.log(updatedCheckedState);
    //   console.log("entró");
    // } else {
    //   console.log("no entró");
    //   columns.pop({
    //     name: filtros[posicion].name,
    //     selector: (row) => row.filtros[posicion].value,
    //     sortable: false,
    //   });
    // }
    // console.log(updatedCheckedState[posicion]);
    // console.log(columns);
    // Try 1#
    // columns.push({
    //   name: e.target.name,
    //   selector: (row) => row.e.target.value,
    //   sortable: false,
    // });
    // console.log(e.target.name);
    // console.log(columns);
    // setChecked(!Checked);
  };

  const paginacionOpciones = {
    rowsPerPageText: "Filas por Página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Mostrar Todo",
  };

  return (
    <>
      <div>
        <h1>Consulta de reportes en general </h1>
      </div>
      <>
        {
          <Container>
            <h2> WIP</h2>
            <br />

            <Row>
              {/* <Col> */}
              {cabecerasFiltros.map((Item, index) => (
                <Col key={index}>
                  <h4>{Item.name}</h4>
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                {/* Apartado de filtros */}
                {filtros.map((Item, index) => (
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
              {/* Columna Filtros Estado */}
              <Col></Col>

              {/* Columna Filtros Académico */}
              <Col></Col>
            </Row>

            {/* Buscador */}
            <Form.Control
              type="text"
              placeholder="Búsqueda de Datos - NOT WORKING YET"
              // value={}
              onChange={(e) => onSearch(e)}
            />
            <br />

            {/* Tabla */}
            <DataTable
              title="Reporte"
              columns={columnas.cabeceras}
              data={state.estudiante}
              // data={}
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
            />
          </Container>
        }
      </>
    </>
  );
};

export default Reporte;
