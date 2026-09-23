import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../../Scss/horas_monitores/horas_monitores.css";
import Scrollbars from "react-custom-scrollbars-2";
import { encriptar, desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import obtener_registros_profesional from "../../service/registro_horas_trbajadas/get_all_profesional";
import obtener_festivos_colombia from "../../service/registro_horas_trbajadas/dias_festivos";
import actualizar_temporada_trabajo from "../../service/registro_horas_trbajadas/actualizar_temporada";
import obtener_semestre_actual from "../../service/registro_horas_trbajadas/get_semestre_actual";

const PRECIO_HORA = 10000;


/**
 * Calcula las horas que un trabajador debería haber completado desde el inicio
 * de su temporada hasta ayer (el día de hoy no cuenta porque aún no está completo).
 *
 * @param {object|null} temporada  - Objeto temporada del subordinado.
 * @param {Array}       festivosLaborables - Festivos colombianos que caen lun–vie,
 *                                           ya pre-filtrados al cargar la página.
 * @returns {number|null} Horas esperadas con 1 decimal, o null si no hay temporada.
 */
const calcularHorasEsperadas = (temporada, festivosLaborables) => {
  if (!temporada || !temporada.fecha_inicio) return null;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);

  const inicio = new Date(temporada.fecha_inicio + "T00:00:00");

  // La temporada aún no ha empezado
  if (inicio > ayer) return 0;

  // El corte es ayer, salvo que la temporada ya terminó antes
  let corte = ayer;
  if (temporada.fecha_fin) {
    const fechaFin = new Date(temporada.fecha_fin + "T00:00:00");
    if (fechaFin < ayer) corte = fechaFin;
  }

  if (corte < inicio) return 0;

  // Contar días hábiles (lun–vie) en [inicio, corte] inclusive
  let diasHabiles = 0;
  const cursor = new Date(inicio);
  while (cursor <= corte) {
    const dow = cursor.getDay();
    if (dow >= 1 && dow <= 5) diasHabiles++;
    cursor.setDate(cursor.getDate() + 1);
  }

  // Descontar festivos laborables que caigan dentro del rango
  const festivosEnRango = festivosLaborables.filter((f) => {
    const d = new Date(f.date + "T00:00:00");
    return d >= inicio && d <= corte;
  });

  const diasHabilesNetos = Math.max(0, diasHabiles - festivosEnRango.length);
  const horasPorDia = (temporada.horas_semanales ?? 20) / 5;

  return parseFloat((diasHabilesNetos * horasPorDia).toFixed(1));
};


const HorasMonitores = () => {
  const [subordinados, setSubordinados] = useState([]);
  const [diasFestivos, setDiasFestivos] = useState(0);
  const [festivosLaborables, setFestivosLaborables] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [modalTemporada, setModalTemporada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [cargandoTemporada, setCargandoTemporada] = useState(false);
  const [formTemporada, setFormTemporada] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    horas_semanales: 20,
    horas_total_contratadas: "",
  });

  const semestre_id = desencriptar(sessionStorage.getItem("id_semestre_actual"));
  const sede_id = desencriptar(sessionStorage.getItem("sede_id"));



  useEffect(() => {
    const getData = async () => {
      setCargando(true);

      const semestreActual = await obtener_semestre_actual(sede_id);
      if (!semestreActual || !semestreActual.fecha_inicio) {
        setCargando(false);
        return;
      }

      const resultadoFestivos = await obtener_festivos_colombia(
        semestreActual.fecha_inicio,
        semestreActual.fecha_fin
      );
      // Pre-filtrar festivos que caen lun–vie; son los únicos que restan días
      // hábiles. Los de fin de semana se ignoran en todos los cálculos.
      const listaFestivos = resultadoFestivos ? resultadoFestivos.festivos : [];
      const soloLaborables = listaFestivos.filter((f) => {
        const dow = new Date(f.date + "T00:00:00").getDay();
        return dow >= 1 && dow <= 5;
      });
      setFestivosLaborables(soloLaborables);
      setDiasFestivos(soloLaborables.length);

      const data = await obtener_registros_profesional({ semestre_id, diasFestivos: soloLaborables.length });
      if (data) setSubordinados(data);

      setCargando(false);
    };

    getData();
  }, []);


  const handleGuardarTemporada = async () => {
    if (!formTemporada.fecha_inicio || !formTemporada.fecha_fin || !formTemporada.horas_semanales) return;

    const idTemporada = seleccionado?.temporada?.id;
    if (!idTemporada) return;

    setCargandoTemporada(true);

    // recalcular festivos con el nuevo rango de fechas de la temporada
    const resultadoFestivos = await obtener_festivos_colombia(
      formTemporada.fecha_inicio,
      formTemporada.fecha_fin
    );
    const nuevosFestivos = resultadoFestivos
      ? resultadoFestivos.festivos.filter((f) => {
          const dow = new Date(f.date + "T00:00:00").getDay();
          return dow >= 1 && dow <= 5;
        }).length
      : 0;

    const resultado = await actualizar_temporada_trabajo(idTemporada, {
      fecha_inicio: formTemporada.fecha_inicio,
      fecha_fin: formTemporada.fecha_fin,
      horas_semanales: formTemporada.horas_semanales,
      total_festivos_temporada: nuevosFestivos,
    });

    setCargandoTemporada(false);

    if (resultado) {
      setModalTemporada(false);

      const temporadaActualizada = {
        id: resultado.id,
        fecha_inicio: resultado.fecha_inicio,
        fecha_fin: resultado.fecha_fin,
        horas_semanales: resultado.horas_semanales,
        horas_total_contratadas: resultado.horas_total_contratadas,
        total_festivos_temporada: resultado.total_festivos_temporada,
        is_default: resultado.is_default,
        semestre: resultado.semestre,
      };

      const subordinadosActualizados = subordinados.map((s) =>
        s.trabajador_id === seleccionado.trabajador_id
          ? { ...s, temporada: temporadaActualizada }
          : s
      );

      setSubordinados(subordinadosActualizados);
      setSeleccionado((prev) => ({ ...prev, temporada: temporadaActualizada }));
    }
  };


  const formatFecha = (fecha) => {
    if (!fecha) return "Fin de semestre";
    const [y, m, d] = fecha.split("-");
    return `${d}/${m}/${y}`;
  };

  const abrirModalEditar = () => {
    const t = seleccionado?.temporada;
    setFormTemporada({
      fecha_inicio: t?.fecha_inicio || "",
      fecha_fin: t?.fecha_fin || "",
      horas_semanales: t?.horas_semanales || 20,
      horas_total_contratadas: t?.horas_total_contratadas || "",
    });
    setModalTemporada(true);
  };

  const cambiar_ruta = (e) => {
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  };

  const subordinadosFiltrados = subordinados.filter((s) => {
    const query = busqueda.toLowerCase();
    return (
      s.nombre.toLowerCase().includes(query) ||
      `${s.trabajador_id}`.includes(query)
    );
  });

  // ── valores del panel derecho ──────────────────────────────
  const horasContratadas = seleccionado?.temporada?.horas_total_contratadas
    ? parseFloat(seleccionado.temporada.horas_total_contratadas)
    : null;

  const horasSemanales = seleccionado?.temporada?.horas_semanales ?? null;

  const horasProgramadas = seleccionado ? seleccionado.horasTotal : null;
  const horasActuales = seleccionado ? (seleccionado.horasActuales ?? null) : null;

  const horasDeuda = horasContratadas !== null && horasProgramadas !== null
    ? (horasContratadas - horasProgramadas).toFixed(1)
    : null;

  const horasEsperadas = seleccionado
    ? calcularHorasEsperadas(seleccionado.temporada, festivosLaborables)
    : null;

  const balance = horasEsperadas !== null && horasActuales !== null
    ? parseFloat((horasActuales - horasEsperadas).toFixed(1))
    : null;

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
              {cargando ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#aaa", fontSize: "13px" }}>
                  Cargando subordinados...
                </div>
              ) : subordinadosFiltrados.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#aaa", fontSize: "13px" }}>
                  {subordinados.length === 0
                    ? "No se encontraron subordinados."
                    : "No se encontraron resultados."}
                </div>
              ) : (
                subordinadosFiltrados.map((s) => {
                  const esSeleccionado = seleccionado?.trabajador_id === s.trabajador_id;

                  return (
                    <Row
                      key={s.trabajador_id}
                      className="row_monitor_item"
                      style={esSeleccionado ? { border: "2px solid #ff0000", backgroundColor: "#fff0f0" } : {}}
                      onClick={() => setSeleccionado(s)}
                    >
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
              margin: "0 1.5rem 1rem 1.5rem",
              width: "80%",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                <span style={{ fontWeight: 800, fontSize: "13px" }}>Temporada de trabajo</span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {seleccionado.temporada
                    ? <span style={{ background: "#e6f9f0", color: "#1a7a4a", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Activa</span>
                    : <span style={{ background: "#fff8e1", color: "#b8860b", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Sin registro</span>
                  }
                  {seleccionado.temporada?.is_default && (
                    <span style={{ background: "#fff3e0", color: "#e65100", fontSize: "10px", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>
                      ⚠ Datos por defecto, favor actualizar
                    </span>
                  )}
                </div>
              </div>

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

              {seleccionado.temporada && (
                <button onClick={abrirModalEditar} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                  Modificar temporada
                </button>
              )}
            </div>
          )}

          {/* ── MODAL TEMPORADA ── */}
          {modalTemporada && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "#fff", borderRadius: "1rem", padding: "1.5rem", width: "360px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontWeight: 800, fontSize: "15px" }}>
                    Modificar temporada
                  </span>
                  <button onClick={() => setModalTemporada(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>✕</button>
                </div>

                {[
                  { label: "Fecha inicio *", key: "fecha_inicio", type: "date" },
                  { label: "Fecha fin *", key: "fecha_fin", type: "date" },
                  { label: "Horas semanales *", key: "horas_semanales", type: "number" },
                ].map(({ label, key, type }) => (
                  <div key={key} style={{ marginBottom: "0.8rem" }}>
                    <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>{label}</label>
                    <input
                      type={type}
                      min={type === "number" ? 1 : undefined}
                      max={key === "horas_semanales" ? 40 : undefined}
                      step={key === "horas_total_contratadas" ? "0.1" : undefined}
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
                  <button
                    onClick={handleGuardarTemporada}
                    disabled={cargandoTemporada}
                    style={{
                      flex: 1,
                      padding: "0.6rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      background: cargandoTemporada ? "#aaa" : "#cc0000",
                      color: "#fff",
                      cursor: cargandoTemporada ? "not-allowed" : "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {cargandoTemporada ? "Guardando..." : "Guardar"}
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
              <Col style={{ textAlign: "right" }}>
                {seleccionado?.temporada?.total_festivos_temporada ?? diasFestivos}
              </Col>
            </Row>

            <Row>
              <Col className="middle_content">Horas Contratadas</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {horasContratadas !== null ? horasContratadas.toFixed(1) : "N/D"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas Semanales</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {horasSemanales !== null ? horasSemanales : "N/D"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas Programadas</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {horasProgramadas !== null ? horasProgramadas.toFixed(1) : "—"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas Actuales</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {horasActuales !== null ? horasActuales.toFixed(1) : "—"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas esperadas hasta hoy</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {horasEsperadas !== null ? horasEsperadas.toFixed(1) : "—"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Balance</Col>
              <Col
                className="middle_content_right"
                style={{
                  textAlign: "center",
                  backgroundColor: balance !== null && balance < 0 ? "#FFA500" : undefined,
                  borderColor: balance !== null && balance < 0 ? "#FFA500" : undefined,
                  color: balance !== null && balance < 0 ? "white" : undefined,
                }}
              >
                {balance !== null
                  ? `${balance > 0 ? "+" : ""}${balance.toFixed(1)} HRS`
                  : "—"}
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
                }}
              >
                {horasDeuda !== null ? `${horasDeuda} HRS` : "N/D"}
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