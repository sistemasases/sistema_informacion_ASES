/**
 * @file inicio_semestre_component.jsx
 * @version 1.0.0
 * @description Componente para crear un nuevo semestre. Utiliza un select para elegir la sede a la que pertenecerá el semestre, además de otros campos como el nombre del semestre, fecha de inicio y fecha de fin.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import { Container, Row, Button, Col, Alert, Form } from "react-bootstrap";
import Inicio_semestre_service from "../../service/inicio_semestre";
import All_sede_service from "../../service/all_sede";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CryptoJS from "crypto-js";

// Clave secreta para desencriptar el token
const secretKey = process.env.REACT_APP_SECRET_KEY;

const Inicio_semestre_component = () => {
  /**
   * Función que desencripta el token del sessionstorage
   */
  const decryptTokenFromSessionStorage = () => {
    const encryptedToken = sessionStorage.getItem("token");
    if (!encryptedToken) {
      return null; // No hay token en sessionStorage
    }
    // Desencriptar el token usando la clave secreta
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  };
  // Config para el el header con el token del usuario
  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };
  // Constante y variable que se usaran para el select
  const opciones = [];
  var bandera_option = true;
  // Hook que se usara para el redirecionamiento
  const navigate = useNavigate();
  // Estado que se usara para extraer todas las sedes
  const [state, set_state] = useState({ tabs: [] });
  // Estados que se usaran para activar o desactivar parte de la vista
  const [isSelected, setIsSelected] = useState(false);
  const [activated, setActivated] = useState({
    isDisabled: false,
    isError: false,
    isWarning: false,
    mensaje: "",
  });
  // Estado que se usara para los diferentes atributos del semestre
  const [semestre, setSemestre] = useState({
    idSede: 0,
    nombreSede: "",
    nombreSemestre: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  // Variables para las fechas
  var date_inicio = new Date();
  var date_fin = new Date();
  date_fin.setMonth(date_fin.getMonth() + 6);
  //Conexion con el back para extraer todas las sedes
  useEffect(() => {
    All_sede_service.all_sede().then((res) => {
      set_state({
        ...state,
        tabs: res,
      });
    });
  }, []);
  /**
   * Prop que toma las sedes y las transforma en opciones para el select
   */
  const handle_sedes = () => {
    if (bandera_option === true) {
      for (var i = 0; i < state.tabs["length"]; i++) {
        const dato = {
          value: state.tabs[i]["nombre"],
          label: state.tabs[i]["nombre"],
          id: state.tabs[i]["id"],
        };
        opciones.push(dato);
      }
      bandera_option = false;
    }
  };
  /**
   * Manejador de los diferentes inputs
   */
  const handleButton = () => {
    if (
      !(!semestre.nombreSemestre || semestre.nombreSemestre === "") &&
      (semestre.nombreSemestre.includes("-A") ||
        semestre.nombreSemestre.includes("-B")) &&
      semestre.nombreSemestre.length === 6
    ) {
      if (
        !(!semestre.fecha_inicio || semestre.fecha_inicio === "") &&
        dateToInt(formatDate(date_inicio)) <= dateToInt(semestre.fecha_inicio)
      ) {
        if (
          !(!semestre.fecha_fin || semestre.fecha_fin === "") &&
          dateToInt(semestre.fecha_inicio) < dateToInt(semestre.fecha_fin)
        ) {
          Inicio_semestre_service.inicio_semestre(
            semestre.idSede,
            semestre.nombreSemestre,
            semestre.fecha_inicio,
            semestre.fecha_fin
          );
          navigate("/crear_semestre_sistemas");
        } else {
          setActivated({
            ...activated,
            isWarning: true,
            mensaje:
              "La fecha de finalización no puede estar vacia y debe ser superior a la fecha de inicio",
          });
        }
      } else {
        setActivated({
          ...activated,
          isWarning: true,
          mensaje:
            "La fecha de inicio no puede estar vacia y debe ser igual o superior a la fecha actual",
        });
      }
    } else {
      setActivated({
        ...activated,
        isWarning: true,
        mensaje:
          "El nombre no puede estar vacio y debe tener un formato parecido a 2022-B",
      });
    }
  };
  /**
   * Manejador de eventos del input form para obtener los cambios de las variables.
   * @param {Event} e Evento del formulario.
   */
  const handleChange = (e) => {
    setSemestre({
      ...semestre,
      [e.target.name]: e.target.value,
    });
  };
  /**
   * Función para agregar un cero delante de un número si es menor que 10.
   * @param {number} int - Número a formatear.
   * @returns {string} - Número formateado con cero delante si es menor que 10.
   */
  function digitos(int) {
    var result = int.toString();
    if (int < 10) {
      result = "0" + int.toString();
    }
    return result;
  }
  /**
   * Función que formatea una fecha en el formato 'AAAA-MM-DD'.
   * @param {Date} date Fecha a formatear.
   * @returns {String} Fecha formateada en el formato 'AAAA-MM-DD'.
   */
  function formatDate(date) {
    return [
      date.getFullYear().toString(),
      digitos(date.getMonth() + 1),
      digitos(date.getDate()),
    ].join("-");
  }
  /**
   * Función que convierte una fecha en formato de cadena 'AAAA-MM-DD' a un entero.
   * @param {String} date Fecha en formato de cadena 'AAAA-MM-DD'.
   * @returns {Number} Fecha como un número entero.
   */
  function dateToInt(date) {
    const fecha = date.split("-");
    const fechaint = parseInt(fecha[0] + fecha[1] + fecha[2]);
    return fechaint;
  }
  /**
   * Activa las vistas una vez se haya seleccionado algo en el select y actualiza los valores a mostrar.
   * @param {Number} e Id de la sede selecionada.
   */
  const handleActivateButton = async (e) => {
    //codigo para la obtencion del nombre del semestre y la fecha de finalizacion del semestre anterior
    var nombre_nuevo = "";
    var fecha = "";
    await fetch(
      `${process.env.REACT_APP_API_URL}/wizard/semestre/` +
        e.id.toString() +
        "/",
      config
    )
      .then((res) => res.json())
      .then((res) => {
        nombre_nuevo = res["nombre"];
        fecha = new Date(res["fecha_fin"]);
      })
      .catch((err) => {
        console.log(err);
      });
    const nombre_semestre = nombre_nuevo.split("-");
    if (!isNaN(nombre_semestre[0])) {
      if (nombre_semestre[1] === "A") {
        nombre_nuevo = nombre_semestre[0] + "-B";
      } else {
        nombre_nuevo = (parseInt(nombre_semestre[0]) + 1).toString() + "-A";
      }
    }
    //actualizacion de los datos del semestre
    setSemestre({
      ...semestre,
      idSede: e.id,
      nombreSede: e.value,
      nombreSemestre: nombre_nuevo,
      fecha_inicio: formatDate(date_inicio),
      fecha_fin: formatDate(date_fin),
    });
    //Activa o desativa las vistas
    setIsSelected(true);
    if (fecha < date_inicio) {
      setActivated({
        ...activated,
        isDisabled: true,
      });
    } else {
      setActivated({
        ...activated,
        isError: true,
      });
    }
  };

  return (
    <Container>
      <h2>Paso cero: creación del periodo</h2>
      <Row className="rowJustFlex" hidden={isSelected}>
        <p>
          Para iniciar el semestre selecione la sede con la cual desea trabajar:
        </p>
        <Select
          class="option"
          options={opciones}
          onMenuOpen={handle_sedes}
          onChange={handleActivateButton}
          className="option"
          placeholder="Selecione una sede"
        />
      </Row>
      <Row className="rowJustFlex">
        <Alert variant="danger" show={activated.isError}>
          <Alert.Heading>Advertencia!</Alert.Heading>
          <p>El semestre al que desea acceder sigue activo.</p>
          <p>¿Desea continuar con la creación del semestre?</p>
          <Button
            variant="secondary"
            onClick={() => {
              setActivated({ ...activated, isError: false });
              setIsSelected(false);
            }}
          >
            Cancelar
          </Button>
          {"  "}
          <Button
            variant="primary"
            onClick={() => navigate("/crear_semestre_sistemas")}
          >
            Crear Semestre
          </Button>
        </Alert>
      </Row>
      <Row className="rowJustFlex" hidden={!activated.isDisabled}>
        <p>
          Usted está apunto de iniciar un nuevo semestre, lo cual finalizará el
          semestre anterior y se creará uno nuevo en la sede{" "}
          {semestre.nombreSede}.
        </p>
        <p>
          Por favor verifique que los argumentos sean correctos e inicie el
          semestre.{" "}
        </p>
      </Row>
      <Row className="rowJustFlex" hidden={!activated.isDisabled}>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.FloatingLabel>
                Nombre del semestre a crear:
              </Form.FloatingLabel>
              <Form.Control
                name="nombreSemestre"
                type="text"
                value={semestre.nombreSemestre}
                onChange={handleChange}
                placeholder="Nombre del semestre"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.FloatingLabel>Fecha de inicio:</Form.FloatingLabel>
              <Form.Control
                name="fecha_inicio"
                type="date"
                value={semestre.fecha_inicio}
                onChange={handleChange}
                placeholder="Fecha de inicio del semestre"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.FloatingLabel>Fecha de finalización:</Form.FloatingLabel>
              <Form.Control
                name="fecha_fin"
                type="date"
                value={semestre.fecha_fin}
                onChange={handleChange}
                placeholder="Fecha de finalización del semestre"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Alert variant="danger" show={activated.isWarning}>
            <Alert.Heading>Error</Alert.Heading>
            <p>{activated.mensaje}</p>
          </Alert>
        </Col>
      </Row>
      <Row className="rowJustFlex" hidden={!activated.isDisabled}>
        <Col>
          <Row>
            <Button
              variant="secondary"
              onClick={() => {
                setActivated({ ...activated, isDisabled: false });
                setIsSelected(false);
              }}
            >
              Cancelar
            </Button>
          </Row>
        </Col>
        <Col>
          <Row>
            <Button variant="primary" onClick={handleButton}>
              Continuar creación del semestre
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Inicio_semestre_component;
