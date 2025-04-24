import { Button, Col, Row } from "react-bootstrap";
import "../../Scss/horas_monitores/hoja_monitor.css";
import Scrollbars from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";

const hojaMonitor = () => {
  return (
    <div>
      {/* <h1>Horas Monitores</h1> */}
      <Row>
        {/* Columna Izquierda */}
        <Col className="col_tittle_left">
          <div>
            <h2 style={{ fontWeight: "800" }}>Hoja del Monitor</h2>
          </div>
        </Col>
        {/* Columna Derecha */}
        <Col className="col_tittle_right">
          <div>
            <h2 style={{ fontWeight: "800" }}>Horas</h2>
          </div>
        </Col>
      </Row>

      <hr
        style={{
          color: "red",
          height: "10px",
          backgroundColor: "red",
          marginLeft: "0px",
        //   opacity: "1",
        }}
      ></hr>
      <Row>
        {/* Columna Izquierda */}
        <Col>
          <div>
            <Row className="row-monitor-info">
              NOMBRE PARTICULARMENTE LARGO - 1234567
            </Row>
            <Row className="row-middle-content-table">
              <Col className="col-middle-content-tittle-left">Fecha y Hora</Col>
              <Col className="col-middle-content-tittle-middle">
                Descripción
              </Col>
              <Col className="col-middle-content-tittle-right">Horas</Col>
            </Row>
            <Row className="row-middle-content-table-data">
              <Scrollbars style={{ height: 342, width: "44rem" }}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <Row style={{ width: "99%" }}>
                    <Col>
                      <Row className="col-middle-content-data-left">
                        <Col>
                          {" "}
                          {10 + index}/{1 + index}/ 2024
                        </Col>
                        <Col> 12:20:00 - 16:22:00</Col>
                      </Row>
                    </Col>
                    <Col className="col-middle-content-data-middle">
                      Est duis culpa consectetur sint dolor qui id irure sint
                      officia reprehenderit officia quis.
                    </Col>
                    <Col className="col-middle-content-data-right">
                      {" "}
                      {1 + index}
                    </Col>
                  </Row>
                ))}
              </Scrollbars>
            </Row>
          </div>
        </Col>

        {/* COLUMNA DERECHAA */}
        <Col>
          <div className="box_hours">
            <Row className="row-red-tittle">
              <Col className="col-top-content-left">Precio hora:</Col>
              <Col className="col-top-content-right"> $10,000.00</Col>
            </Row>
            <Row className="row-red-tittle">
              <Col className="col-top-content-left">Días festivos:</Col>
              <Col className="col-top-content-right">15</Col>
            </Row>
            <Row>
              <Col className="col-middle-content-left">Horas a cumplir</Col>
              <Col className="col-middle-content-right">344</Col>
            </Row>
            <Row>
              <Col className="col-middle-content-left">Horas realizadas</Col>
              <Col className="col-middle-content-right">204</Col>
            </Row>
            <Row>
              <Col className="col-middle-content-left">Horas en deuda</Col>
              <Col className="col-middle-content-right">140</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default hojaMonitor;
