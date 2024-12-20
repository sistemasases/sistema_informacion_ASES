import { Button, Col, Row } from "react-bootstrap";
import "../../Scss/horas_monitores/horas_monitores.css";
import Scrollbars from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import { encriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad";

const HorasMonitores = () => {
  let navigate = useNavigate();

  const cambiar_ruta = (e) => {
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  };
  return (
    <div>
      {/* <h1>Horas Monitores</h1> */}
      <Row>
        {/* Columna Izquierda */}
        <Col className="col_tittle_left">
          <div>
            <h2 style={{ fontWeight: "800" }}>Monitores</h2>
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
        }}
      ></hr>
      <Row>
        {/* Columna Izquierda */}
        <Col>
          <div className="box_monitores">
            <Row lassName="monitor_filter_row">
              <Col className="monitor_filter">
                <input
                  className="filter_bar"
                  type="text"
                  placeholder="Buscar Monitor"
                />
              </Col>
            </Row>
            <Scrollbars
              style={{ height: 672 }}
              renderThumbVertical={(props) => (
                <div {...props} className="thumb-vertical-left" />
              )}
              renderTrackVertical={(props) => (
                <div {...props} className="track-vertical-left" />
              )}
              renderView={(props) => (
                <div {...props} className="view-content-left" />
              )}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <>
                  <Row className="row_monitor_item">
                    <Col className="col_monitor_item_info">
                      NOMBRE PARTICULARMENTE LARGO - {i + 1}234567{" "}
                    </Col>
                    <Col className="col_monitor_middle_item">
                      DEBE: {i + 10}
                    </Col>
                    <Col className="col_monitor_right_item">
                      <Button
                        className="col_button_item"
                        variant="danger"
                        onClick={() => cambiar_ruta(`/hoja_monitor`)}
                      >
                        HOJA MONITOR
                      </Button>
                    </Col>
                  </Row>
                </>
              ))}
            </Scrollbars>
          </div>
        </Col>
        {/* Columna Derecha */}
        <Col>
          {" "}
          <div className="box_hours">
            <Row className="red_tittle">
              <Col>Precio Hora:</Col>
              <Col style={{ textAlign: "right" }}>$ 10,000.00</Col>
            </Row>
            <Row className="red_tittle">
              <Col>Días Festivos:</Col>
              <Col style={{ textAlign: "right" }}>15</Col>
            </Row>
            {/* Row Middle Content */}
            <Row>
              <Col className="middle_content">Horas Contratadas</Col>
              <Col
                className="middle_content_right"
                style={{ textAlign: "center" }}
              >
                344
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas Semanales</Col>
              <Col
                className="middle_content_right"
                style={{ textAlign: "center" }}
              >
                20
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas Programadas</Col>
              <Col
                className="middle_content_right"
                style={{ textAlign: "center" }}
              >
                244
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas en deuda</Col>
              <Col
                className="middle_content_right"
                style={{
                  textAlign: "center",
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                }} // Cambiar color de fondo y borde
              >
                24
              </Col>
            </Row>
            <Row className="bottom_content">
              <Col>Semana:</Col>
              <Col>Horas Semanales:</Col>
            </Row>
            <Scrollbars
              autoHeight
              renderThumbVertical={(props) => (
                <div {...props} className="thumb-vertical" />
              )}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <>
                  <Row className="bottom_content_inside">
                    <Col className="col_bottom_content_inside_left">
                      {i + 1} AGO
                    </Col>
                    <Col className="col_bottom_content_inside_right">
                      {i + 10} HORAS
                    </Col>
                  </Row>
                </>
              ))}
            </Scrollbars>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HorasMonitores;
