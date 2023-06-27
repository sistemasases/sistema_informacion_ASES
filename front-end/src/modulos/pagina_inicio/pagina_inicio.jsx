/**
 * @file pagina_inicio.jsx
 * @version 1.0.0
 * @description página de inicio con un banner informativo.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import All_instancias_service from "../../service/all_instancias";
import Select from "react-select";

import Modal from "react-bootstrap/Modal";

const Pagina_inicio = () => {
  const userRole = localStorage.getItem("rol");

  //Constante y variable que se usaran para el select
  const opciones = [];
  var bandera_option = true;

  

  //Estado que se usara para extraer todas las instancias
  const [state, set_state] = useState({ tabs: [] });
  const [temp, set_temp] = useState({ seleccionado: "", value: "", id: "" });

  //Conexion con el back para extraer todas las instancias
  useEffect(() => {
    All_instancias_service.all_instancias().then((res) => {
      set_state({
        ...state,
        tabs: res,
      });
    });
  }, []);

  /**
   * Prop que toma las instancias y las transforma en opciones para el select
   */
  const handle_instancias = () => {
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

  //Estados para Pop Up
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    set_temp({
      ...temp,
      value: e["value"],
      seleccionado: e["label"],
      id: e["id"],
      
    });
    //Comandos para reconocer qué objeto fue seleccionado
    // set_state({ ...state, seleccionado: e["value"] });
    // set_state({ ...state, seleccionado: e["id"] });
    // console.log(temp.value + "AQUI");
    // console.log(Object.values(e));
    setShow(true);
  };

  //Cambia las sedes para visualizarse
  const handle_storage = () => {
    localStorage.setItem("instancia", temp.value);
    // console.log(nombre_sede);
    localStorage.setItem("instancia_id", temp.id);
    // console.log(temp.value + " fue Seleccionada");
    console.log(
      "la instancia seleccionada es: " +
        localStorage.getItem("instancia") +
        " con ID: " +
        localStorage.getItem("instancia_id")
    );
    // });
  };

  return (
    <>
      {userRole === "superAses" || userRole === "sistemas" ? (
        <div
          className="banner"
          style={{ marginTop: 20, marginBottom: 20, marginLeft: 22 }}
        >
          <h1>Ingresaste como admin.</h1>
          <>
            {
              <Container>
                <div className="smolSelect" style={{ width: 300 }}>
                  <Row className="rowJustFlex">
                    <h4>Para cambiar de sede:</h4>
                  </Row>
                  <Row className="rowJustFlex">
                    <Select
                      name="def"
                      class="option"
                      options={opciones}
                      onMenuOpen={handle_instancias}
                      onChange={handleShow}
                      className="option"
                      placeholder="Selecione una instancia"
                    />
                  </Row>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Está seguro qué desea seleccionar otra sede?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={handle_storage}
                        onClickCapture={handleClose}
                        autoFocus
                      >
                        Cambiar de Sede
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Container>
            }
          </>
        </div>
      ) : (
        <div
          className="banner"
          style={{ marginTop: 20, marginBottom: 20, marginLeft: 22 }}
        >
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"https://ases.univalle.edu.co/images/banners/1.png"}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"https://ases.univalle.edu.co/images/banners/1.png"}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={"https://ases.univalle.edu.co/images/banners/1.png"}
              />
            </Carousel.Item>
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Pagina_inicio;
