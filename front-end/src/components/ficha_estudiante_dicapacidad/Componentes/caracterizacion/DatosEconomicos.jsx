import React, { useState } from "react";
import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { set } from "date-fns";
import UpdateDatosEntrevistador from "../../../../service/update_datos_entrevistador_disc.js";
import { useAuthStore } from "../../store/auth.js";
import { desencriptarInt } from "../../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const DatosEconomicos = ({ datos_economicos }) => {
  const [recibeBeneficio, setRecibeBeneficio] = useState(false);
  const [requiereMateriales, setRequiereMateriales] = useState(false);
  const [vivienda, setVivienda] = useState("");
  const [tieneHijos, setTieneHijos] = useState("");

  const [stateDisabled, setStateDisabled] = useState(true);
  const { estudianteSelected } = useAuthStore();

  const [stateDatosEconomicos, setStateDatosEconomicos] = useState({
    tipo: "datos_economicos",
    id_estudiante: estudianteSelected.id,
    id_semestre: 40,
    fecha: datos_economicos.fecha_nac,
    lugar: datos_economicos.lugar,
    id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),
    estrato_socio: datos_economicos.estrato_socio,
    recibe_prestacion_econo: datos_economicos.recibe_prestacion_econo,
    recibe_beca: datos_economicos.recibe_beca,
    recibe_transporte: datos_economicos.recibe_transporte,
    recibe_finan_materiales: datos_economicos.recibe_finan_materiales,
    solvencia_economica: datos_economicos.solvencia_economica,
    expectativas_laborales: datos_economicos.expectativas_laborales,
    nivel_educativo_padre: datos_economicos.nivel_educativo_padre,
    ocupacion_padre: datos_economicos.ocupacion_padre,
    situacion_padre: datos_economicos.situacion_padre,
    nivel_educativo_madre: datos_economicos.nivel_educativo_madre,
    ocupacion_madre: datos_economicos.ocupacion_madre,
    situacion_madre: datos_economicos.situacion_madre,

    permanencia_ingresos_propios: datos_economicos.permanencia_ingresos_propios,
    permanencia_ingresos_familiares:
      datos_economicos.permanencia_ingresos_familiares,
    permanencia_ingresos_otros: datos_economicos.permanencia_ingresos_otros,
    permanencia_ingresos_otros_texto:
      datos_economicos.permanencia_ingresos_otros_texto,
    requiere_materiales: datos_economicos.requiere_materiales,
    valor_materiales: datos_economicos.valor_materiales,
    transporte_privado: datos_economicos.transporte_privado,
    transporte_publico: datos_economicos.transporte_publico,
    transporte_propio: datos_economicos.transporte_propio,
    transporte_otro: datos_economicos.transporte_otro,
    transporte_otro_data: datos_economicos.transporte_otro_data,
    valor_transporte: datos_economicos.valor_transporte,
    valor_sostenimiento: datos_economicos.valor_sostenimiento,
    actualmente_vive_estado: datos_economicos.actualmente_vive_estado,
    actualmente_vive_parentezco: datos_economicos.actualmente_vive_parentezco,
    tiene_hijos: datos_economicos.tiene_hijos,
    hijos_numero: datos_economicos.hijos_numero,
    motivo_ingreso: datos_economicos.motivo_ingreso,
    expectativas_carrera: datos_economicos.expectativas_carrera,
    expectativas_grado: datos_economicos.expectativas_grado,
    labor_padre: datos_economicos.labor_padre,
    labor_madre: datos_economicos.labor_madre,
    otro_familiar_nivel_educativo:
      datos_economicos.otro_familiar_nivel_educativo,
    otro_familiar_situacion_economica:
      datos_economicos.otro_familiar_situacion_economica,
    otro_familiar_actividad_economica:
      datos_economicos.otro_familiar_actividad_economica,
    otro_familiar_labor_desempena:
      datos_economicos.otro_familiar_labor_desempena,
  });

  const handleUpdateDatosEconomicos = (e) => {
    e.preventDefault();
    setStateDisabled(true);
    console.log("Datos Economicos actualizados");
    // console.log(datos_estudiante_entrevistado);
    console.log(stateDatosEconomicos);
    UpdateDatosEntrevistador.Update_datos_entrevistador_disc(
      stateDatosEconomicos
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateStateDisabled = () => {
    setStateDisabled(!stateDisabled);
  };

  return (
    <div className="space_content">
      <form>
        <div className="container_carac">
          <div className="full-width">
            <div className="checkbox_group">
              <label>
                Estrato socio-económico de acuerdo con el recibo de servicios
                públicos de su vivienda es
              </label>
              <select
                className="select-type"
                id="estrato"
                name="estrato"
                value={stateDatosEconomicos.estrato_socio}
                onChange={(e) =>
                  setStateDatosEconomicos({
                    ...stateDatosEconomicos,
                    estrato_socio: e.target.value,
                  })
                }
                style={{ width: "70px" }}
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccione un estrato </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>¿Cómo sostiene su permanencia en la universidad?</label>
              <div>
                <input
                  type="checkbox"
                  checked={stateDatosEconomicos.permanencia_ingresos_propios}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      permanencia_ingresos_propios: e.target.checked,
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Ingresos propios</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={stateDatosEconomicos.permanencia_ingresos_familiares}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      permanencia_ingresos_familiares: e.target.checked,
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Ingresos Familiares</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={stateDatosEconomicos.permanencia_ingresos_otros}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      permanencia_ingresos_otros: e.target.checked,
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Otros ¿cuáles?:</label>
                <input
                  type="text"
                  className="input-type-text"
                  value={stateDatosEconomicos.permanencia_ingresos_otros_texto}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      permanencia_ingresos_otros_texto: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
            </div>
            <div className="separator" />
            <div className="checkbox_container sin_borde">
              <div className="checkbox_group">
                <input
                  type="checkbox"
                  name="recibe_prestacion_econo"
                  checked={stateDatosEconomicos.recibe_prestacion_econo}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      recibe_prestacion_econo:
                        !stateDatosEconomicos.recibe_prestacion_econo,
                    });
                  }}
                  disabled={stateDisabled}
                />
                <label>Recibe alguna prestación económica</label>
              </div>
              <div className="checkbox_group">
                <input
                  type="checkbox"
                  name="recibe_beca"
                  id="recibe_beca"
                  checked={stateDatosEconomicos.recibe_beca}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      recibe_beca: !stateDatosEconomicos.recibe_beca,
                    });
                  }}
                  disabled={stateDisabled}
                />
                <label>Recibe alguna beca</label>
              </div>
              <div className="checkbox_group">
                <input
                  type="checkbox"
                  name="recibe_transporte"
                  checked={stateDatosEconomicos.recibe_transporte}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      recibe_transporte:
                        !stateDatosEconomicos.recibe_transporte,
                    });
                  }}
                  disabled={stateDisabled}
                />
                <label>Recibe ayuda para el transporte</label>
              </div>

              <div className="checkbox_group">
                <input
                  type="checkbox"
                  name="recibe_finan_materiales"
                  checked={stateDatosEconomicos.recibe_finan_materiales}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      recibe_finan_materiales:
                        !stateDatosEconomicos.recibe_finan_materiales,
                    });
                  }}
                  disabled={stateDisabled}
                />
                <label>Recibe ayuda para financiar materiales</label>
              </div>
              <div className="checkbox_group">
                <input
                  type="checkbox"
                  name="solvencia_economica"
                  checked={stateDatosEconomicos.solvencia_economica}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      solvencia_economica:
                        !stateDatosEconomicos.solvencia_economica,
                    });
                  }}
                  disabled={stateDisabled}
                />
                <label>Solvencia económica</label>
              </div>
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>¿Requiere materiales durante su carrera?</label>
              <select
                className="select-type"
                value={stateDatosEconomicos.requiere_materiales}
                onChange={(e) => {
                  setStateDatosEconomicos({
                    ...stateDatosEconomicos,
                    requiere_materiales:
                      !stateDatosEconomicos.requiere_materiales,
                  });
                }}
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccione...</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
                {/* <option value="no_sabe">No sabe</option> */}
              </select>
              {stateDatosEconomicos.requiere_materiales === "true" ||
                (stateDatosEconomicos.requiere_materiales === true && (
                  <div>
                    <label>
                      ¿Cuál es el valor aproximado en materiales, durante un
                      semestre?
                    </label>
                    <select
                      className="select-type"
                      value={stateDatosEconomicos.valor_materiales}
                      onChange={(e) =>
                        setStateDatosEconomicos({
                          ...stateDatosEconomicos,
                          valor_materiales: e.target.value,
                        })
                      }
                      disabled={stateDisabled}
                    >
                      <option value="sin_definir">Seleccione...</option>
                      <option value="0">Desde $0 a $50.000</option>
                      <option value="1">Desde $100.000 a $200.000</option>
                      <option value="2">Desde $200.000 a $300.000</option>
                      <option value="3">Desde $300.000 a $500.000</option>
                      <option value="4">Desde $500.000 a $1.000.000</option>
                      <option value="5">Superiores a $1.000.000</option>
                    </select>
                  </div>
                ))}
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>Para desplazarse a la universidad usted:</label>
              <div>
                <input
                  type="checkbox"
                  checked={stateDatosEconomicos.transporte_privado}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      transporte_privado: e.target.checked,
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Paga transporte privado</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={stateDatosEconomicos.transporte_publico}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      transporte_publico: e.target.checked,
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Paga el transporte público</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={stateDatosEconomicos.transporte_propio}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      transporte_propio: e.target.checked,
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Tiene transporte propio</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={stateDatosEconomicos.transporte_otro}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      transporte_otro: e.target.checked,
                    })
                  }
                  disabled={stateDisabled}
                />
                <label>Otro ¿Cuál?:</label>
                <input
                  type="text"
                  className="input-type-text"
                  value={stateDatosEconomicos.transporte_otro_data}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      transporte_otro_data: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
              <div>
                <label>
                  ¿Cuál es el valor aproximado para el transporte, durante un
                  semestre?
                </label>
                <input
                  className="input-type-number"
                  type="number"
                  min="0"
                  step="1000"
                  value={stateDatosEconomicos.valor_transporte}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      valor_transporte: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>
                ¿Cuál es el valor aproximado en sostenimiento (alimentación,
                arriendo, servicios públicos incluido internet, entre otros),
                durante un semestre?
              </label>
              <select
                className="select-type"
                value={stateDatosEconomicos.valor_sostenimiento}
                onChange={(e) =>
                  setStateDatosEconomicos({
                    ...stateDatosEconomicos,
                    valor_sostenimiento: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccione...</option>
                <option value="0">Desde $0 a $50.000</option>
                <option value="1">Desde $100.000 a $200.000</option>
                <option value="3">Desde $200.000 a $300.000</option>
                <option value="4">Desde $300.000 a $500.000</option>
                <option value="5">Desde $500.000 a $1.000.000</option>
                <option value="6">Superiores a $1.000.000</option>
              </select>
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>Actualmente vive:</label>
              <select
                className="select-type"
                value={stateDatosEconomicos.actualmente_vive_estado}
                onChange={(e) =>
                  setStateDatosEconomicos({
                    ...stateDatosEconomicos,
                    actualmente_vive_estado: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccione...</option>
                <option value="solo">Solo(a)</option>
                <option value="acompaniado">Acompañado(a)</option>
              </select>
              {stateDatosEconomicos.actualmente_vive_estado ===
                "acompaniado" && (
                <div>
                  <label>
                    Describa el parentesco con quién vive actualmente:
                  </label>
                  <input
                    type="text"
                    className="input-type-text"
                    value={stateDatosEconomicos.actualmente_vive_parentezco}
                    onChange={(e) =>
                      setStateDatosEconomicos({
                        ...stateDatosEconomicos,
                        actualmente_vive_parentezco: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>¿Tiene hijos/as?</label>
              <select
                className="select-type"
                value={stateDatosEconomicos.tiene_hijos}
                onChange={(e) => {
                  setStateDatosEconomicos({
                    ...stateDatosEconomicos,
                    tiene_hijos: e.target.value,
                  });
                }}
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccione...</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              {stateDatosEconomicos.tiene_hijos === "true" ||
                (stateDatosEconomicos.tiene_hijos === true && (
                  <div>
                    <label>¿Cuántos?:</label>
                    <input
                      className="input-type-number"
                      type="number"
                      min="1"
                      value={stateDatosEconomicos.hijos_numero}
                      onChange={(e) =>
                        setStateDatosEconomicos({
                          ...stateDatosEconomicos,
                          hijos_numero: e.target.value,
                        })
                      }
                      disabled={stateDisabled}
                    />
                  </div>
                ))}
            </div>
            <div className="separator" />
            <p className="titulo">Proyecto de Vida</p>
            <div className="checkbox_group">
              <div>
                <label>¿Qué le motivó el ingreso a su carrera?</label>
                <textarea
                  className="textarea-input"
                  name="motivoIngresoCarrera"
                  value={stateDatosEconomicos.motivo_ingreso}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      motivo_ingreso: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
              <div>
                <label>¿Cuáles son sus expectativas en esta carrera?</label>
                <textarea
                  className="textarea-input"
                  name="expectativasCarrera"
                  value={stateDatosEconomicos.expectativas_carrera}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      expectativas_carrera: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
              <div>
                <label>¿Cuáles son sus expectativas al graduarse?</label>
                <textarea
                  className="textarea-input"
                  name="expectativasGraduacion"
                  value={stateDatosEconomicos.expectativas_grado}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      expectativas_grado: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
            </div>
            <div className="select_space">
              <label>Expectativas laborales</label>
              <textarea
                className="textarea-input"
                name="expectativas_laborales"
                id="expectativas_laborales"
                value={stateDatosEconomicos.expectativas_laborales}
                onChange={(e) =>
                  setStateDatosEconomicos({
                    ...stateDatosEconomicos,
                    expectativas_laborales: e.target.value,
                  })
                }
                disabled={stateDisabled}
              />
            </div>
            <div className="separator" />
          </div>
          <div>
            <p className="titulo">Informacion del padre (si aplica)</p>
            <div>
              <div className="select_space">
                <label>Nivel educativo (Máximo alcanzado)</label>
                <select
                  className="select-type"
                  value={stateDatosEconomicos.nivel_educativo_padre}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      nivel_educativo_padre: e.target.value,
                    });
                  }}
                  disabled={stateDisabled}
                >
                  <option value="sin_definir">Seleccione una opción</option>
                  <option value="primaria_c">Primaria completo</option>
                  <option value="primaria_i">Primaria incompleto</option>
                  <option value="secundaria_c">Secundaria completo</option>
                  <option value="secundaria_i">Secundaria incompleto</option>
                  <option value="tecnico_c">Técnico completo</option>
                  <option value="tecnico_i">Técnico incompleto</option>
                  <option value="tecnologo_c">Tecnólogo completo</option>
                  <option value="tecnologo_i">Tecnólogo incompleto</option>
                  <option value="profesional_pre_c">
                    Profesional pregrado completo
                  </option>
                  <option value="profesional_pre_i">
                    Profesional pregrado incompleto
                  </option>
                  <option value="profesional_pos_c">
                    Profesional posgrado completo
                  </option>
                  <option value="profesional_pos_i">
                    Profesional posgrado incompleto
                  </option>
                  <option value="analfabeta">Analfabeta</option>
                </select>
              </div>
              <div className="select_space">
                <label>Situación económica</label>
                <select
                  className="select-type"
                  value={stateDatosEconomicos.situacion_padre}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      situacion_padre: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                >
                  <option value="sin_definir">Seleccione una opción</option>
                  <option value="trabajando">Trabajando</option>
                  <option value="cesante">Cesante</option>
                  <option value="trabajo ocasional">Trabajo ocasional</option>
                  <option value="dependiente">Dependiente</option>
                  <option value="independiente">Independiente</option>
                  <option value="pensionado">Pensionado</option>
                  <option value="fallecido">Fallecido</option>
                </select>
              </div>
              <div className="select_space">
                <label>Actividad económica (Si está trabajando)</label>
                <input
                  type="text"
                  className="input-type-text"
                  value={stateDatosEconomicos.ocupacion_padre}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      ocupacion_padre: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
              <div className="select_space">
                <label>Labor que desempeña</label>
                <input
                  type="text"
                  className="input-type-text"
                  value={stateDatosEconomicos.labor_padre}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      labor_padre: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="titulo">Informacion de la madre (si aplica)</p>
            <div>
              <div className="select_space">
                <label>Nivel educativo (Máximo alcanzado)</label>
                <select
                  className="select-type"
                  value={stateDatosEconomicos.nivel_educativo_madre}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      nivel_educativo_madre: e.target.value,
                    });
                  }}
                  disabled={stateDisabled}
                >
                  <option value="sin_definir">Seleccione una opción</option>
                  <option value="primaria_c">Primaria completo</option>
                  <option value="primaria_i">Primaria incompleto</option>
                  <option value="secundaria_c">Secundaria completo</option>
                  <option value="secundaria_i">Secundaria incompleto</option>
                  <option value="tecnico_c">Técnico completo</option>
                  <option value="tecnico_i">Técnico incompleto</option>
                  <option value="tecnologo_c">Tecnólogo completo</option>
                  <option value="tecnologo_i">Tecnólogo incompleto</option>
                  <option value="profesional_pre_c">
                    Profesional pregrado completo
                  </option>
                  <option value="profesional_pre_i">
                    Profesional pregrado incompleto
                  </option>
                  <option value="profesional_pos_c">
                    Profesional posgrado completo
                  </option>
                  <option value="profesional_pos_i">
                    Profesional posgrado incompleto
                  </option>
                  <option value="analfabeta">Analfabeta</option>
                </select>
              </div>

              <div className="select_space">
                <label>Situación económica</label>
                <select
                  className="select-type"
                  value={stateDatosEconomicos.situacion_madre}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      situacion_madre: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                >
                  <option value="sin_definir">Seleccione una opción</option>
                  <option value="trabajando">Trabajando</option>
                  <option value="cesante">Cesante</option>
                  <option value="trabajo ocasional">Trabajo ocasional</option>
                  <option value="dependiente">Dependiente</option>
                  <option value="independiente">Independiente</option>
                  <option value="pensionado">Pensionado</option>
                  <option value="fallecido">Fallecido</option>
                </select>
              </div>

              <div className="select_space">
                <label>Actividad económica (Si está trabajando)</label>
                <input
                  type="text"
                  className="input-type-text"
                  value={stateDatosEconomicos.ocupacion_madre}
                  onChange={(e) => {
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      ocupacion_madre: e.target.value,
                    });
                  }}
                  disabled={stateDisabled}
                />
              </div>
              <div className="select_space">
                <label>Labor que desempeña</label>
                <input
                  type="text"
                  className="input-type-text"
                  value={stateDatosEconomicos.labor_madre}
                  onChange={(e) =>
                    setStateDatosEconomicos({
                      ...stateDatosEconomicos,
                      labor_madre: e.target.value,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
            </div>
          </div>
          <div className="full-width">
            <div>
              <p className="titulo">
                Información de otros familiares que se hayan hecho a cargo en
                caso diferente a los anteriores
              </p>
              <div>
                <div className="select_space">
                  <label>Nivel educativo (Máximo alcanzado)</label>
                  <select
                    className="select-type"
                    value={stateDatosEconomicos.otro_familiar_nivel_educativo}
                    onChange={(e) => {
                      setStateDatosEconomicos({
                        ...stateDatosEconomicos,
                        otro_familiar_nivel_educativo: e.target.value,
                      });
                    }}
                    disabled={stateDisabled}
                  >
                    <option value="sin_definir">Seleccione una opción</option>
                    <option value="primaria_c">Primaria completo</option>
                    <option value="primaria_i">Primaria incompleto</option>
                    <option value="secundaria_c">Secundaria completo</option>
                    <option value="secundaria_i">Secundaria incompleto</option>
                    <option value="tecnico_c">Técnico completo</option>
                    <option value="tecnico_i">Técnico incompleto</option>
                    <option value="tecnologo_c">Tecnólogo completo</option>
                    <option value="tecnologo_i">Tecnólogo incompleto</option>
                    <option value="profesional_pre_c">
                      Profesional pregrado completo
                    </option>
                    <option value="profesional_pre_i">
                      Profesional pregrado incompleto
                    </option>
                    <option value="profesional_pos_c">
                      Profesional posgrado completo
                    </option>
                    <option value="profesional_pos_i">
                      Profesional posgrado incompleto
                    </option>
                    <option value="analfabeta">Analfabeta</option>
                  </select>
                </div>
                <div className="select_space">
                  <label>Situación económica</label>
                  <select
                    className="select-type"
                    value={
                      stateDatosEconomicos.otro_familiar_situacion_economica
                    }
                    onChange={(e) =>
                      setStateDatosEconomicos({
                        ...stateDatosEconomicos,
                        otro_familiar_situacion_economica: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  >
                    <option value="sin_definir">Seleccione una opción</option>
                    <option value="trabajando">Trabajando</option>
                    <option value="cesante">Cesante</option>
                    <option value="trabajo ocasional">Trabajo ocasional</option>
                    <option value="dependiente">Dependiente</option>
                    <option value="independiente">Independiente</option>
                    <option value="pensionado">Pensionado</option>
                    <option value="fallecido">Fallecido</option>
                  </select>
                </div>
                <div className="select_space">
                  <label>Actividad económica (Si está trabajando)</label>
                  <input
                    type="text"
                    className="input-type-text"
                    value={
                      stateDatosEconomicos.otro_familiar_actividad_economica
                    }
                    onChange={(e) =>
                      setStateDatosEconomicos({
                        ...stateDatosEconomicos,
                        otro_familiar_actividad_economica: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </div>
                <div className="select_space">
                  <label>Labor que desempeña</label>
                  <input
                    type="text"
                    className="input-type-text"
                    value={stateDatosEconomicos.otro_familiar_labor_desempena}
                    onChange={(e) =>
                      setStateDatosEconomicos({
                        ...stateDatosEconomicos,
                        otro_familiar_labor_desempena: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </div>
              </div>
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
          onClick={handleUpdateDatosEconomicos}
        >
          Enviar
        </button>
      )}
    </div>
  );
};

export default DatosEconomicos;
