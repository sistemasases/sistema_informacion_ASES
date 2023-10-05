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
          `${process.env.REACT_APP_API_URL}/alertas/estudiantes_prueba/` +
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
      } catch (error) {}
    };

    datos_estudiantes();
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
    console.log(e.target.name);
    const seleccionado_contacto = filtros_Contacto.find(
      (item) => item.name === e.target.name
    );
    // const seleccionado_riesgos = filtros_Riesgos.find(
    //   (item) => item.name === e.target.name
    // );
    // const seleccionado_estados = filtros_Estados.find(
    //   (item) => item.name === e.target.name
    // );
    // const seleccionado_academico = filtros_Academico.find(
    //   (item) => item.name === e.target.name
    // );
    // const seleccionado_asignaciones = filtros_Asignaciones.find(
    //   (item) => item.name === e.target.name
    // );

    // const seleccionado_cabeceras_filtros = cabecerasFiltros.find(
    //   (item) => item.name === e.target.name
    // );
    // const seleccionado_condiciones_excepcion_prueba =
    //   filtros_Condicion_Excepcion_prueba.find(
    //     (item) => item.name === "Condición de Excepción"
    //   );

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

  const recorrer_estudiante = () => {
    for (let index = 0; index < state.estudiante.length; index++) {}
  };
  const { dropdown, setDropdown } = useState(false);

  const abrirCerrarDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <>
        {
          <Container>
            <div>
              <h1>Alertas Académicas</h1>
            </div>
            {/* Columna Filtros de Contacto */}
            <Row>
              <br></br>
              <h3 style={{ fontStyle: "bold" }}>Filtro de Contacto</h3>
            </Row>
            {/* Filtros Contacto */}
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
            </Row>

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

            <Dropdown isOpen={dropdown} Toggle={abrirCerrarDropdown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Alertas académicas: {state.estudiante.length}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                {/* {filtros_Contacto.map((Item, index) => {
                  <Dropdown.Item key={index} >
                    {Item.name}
                  </Dropdown.Item>;
                })} */}
                {/* {filtros_Contacto.forEach((element) => {
                  <Dropdown.Item key={element.value}>
                    {element.name}
                  </Dropdown.Item>;
                })} */}
              </Dropdown.Menu>
            </Dropdown>

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
