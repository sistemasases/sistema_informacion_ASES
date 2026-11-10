import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import obtener_registros_por_trabajador from "../../service/registro_horas_trbajadas/get_all_by_id";
import obtener_festivos_colombia from "../../service/registro_horas_trbajadas/dias_festivos";
import actualizar_registro from "../../service/registro_horas_trbajadas/actualizar_registro";
import eliminar_registro from "../../service/registro_horas_trbajadas/eliminar_registro";
import eliminar_novedad from "../../service/registro_horas_trbajadas/eliminar_novedad";
import actualizar_novedad from "../../service/registro_horas_trbajadas/actualizar_novedad";
import crear_comentario from "../../service/registro_horas_trbajadas/crear_comentario";
import "../../Scss/horas_monitores/hoja_monitor.css";

const REGISTROS_POR_PAGINA = 10;

const generarOpciones = () => {
  const opts = [];
  for (let h = 6; h <= 22; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 22 && m > 0) break;
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      opts.push(`${hh}:${mm}:00`);
    }
  }
  return opts;
};

const TIME_OPTIONS = generarOpciones();
const fmtFecha = (f) => { if (!f) return ""; const [y, mo, d] = f.split("-"); return `${d}/${mo}/${y}`; };
const fmtHora = (h) => (h ? h.slice(0, 5) : "");

const HojaMonitor = () => {
  const [registros, setRegistros] = useState([]);
  const [totalHoras, setTotalHoras] = useState(0);
  const [temporada, setTemporada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [IsProfesional, setIsProfesional] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    hora_inicio: "06:00:00",
    hora_fin: "06:00:00",
    descripcion: "",
  });

  const [showEditNovedad, setShowEditNovedad]       = useState(false);
  const [selectedNovedad, setSelectedNovedad]       = useState({ id: null, tipo: "", horas: "", observacion: "" });
  const [loadingEditNovedad, setLoadingEditNovedad] = useState(false);

  const [showVerComentarios,  setShowVerComentarios]  = useState(false);
  const [registroActivo, setRegistroActivo]           = useState(null);
  const [nuevoComentario, setNuevoComentario]         = useState("");
  const [loadingComentario, setLoadingComentario]     = useState(false);

  const [horasActuales, setHorasActuales] = useState(0);
  const [festivosLaborables, setFestivosLaborables] = useState([]);
  const [nombreTrabajador, setNombreTrabajador] = useState("");
  const [horasEsperadasBackend, setHorasEsperadasBackend] = useState(null);
  const [totalHorasAjustadas, setTotalHorasAjustadas] = useState(null);
  const [totalAdiciones, setTotalAdiciones] = useState(null);
  const [totalDisminuciones, setTotalDisminuciones] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await obtener_registros_por_trabajador();
      if (data.registros) {
        const temp = data.registros.temporada ?? null;
        setRegistros(data.registros.registros);
        setTotalHoras(data.registros.total_horas);
        setHorasActuales(data.registros.horas_actuales ?? 0);
        setIsProfesional(data.usuario_profesional);
        setNombreTrabajador(data.registros.nombre_trabajador);
        setTemporada(temp);
        setHorasEsperadasBackend(data.registros.horasEsperadas ?? null);
        setTotalHorasAjustadas(data.registros.totalHorasAjustadas ?? null);
        setTotalAdiciones(data.registros.totalAdiciones ?? null);
        setTotalDisminuciones(data.registros.totalDisminuciones ?? null);

        if (temp?.fecha_inicio) {
          const fechaFin = temp.fecha_fin || new Date().toISOString().split("T")[0];
          const resultadoFestivos = await obtener_festivos_colombia(temp.fecha_inicio, fechaFin);
          if (resultadoFestivos) {
            const soloLaborables = resultadoFestivos.festivos.filter((f) => {
              const dow = new Date(f.date + "T00:00:00").getDay();
              return dow >= 1 && dow <= 5;
            });
            setFestivosLaborables(soloLaborables);
          }
        }
      }
    };
    getData();
  }, []);

  const totalPaginas = Math.ceil(registros.length / REGISTROS_POR_PAGINA);
  const registrosPagina = registros.slice(
    (paginaActual - 1) * REGISTROS_POR_PAGINA,
    paginaActual * REGISTROS_POR_PAGINA
  );

  const precioHora = temporada?.precio_hora ?? 8578;

  const hoy0 = new Date();
  hoy0.setHours(0, 0, 0, 0);
  const ayer0 = new Date(hoy0);
  ayer0.setDate(hoy0.getDate() - 1);
  const festivosPasados = festivosLaborables.filter((f) =>
    new Date(f.date + "T00:00:00") <= ayer0
  ).length;

  const balance = horasEsperadasBackend !== null
    ? parseFloat((horasActuales - horasEsperadasBackend).toFixed(1))
    : null;
  const horasFaltantes = totalHorasAjustadas !== null
    ? Math.max(0, totalHorasAjustadas - horasActuales).toFixed(1)
    : null;

  const handleEliminarNovedad = async (idNovedad) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar novedad?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cc0000",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirmacion.isConfirmed) return;

    const resultado = await eliminar_novedad(idNovedad);
    if (!resultado) return;

    setTemporada({ ...resultado, novedades: resultado.novedades ?? [] });
    setHorasEsperadasBackend(resultado.horasEsperadas ?? null);
    setTotalHorasAjustadas(resultado.totalHorasAjustadas ?? null);
    setTotalAdiciones(resultado.totalAdiciones ?? null);
    setTotalDisminuciones(resultado.totalDisminuciones ?? null);
  };

  const openEditNovedad = (n) => {
    setSelectedNovedad({ id: n.id, tipo: n.tipo, horas: parseFloat(n.horas).toFixed(1), observacion: n.observacion || "" });
    setShowEditNovedad(true);
  };

  const saveEditNovedad = async () => {
    if (!selectedNovedad.tipo || !selectedNovedad.horas || parseFloat(selectedNovedad.horas) <= 0) return;
    setLoadingEditNovedad(true);
    const resultado = await actualizar_novedad(selectedNovedad.id, {
      tipo: selectedNovedad.tipo,
      horas: selectedNovedad.horas,
      observacion: selectedNovedad.observacion || undefined,
    });
    setLoadingEditNovedad(false);
    if (!resultado) return;

    setShowEditNovedad(false);
    setTemporada({ ...resultado, novedades: resultado.novedades ?? [] });
    setHorasEsperadasBackend(resultado.horasEsperadas ?? null);
    setTotalHorasAjustadas(resultado.totalHorasAjustadas ?? null);
    setTotalAdiciones(resultado.totalAdiciones ?? null);
    setTotalDisminuciones(resultado.totalDisminuciones ?? null);
  };

  const handleGuardarComentario = async () => {
    if (!nuevoComentario.trim()) return;
    setLoadingComentario(true);
    const result = await crear_comentario(registroActivo.id, nuevoComentario.trim());
    setLoadingComentario(false);
    if (!result) return;

    setRegistros((prev) =>
      prev.map((r) => r.id === registroActivo.id ? { ...r, comentarios: result } : r)
    );
    setRegistroActivo((prev) => ({ ...prev, comentarios: result }));
    setNuevoComentario("");
  };

  const openVerComentarios = (r) => {
    setRegistroActivo({ id: r.id, descripcion: r.descripcion, comentarios: r.comentarios ?? [] });
    setNuevoComentario("");
    setShowVerComentarios(true);
  };

  const openDetail = (id) => {
    const r = registros.find((x) => x.id === id);
    if (!r) return;
    setSelectedRegistro(r);
    setShowDetail(true);
  };

  const openEdit = (id) => {
    const r = registros.find((x) => x.id === id);
    if (!r) return;
    setSelectedId(id);
    setFormData({
      fecha: r.fecha || "",
      hora_inicio: r.hora_inicio || "06:00:00",
      hora_fin: r.hora_fin || "06:00:00",
      descripcion: r.descripcion || "",
    });
    setShowEdit(true);
  };

  const openDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  // ── actualizar ────────────────────────────────────────────────────────────
  const saveEdit = async () => {
    setLoadingEdit(true);
    const id_semestre = desencriptar(sessionStorage.getItem("id_semestre_actual"));
    const resultado = await actualizar_registro(selectedId, { ...formData, semestre: id_semestre });
    setLoadingEdit(false);

    if (!resultado) return; // el service ya muestra el Swal de error

    // Actualizar el estado local con los datos que devuelve el backend
    setRegistros((prev) =>
      prev.map((r) => (r.id === selectedId ? { ...r, ...resultado } : r))
    );

    // Recalcular total de horas sumando desde el estado actualizado
    setTotalHoras((prev) => {
      const registroAnterior = registros.find((r) => r.id === selectedId);
      const diff = parseFloat(resultado.horas_trabajadas) - parseFloat(registroAnterior?.horas_trabajadas || 0);
      return parseFloat((prev + diff).toFixed(1));
    });

    setShowEdit(false);
  };

  // ── eliminar ──────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    setLoadingDelete(true);
    const eliminado = await eliminar_registro(selectedId);
    setLoadingDelete(false);

    if (!eliminado) return; // el service ya muestra el Swal de error

    const registroEliminado = registros.find((r) => r.id === selectedId);
    const horasEliminadas = parseFloat(registroEliminado?.horas_trabajadas || 0);

    setRegistros((prev) => prev.filter((r) => r.id !== selectedId));
    setTotalHoras((prev) => parseFloat((prev - horasEliminadas).toFixed(1)));

    // Ajustar página si queda vacía tras eliminar
    const nuevosRegistros = registros.filter((r) => r.id !== selectedId);
    const nuevasTotalPaginas = Math.ceil(nuevosRegistros.length / REGISTROS_POR_PAGINA);
    if (paginaActual > nuevasTotalPaginas && nuevasTotalPaginas > 0) {
      setPaginaActual(nuevasTotalPaginas);
    }

    setShowDelete(false);
  };

  return (
    <div className="hm-page">
      <div className="hm-header-row">
        <h2 className="hm-title">Hoja del Monitor</h2>
        <h2 className="hm-title">Horas</h2>
      </div>
      <div className="hm-divider" />

      <Row className="hm-body-row g-3">
        <Col xs={12} lg={8}>
          <div className="hm-name-badge">{nombreTrabajador} </div>
          <div className="hm-table-wrap">
            <div className="hm-table-header">
              <span>Fecha y hora</span>
              <span>Descripción</span>
              <span>Horas</span>
              <span>Acciones</span>
            </div>
            {registros.length === 0 ? (
              <div className="hm-empty">No hay registros disponibles.</div>
            ) : (
              <>
                {registrosPagina.map((r) => (
                  <div className="hm-record-row" key={r.id}>
                    <div className="hm-date-time">
                      <span className="hm-date">{fmtFecha(r.fecha)}</span>
                      <span className="hm-time">{fmtHora(r.hora_inicio)} – {fmtHora(r.hora_fin)}</span>
                    </div>
                    <div className="hm-desc">
                      {r.descripcion
                        ? r.descripcion.length > 60 ? r.descripcion.slice(0, 60) + "..." : r.descripcion
                        : "—"}
                    </div>
                    <div className="hm-hours-col">
                      <span className="hm-hours-badge">{parseFloat(r.horas_trabajadas).toFixed(1)}</span>
                    </div>
                    <div className="hm-actions" style={{ flexWrap: "wrap", rowGap: "4px" }}>
                      <button className="hm-btn-icon hm-btn-detail" onClick={() => openDetail(r.id)}>Ver</button>
                      {!IsProfesional && (
                        <>
                          <button className="hm-btn-icon" onClick={() => openEdit(r.id)}>Editar</button>
                          <button className="hm-btn-icon hm-btn-danger" onClick={() => openDelete(r.id)}>Eliminar</button>
                        </>
                      )}
                      {IsProfesional && (
                        <button className="hm-btn-icon" onClick={() => openVerComentarios(r)}>Comentarios</button>
                      )}
                      {!IsProfesional && (r.comentarios?.length ?? 0) > 0 && (
                        <button className="hm-btn-icon" onClick={() => openVerComentarios(r)}>Comentarios</button>
                      )}
                    </div>
                  </div>
                ))}
                {totalPaginas > 1 && (
                  <div className="hm-pagination">
                    <button className="hm-page-btn" onClick={() => setPaginaActual((p) => Math.max(1, p - 1))} disabled={paginaActual === 1}>‹</button>
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                      <button key={n} className={`hm-page-btn ${paginaActual === n ? "hm-page-btn--active" : ""}`} onClick={() => setPaginaActual(n)}>{n}</button>
                    ))}
                    <button className="hm-page-btn" onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas}>›</button>
                  </div>
                )}
              </>
            )}
          </div>
        </Col>

        <Col xs={12} lg={4}>
          {/* ── TARJETA TEMPORADA (solo lectura) ── */}
          <div className="hm-right-card" style={{ marginBottom: "1rem", padding: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <span style={{ fontWeight: 800, fontSize: "13px" }}>Periodo de vinculación</span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                {!temporada && (
                  <span style={{ background: "#fff8e1", color: "#b8860b", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Sin registro</span>
                )}
                {temporada && !temporada.is_default && (
                  <span style={{ background: "#e6f9f0", color: "#1a7a4a", fontSize: "11px", padding: "2px 10px", borderRadius: "6px" }}>Activa</span>
                )}
                {temporada?.is_default && (
                  <span style={{ background: "#fff3e0", color: "#e65100", fontSize: "10px", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    ⚠ Datos por defecto, favor actualizar o confirmar la temporada
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { label: "Fecha inicio", valor: temporada ? fmtFecha(temporada.fecha_inicio) : "N/D" },
                { label: "Fecha fin",    valor: temporada ? fmtFecha(temporada.fecha_fin ?? "") : "N/D" },
                { label: "Hrs/semana",  valor: temporada ? `${temporada.horas_semanales} hrs` : "N/D" },
                { label: "Semestre",    valor: temporada ? temporada.semestre : "N/D" },
              ].map(({ label, valor }) => (
                <div key={label} style={{ background: "#f5f5f5", borderRadius: "0.5rem", padding: "0.5rem 0.7rem" }}>
                  <div style={{ fontSize: "10px", color: "#888", marginBottom: "2px" }}>{label}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: valor === "N/D" ? "#bbb" : "#333" }}>{valor}</div>
                </div>
              ))}
            </div>

            {temporada?.novedades?.length > 0 && (
              <div style={{ marginTop: "0.8rem" }}>
                <div style={{ fontSize: "11px", color: "#888", fontWeight: 600, marginBottom: "6px" }}>
                  Historial de modificaciones
                </div>
                {temporada.novedades.map((n) => {
                  const esAdicion = n.tipo === "ADICION";
                  const dt = new Date(n.fecha_efectiva);
                  const fechaStr = dt.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
                  const horaStr = dt.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
                  return (
                    <div key={n.id} style={{ marginBottom: "5px", padding: "6px 8px", background: esAdicion ? "#e6f9f0" : "#fff0f0", borderRadius: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ background: esAdicion ? "#1a7a4a" : "#cc0000", color: "#fff", padding: "2px 8px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap" }}>
                            {esAdicion ? "Adición" : "Disminución"}
                          </span>
                          <span style={{ fontSize: "12px", color: "#333" }}>
                            {esAdicion ? "+" : "-"}{parseFloat(n.horas).toFixed(1)} horas · {fechaStr} · {horaStr}
                          </span>
                        </div>
                        {IsProfesional && (
                          <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                            <button
                              onClick={() => openEditNovedad(n)}
                              style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#f0f0f0", color: "#333", border: "1px solid #ccc", cursor: "pointer", fontWeight: 700 }}
                            >Editar</button>
                            <button
                              onClick={() => handleEliminarNovedad(n.id)}
                              style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#cc0000", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700 }}
                            >Eliminar</button>
                          </div>
                        )}
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
          </div>

          {/* ── TARJETA MÉTRICAS ── */}
          <div className="hm-right-card">
            <div className="hm-right-row hm-red">
              <span>Valor hora</span>
              <span>${precioHora.toLocaleString("es-CO")}</span>
            </div>
            <div className="hm-right-row hm-red">
              <span>Días festivos hasta hoy</span>
              <span>{festivosPasados}</span>
            </div>
            <div className="hm-metric">
              <span className="hm-metric-label">Total horas monitoría</span>
              <span className="hm-metric-value">{totalHorasAjustadas !== null ? totalHorasAjustadas.toFixed(1) : "—"}</span>
            </div>
            <div className="hm-metric">
              <span className="hm-metric-label">Total adición horas</span>
              <span className="hm-metric-value" style={{ color: totalAdiciones ? "#1a7a4a" : undefined }}>
                {totalAdiciones !== null ? `+${totalAdiciones.toFixed(1)}` : "—"}
              </span>
            </div>
            <div className="hm-metric">
              <span className="hm-metric-label">Total disminución horas</span>
              <span className="hm-metric-value" style={{ color: totalDisminuciones ? "#cc0000" : undefined }}>
                {totalDisminuciones !== null ? `-${totalDisminuciones.toFixed(1)}` : "—"}
              </span>
            </div>
            <div className="hm-metric">
              <span className="hm-metric-label">Horas cumplidas</span>
              <span className="hm-metric-value">{horasActuales.toFixed(1)}</span>
            </div>
            <div className="hm-metric">
              <span className="hm-metric-label">Horas esperadas hasta hoy</span>
              <span className="hm-metric-value">{horasEsperadasBackend !== null ? horasEsperadasBackend.toFixed(1) : "—"}</span>
            </div>
            <div className="hm-metric">
              <span className="hm-metric-label">Horas pendientes por cumplir</span>
              <span
                className="hm-metric-value"
                style={{
                  backgroundColor: balance === null ? undefined : balance < 0 ? "#ffcccc" : "#ccf0d8",
                  color: balance === null ? undefined : balance < 0 ? "#cc0000" : "#1a7a4a",
                }}
              >
                {balance !== null ? `${balance >= 0 ? "+" : ""}${balance.toFixed(1)}` : "—"}
              </span>
            </div>
            <div className="hm-metric">
              <span className="hm-metric-label">Horas faltantes a cumplir en el periodo</span>
              <span className="hm-metric-value">{horasFaltantes !== null ? horasFaltantes : "—"}</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* MODAL DETALLE */}
      <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
        <Modal.Header closeButton className="hm-modal-header">
          <Modal.Title className="hm-modal-title">Detalle del registro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="hm-modal-body">
          {selectedRegistro && (
            <div className="hm-detail-grid">
              <div className="hm-detail-item"><span className="hm-detail-label">Fecha</span><span className="hm-detail-value">{fmtFecha(selectedRegistro.fecha)}</span></div>
              <div className="hm-detail-item"><span className="hm-detail-label">Hora inicio</span><span className="hm-detail-value">{fmtHora(selectedRegistro.hora_inicio)}</span></div>
              <div className="hm-detail-item"><span className="hm-detail-label">Hora fin</span><span className="hm-detail-value">{fmtHora(selectedRegistro.hora_fin)}</span></div>
              <div className="hm-detail-item"><span className="hm-detail-label">Horas trabajadas</span><span className="hm-detail-value hm-detail-hours">{parseFloat(selectedRegistro.horas_trabajadas).toFixed(1)} hrs</span></div>
              <div className="hm-detail-item hm-detail-full"><span className="hm-detail-label">Descripción</span><span className="hm-detail-desc">{selectedRegistro.descripcion || "—"}</span></div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" style={{ background: "#D42B2B", border: "none" }} onClick={() => setShowDetail(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal show={showEdit} onHide={() => !loadingEdit && setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px", fontWeight: 500 }}>Actualizar registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="hm-form-label">Fecha</Form.Label>
            <Form.Control type="date" value={formData.fecha} min={temporada?.fecha_inicio} max={new Date().toISOString().split("T")[0]} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="hm-form-label">Hora inicio</Form.Label>
                <Form.Select value={formData.hora_inicio} onChange={(e) => setFormData({ ...formData, hora_inicio: e.target.value })}>
                  {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t.slice(0, 5)}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="hm-form-label">Hora fin</Form.Label>
                <Form.Select value={formData.hora_fin} onChange={(e) => setFormData({ ...formData, hora_fin: e.target.value })}>
                  {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t.slice(0, 5)}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label className="hm-form-label">Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Descripción de la actividad..." value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowEdit(false)} disabled={loadingEdit}>Cancelar</Button>
          <Button size="sm" style={{ background: "#D42B2B", border: "none" }} onClick={saveEdit} disabled={loadingEdit}>
            {loadingEdit ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ELIMINAR */}
      <Modal show={showDelete} onHide={() => !loadingDelete && setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px", fontWeight: 500 }}>Eliminar registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "13px", color: "#555" }}>
            ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowDelete(false)} disabled={loadingDelete}>Cancelar</Button>
          <Button variant="danger" size="sm" onClick={confirmDelete} disabled={loadingDelete}>
            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL COMENTARIOS */}
      <Modal show={showVerComentarios} onHide={() => !loadingComentario && setShowVerComentarios(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px", fontWeight: 500 }}>Comentarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registroActivo?.descripcion && (
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "1rem" }}>
              <strong>Actividad:</strong> {registroActivo.descripcion}
            </p>
          )}
          {(registroActivo?.comentarios ?? []).length === 0 ? (
            <p style={{ fontSize: "13px", color: "#aaa", textAlign: "center", padding: "0.5rem 0 1rem" }}>Sin comentarios aún.</p>
          ) : (
            (registroActivo?.comentarios ?? []).map((c) => {
              const dt = new Date(c.fecha_creacion);
              const fechaStr = dt.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
              const horaStr  = dt.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
              return (
                <div key={c.id} style={{ marginBottom: "0.8rem", padding: "0.6rem 0.8rem", background: "#f5f5f5", borderRadius: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, fontSize: "13px" }}>{c.nombre_autor}</span>
                    <span style={{ background: "#cc0000", color: "#fff", fontSize: "10px", padding: "1px 7px", borderRadius: "99px", fontWeight: 700 }}>{c.rol_autor}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>{fechaStr} · {horaStr}</div>
                  <div style={{ fontSize: "13px", color: "#333" }}>{c.contenido}</div>
                </div>
              );
            })
          )}
          {IsProfesional && (
            <Form.Group style={{ marginTop: "1rem", borderTop: "1px solid #eee", paddingTop: "0.8rem" }}>
              <Form.Label className="hm-form-label">Agregar comentario</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                placeholder="Escribe tu comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                disabled={loadingComentario}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowVerComentarios(false)} disabled={loadingComentario}>Cerrar</Button>
          {IsProfesional && (
            <Button size="sm" style={{ background: "#D42B2B", border: "none" }} onClick={handleGuardarComentario} disabled={loadingComentario || !nuevoComentario.trim()}>
              {loadingComentario ? "Guardando..." : "Guardar comentario"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* MODAL EDITAR NOVEDAD */}
      <Modal show={showEditNovedad} onHide={() => !loadingEditNovedad && setShowEditNovedad(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px", fontWeight: 500 }}>Editar novedad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="hm-form-label">Tipo *</Form.Label>
                <Form.Select value={selectedNovedad.tipo} onChange={(e) => setSelectedNovedad(prev => ({ ...prev, tipo: e.target.value }))}>
                  <option value="ADICION">Adición</option>
                  <option value="DISMINUCION">Disminución</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="hm-form-label">Horas *</Form.Label>
                <Form.Control type="number" min={0.1} step={0.5} value={selectedNovedad.horas} onChange={(e) => setSelectedNovedad(prev => ({ ...prev, horas: e.target.value }))} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label className="hm-form-label">Observación (opcional)</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="Motivo..." value={selectedNovedad.observacion} onChange={(e) => setSelectedNovedad(prev => ({ ...prev, observacion: e.target.value }))} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowEditNovedad(false)} disabled={loadingEditNovedad}>Cancelar</Button>
          <Button size="sm" style={{ background: "#D42B2B", border: "none" }} onClick={saveEditNovedad} disabled={loadingEditNovedad}>
            {loadingEditNovedad ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HojaMonitor;
