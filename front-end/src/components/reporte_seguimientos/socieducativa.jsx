/**
 * @file socieducativa.jsx
 * @version 1.0.0
 * @description Renderiza los seguimientos de un estudiante tras seleccionarlo
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Desplegable_item from "./desplegable_Item copy";
import { useEffect } from "react";
import Semestre_por_sede from "../../service/semestres_por_sede.js";
import { desencriptarInt } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

/**
 * Se encarga de renderizar los seguimientos de un estudiante
 * @param {Diccionario} props contiene los seguimientos individuales de cada estudiante y las inasistencias
 * @returns renderizado de los seguimientos
 */
const Socieducativa = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //obtener las fechas de inicio/fin semestre
  const [fechaInicioSemestre, setFechaInicioSemestre] = useState("");
  const [fechaFinSemestre, setFechaFinSemestre] = useState("");

  useEffect(() => {
    const sedeId = desencriptarInt(sessionStorage.getItem("sede_id"));
    const idSemestreActual = desencriptarInt(sessionStorage.getItem("id_semestre_actual"));

    Semestre_por_sede.semestre_por_sede(sedeId).then((res) => {
      if (res && Array.isArray(res)) {
        const semestreActual = res.find(
          (s) => s.id === idSemestreActual || s.semestre_actual === true
        );
        if (semestreActual) {
          setFechaInicioSemestre(
            semestreActual.fecha_inicio ? semestreActual.fecha_inicio.toString().substring(0, 10) : ""
          );
          setFechaFinSemestre(
            semestreActual.fecha_fin ? semestreActual.fecha_fin.toString().substring(0, 10) : ""
          );
        }
      }
    });
  }, []);
  /**
   * Envia los datos del Usuario socieducativo y lo actualiza
   * @param {Arreglo} e: Contiene datos del usuario socioeducativo
   */
  const enviar_datos = (e) => {
    // Actualiza state.data_user_socioedu con los nuevos datos
    props.updateDataUserSocioedu(e);
  };

  return (
    <Container className="socioeducativa_container">
      <Row className="socioeducativa_fondo">
        {props.data_user_socioedu.map((item, index) => (
          <Col className={"periodo_asignaciones open"} xs={"12"}>
            {item["nombre"] ? (
              <Row className="periodo_asignaciones_seleccionar">
                <Col className="periodo_asignaciones_seleccionar_text">
                  <Row className="periodo_asignaciones_seleccionar_hover">
                    <Col className="col_periodo_asignaciones_seleccionar_text">
                      Seguimientos del periodo : {item["nombre"]}
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row className="periodo_asignaciones_contenido">
                <Desplegable_item
                  key={index}
                  item={item}
                  updateDataUserSocioedu={enviar_datos}
                  fecha_inicio_semestre={fechaInicioSemestre}
                  fecha_fin_semestre={fechaFinSemestre}
                />
              </Row>
            )}
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Importante</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seleccione un estudiante.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Socieducativa;
