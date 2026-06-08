import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../../Scss/horas_monitores/horas_monitores.css";
import Scrollbars from "react-custom-scrollbars-2";
import { encriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import obtener_registros_profesional from "../../service/registro_horas_trbajadas/get_all_profesional";
import obtener_festivos_colombia from "../../service/registro_horas_trbajadas/dias_festivos";


const HorasMonitores = () => {
  const [subordinados, setSubordinados] = useState([]);
  const [diasFestivos, setDiasFestivos] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await obtener_registros_profesional();
      if (data) setSubordinados(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getFestivos = async () => {
      const resultado = await obtener_festivos_colombia();
      if (resultado) setDiasFestivos(resultado.cantidad);
    };
    getFestivos();
  }, []);


  const cambiar_ruta = (e) => {
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  };

  // Filtrar por nombre (trabajador_id por ahora, cuando tengas el nombre lo reemplazas)
  const subordinadosFiltrados = subordinados.filter((s) => {
    const query = busqueda.toLowerCase();
    return (
      s.nombre.toLowerCase().includes(query) ||
      `${s.trabajador_id}`.includes(query)
    );
  });

  // Panel derecho: datos del seleccionado
  const horasProgramadas = seleccionado
    ? seleccionado.horasTotal.toFixed(1)
    : "—";

  return (
    <div>
      <Row>
        <Col className="col_tittle_left">
          <div>
            <h2 style={{ fontWeight: "800" }}>Monitores</h2>
          </div>
        </Col>
        <Col className="col_tittle_right">
          <div>
            <h2 style={{ fontWeight: "800" }}>Horas</h2>
          </div>
        </Col>
      </Row>

      <hr style={{ color: "red", height: "10px", backgroundColor: "red", marginLeft: "0px" }} />

      <Row>
        {/* ── COLUMNA IZQUIERDA ── */}
        <Col>
          <div className="box_monitores">
            <Row className="monitor_filter_row">
              <Col className="monitor_filter">
                <input
                  className="filter_bar"
                  type="text"
                  placeholder="Buscar por nombre o ID..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </Col>
            </Row>

            <Scrollbars
              style={{ height: 672 }}
              renderThumbVertical={(props) => <div {...props} className="thumb-vertical-left" />}
              renderTrackVertical={(props) => <div {...props} className="track-vertical-left" />}
              renderView={(props) => <div {...props} className="view-content-left" />}
            >
              {subordinadosFiltrados.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#aaa", fontSize: "13px" }}>
                  No se encontraron resultados.
                </div>
              ) : (
                subordinadosFiltrados.map((s) => {
                  const rol = s.registros[0]?.rol?.id_rol?.nombre || "—";
                  const esSeleccionado = seleccionado?.trabajador_id === s.trabajador_id;

                  return (
                    <Row
                      key={s.trabajador_id}
                      className="row_monitor_item"
                      style={esSeleccionado ? { border: "2px solid #ff0000", backgroundColor: "#fff0f0" } : {}}
                      onClick={() => setSeleccionado(s)}
                    >
                      {/* Nombre/ID y rol */}
                      <Col className="col_monitor_item_info">
                        <div style={{ fontSize: "14px", fontWeight: 800 }}>
                          {s.nombre}
                        </div>
                        <div style={{ fontSize: "11px", color: "#444", fontWeight: 600 }}>
                          ID: {s.trabajador_id}
                        </div>
                        <div style={{ fontSize: "11px", color: "#666", fontWeight: 600, textTransform: "uppercase" }}>
                          {s.registros[0]?.rol?.id_rol?.nombre || "—"}
                        </div>
                      </Col>

                      {/* Debe — sin funcionalidad por ahora */}
                      <Col className="col_monitor_middle_item">
                        DEBE: —
                      </Col>

                      {/* Botón hoja monitor */}
                      <Col className="col_monitor_right_item">
                        <Button
                          className="col_button_item"
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            cambiar_ruta(`/hoja_monitor/${s.trabajador_id}`);
                          }}
                        >
                          Hoja trabajador
                        </Button>
                      </Col>
                    </Row>
                  );
                })
              )}
            </Scrollbars>
          </div>
        </Col>

        {/* ── COLUMNA DERECHA ── */}
        <Col>
          <div className="box_hours">
            <Row className="red_tittle">
              <Col>Precio Hora:</Col>
              <Col style={{ textAlign: "right" }}>$ 10,000.00</Col>
            </Row>
            <Row className="red_tittle">
              <Col>Días Festivos:</Col>
              <Col style={{ textAlign: "right" }}>{diasFestivos}</Col>
            </Row>

            <Row>
              <Col className="middle_content">Horas Contratadas</Col>
              <Col className="middle_content_right" style={{ textAlign: "center", fontSize: "10px", padding: "0.8rem 0.3rem" }}>
                N/D
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas Semanales</Col>
              <Col className="middle_content_right" style={{ textAlign: "center", fontSize: "10px", padding: "0.8rem 0.3rem" }}>
                N/D
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas Programadas</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {horasProgramadas}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas en deuda</Col>
              <Col
                className="middle_content_right"
                style={{ textAlign: "center", backgroundColor: "red", borderColor: "red", color: "white", fontSize: "10px", padding: "0.8rem 0.3rem" }}
              >
                N/D
              </Col>
            </Row>

            {/* Tabla de registros del seleccionado */}
            <Row className="bottom_content">
              <Col>Fecha</Col>
              <Col>Horas</Col>
            </Row>

            <Scrollbars autoHeight autoHeightMax={300}
              renderThumbVertical={(props) => <div {...props} className="thumb-vertical" />}
            >
              {!seleccionado ? (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "#aaa", fontSize: "12px", backgroundColor: "#fff" }}>
                  Selecciona un trabajador para ver sus registros.
                </div>
              ) : (
                seleccionado.registros.map((r) => (
                  <Row key={r.id} className="bottom_content_inside">
                    <Col className="col_bottom_content_inside_left">
                      {r.fecha.split("-").reverse().join("/")}
                    </Col>
                    <Col className="col_bottom_content_inside_right">
                      {parseFloat(r.horas_trabajadas).toFixed(1)} HRS
                    </Col>
                  </Row>
                ))
              )}
            </Scrollbars>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HorasMonitores;