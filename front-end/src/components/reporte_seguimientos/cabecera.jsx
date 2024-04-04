/**
 * @file cabecera.jsx
 * @version 1.0.0
 * @description Este archivo contiene la cabecera de la página de reporte de seguimientos, donde se muestra un contador de las asistencias e inasistencias de los estudiantes según el rol del usuario.
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Informacion_rol from "../../components/reporte_seguimientos/informacion_rol";
import {
  desencriptar,
  decryptTokenFromSessionStorage,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

/**
 * Es la función principal usada en el reporte de seguimientos dependiendo de el rol de los usuarios
 * @param {Arreglo} props: Contiene datos de usuario tales como id, nombre, periodo, rol de usuario, etc.
 * @returns Renderizado de la cabecera de reporte de seguimientos.
 */

const Cabecera = (props) => {
  // Configuración de la petición
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  // Constante donde se almacenan los datos del usario contenidos en props
  const datos_option_user = [];
  // Constante donde se almacenan los datos del periodo contenidos en props
  const datos_option_periodo = [];

  // Variable booleana
  var bandera_option_user = true;
  // Variable booleana
  var bandera_option_periodo = true;

  // Constante donde se se almacena el total de los datos de los estudiantes
  const total_datos_estudiantes = [];

  // Constante donde se se almacena el estado en el que se encuentran los datos del estudiante/usuario
  const [state, set_state] = useState({
    periodo: "",
    usuario: "",
    data_user: [],
    data_periodo: [],
    data_rol: [],
    seleccionado: "",
    id_usuario: "",
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    telefono: "",
    reportes_estudiante: [],
    ids_estudiantes_del_monitor: [],
    ids_monitores_del_practicante: [],
    ids_practicantes_del_profesional: [],
    tiene_datos: false,

    total_fichas_prof: 0,
    fichas_revisado_prof: 0,
    fichas_no_revisado_prof: 0,

    total_inasistencias_prof: 0,
    inasistencias_revisado_prof: 0,
    inasistencias_no_revisado_prof: 0,

    total_fichas_prac: 0,
    fichas_revisado_prac: 0,
    fichas_no_revisado_prac: 0,

    total_inasistencias_prac: 0,
    inasistencias_revisado_prac: 0,
    inasistencias_no_revisado_prac: 0,
  });

  /**
   * Se realiza la peticion al servidor para obtener los datos de los periodos segun el semestre, así como de la determinacion los datos qué se muestran segun el rol.
   */
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/wizard/semestre/`,
      method: "GET",
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          data_periodo: respuesta.data,
        });
      })
      .catch((err) => {
        return err;
      });

    if (desencriptar(sessionStorage.getItem("rol")) === "profesional") {
      // Se define el id de la sede como parametro para la petición
      const paramsget = {
        id_sede: desencriptarInt(sessionStorage.getItem("sede_id")),
      };

      // Se define la peticion que se realiza al servidor
      const url_axios =
        `${process.env.REACT_APP_API_URL}/usuario_rol/reporte_seguimientos/` +
        desencriptar(sessionStorage.getItem("id_usuario")) +
        "/";

      axios({
        url: url_axios,
        params: paramsget,
        method: "GET",
        headers: config,
      })
        .then((respuesta) => {
          set_state({
            ...state,
            ids_practicantes_del_profesional: respuesta.data,
            tiene_datos: true,
          });
          //conteo_datos();
        })
        .catch((err) => {
          return err;
        });
    } else if (desencriptar(sessionStorage.getItem("rol")) === "practicante") {
      // Se define el id de la sede como parametro para la petición
      const paramsget = {
        id_sede: desencriptarInt(sessionStorage.getItem("sede_id")),
      };

      axios({
        url:
          `${process.env.REACT_APP_API_URL}/usuario_rol/reporte_seguimientos_practicante/` +
          desencriptar(sessionStorage.getItem("id_usuario")) +
          "/",
        params: paramsget,
        method: "GET",
        headers: config,
      })
        .then((respuesta) => {
          set_state({
            ...state,
            ids_practicantes_del_profesional: respuesta.data,
            tiene_datos: true,
          });
          //conteo_datos();
        })
        .catch((err) => {
          return err;
        });
    }
  }, []);

  /**
   * Asigna los datos de los usuarios a la variable datos_option_user y los estudiantes a total_datos_estudiantes
   */
  const handle_users_persona = (e) => {
    if (bandera_option_user == true) {
      for (let i = 0; i < props.data_user.length; i++) {
        // Se almacenan los datos del usuario
        const dato = {
          value: props.data_user[i]["id"],
          label:
            props.data_user[i]["username"] +
            " " +
            props.data_user[i]["first_name"] +
            " " +
            props.data_user[i]["last_name"],
          id: i,
        };
        datos_option_user.push(dato);

        // Se define la peticion que se realiza al servidor
        const url_axios =
          `${process.env.REACT_APP_API_URL}/usuario_rol/profesional/` +
          props.data_user[i]["id_rol"] +
          "/";

        axios({
          url: url_axios,
          method: "GET",
          headers: config,
        })
          .then((respuesta) => {
            total_datos_estudiantes.push(respuesta.data);
          })
          .catch((err) => {});
      }
      bandera_option_user = false;
    }
  };

  /**
   * Asigna los datos del estudiante seleccionado a las variables de estado
   * @param {evento} e: Contiene los datos del estudiantes seleccionado
   */
  const handle_option_user = (e) => {
    set_state({
      ...state,
      seleccionado: e.id,
      id_usuario: props.data_user[e.id]["id"],
      total_datos_estudiante_seleccionado: total_datos_estudiantes[e.id],
    });

    // Se define el id de la sede como parametro para la petición
    const paramsget = {
      id_sede: desencriptarInt(sessionStorage.getItem("sede_id")),
    };

    axios({
      url:
        `${process.env.REACT_APP_API_URL}/usuario_rol/reporte_seguimientos/` +
        props.data_user[e.id]["id"] +
        "/",
      params: paramsget,
      method: "GET",
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          ids_practicantes_del_profesional: respuesta.data,
          tiene_datos: true,
        });
        //conteo_datos();
      })
      .catch((err) => {
        return err;
      });
  };

  /**
   * Asigna los datos del estudiante seleccionado a las variables de estado
   * @param {evento} e: Contiene los datos del estudiantes seleccionado
   */
  const handle_option_periodo = (e) => {
    set_state({
      ...state,
      seleccionado: e.id,
    });
  };

  /**
   * Asigna los datos del periodo a la variable datos_option_periodo
   * @returns Datos del periodo
   */
  const handle_periodo = (e) => {
    if (bandera_option_periodo == true) {
      for (let i = 0; i < state.data_periodo.length; i++) {
        // Se almacenan los datos del periodo
        const dato = {
          value: state.data_periodo[i]["nombre"],
          label: state.data_periodo[i]["nombre"],
          id: ["id_instancia"],
        };
        datos_option_periodo.push(dato);
      }
      bandera_option_periodo = false;
    } else {
    }
  };

  /**
   * Se realiza el conteo de las fichas y las inasistencias de los estudiantes
   */
  useEffect(() => {
    // Inicio Variables para el conteo
    let conteo_total_fichas_prof = 0;
    let conteo_fichas_revisado_prof = 0;
    let conteo_fichas_no_revisado_prof = 0;
    let conteo_total_inasistencias_prof = 0;
    let conteo_inasistencias_revisado_prof = 0;
    let conteo_inasistencias_no_revisado_prof = 0;

    let conteo_total_fichas_prac = 0;
    let conteo_fichas_revisado_prac = 0;
    let conteo_fichas_no_revisado_prac = 0;
    let conteo_total_inasistencias_prac = 0;
    let conteo_inasistencias_revisado_prac = 0;
    let conteo_inasistencias_no_revisado_prac = 0;

    state.ids_practicantes_del_profesional.forEach((practicante) => {
      conteo_total_fichas_prof +=
        practicante.cantidad_reportes.count_seguimientos;
      conteo_total_inasistencias_prof +=
        practicante.cantidad_reportes.count_inasistencias;
      conteo_total_fichas_prac +=
        practicante.cantidad_reportes.count_seguimientos;
      conteo_total_inasistencias_prac +=
        practicante.cantidad_reportes.count_inasistencias;

      conteo_fichas_no_revisado_prof +=
        practicante.cantidad_reportes.count_seguimientos_pendientes_profesional;
      conteo_inasistencias_no_revisado_prof +=
        practicante.cantidad_reportes
          .count_inasistencias_pendientes_profesional;

      conteo_fichas_no_revisado_prac +=
        practicante.cantidad_reportes.count_seguimientos_pendientes_practicante;
      conteo_inasistencias_no_revisado_prac +=
        practicante.cantidad_reportes
          .count_inasistencias_pendientes_practicante;
    });

    conteo_fichas_revisado_prof =
      conteo_total_fichas_prof - conteo_fichas_no_revisado_prof;
    conteo_inasistencias_revisado_prof =
      conteo_total_inasistencias_prof - conteo_inasistencias_no_revisado_prof;

    conteo_fichas_revisado_prac =
      conteo_total_fichas_prac - conteo_fichas_no_revisado_prac;
    conteo_inasistencias_revisado_prac =
      conteo_total_inasistencias_prac - conteo_inasistencias_no_revisado_prac;

    set_state({
      ...state,
      total_fichas_prof: conteo_total_fichas_prof,
      fichas_revisado_prof: conteo_fichas_revisado_prof,
      fichas_no_revisado_prof: conteo_fichas_no_revisado_prof,

      total_inasistencias_prof: conteo_total_inasistencias_prof,
      inasistencias_revisado_prof: conteo_inasistencias_revisado_prof,
      inasistencias_no_revisado_prof: conteo_inasistencias_no_revisado_prof,

      total_fichas_prac: conteo_total_fichas_prac,
      fichas_revisado_prac: conteo_fichas_revisado_prac,
      fichas_no_revisado_prac: conteo_fichas_no_revisado_prac,

      total_inasistencias_prac: conteo_total_inasistencias_prac,
      inasistencias_revisado_prac: conteo_inasistencias_revisado_prac,
      inasistencias_no_revisado_prac: conteo_inasistencias_no_revisado_prac,
    });
  }, [state.ids_practicantes_del_profesional]);

  return (
    <Container>
      <Row className="row_presentacion_reportes_seguimientos">
        <Col
          className="col_selectores_reportes_seguimientos"
          xs={"12"}
          md={"4"}
        >
          <h1>Seguimientos</h1>
        </Col>
        {props.rolUsuario === "super_ases" ? (
          <Col
            className="col_selectores_reportes_seguimientos"
            xs={"12"}
            md={"4"}
          >
            período actual
            <Select
              options={datos_option_periodo}
              onMenuOpen={handle_periodo}
              onChange={handle_option_periodo}
              defaultInputValue={props.periodo}
              defaultValue={props.periodo}
            />
          </Col>
        ) : (
          <Col className="col_label_reportes_seguimientos" xs={"12"} md={"4"}>
            <label>{props.periodo}</label>
          </Col>
        )}

        {desencriptar(sessionStorage.getItem("rol")) == "socioeducativo_reg" ||
        desencriptar(sessionStorage.getItem("rol")) == "super_ases" ||
        desencriptar(sessionStorage.getItem("rol")) == "socieducativo" ? (
          <Col
            className="col_selectores_reportes_seguimientos"
            xs={"12"}
            md={"4"}
          >
            <Row>
              <h4 className="texto_subtitulo2">Selector persona</h4>
            </Row>
            <Row>
              <Select
                options={datos_option_user}
                onMenuOpen={handle_users_persona}
                onChange={handle_option_user}
              />
            </Row>
          </Col>
        ) : (
          <Col></Col>
        )}
      </Row>

      <Row className="prueba_seguimintos">
        {state.tiene_datos &&
        state.ids_practicantes_del_profesional.length > 0 ? (
          <Row>
            {/*<li>{JSON.stringify(state.ids_practicantes_del_profesional[0].cantidad_reportes)}</li>*/}

            <Informacion_rol
              total_fichas_prof={state.total_fichas_prof}
              fichas_revisado_prof={state.fichas_revisado_prof}
              fichas_no_revisado_prof={state.fichas_no_revisado_prof}
              total_inasistencias_prof={state.total_inasistencias_prof}
              inasistencias_revisado_prof={state.inasistencias_revisado_prof}
              inasistencias_no_revisado_prof={
                state.inasistencias_no_revisado_prof
              }
              total_fichas_prac={state.total_fichas_prac}
              fichas_revisado_prac={state.fichas_revisado_prac}
              fichas_no_revisado_prac={state.fichas_no_revisado_prac}
              total_inasistencias_prac={state.total_inasistencias_prac}
              inasistencias_revisado_prac={state.inasistencias_revisado_prac}
              inasistencias_no_revisado_prac={
                state.inasistencias_no_revisado_prac
              }
              ids_practicantes_del_profesional={
                state.ids_practicantes_del_profesional
              }
            />
          </Row>
        ) : (
          <Row></Row>
        )}
      </Row>
    </Container>
  );
};

export default Cabecera;
