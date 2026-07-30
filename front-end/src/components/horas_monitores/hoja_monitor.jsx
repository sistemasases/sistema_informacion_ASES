import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import obtener_registros_por_trabajador from "../../service/registro_horas_trbajadas/get_all_by_id";
import actualizar_registro from "../../service/registro_horas_trbajadas/actualizar_registro";
import eliminar_registro from "../../service/registro_horas_trbajadas/eliminar_registro";
import obtener_festivos_colombia from "../../service/registro_horas_trbajadas/dias_festivos";
import "../../Scss/horas_monitores/hoja_monitor.css";

const HORAS_A_CUMPLIR = 344;
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
  const [diasFestivos, setDiasFestivos] = useState(0);
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


  const [nombreTrabajador, setNombreTrabajador] = useState("");
  

  useEffect(() => {

    
    const getData = async () => {
      const data = await obtener_registros_por_trabajador();
      if (data.registros) {
        setRegistros(data.registros.registros);
        setTotalHoras(data.registros.total_horas);
        setIsProfesional(data.usuario_profesional);
        setNombreTrabajador(data.registros.nombre_trabajador)
        
      }
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

  const totalPaginas = Math.ceil(registros.length / REGISTROS_POR_PAGINA);
  const registrosPagina = registros.slice(
    (paginaActual - 1) * REGISTROS_POR_PAGINA,
    paginaActual * REGISTROS_POR_PAGINA
  );

  const horasDeuda = Math.max(0, HORAS_A_CUMPLIR - totalHoras).toFixed(1);

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
    const resultado = await actualizar_registro(selectedId, formData);
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
      {/* ── sin cambios en el JSX del render ── */}
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
                    <div className="hm-actions">
                      <button className="hm-btn-icon hm-btn-detail" onClick={() => openDetail(r.id)}>Ver</button>
                      {!IsProfesional && (
                        <>
                          <button className="hm-btn-icon" onClick={() => openEdit(r.id)}>Editar</button>
                          <button className="hm-btn-icon hm-btn-danger" onClick={() => openDelete(r.id)}>Eliminar</button>
                        </>
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
          <div className="hm-right-card">
            <div className="hm-right-row hm-red"><span>Precio hora</span><span>$10,000</span></div>
            <div className="hm-right-row hm-red"><span>Días festivos</span>  <span>{diasFestivos}</span></div>
            <div className="hm-metric"><span className="hm-metric-label">Horas a cumplir</span><span className="hm-metric-value">{HORAS_A_CUMPLIR}</span></div>
            <div className="hm-metric"><span className="hm-metric-label">Horas realizadas</span><span className="hm-metric-value hm-metric-highlight">{totalHoras.toFixed(1)}</span></div>
            <div className="hm-metric"><span className="hm-metric-label">Horas en deuda</span><span className="hm-metric-value">{horasDeuda}</span></div>
          </div>
        </Col>
      </Row>

      {/* MODAL DETALLE — sin cambios */}
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

      {/* MODAL EDITAR — solo el botón Guardar tiene loading */}
      <Modal show={showEdit} onHide={() => !loadingEdit && setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px", fontWeight: 500 }}>Actualizar registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="hm-form-label">Fecha</Form.Label>
            <Form.Control type="date" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} />
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

      {/* MODAL ELIMINAR — solo el botón Eliminar tiene loading */}
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
    </div>
  );
};

export default HojaMonitor;