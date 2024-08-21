import React, { useState } from "react";
import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const DatosEntrevistado = ({ datos_entrevistado }) => {
  const [desarrollaActividad, setDesarrollaActividad] = useState("");
  const [actividadesOcio, setActividadesOcio] = useState("");
  const [actividadDeportiva, setActividadDeportiva] = useState("");
  const [programaAcompanamiento, setProgramaAcompanamiento] = useState("");
  const [programaAcompanamientoOtro, setProgramaAcompanamientoOtro] =
    useState(""); // Estado para programa de acompañamiento
  const [orientacionSexual, setOrientacionSexual] = useState("");
  const [orientacionSexualOtro, setOrientacionSexualOtro] = useState(""); // Estado para orientación sexual
  const [autoreconocimientoEtnico, setAutoreconocimientoEtnico] = useState("");
  const [autoreconocimientoEtnicoOtro, setAutoreconocimientoEtnicoOtro] =
    useState(""); // Estado para autoreconocimiento étnico

  const handleProgramaAcompanamientoChange = (e) => {
    const value = e.target.value;
    setProgramaAcompanamiento(value);
    if (value !== "Otro") {
      setProgramaAcompanamientoOtro(""); // Limpiar el campo si no es "Otro"
    }
  };

  const handleOrientacionSexualChange = (e) => {
    const value = e.target.value;
    setOrientacionSexual(value);
    if (value !== "Otro") {
      setOrientacionSexualOtro(""); // Limpiar el campo si no es "Otro"
    }
  };

  const handleAutoreconocimientoEtnicoChange = (e) => {
    const value = e.target.value;
    setAutoreconocimientoEtnico(value);
    if (value !== "Otro") {
      setAutoreconocimientoEtnicoOtro(""); // Limpiar el campo si no es "Otro"
    }
  };

  return (
    <div className="space_content">
      <form>
        <div className="container_carac">
          <div className="full-width">
            <p className="titulo">Datos personales</p>

            <div className="inline-input-group">
              <label>Fecha de nacimiento</label>
              <input type="date" className="input-type-date" />
              <label>Procedencia</label>
              <input
                type="text"
                className="input-type-text"
                placeholder="Ciudad"
              />
              <input
                type="text"
                className="input-type-text"
                placeholder="País"
              />
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>
                ¿Desarrolla alguna otra actividad en la Universidad?
              </label>
              <select
                className="select-type"
                value={desarrollaActividad}
                onChange={(e) => setDesarrollaActividad(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {desarrollaActividad === "Si" && (
                <div className="conditional-activities">
                  <label>¿Cuál?</label>
                  <select className="select-type">
                    <option>Monitor(a)</option>
                    <option>Docente</option>
                    <option>Empleado(a)</option>
                    <option>Representante estudiantil</option>
                    <option>
                      Integrante de algún colectivo/grupo estudiantil
                    </option>
                    <option>Otra ¿Cuál?</option>
                  </select>
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>Orientación sexual</label>
              <select
                className="select-type"
                value={orientacionSexual}
                onChange={handleOrientacionSexualChange}
              >
                <option value="">Seleccionar</option>
                <option value="Lesbiana">Lesbiana</option>
                <option value="Gay">Gay</option>
                <option value="Bisexual">Bisexual</option>
                <option value="Pansexual">Pansexual</option>
                <option value="Heterosexual">Heterosexual</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                <option value="Otro">Otro ¿Cuál?</option>
              </select>
              {orientacionSexual === "Otro" && (
                <div>
                  <label>Especifica:</label>
                  <input
                    type="text"
                    className="input-type-text"
                    placeholder="Especifica aquí"
                    value={orientacionSexualOtro}
                    onChange={(e) => setOrientacionSexualOtro(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>Autoreconocimiento Étnico</label>
              <select
                className="select-type"
                value={autoreconocimientoEtnico}
                onChange={handleAutoreconocimientoEtnicoChange}
              >
                <option value="">Seleccionar</option>
                <option value="Indígena">Indígena</option>
                <option value="ROM">ROM</option>
                <option value="Raizal del archipiélago de San Andrés y Providencia">
                  Raizal del archipiélago de San Andrés y Providencia
                </option>
                <option value="Palenquero de San Basilio">
                  Palenquero de San Basilio
                </option>
                <option value="Negro(a), Mulato(a), Afrocolombiano(a), Afrodescendiente">
                  Negro(a), Mulato(a), Afrocolombiano(a), Afrodescendiente
                </option>
                <option value="Blanco(a), Mestizo(a)">
                  Blanco(a), Mestizo(a)
                </option>
                <option value="Ninguno de los anteriores">
                  Ninguno de los anteriores
                </option>
                <option value="Otro">Otro ¿Cuál?</option>
              </select>
              {autoreconocimientoEtnico === "Otro" && (
                <div>
                  <label>Especifica:</label>
                  <input
                    type="text"
                    className="input-type-text"
                    placeholder="Especifica aquí"
                    value={autoreconocimientoEtnicoOtro}
                    onChange={(e) =>
                      setAutoreconocimientoEtnicoOtro(e.target.value)
                    }
                  />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>Estado civil</label>
              <select className="select-type">
                <option>Casado/a</option>
                <option>Soltero/a</option>
                <option>Divorciado/a</option>
                <option>Separado/a</option>
                <option>Unión Libre</option>
                <option>Viudo/a</option>
              </select>
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>¿Práctica actividades de ocio y tiempo libre?</label>
              <select
                className="select-type"
                value={actividadesOcio}
                onChange={(e) => setActividadesOcio(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {actividadesOcio === "Si" && (
                <div className="conditional-activities">
                  <label>¿Qué actividades práctica?</label>
                  <input type="text" className="input-type-text" />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>¿Práctica alguna actividad deportiva?</label>
              <select
                className="select-type"
                value={actividadDeportiva}
                onChange={(e) => setActividadDeportiva(e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {actividadDeportiva === "Si" && (
                <div className="conditional-activities">
                  <label>¿Qué actividades práctica?</label>
                  <input type="text" className="input-type-text" />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>
                ¿Pertenece a otro programa o proyecto de acompañamiento de la
                universidad?
              </label>
              <select
                className="select-type"
                value={programaAcompanamiento}
                onChange={handleProgramaAcompanamientoChange}
              >
                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {programaAcompanamiento === "Si" && (
                <div>
                  <label>¿Cuál?</label>
                  <select
                    className="programa-acompañamiento-selected"
                    value={programaAcompanamientoOtro}
                    onChange={(e) =>
                      setProgramaAcompanamientoOtro(e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="Estrategia de acompañamiento Ases">
                      Estrategia de acompañamiento Ases
                    </option>
                    <option value="Acompañamiento Graca">
                      Acompañamiento Graca
                    </option>
                    <option value="Proyecto de Etnicidad">
                      Proyecto de Etnicidad
                    </option>
                    <option value="Proyecto de Género">
                      Proyecto de Género
                    </option>
                    <option value="Proyecto Campus Diverso">
                      Proyecto Campus Diverso
                    </option>
                    <option value="Universidad Saludable">
                      Universidad Saludable
                    </option>
                    <option value="Práctica profesional Rediversia">
                      Práctica profesional Rediversia
                    </option>
                    <option value="Proyecto Cultura">Proyecto Cultura</option>
                    <option value="Otro">Otro ¿Cuál?</option>
                  </select>
                  {programaAcompanamientoOtro === "Otro" && (
                    <div>
                      <label>Especifica:</label>
                      <input
                        type="text"
                        className="input-type-text"
                        placeholder="Especifica aquí"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="full-size-button color_red">Editar</button>
      </form>
    </div>
  );
};

export default DatosEntrevistado;
