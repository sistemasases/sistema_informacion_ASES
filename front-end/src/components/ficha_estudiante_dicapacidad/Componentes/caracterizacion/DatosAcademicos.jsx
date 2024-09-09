import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import React, { useState } from "react";

const DatosAcademicos = ({ datos_academicos }) => {
  const [stateDisabled, setStateDisabled] = useState(true);

  const [programas, setProgramas] = useState([
    {
      anio: "",
      programa_academico: "",
      motivo_retiro: "",
      otro_motivo_retiro: "",
    },
  ]);

  const [stateDatosAcademicos, setStateDatosAcademicos] = useState({
    id: datos_academicos.id,
    numero_resolucion: datos_academicos.numero_resolucion,
    creditos_programa: datos_academicos.creditos_programa,
    titulo_obtenido: datos_academicos.titulo_obtenido,
    institucion: datos_academicos.institucion,
    nivel_formacion: datos_academicos.nivel_formacion,
    apoyos_recibidos: datos_academicos.apoyos_recibidos,
    observaciones: datos_academicos.observaciones,
    dificultades: datos_academicos.dificultades,
    anio_ingreso: datos_academicos.anio_ingreso,
    otros_programas_academicos: datos_academicos.otros_programas_academicos,
    edu_media_nombre_institucion: datos_academicos.edu_media_nombre_institucion,
    edu_media_titulo_obtenido: datos_academicos.edu_media_titulo_obtenido,
    edu_media_tipo_institucion: datos_academicos.edu_media_tipo_institucion,
    edu_media_dificultad_apoyo: datos_academicos.edu_media_dificultad_apoyo,
    edu_superior_tipo_institucion:
      datos_academicos.edu_superior_tipo_institucion,
    edu_superior_dificultad_apoyo:
      datos_academicos.edu_superior_dificultad_apoyo,
    periodo_ingreso: datos_academicos.periodo_ingreso,
    observaciones_adicionales: datos_academicos.observaciones_adicionales,
  });

  const motivosRetiro = [
    "Bajos académicos",
    "Condición de salud",
    "Fallecimiento",
    "Condición económica",
    "Cambio de programa académico",
    "Cambio de institución educativa",
    "Cambio de ciudad",
    "Retiro voluntario",
    "Prefiero no decirlo",
    "Otra",
  ];

  const handleAddProgram = () => {
    setProgramas([
      ...programas,
      {
        anio: "",
        programa_academico: "",
        motivo_retiro: "",
        otro_motivo_retiro: "",
      },
    ]);
  };

  const handleRemoveProgram = (index) => {
    const newProgramas = programas.filter((_, i) => i !== index);
    setProgramas(newProgramas);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newProgramas = [...programas];
    newProgramas[index][name] = value;
    setProgramas(newProgramas);
  };

  const handleMotivoChange = (index, event) => {
    const { value } = event.target;
    const newProgramas = [...programas];
    newProgramas[index].motivo_retiro = value;
    if (value !== "Otra") {
      newProgramas[index].otro_motivo_retiro = ""; // Clear the otro_motivo_retiro field if it's not "Otra"
    }
    setProgramas(newProgramas);
  };

  const handleUpdateDatosAcademicos = (e) => {
    e.preventDefault();
    setStateDisabled(true);
    console.log("Datos Academicos actualizados");
    // console.log(datos_estudiante_entrevistado);
    console.log(stateDatosAcademicos);
  };

  const updateStateDisabled = () => {
    setStateDisabled(!stateDisabled);
  };

  return (
    <div className="space_content">
      <div className="container_carac">
        <div className="full-width">
          <p className="titulo">Año de ingreso por primera vez</p>
          <p>
            Seleccione el año de ingreso del estudiante:{" "}
            <input
              className="input-type-number"
              type="date"
              id="year"
              name="year"
              min="1990"
              max="2099"
              step="1"
              placeholder="Ingresa el año"
              value={stateDatosAcademicos.anio_ingreso}
              onChange={(e) =>
                setStateDatosAcademicos({
                  ...stateDatosAcademicos,
                  anio_ingreso: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </p>
          <div className="select_space">
            <p className="titulo">Otros programas académicos</p>
            <label>
              Si ha ingresado varias veces relacione los años y los programas
              académicos:
            </label>
            <div className="programas-container">
              {programas.map((programa, index) => (
                <div className="programa-item" key={index}>
                  <input
                    type="number"
                    name="anio"
                    value={programa.anio}
                    min="1990"
                    max="2090"
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Año"
                    disabled
                  />
                  <input
                    type="text"
                    className="input-type-text"
                    name="programa_academico"
                    value={programa.programa_academico}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Programa académico"
                    disabled
                  />
                  <select
                    className="select-type"
                    name="motivo_retiro"
                    value={programa.motivo_retiro}
                    onChange={(e) => handleMotivoChange(index, e)}
                    disabled
                  >
                    <option value="">Motivo de retiro</option>
                    {motivosRetiro.map((motivo, i) => (
                      <option key={i} value={motivo}>
                        {motivo}
                      </option>
                    ))}
                  </select>
                  {programa.motivo_retiro === "Otra" && (
                    <input
                      type="text"
                      className="input-type-text"
                      name="otro_motivo_retiro"
                      value={programa.otro_motivo_retiro}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Especificar motivo"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveProgram(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddProgram}>
              Añadir Programa
            </button>
          </div>
        </div>
      </div>
      <hr className="styled-hr" />
      <div className="full-width">
        <div>
          <p className="titulo">Estudios realizados</p>
          <p>
            {" "}
            <b>Educación media de egreso: </b>
          </p>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input
              type="text"
              className="input-type-text"
              value={stateDatosAcademicos.edu_media_nombre_institucion}
              onChange={(e) =>
                setStateDatosAcademicos({
                  ...stateDatosAcademicos,
                  edu_media_nombre_institucion: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <div className="inline-input-group">
            <label>Título obtenido</label>
            <input
              type="text"
              className="input-type-text"
              value={stateDatosAcademicos.edu_media_titulo_obtenido}
              onChange={(e) =>
                setStateDatosAcademicos({
                  ...stateDatosAcademicos,
                  edu_media_titulo_obtenido: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <div className="inline-input-group">
            <label>Tipo de institución</label>
            <div className="checkbox_container sin_borde">
              <div className="checkbox_group">
                <input
                  type="radio"
                  name="tipo-institucion-media"
                  checked={
                    stateDatosAcademicos.edu_media_tipo_institucion ===
                    "publica"
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    setStateDatosAcademicos({
                      ...stateDatosAcademicos,
                      edu_media_tipo_institucion: "publica",
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Pública</label>
              </div>
              <div className="checkbox_group">
                <input
                  type="radio"
                  name="tipo-institucion-media"
                  checked={
                    stateDatosAcademicos.edu_media_tipo_institucion ===
                    "privada"
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    setStateDatosAcademicos({
                      ...stateDatosAcademicos,
                      edu_media_tipo_institucion: "privada",
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Privada</label>
              </div>
              <div className="checkbox_group">
                <input
                  type="radio"
                  name="tipo-institucion-media"
                  checked={
                    stateDatosAcademicos.edu_media_tipo_institucion === "mixto"
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    setStateDatosAcademicos({
                      ...stateDatosAcademicos,
                      edu_media_tipo_institucion: "mixto",
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Mixto</label>
              </div>
            </div>
          </div>
          <div>
            <p>
              Relacione las dificultades y los apoyos que se presentaron en la
              institución educativa y/o familia para su permanencia y egreso:
            </p>
            <table className="table-style">
              <thead>
                <tr>
                  <th>Dificultad</th>
                  <th>Apoyos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="input-type-text"
                      value={
                        stateDatosAcademicos.edu_media_dificultad_apoyo[0]
                          .dificulta1.dificultad
                      }
                      onChange={(e) =>
                        setStateDatosAcademicos({
                          ...stateDatosAcademicos,
                          edu_media_dificultad_apoyo: [
                            {
                              dificulta1: {
                                dificultad: e.target.value,
                                apoyo:
                                  stateDatosAcademicos
                                    .edu_media_dificultad_apoyo[0].dificulta1
                                    .apoyo,
                              },
                            },
                            stateDatosAcademicos.edu_media_dificultad_apoyo[1],
                            stateDatosAcademicos.edu_media_dificultad_apoyo[2],
                          ],
                        })
                      }
                      disabled={stateDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-type-text"
                      value={
                        stateDatosAcademicos.edu_media_dificultad_apoyo[0]
                          .dificulta1.apoyo
                      }
                      onChange={(e) =>
                        setStateDatosAcademicos({
                          ...stateDatosAcademicos,
                          edu_media_dificultad_apoyo: [
                            {
                              dificulta1: {
                                dificultad:
                                  stateDatosAcademicos
                                    .edu_media_dificultad_apoyo[0].dificulta1
                                    .dificultad,
                                apoyo: e.target.value,
                              },
                            },
                            stateDatosAcademicos.edu_media_dificultad_apoyo[1],
                            stateDatosAcademicos.edu_media_dificultad_apoyo[2],
                          ],
                        })
                      }
                      disabled={stateDisabled}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="input-type-text"
                      value={
                        stateDatosAcademicos.edu_media_dificultad_apoyo[1]
                          .dificulta2.dificultad
                      }
                      onChange={(e) =>
                        setStateDatosAcademicos({
                          ...stateDatosAcademicos,
                          edu_media_dificultad_apoyo: [
                            stateDatosAcademicos.edu_media_dificultad_apoyo[0],
                            {
                              dificulta2: {
                                dificultad: e.target.value,
                                apoyo:
                                  stateDatosAcademicos
                                    .edu_media_dificultad_apoyo[1].dificulta2
                                    .apoyo,
                              },
                            },
                            stateDatosAcademicos.edu_media_dificultad_apoyo[2],
                          ],
                        })
                      }
                      disabled={stateDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-type-text"
                      value={
                        stateDatosAcademicos.edu_media_dificultad_apoyo[1]
                          .dificulta2.apoyo
                      }
                      onChange={(e) =>
                        setStateDatosAcademicos({
                          ...stateDatosAcademicos,
                          edu_media_dificultad_apoyo: [
                            stateDatosAcademicos.edu_media_dificultad_apoyo[0],
                            {
                              dificulta2: {
                                dificultad:
                                  stateDatosAcademicos
                                    .edu_media_dificultad_apoyo[1].dificulta2
                                    .dificultad,
                                apoyo: e.target.value,
                              },
                            },
                            stateDatosAcademicos.edu_media_dificultad_apoyo[2],
                          ],
                        })
                      }
                      disabled={stateDisabled}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="input-type-text"
                      value={
                        stateDatosAcademicos.edu_media_dificultad_apoyo[2]
                          .dificulta3.dificultad
                      }
                      onChange={(e) =>
                        setStateDatosAcademicos({
                          ...stateDatosAcademicos,
                          edu_media_dificultad_apoyo: [
                            stateDatosAcademicos.edu_media_dificultad_apoyo[0],
                            stateDatosAcademicos.edu_media_dificultad_apoyo[1],
                            {
                              dificulta3: {
                                dificultad: e.target.value,
                                apoyo:
                                  stateDatosAcademicos
                                    .edu_media_dificultad_apoyo[2].dificulta3
                                    .apoyo,
                              },
                            },
                          ],
                        })
                      }
                      disabled={stateDisabled}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-type-text"
                      value={
                        stateDatosAcademicos.edu_media_dificultad_apoyo[2]
                          .dificulta3.apoyo
                      }
                      onChange={(e) =>
                        setStateDatosAcademicos({
                          ...stateDatosAcademicos,
                          edu_media_dificultad_apoyo: [
                            stateDatosAcademicos.edu_media_dificultad_apoyo[0],
                            stateDatosAcademicos.edu_media_dificultad_apoyo[1],
                            {
                              dificulta3: {
                                dificultad:
                                  stateDatosAcademicos
                                    .edu_media_dificultad_apoyo[2].dificulta3
                                    .dificultad,
                                apoyo: e.target.value,
                              },
                            },
                          ],
                        })
                      }
                      disabled={stateDisabled}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p>
              <b>
                Educación superior de egreso (Niveles Técnico Profesional,
                Tecnológico, Profesional, especialización, maestría, doctorado,
                posdoctorado):{" "}
              </b>
            </p>
            <div className="inline-input-group">
              <label>Nombre de la institución</label>
              <input
                type="text"
                className="input-type-text"
                value={
                  stateDatosAcademicos.institucion
                    ? stateDatosAcademicos.institucion
                    : ""
                }
                onChange={(e) =>
                  setStateDatosAcademicos({
                    ...stateDatosAcademicos,
                    institucion: e.target.value,
                  })
                }
                disabled={stateDisabled}
              />
            </div>
            <div className="inline-input-group">
              <label>Título obtenido</label>
              <input
                type="text"
                className="input-type-text"
                value={
                  stateDatosAcademicos.titulo_obtenido
                    ? stateDatosAcademicos.titulo_obtenido
                    : ""
                }
                onChange={(e) =>
                  setStateDatosAcademicos({
                    ...stateDatosAcademicos,
                    titulo_obtenido: e.target.value,
                  })
                }
                disabled={stateDisabled}
              />
            </div>
            <div className="inline-input-group">
              <label>Tipo de institución</label>
              <div className="checkbox_container sin_borde">
                <div className="checkbox_group">
                  <input
                    type="radio"
                    name="tipo-institucion"
                    checked={
                      stateDatosAcademicos.edu_superior_tipo_institucion ===
                      "publica"
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setStateDatosAcademicos({
                        ...stateDatosAcademicos,
                        edu_superior_tipo_institucion: "publica",
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label>Pública</label>
                </div>
                <div className="checkbox_group">
                  <input
                    type="radio"
                    name="tipo-institucion"
                    checked={
                      stateDatosAcademicos.edu_superior_tipo_institucion ===
                      "privada"
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setStateDatosAcademicos({
                        ...stateDatosAcademicos,
                        edu_superior_tipo_institucion: "privada",
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label>Privada</label>
                </div>
                <div className="checkbox_group">
                  <input
                    type="radio"
                    name="tipo-institucion"
                    checked={
                      stateDatosAcademicos.edu_superior_tipo_institucion ===
                      "mixta"
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      setStateDatosAcademicos({
                        ...stateDatosAcademicos,
                        edu_superior_tipo_institucion: "mixta",
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label>Mixto</label>
                </div>
              </div>
            </div>
            <div>
              <p>
                Relacione las dificultades y los apoyos que se presentaron en la
                institución educativa y/o familia para su permanencia y egreso:
              </p>
              <table className="table-style">
                <thead>
                  <tr>
                    <th>Dificultad</th>
                    <th>Apoyos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        className="input-type-text"
                        value={
                          stateDatosAcademicos.edu_superior_dificultad_apoyo[0]
                            .dificulta1.dificultad
                        }
                        onChange={(e) =>
                          setStateDatosAcademicos({
                            ...stateDatosAcademicos,
                            edu_superior_dificultad_apoyo: [
                              {
                                dificulta1: {
                                  dificultad: e.target.value,
                                  apoyo:
                                    stateDatosAcademicos
                                      .edu_superior_dificultad_apoyo[0]
                                      .dificulta1.apoyo,
                                },
                              },
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[1],
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[2],
                            ],
                          })
                        }
                        disabled={stateDisabled}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input-type-text"
                        value={
                          stateDatosAcademicos.edu_superior_dificultad_apoyo[0]
                            .dificulta1.apoyo
                        }
                        onChange={(e) =>
                          setStateDatosAcademicos({
                            ...stateDatosAcademicos,
                            edu_superior_dificultad_apoyo: [
                              {
                                dificulta1: {
                                  dificultad:
                                    stateDatosAcademicos
                                      .edu_superior_dificultad_apoyo[0]
                                      .dificulta1.dificultad,
                                  apoyo: e.target.value,
                                },
                              },
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[1],
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[2],
                            ],
                          })
                        }
                        disabled={stateDisabled}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        className="input-type-text"
                        value={
                          stateDatosAcademicos.edu_superior_dificultad_apoyo[1]
                            .dificulta2.dificultad
                        }
                        onChange={(e) =>
                          setStateDatosAcademicos({
                            ...stateDatosAcademicos,
                            edu_superior_dificultad_apoyo: [
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[0],
                              {
                                dificulta2: {
                                  dificultad: e.target.value,
                                  apoyo:
                                    stateDatosAcademicos
                                      .edu_superior_dificultad_apoyo[1]
                                      .dificulta2.apoyo,
                                },
                              },
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[2],
                            ],
                          })
                        }
                        disabled={stateDisabled}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input-type-text"
                        value={
                          stateDatosAcademicos.edu_superior_dificultad_apoyo[1]
                            .dificulta2.apoyo
                        }
                        onChange={(e) =>
                          setStateDatosAcademicos({
                            ...stateDatosAcademicos,
                            edu_superior_dificultad_apoyo: [
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[0],
                              {
                                dificulta2: {
                                  dificultad:
                                    stateDatosAcademicos
                                      .edu_superior_dificultad_apoyo[1]
                                      .dificulta2.dificultad,
                                  apoyo: e.target.value,
                                },
                              },
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[2],
                            ],
                          })
                        }
                        disabled={stateDisabled}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        className="input-type-text"
                        value={
                          stateDatosAcademicos.edu_superior_dificultad_apoyo[2]
                            .dificulta3.dificultad
                        }
                        onChange={(e) =>
                          setStateDatosAcademicos({
                            ...stateDatosAcademicos,
                            edu_superior_dificultad_apoyo: [
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[0],
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[1],
                              {
                                dificulta3: {
                                  dificultad: e.target.value,
                                  apoyo:
                                    stateDatosAcademicos
                                      .edu_superior_dificultad_apoyo[2]
                                      .dificulta3.apoyo,
                                },
                              },
                            ],
                          })
                        }
                        disabled={stateDisabled}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input-type-text"
                        value={
                          stateDatosAcademicos.edu_superior_dificultad_apoyo[2]
                            .dificulta3.apoyo
                        }
                        onChange={(e) =>
                          setStateDatosAcademicos({
                            ...stateDatosAcademicos,
                            edu_superior_dificultad_apoyo: [
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[0],
                              stateDatosAcademicos
                                .edu_superior_dificultad_apoyo[1],
                              {
                                dificulta3: {
                                  dificultad:
                                    stateDatosAcademicos
                                      .edu_superior_dificultad_apoyo[2]
                                      .dificulta3.dificultad,
                                  apoyo: e.target.value,
                                },
                              },
                            ],
                          })
                        }
                        disabled={stateDisabled}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr className="styled-hr" />
      <div className="container_carac">
        <div className="full-width">
          <div>
            <p className="titulo">
              Periodo académico de ingreso al proyecto de Discapacidad e
              Inclusión
            </p>
            <p>
              Seleccione el periodo:{" "}
              <input
                type="date"
                className="input-type-date"
                name="anio_ingreso"
                id="anio_ingreso"
                value={
                  stateDatosAcademicos.periodo_ingreso
                    ? stateDatosAcademicos.periodo_ingreso
                    : ""
                }
                onChange={(e) =>
                  setStateDatosAcademicos({
                    ...stateDatosAcademicos,
                    periodo_ingreso: e.target.value,
                  })
                }
                disabled={stateDisabled}
              />
            </p>
          </div>
          <div className="select_space">
            <label>Observaciones adicionales:</label>
            <textarea
              name="observaciones_adicionales"
              id="observaciones_adicionales"
              className="textarea-input"
              value={
                stateDatosAcademicos.observaciones_adicionales
                  ? stateDatosAcademicos.observaciones_adicionales
                  : ""
              }
              onChange={(e) =>
                setStateDatosAcademicos({
                  ...stateDatosAcademicos,
                  observaciones_adicionales: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
        </div>
      </div>
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
          onClick={handleUpdateDatosAcademicos}
        >
          Enviar
        </button>
      )}
    </div>
  );
};

export default DatosAcademicos;
