import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../Scss/horas_monitores/registro_horas.css";
import RegistroHorasService from "../../service/registro_horas_trbajadas/registro_horas_service";



// esta funcion se encarga de generar los rangos de horas validos
const generarOpcionesTiempo = () => {
  const opciones = [];
  for (let h = 6; h <= 22; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 22 && m > 0) break;
      const hStr = String(h).padStart(2, "0");
      const mStr = String(m).padStart(2, "0");
      opciones.push(`${hStr}:${mStr}`);
    }
  }
  return opciones;
};

const OPCIONES_TIEMPO = generarOpcionesTiempo();


// esta funcion calcula las horas basandose en la seleccion de rangos de el usuario
const calcularHoras = (inicio, fin) => {
  if (!inicio || !fin) return null;
  const [hI, mI] = inicio.split(":").map(Number);
  const [hF, mF] = fin.split(":").map(Number);
  const totalMin = (hF * 60 + mF) - (hI * 60 + mI);
  if (totalMin <= 0) return null;
  return (totalMin / 60).toFixed(1);
};

// funcion para dar formato a la fecha 
const formatearFecha = (fechaStr) => {
  if (!fechaStr) return "";
  const [year, month, day] = fechaStr.split("-");
  return `${day}/${month}/${year}`;
};


const RegistroHorasForm = () => {
  const [form, setForm] = useState({
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const horasCalculadas = calcularHoras(form.hora_inicio, form.hora_fin);

  // Opciones de hora_fin filtradas: solo mayores a hora_inicio
  const opcionesHoraFin = form.hora_inicio
    ? OPCIONES_TIEMPO.filter((t) => t > form.hora_inicio)
    : OPCIONES_TIEMPO;

  const validar = () => {
    const nuevosErrores = {};

    if (!form.fecha) {
      nuevosErrores.fecha = "Selecciona una fecha.";
    }

    if (!form.hora_inicio) {
      nuevosErrores.hora_inicio = "Selecciona la hora de inicio.";
    }

    if (!form.hora_fin) {
      nuevosErrores.hora_fin = "Selecciona la hora de fin.";
    } else if (form.hora_inicio && form.hora_fin <= form.hora_inicio) {
      nuevosErrores.hora_fin = "La hora de fin debe ser mayor a la de inicio.";
    }

    if (!form.descripcion || !form.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    }

    return nuevosErrores;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // si cambia hora_inicio, resetear hora_fin si ya no es válida
    if (name === "hora_inicio" && form.hora_fin && form.hora_fin <= value) {
      setForm((prev) => ({ ...prev, hora_inicio: value, hora_fin: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitStatus(null);
  };

  const handleSubmit = async () => {
    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      return;
    }

    const payload = {
      fecha: form.fecha,
      hora_inicio: form.hora_inicio,
      hora_fin: form.hora_fin,
      descripcion: form.descripcion,
    };

    const resultado = await RegistroHorasService.crear_registro_horas(payload);

    if (resultado) {
      setForm({ fecha: "", hora_inicio: "", hora_fin: "", descripcion: "" });
      setErrors({});
    }
  };

  const handleReset = () => {
    setForm({ fecha: "", hora_inicio: "", hora_fin: "", descripcion: "" });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="rhf-wrapper">
      <Row>
        <Col className="rhf-header-col">
          <h2 className="rhf-title">Registro de Horas</h2>
        </Col>
      </Row>

      <hr className="rhf-divider" />

      <Row className="rhf-content-row">
        {/* Columna izquierda: formulario */}
        <Col md={6}>
          <div className="rhf-card">
            <div className="rhf-card-header">
              <span>Datos del Registro</span>
            </div>

            {/* Fecha */}
            <div className="rhf-field-group">
              <label className="rhf-label">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                className={`rhf-input ${errors.fecha ? "rhf-input--error" : ""} ${
                  form.fecha ? "rhf-input--valid" : ""
                }`}
              />
              {errors.fecha && (
                <span className="rhf-error-msg">{errors.fecha}</span>
              )}
              {form.fecha && (
                <span className="rhf-success-msg">
                  ✓ {formatearFecha(form.fecha)}
                </span>
              )}
            </div>

            {/* Hora inicio y fin en la misma fila */}
            <div className="rhf-field-group">
              <label className="rhf-label">Rango de Horas</label>
              <div className="rhf-time-row">

                {/* Hora inicio */}
                <div className="rhf-time-col">
                  <label className="rhf-label-hint">Inicio</label>
                  <select
                    name="hora_inicio"
                    value={form.hora_inicio}
                    onChange={handleChange}
                    className={`rhf-select ${errors.hora_inicio ? "rhf-input--error" : ""} ${
                      form.hora_inicio ? "rhf-input--valid" : ""
                    }`}
                  >
                    <option value="">--:--</option>
                    {OPCIONES_TIEMPO.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.hora_inicio && (
                    <span className="rhf-error-msg">{errors.hora_inicio}</span>
                  )}
                </div>

                {/* Separador */}
                <span className="rhf-time-separator">→</span>

                {/* Hora fin */}
                <div className="rhf-time-col">
                  <label className="rhf-label-hint">Fin</label>
                  <select
                    name="hora_fin"
                    value={form.hora_fin}
                    onChange={handleChange}
                    className={`rhf-select ${errors.hora_fin ? "rhf-input--error" : ""} ${
                      form.hora_fin ? "rhf-input--valid" : ""
                    }`}
                  >
                    <option value="">--:--</option>
                    {opcionesHoraFin.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.hora_fin && (
                    <span className="rhf-error-msg">{errors.hora_fin}</span>
                  )}
                </div>

                {/* Horas calculadas */}
                {horasCalculadas && (
                  <div className="rhf-time-result">
                    <span className="rhf-time-result-value">{horasCalculadas}</span>
                    <span className="rhf-time-result-label">HRS</span>
                  </div>
                )}
              </div>
            </div>

            {/* Descripcion */}
            <div className="rhf-field-group">
              <label className="rhf-label">
                Descripción
                <span className="rhf-label-hint"> (Obligatorio)</span>
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Agrega una nota o descripción sobre las horas de este día..."
                rows={4}
                className="rhf-textarea"
              />
              {errors.descripcion && (
                <span className="rhf-error-msg">{errors.descripcion}</span>
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

        {/* Columna derecha: guia */}
        <Col md={6}>
          <div className="rhf-guide-card">
            <div className="rhf-card-header">
              <span>Guía de Registro</span>
            </div>

            <div className="rhf-guide-section rhf-guide-section--red">
              <p className="rhf-guide-section-title">Fecha del registro</p>
              <p className="rhf-guide-section-text">
                Selecciona el <strong>día exacto</strong> en el que trabajaste.
                Puedes tener múltiples registros en una misma semana, uno por
                cada día que hayas laborado.
              </p>
            </div>

            <div className="rhf-guide-section">
              <p className="rhf-guide-section-title">Rango de horas</p>
              <p className="rhf-guide-section-text">
                Selecciona la <strong>hora de inicio</strong> y la{" "}
                <strong>hora de fin</strong> de tu jornada. Los tiempos están
                disponibles en intervalos de <strong>15 minutos</strong>, entre
                las 6:00 y las 22:00. El total de horas se calculará
                automáticamente.
              </p>
            </div>

            <div className="rhf-guide-section rhf-guide-section--red">
              <p className="rhf-guide-section-title">Historial de registros</p>
              <p className="rhf-guide-section-text">
                Este formulario es solo para agregar nuevos registros. Para
                consultar o modificar tus registros anteriores dirígete a la vista de{" "}
                <strong>Hoja de resumen</strong>.
              </p>
            </div>

            <div className="rhf-guide-section">
              <p className="rhf-guide-section-title">Descripción</p>
              <p className="rhf-guide-section-text">
                El campo de descripción es opcional. Úsalo para dejar una nota
                sobre las actividades realizadas o cualquier observación
                relevante del día.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegistroHorasForm;