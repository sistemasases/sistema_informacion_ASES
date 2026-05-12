import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../Scss/horas_monitores/registro_horas.css";



const esDomingo = (fechaStr) => {
  if (!fechaStr) return false;
  // Parsear como local para evitar el offset UTC
  const [year, month, day] = fechaStr.split("-").map(Number);
  const fecha = new Date(year, month - 1, day);
  return fecha.getDay() === 0;
};

const RegistroHorasForm = () => {
  const [form, setForm] = useState({
    semana_inicio: "",
    horas_trabajadas: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validar = () => {
    const nuevosErrores = {};

    if (!form.semana_inicio) {
      nuevosErrores.semana_inicio = "Selecciona la fecha de inicio de semana.";
    } else if (!esDomingo(form.semana_inicio)) {
      nuevosErrores.semana_inicio = "La fecha debe ser un domingo.";
    }

    const horas = parseFloat(form.horas_trabajadas);
    if (!form.horas_trabajadas) {
      nuevosErrores.horas_trabajadas = "Ingresa las horas trabajadas.";
    } else if (isNaN(horas) || horas <= 0) {
      nuevosErrores.horas_trabajadas = "Las horas deben ser un valor positivo.";
    } else if (horas > 99.9) {
      nuevosErrores.horas_trabajadas = "Máximo 99.9 horas por semana.";
    }

    return nuevosErrores;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al editar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitStatus(null);
  };

  const handleSubmit = () => {
    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      return;
    }

    // TODO: Conectar con el backend
    // El trabajador se obtiene desde la sesión en el backend
    const payload = {
      semana_inicio: form.semana_inicio,
      horas_trabajadas: parseFloat(form.horas_trabajadas),
    };

    console.log("Payload a enviar:", payload);
    setSubmitStatus("success");

    // Reset
    setForm({ semana_inicio: "", horas_trabajadas: "" });
    setErrors({});
  };

  const handleReset = () => {
    setForm({ semana_inicio: "", horas_trabajadas: "" });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="rhf-wrapper">
      {/* Encabezado */}
      <Row>
        <Col className="rhf-header-col">
          <h2 className="rhf-title">Registro de Horas</h2>
        </Col>
      </Row>

      <hr className="rhf-divider" />

      <Row className="rhf-content-row">
        {/* ── Columna izquierda: formulario ── */}
        <Col md={6}>
          <div className="rhf-card">
            <div className="rhf-card-header">
              <span className="rhf-card-icon">📋</span>
              <span>Datos del Registro</span>
            </div>

            {/* Semana inicio */}
            <div className="rhf-field-group">
              <label className="rhf-label">
                Inicio de Semana
                <span className="rhf-label-hint"> (solo domingos)</span>
              </label>
              <input
                type="date"
                name="semana_inicio"
                value={form.semana_inicio}
                onChange={handleChange}
                className={`rhf-input ${errors.semana_inicio ? "rhf-input--error" : ""} ${
                  form.semana_inicio && esDomingo(form.semana_inicio)
                    ? "rhf-input--valid"
                    : ""
                }`}
              />
              {errors.semana_inicio && (
                <span className="rhf-error-msg">{errors.semana_inicio}</span>
              )}
              {form.semana_inicio && esDomingo(form.semana_inicio) && (
                <span className="rhf-success-msg">✓ Domingo válido</span>
              )}
              {form.semana_inicio && !esDomingo(form.semana_inicio) && !errors.semana_inicio && (
                <span className="rhf-warn-msg">⚠ Selecciona un domingo</span>
              )}
            </div>

            {/* Horas trabajadas */}
            <div className="rhf-field-group">
              <label className="rhf-label">Horas Trabajadas</label>
              <div className="rhf-input-suffix-wrap">
                <input
                  type="number"
                  name="horas_trabajadas"
                  value={form.horas_trabajadas}
                  onChange={handleChange}
                  placeholder="0.0"
                  step="0.5"
                  min="0.5"
                  max="99.9"
                  className={`rhf-input rhf-input--with-suffix ${
                    errors.horas_trabajadas ? "rhf-input--error" : ""
                  }`}
                />
                <span className="rhf-input-suffix">HRS</span>
              </div>
              {errors.horas_trabajadas && (
                <span className="rhf-error-msg">{errors.horas_trabajadas}</span>
              )}
            </div>

            {/* Acciones */}
            <div className="rhf-actions">
              <Button className="rhf-btn-secondary" onClick={handleReset}>
                LIMPIAR
              </Button>
              <Button className="rhf-btn-primary" onClick={handleSubmit}>
                REGISTRAR HORAS
              </Button>
            </div>

            {/* Toast de resultado */}
            {submitStatus === "success" && (
              <div className="rhf-toast rhf-toast--success">
                ✓ Registro guardado exitosamente.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="rhf-toast rhf-toast--error">
                ✗ Error al guardar el registro. Intenta de nuevo.
              </div>
            )}
          </div>
        </Col>

        {/* ── Columna derecha: resumen ── */}
        <Col md={6}>
          <div className="rhf-summary-card">
            <div className="rhf-card-header">
              <span className="rhf-card-icon">📊</span>
              <span>Resumen del Registro</span>
            </div>

            <div className="rhf-summary-item">
              <span className="rhf-summary-label">Semana Inicio</span>
              <span className="rhf-summary-value">
                {form.semana_inicio && esDomingo(form.semana_inicio)
                  ? new Date(
                      ...form.semana_inicio.split("-").map((v, i) =>
                        i === 1 ? parseInt(v) - 1 : parseInt(v)
                      )
                    ).toLocaleDateString("es-CO", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </span>
            </div>

            <div className="rhf-summary-item">
              <span className="rhf-summary-label">Horas Trabajadas</span>
              <span
                className={`rhf-summary-value rhf-summary-value--hours ${
                  form.horas_trabajadas ? "rhf-summary-value--filled" : ""
                }`}
              >
                {form.horas_trabajadas ? `${parseFloat(form.horas_trabajadas).toFixed(1)} HRS` : "—"}
              </span>
            </div>

            {/* Mini calendar hint */}
            <div className="rhf-hint-box">
              <p className="rhf-hint-title">💡 Recuerda</p>
              <p className="rhf-hint-text">
                Solo se pueden registrar horas iniciando en <strong>domingo</strong>.
                Cada trabajador puede tener únicamente un registro por semana.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegistroHorasForm;