import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../../Scss/horas_monitores/horas_monitores.css";
import Scrollbars from "react-custom-scrollbars-2";
import { encriptar, desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import obtener_registros_profesional from "../../service/registro_horas_trbajadas/get_all_profesional";
import obtener_festivos_colombia from "../../service/registro_horas_trbajadas/dias_festivos";
import actualizar_temporada_trabajo from "../../service/registro_horas_trbajadas/actualizar_temporada";
import obtener_semestre_actual from "../../service/registro_horas_trbajadas/get_semestre_actual";



const HorasMonitores = () => {
  const esPracticante = desencriptar(sessionStorage.getItem("rol")) === "practicante";

  const [subordinados, setSubordinados] = useState([]);
  const [diasFestivos, setDiasFestivos] = useState(0);
  const [festivosLaborables, setFestivosLaborables] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [modalTemporada, setModalTemporada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [cargandoTemporada, setCargandoTemporada] = useState(false);
  const [errorNovedad, setErrorNovedad] = useState("");
  const [formTemporada, setFormTemporada] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    horas_semanales: 20,
    tipo: "",
    horas: "",
    observacion: "",
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

    // Validar campos de novedad
    const tieneTipo  = formTemporada.tipo  !== "";
    const tieneHoras = formTemporada.horas !== "";

    if (tieneTipo !== tieneHoras) {
      setErrorNovedad("Se requieren tipo y cantidad de horas juntos para registrar una novedad.");
      return;
    }
    if (tieneHoras && parseFloat(formTemporada.horas) <= 0) {
      setErrorNovedad("La cantidad de horas debe ser mayor a 0.");
      return;
    }
    setErrorNovedad("");

    setCargandoTemporada(true);

    // Recalcular festivos con el nuevo rango de fechas de la temporada
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
      tipo:        tieneTipo  ? formTemporada.tipo  : undefined,
      horas:       tieneHoras ? formTemporada.horas : undefined,
      observacion: formTemporada.observacion || undefined,
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
        precio_hora: resultado.precio_hora,
        novedades: resultado.novedades ?? [],
      };

      const subordinadosActualizados = subordinados.map((s) =>
        s.trabajador_id === seleccionado.trabajador_id
          ? {
              ...s,
              temporada: temporadaActualizada,
              horasEsperadas: resultado.horasEsperadas ?? s.horasEsperadas,
              totalHorasAjustadas: resultado.totalHorasAjustadas ?? s.totalHorasAjustadas,
              totalAdiciones: resultado.totalAdiciones ?? s.totalAdiciones,
              totalDisminuciones: resultado.totalDisminuciones ?? s.totalDisminuciones,
            }
          : s
      );

      setSubordinados(subordinadosActualizados);
      setSeleccionado((prev) => ({
        ...prev,
        temporada: temporadaActualizada,
        horasEsperadas: resultado.horasEsperadas ?? prev.horasEsperadas,
        totalHorasAjustadas: resultado.totalHorasAjustadas ?? prev.totalHorasAjustadas,
        totalAdiciones: resultado.totalAdiciones ?? prev.totalAdiciones,
        totalDisminuciones: resultado.totalDisminuciones ?? prev.totalDisminuciones,
      }));
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
      tipo: "",
      horas: "",
      observacion: "",
    });
    setErrorNovedad("");
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
  const hoy0 = new Date();
  hoy0.setHours(0, 0, 0, 0);
  const ayer0 = new Date(hoy0);
  ayer0.setDate(hoy0.getDate() - 1);
  const fechaInicioFestivos = seleccionado?.temporada?.fecha_inicio
    ? new Date(seleccionado.temporada.fecha_inicio + "T00:00:00")
    : null;

  const festivosPasados = festivosLaborables.filter((f) => {
    const d = new Date(f.date + "T00:00:00");
    return d <= ayer0 && (fechaInicioFestivos === null || d >= fechaInicioFestivos);
  }).length;

  const precioHora = seleccionado?.temporada?.precio_hora ?? 8578;

  const totalHorasAjustadas = seleccionado?.totalHorasAjustadas ?? null;
  const totalAdiciones      = seleccionado?.totalAdiciones      ?? null;
  const totalDisminuciones  = seleccionado?.totalDisminuciones  ?? null;
  const horasActuales       = seleccionado ? (seleccionado.horasActuales ?? null) : null;
  const horasEsperadas      = seleccionado ? (seleccionado.horasEsperadas ?? null) : null;

  const horasFaltantes = totalHorasAjustadas !== null && horasActuales !== null
    ? parseFloat((totalHorasAjustadas - horasActuales).toFixed(1))
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
      .sort(([a], [b]) => new Date(b) - new Date(a))
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
                  {!seleccionado.temporada && (
                    <span style={{ background: "#fff8e1", color: "#b8860b", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Sin registro</span>
                  )}
                  {seleccionado.temporada && !seleccionado.temporada.is_default && (
                    <span style={{ background: "#e6f9f0", color: "#1a7a4a", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Activa</span>
                  )}
                  {seleccionado.temporada?.is_default && (
                    <span style={{ background: "#fff3e0", color: "#e65100", fontSize: "10px", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>
                      ⚠ Datos por defecto, favor actualizar o confirmar la temporada
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

              {seleccionado.temporada?.novedades?.length > 0 && (
                <div style={{ marginBottom: "0.7rem" }}>
                  <div style={{ fontSize: "11px", color: "#888", fontWeight: 600, marginBottom: "5px" }}>
                    Historial de modificaciones
                  </div>
                  {seleccionado.temporada.novedades.map((n) => {
                    const esAdicion = n.tipo === "ADICION";
                    const dt = new Date(n.fecha_efectiva);
                    const fechaStr = dt.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
                    const horaStr = dt.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
                    return (
                      <div key={n.id} style={{ marginBottom: "5px", padding: "6px 8px", background: esAdicion ? "#e6f9f0" : "#fff0f0", borderRadius: "6px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ background: esAdicion ? "#1a7a4a" : "#cc0000", color: "#fff", padding: "2px 8px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap" }}>
                            {esAdicion ? "Adición" : "Disminución"}
                          </span>
                          <span style={{ fontSize: "12px", color: "#333" }}>
                            {esAdicion ? "+" : "-"}{parseFloat(n.horas).toFixed(1)} horas · {fechaStr} · {horaStr}
                          </span>
                        </div>
                        {n.observacion && (
                          <div style={{ fontSize: "11px", color: "#666", marginTop: "3px", paddingLeft: "2px" }}>
                            {n.observacion}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {seleccionado.temporada && !esPracticante && (
                <button onClick={abrirModalEditar} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                  Modificar temporada
                </button>
              )}
            </div>
          )}

          {/* ── MODAL TEMPORADA ── */}
          {modalTemporada && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "#fff", borderRadius: "1rem", padding: "1.5rem", width: "400px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontWeight: 800, fontSize: "15px" }}>Modificar temporada</span>
                  <button onClick={() => setModalTemporada(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>✕</button>
                </div>

                {/* Fila 1: Fecha inicio / Fecha fin */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.8rem" }}>
                  {[
                    { label: "Fecha inicio *", key: "fecha_inicio" },
                    { label: "Fecha fin *",    key: "fecha_fin" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>{label}</label>
                      <input
                        type="date"
                        value={formTemporada[key]}
                        onChange={(e) => setFormTemporada(prev => ({ ...prev, [key]: e.target.value }))}
                        style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "14px" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Fila 2: Horas semanales (ancho completo) */}
                <div style={{ marginBottom: "0.8rem" }}>
                  <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>Horas semanales *</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={formTemporada.horas_semanales}
                    onChange={(e) => setFormTemporada(prev => ({ ...prev, horas_semanales: e.target.value }))}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "14px" }}
                  />
                </div>

                {/* Fila 3: Tipo de ajuste / Cantidad de horas */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.8rem" }}>
                  <div>
                    <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>Tipo de ajuste</label>
                    <select
                      value={formTemporada.tipo}
                      onChange={(e) => setFormTemporada(prev => ({ ...prev, tipo: e.target.value }))}
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "14px" }}
                    >
                      <option value="">Sin novedad</option>
                      <option value="ADICION">Adición</option>
                      <option value="DISMINUCION">Disminución</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>Cantidad de horas</label>
                    <input
                      type="number"
                      min={0.1}
                      step={0.5}
                      value={formTemporada.horas}
                      onChange={(e) => setFormTemporada(prev => ({ ...prev, horas: e.target.value }))}
                      placeholder="0"
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "14px" }}
                    />
                  </div>
                </div>

                {/* Fila 4: Observación (visible solo si se eligió tipo) */}
                {formTemporada.tipo !== "" && (
                  <div style={{ marginBottom: "0.8rem" }}>
                    <label style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "4px" }}>Observación (opcional)</label>
                    <textarea
                      rows={2}
                      value={formTemporada.observacion}
                      onChange={(e) => setFormTemporada(prev => ({ ...prev, observacion: e.target.value }))}
                      placeholder="Motivo del ajuste..."
                      style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "13px", resize: "vertical" }}
                    />
                  </div>
                )}

                {/* Error de validación de novedad */}
                {errorNovedad && (
                  <div style={{ color: "#cc0000", fontSize: "12px", marginBottom: "0.8rem" }}>{errorNovedad}</div>
                )}

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
              <Col>Valor Hora:</Col>
              <Col style={{ textAlign: "right" }}>$ {precioHora.toLocaleString("es-CO")}</Col>
            </Row>
            <Row className="red_tittle">
              <Col>Días Festivos hasta hoy:</Col>
              <Col style={{ textAlign: "right" }}>{festivosPasados}</Col>
            </Row>

            <Row>
              <Col className="middle_content">Total horas monitoría</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {totalHorasAjustadas !== null ? totalHorasAjustadas.toFixed(1) : "N/D"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Total adición horas</Col>
              <Col
                className="middle_content_right"
                style={{
                  textAlign: "center",
                  backgroundColor: totalAdiciones !== null && totalAdiciones > 0 ? "#ccf0d8" : undefined,
                  color: totalAdiciones !== null && totalAdiciones > 0 ? "#1a7a4a" : undefined,
                }}
              >
                {totalAdiciones !== null ? `+${totalAdiciones.toFixed(1)}` : "—"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Total disminución horas</Col>
              <Col
                className="middle_content_right"
                style={{
                  textAlign: "center",
                  backgroundColor: totalDisminuciones !== null && totalDisminuciones > 0 ? "#ffcccc" : undefined,
                  color: totalDisminuciones !== null && totalDisminuciones > 0 ? "#cc0000" : undefined,
                }}
              >
                {totalDisminuciones !== null ? `-${totalDisminuciones.toFixed(1)}` : "—"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas cumplidas</Col>
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
              <Col className="middle_content">Horas pendientes por cumplir</Col>
              <Col
                className="middle_content_right"
                style={{
                  textAlign: "center",
                  backgroundColor: balance === null ? undefined : balance < 0 ? "#ffcccc" : "#ccf0d8",
                  borderColor: balance === null ? undefined : balance < 0 ? "#ffaaaa" : "#aae0c0",
                  color: balance === null ? undefined : balance < 0 ? "#cc0000" : "#1a7a4a",
                }}
              >
                {balance !== null ? `${balance > 0 ? "+" : ""}${balance.toFixed(1)}` : "—"}
              </Col>
            </Row>
            <Row>
              <Col className="middle_content">Horas faltantes a cumplir</Col>
              <Col className="middle_content_right" style={{ textAlign: "center" }}>
                {horasFaltantes !== null ? horasFaltantes.toFixed(1) : "N/D"}
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