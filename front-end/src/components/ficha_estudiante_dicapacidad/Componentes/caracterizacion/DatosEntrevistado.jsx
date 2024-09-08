import React, { useState } from "react";
import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const DatosEntrevistado = ({ datos_estudiante_entrevistado }) => {
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

  const [stateDisabled, setStateDisabled] = useState(true);

  const [stateEntrevistado, setStateEntrevistado] = useState({
    fecha_nac: datos_estudiante_entrevistado.fecha_nac,
    ciudad: datos_estudiante_entrevistado.ciudad,
    pais: datos_estudiante_entrevistado.pais,

    desarrollaActividad: datos_estudiante_entrevistado.desarrollaActividad,
    desarrollaActividadData:
      datos_estudiante_entrevistado.desarrollaActividadData,
    orientacionSexual: datos_estudiante_entrevistado.orientacionSexual,
    orientacionSexualOtro: datos_estudiante_entrevistado.orientacionSexualOtro,
    autoreconocimientoEtnico:
      datos_estudiante_entrevistado.autoreconocimientoEtnico,
    autoreconocimientoEtnicoOtro:
      datos_estudiante_entrevistado.autoreconocimientoEtnicoOtro,
    estadoCivil: datos_estudiante_entrevistado.estadoCivil,
    actividadesOcio: datos_estudiante_entrevistado.actividadesOcio,
    actividadesOcioData: datos_estudiante_entrevistado.actividadesOcioData,
    actividadDeportiva: datos_estudiante_entrevistado.actividadDeportiva,
    actividadDeportivaData:
      datos_estudiante_entrevistado.actividadDeportivaData,
    programaAcompanamiento:
      datos_estudiante_entrevistado.programaAcompanamiento,
    programaAcompanamientoOtro:
      datos_estudiante_entrevistado.programaAcompanamientoOtro,
    programaAcompanamientoOtroData:
      datos_estudiante_entrevistado.programaAcompanamientoOtroData,
  });

  const handleUpdateEntrevistado = (e) => {
    e.preventDefault();
    setStateDisabled(true);
    console.log("Entrevistador actualizado");
    // console.log(datos_estudiante_entrevistado);
    console.log(stateEntrevistado);
  };

  const updateStateDisabled = () => {
    setStateDisabled(!stateDisabled);
  };

  return (
    <div className="space_content">
      <form>
        <div className="container_carac">
          <div className="full-width">
            <p className="titulo">Datos personales</p>

            <div className="inline-input-group">
              <label>Fecha de nacimiento</label>
              <input
                style={{
                  width: "126%",
                }}
                type="date"
                className="input-type-date"
                value={stateEntrevistado.fecha_nac}
                onChange={(e) =>
                  stateDisabled ? (
                    <></>
                  ) : (
                    setStateEntrevistado({
                      ...stateEntrevistado,
                      fecha_nac: e.value,
                    })
                  )
                }
                disabled={stateDisabled}
              />
              <label>Procedencia</label>
              <input
                type="text"
                className="input-type-text"
                placeholder="Ciudad"
                value={stateEntrevistado.ciudad}
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    ciudad: e.target.value,
                  })
                }
                disabled={stateDisabled}
              />
              <input
                type="text"
                className="input-type-text"
                placeholder="País"
                value={stateEntrevistado.pais}
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    pais: e.target.value,
                  })
                }
                disabled={stateDisabled}
              />
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>
                ¿Desarrolla alguna otra actividad en la Universidad?
              </label>
              <select
                className="select-type"
                value={
                  stateEntrevistado.desarrollaActividad === true ? "Si" : "No"
                }
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    desarrollaActividad: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {stateEntrevistado.desarrollaActividad === true && (
                <div className="conditional-activities">
                  <label>¿Cuál?</label>
                  <select
                    className="select-type"
                    value={
                      stateEntrevistado.desarrollaActividadData
                        ? stateEntrevistado.desarrollaActividadData
                        : "Sin Definir"
                    }
                    onChange={(e) =>
                      setStateEntrevistado({
                        ...stateEntrevistado,
                        desarrollaActividadData: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  >
                    <option value={"sin_definir"}>Selecionar</option>
                    <option value={"monitor"}>Monitor(a)</option>
                    <option value={"docente"}>Docente</option>
                    <option value={"empelado"}>Empleado(a)</option>
                    <option value={"representante_estudiantil"}>
                      Representante estudiantil
                    </option>
                    <option value={"colectivo"}>
                      Integrante de algún colectivo/grupo estudiantil
                    </option>
                    {/* <option>Otra ¿Cuál?</option> */}
                  </select>
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>Orientación sexual</label>
              <select
                className="select-type"
                value={stateEntrevistado.orientacionSexual}
                // onChange={handleOrientacionSexualChange}
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    orientacionSexual: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccionar</option>
                <option value="lesbiana">Lesbiana</option>
                <option value="gay">Gay</option>
                <option value="bisexual">Bisexual</option>
                <option value="pansexual">Pansexual</option>
                <option value="heterosexual">Heterosexual</option>
                <option value="prefiero no decirlo">Prefiero no decirlo</option>
                <option value="otro">Otro ¿Cuál?</option>
              </select>
              {stateEntrevistado.orientacionSexual === "otro" && (
                <div>
                  <label>Especifica:</label>
                  <input
                    type="text"
                    className="input-type-text"
                    placeholder="Especifica aquí"
                    value={stateEntrevistado.orientacionSexualOtro}
                    onChange={(e) =>
                      setStateEntrevistado({
                        ...stateEntrevistado,
                        orientacionSexualOtro: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>Autoreconocimiento Étnico</label>
              <select
                className="select-type"
                value={stateEntrevistado.autoreconocimientoEtnico}
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    autoreconocimientoEtnico: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="">Seleccionar</option>
                <option value="indigena">Indígena</option>
                <option value="rom">ROM</option>
                <option value="raizal_san_andres">
                  Raizal del archipiélago de San Andrés y Providencia
                </option>
                <option value="palenquero">Palenquero de San Basilio</option>
                <option value="negro">
                  Negro(a), Mulato(a), Afrocolombiano(a), Afrodescendiente
                </option>
                <option value="blanco">Blanco(a), Mestizo(a)</option>
                <option value="ninguno">Ninguno de los anteriores</option>
                <option value="otro">Otro ¿Cuál?</option>
              </select>
              {stateEntrevistado.autoreconocimientoEtnico === "otro" && (
                <div>
                  <label>Especifica:</label>
                  <input
                    type="text"
                    className="input-type-text"
                    placeholder="Especifica aquí"
                    value={stateEntrevistado.autoreconocimientoEtnicoOtro}
                    onChange={(e) =>
                      setStateEntrevistado({
                        ...stateEntrevistado,
                        autoreconocimientoEtnicoOtro: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>Estado civil</label>
              <select
                className="select-type"
                value={stateEntrevistado.estadoCivil}
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    estadoCivil: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value={"casado"}>Casado/a</option>
                <option value={"soltero"}>Soltero/a</option>
                <option value={"divorciado"}>Divorciado/a</option>
                <option value={"separado"}>Separado/a</option>
                <option value={"union"}>Unión Libre</option>
                <option value={"viudo"}>Viudo/a</option>
              </select>
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>¿Práctica actividades de ocio y tiempo libre?</label>
              <select
                className="select-type"
                value={stateEntrevistado.actividadesOcio === true ? "Si" : "No"}
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    actividadesOcio: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {stateEntrevistado.actividadesOcio === true && (
                <div className="conditional-activities">
                  <label>¿Qué actividades práctica?</label>
                  <input
                    type="text"
                    className="input-type-text"
                    value={stateEntrevistado.actividadesOcioData}
                    onChange={(e) =>
                      setStateEntrevistado({
                        ...stateEntrevistado,
                        actividadesOcioData: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="inline-input-group">
              <label>¿Práctica alguna actividad deportiva?</label>
              <select
                className="select-type"
                value={
                  stateEntrevistado.actividadDeportiva === true ? "Si" : "No"
                }
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    actividadDeportiva: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {stateEntrevistado.actividadDeportiva === true && (
                <div className="conditional-activities">
                  <label>¿Qué actividades práctica?</label>
                  <input
                    type="text"
                    className="input-type-text"
                    value={stateEntrevistado.actividadDeportivaData}
                    onChange={(e) =>
                      setStateEntrevistado({
                        ...stateEntrevistado,
                        actividadDeportivaData: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
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
                value={
                  stateEntrevistado.programaAcompanamiento === true
                    ? "Si"
                    : "No"
                }
                onChange={(e) =>
                  setStateEntrevistado({
                    ...stateEntrevistado,
                    programaAcompanamiento: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
              {stateEntrevistado.programaAcompanamiento === true && (
                <div>
                  <label>¿Cuál?</label>
                  <select
                    className="programa-acompañamiento-selected"
                    value={stateEntrevistado.programaAcompanamientoOtro}
                    onChange={(e) =>
                      setStateEntrevistado({
                        ...stateEntrevistado,
                        programaAcompanamientoOtro: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  >
                    <option value="sin_definir">Seleccionar</option>
                    <option value="ASES">
                      Estrategia de acompañamiento Ases
                    </option>
                    <option value="graca">Acompañamiento Graca</option>
                    <option value="etnicidad">Proyecto de Etnicidad</option>
                    <option value="genero">Proyecto de Género</option>
                    <option value="campus_diverso">
                      Proyecto Campus Diverso
                    </option>
                    <option value="u_saludable">Universidad Saludable</option>
                    <option value="pro_rediversa">
                      Práctica profesional Rediversia
                    </option>
                    <option value="pro_cultura">Proyecto Cultura</option>
                    <option value="otro">Otro ¿Cuál?</option>
                  </select>
                  {stateEntrevistado.programaAcompanamientoOtro === "otro" && (
                    <div>
                      <label>Especifica:</label>
                      <input
                        type="text"
                        className="input-type-text"
                        placeholder="Especifica aquí"
                        value={stateEntrevistado.programaAcompanamientoOtroData}
                        onChange={(e) =>
                          setStateEntrevistado({
                            ...stateEntrevistado,
                            programaAcompanamientoOtroData: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      {stateDisabled === true ? (
        <button
          className="full-size-button color_red"
          onClick={(e) => updateStateDisabled()}
        >
          Editar
        </button>
      ) : (
        <button
          className="full-size-button color_red"
          onClick={handleUpdateEntrevistado}
        >
          Enviar
        </button>
      )}
    </div>
  );
};

export default DatosEntrevistado;
