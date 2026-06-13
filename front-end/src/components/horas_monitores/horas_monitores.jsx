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
  const [modalTemporada, setModalTemporada] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [formTemporada, setFormTemporada] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    horas_semanales: 20,
  });

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


  const formatFecha = (fecha) => {
    if (!fecha) return "Fin de semestre";
    const [y, m, d] = fecha.split("-");
    return `${d}/${m}/${y}`;
  };

  

  const abrirModalCrear = () => {
    setFormTemporada({ fecha_inicio: "", fecha_fin: "", horas_semanales: 20 });
    setModoModal("crear");
    setModalTemporada(true);
  };

  const abrirModalEditar = () => {
    const t = seleccionado?.temporada;
    setFormTemporada({
      fecha_inicio: t?.fecha_inicio || "",
      fecha_fin: t?.fecha_fin || "",
      horas_semanales: t?.horas_semanales || 20,
    });
    setModoModal("editar");
    setModalTemporada(true);
  };

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

  const agruparPorSemana = (registros) => {
    const semanas = {};
    registros.forEach((r) => {
      const fecha = new Date(r.fecha + "T00:00:00");
      const diaSemana = fecha.getDay();
      const diffLunes = (diaSemana === 0 ? -6 : 1 - diaSemana);
      const lunes = new Date(fecha);
      lunes.setDate(fecha.getDate() + diffLunes);
      const clave = lunes.toISOString().split("T")[0];

      if (!semanas[clave]) semanas[clave] = 0;
      semanas[clave] += parseFloat(r.horas_trabajadas);
    });

    return Object.entries(semanas)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([lunes, total]) => {
        const fechaLunes = new Date(lunes + "T00:00:00");
        const fechaDomingo = new Date(fechaLunes);
        fechaDomingo.setDate(fechaLunes.getDate() + 6);

        const fmt = (d) =>
          `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

        return {
          rango: `${fmt(fechaLunes)} – ${fmt(fechaDomingo)}`,
          total,
        };
      });
  };

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
          
          {/* ── BLOQUE TEMPORADA ── */}
          {seleccionado && (
            <div style={{
              background: "#fff",
              borderRadius: "0.8rem",
              border: "1px solid #e0e0e0",
              padding: "0.9rem",
              margin: "0 0 1rem 0",
              margin: "0 1.5rem 1rem 1.5rem",  
              width: "80%", 
            }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <span style={{ fontWeight: 800, fontSize: "13px" }}>Temporada de trabajo</span>
                {seleccionado.temporada
                  ? <span style={{ background: "#e6f9f0", color: "#1a7a4a", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Activa</span>
                  : <span style={{ background: "#fff8e1", color: "#b8860b", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Sin registro</span>
                }
              </div>

              {/* Campos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "0.6rem" }}>
                {[
                  { label: "Fecha inicio", valor: seleccionado.temporada ? formatFecha(seleccionado.temporada.fecha_inicio) : "N/D" },
                  { label: "Fecha fin",    valor: seleccionado.temporada ? formatFecha(seleccionado.temporada.fecha_fin)    : "N/D" },
                  { label: "Hrs/semana",  valor: seleccionado.temporada ? `${seleccionado.temporada.horas_semanales} hrs`  : "N/D" },
                  { label: "Semestre",    valor: seleccionado.temporada ? seleccionado.temporada.semestre                  : "N/D" },
                ].map(({ label, valor }) => (
                  <div key={label} style={{ background: "#f5f5f5", borderRadius: "0.5rem", padding: "0.5rem 0.7rem" }}>
                    <div style={{ fontSize: "10px", color: "#888", marginBottom: "2px" }}>{label}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: valor === "N/D" ? "#bbb" : "#333" }}>{valor}</div>
                  </div>
                ))}
              </div>

              {/* Botón */}
              {seleccionado.temporada
                ? <button onClick={abrirModalEditar} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                    Modificar temporada
                  </button>
                : <button onClick={abrirModalCrear} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                    Agregar temporada
                  </button>
              }
            </div>
          )}

          {/* ── MODAL TEMPORADA ── */}
          {modalTemporada && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "#fff", borderRadius: "1rem", padding: "1.5rem", width: "360px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontWeight: 800, fontSize: "15px" }}>
                    {modoModal === "crear" ? "Agregar temporada" : "Modificar temporada"}
                  </span>
                  <button onClick={() => setModalTemporada(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>✕</button>
                </div>

                {[
                  { label: "Fecha inicio *", key: "fecha_inicio", type: "date" },
                  { label: "Fecha fin (opcional)", key: "fecha_fin", type: "date" },
                  { label: "Horas semanales *", key: "horas_semanales", type: "number" },
                ].map(({ label, key, type }) => (
                  <div key={key} style={{ marginBottom: "0.8rem" }}>
                    <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>{label}</label>
                    <input
                      type={type}
                      min={type === "number" ? 1 : undefined}
                      max={type === "number" ? 40 : undefined}
                      value={formTemporada[key]}
                      onChange={(e) => setFormTemporada(prev => ({ ...prev, [key]: e.target.value }))}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "14px" }}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", gap: "8px", marginTop: "1rem" }}>
                  <button onClick={() => setModalTemporada(false)} style={{ flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer", fontWeight: 700 }}>
                    Cancelar
                  </button>
                  <button onClick={() => { /* aquí llamas tu servicio */ setModalTemporada(false); }} style={{ flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "none", background: "#cc0000", color: "#fff", cursor: "pointer", fontWeight: 700 }}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}

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
              <Col>Semana</Col>
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
                agruparPorSemana(seleccionado.registros).map(({ rango, total }) => (
                  <Row key={rango} className="bottom_content_inside">
                    <Col className="col_bottom_content_inside_left">
                      {rango}
                    </Col>
                    <Col className="col_bottom_content_inside_right">
                      {total.toFixed(1)} HRS
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