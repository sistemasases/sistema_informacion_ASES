import { useState } from "react";

const PercepcionCaracteristicasDiscapacidad = ({ percepcion_discapacidad }) => {
  const [stateDisabled, setStateDisabled] = useState(true);

  const [statePercepcionDiscapacidad, setStatePercepcionDiscapacidad] =
    useState({
      considera_discapacidad: percepcion_discapacidad.considera_discapacidad,
      consideracion: percepcion_discapacidad.consideracion,
      adquisicion: percepcion_discapacidad.adquisicion,
      cuenta_con_diagnostico: percepcion_discapacidad.cuenta_con_diagnostico,
      tipo_diagnostico: percepcion_discapacidad.tipo_diagnostico,
      certificado_invalidez: percepcion_discapacidad.certificado_invalidez,
      documento_soporte: percepcion_discapacidad.documento_soporte,
      vision: percepcion_discapacidad.vision,
      vision_texto: percepcion_discapacidad.vision_texto,
      audicion: percepcion_discapacidad.audicion,
      audicion_texto: percepcion_discapacidad.audicion_texto,
      voz_y_habla: percepcion_discapacidad.voz_y_habla,
      voz_y_habla_texto: percepcion_discapacidad.voz_y_habla_texto,
      movimiento_cuerpo: percepcion_discapacidad.movimiento_cuerpo,
      movimiento_cuerpo_texto: percepcion_discapacidad.movimiento_cuerpo_texto,
      cognicion: percepcion_discapacidad.cognicion,
      cognicion_texto: percepcion_discapacidad.cognicion_texto,
      estado_socio_emocional: percepcion_discapacidad.estado_socio_emocional,
      estado_socio_emocional_texto:
        percepcion_discapacidad.estado_socio_emocional_texto,
      relaciones_sexuales: percepcion_discapacidad.relaciones_sexuales,
      relaciones_sexuales_texto:
        percepcion_discapacidad.relaciones_sexuales_texto,
      deglucion: percepcion_discapacidad.deglucion,
      deglucion_texto: percepcion_discapacidad.deglucion_texto,
      otra_dif_permanente: percepcion_discapacidad.otra_dif_permanente,
      otra_dif_permanente_texto:
        percepcion_discapacidad.otra_dif_permanente_texto,
      ojos: percepcion_discapacidad.ojos,
      ojos_texto: percepcion_discapacidad.ojos_texto,
      oidos: percepcion_discapacidad.oidos,
      oidos_texto: percepcion_discapacidad.oidos_texto,
      vocales: percepcion_discapacidad.vocales,
      vocales_texto: percepcion_discapacidad.vocales_texto,
      manos: percepcion_discapacidad.manos,
      manos_texto: percepcion_discapacidad.manos_texto,
      piernas: percepcion_discapacidad.piernas,
      piernas_texto: percepcion_discapacidad.piernas_texto,
      piel: percepcion_discapacidad.piel,
      piel_texto: percepcion_discapacidad.piel_texto,
      cerebro: percepcion_discapacidad.cerebro,
      cerebro_texto: percepcion_discapacidad.cerebro_texto,
      sistema_nervioso: percepcion_discapacidad.sistema_nervioso,
      sistema_nervioso_texto: percepcion_discapacidad.sistema_nervioso_texto,
      sistema_cardio: percepcion_discapacidad.sistema_cardio,
      sistema_cardio_texto: percepcion_discapacidad.sistema_cardio_texto,
      sistema_genital: percepcion_discapacidad.sistema_genital,
      sistema_genital_texto: percepcion_discapacidad.sistema_genital_texto,
      sistema_digestivo: percepcion_discapacidad.sistema_digestivo,
      sistema_digestivo_texto: percepcion_discapacidad.sistema_digestivo_texto,
      otra_organos: percepcion_discapacidad.otra_organos,
      otra_organos_texto: percepcion_discapacidad.otra_organos_texto,
      cursos: percepcion_discapacidad.cursos,
      cursos_texto: percepcion_discapacidad.cursos_texto,
      clases_magistrales: percepcion_discapacidad.clases_magistrales,
      clases_magistrales_texto:
        percepcion_discapacidad.clases_magistrales_texto,
      laboratorios: percepcion_discapacidad.laboratorios,
      laboratorios_texto: percepcion_discapacidad.laboratorios_texto,
      secuencias_numericas: percepcion_discapacidad.secuencias_numericas,
      secuencias_numericas_texto:
        percepcion_discapacidad.secuencias_numericas_texto,
      talleres: percepcion_discapacidad.talleres,
      talleres_texto: percepcion_discapacidad.talleres_texto,
      conferencias: percepcion_discapacidad.conferencias,
      conferencias_texto: percepcion_discapacidad.conferencias_texto,
      practica_deportiva: percepcion_discapacidad.practica_deportiva,
      practica_deportiva_texto:
        percepcion_discapacidad.practica_deportiva_texto,
      ocio: percepcion_discapacidad.ocio,
      ocio_texto: percepcion_discapacidad.ocio_texto,
      movilizacion: percepcion_discapacidad.movilizacion,
      movilizacion_texto: percepcion_discapacidad.movilizacion_texto,
      conciertos: percepcion_discapacidad.conciertos,
      conciertos_texto: percepcion_discapacidad.conciertos_texto,
      servicios_salud: percepcion_discapacidad.servicios_salud,
      servicios_salud_texto: percepcion_discapacidad.servicios_salud_texto,
      asambleas: percepcion_discapacidad.asambleas,
      asambleas_texto: percepcion_discapacidad.asambleas_texto,
      alimentos_cafeteria: percepcion_discapacidad.alimentos_cafeteria,
      alimentos_cafeteria_texto:
        percepcion_discapacidad.alimentos_cafeteria_texto,
      tramites: percepcion_discapacidad.tramites,
      tramites_texto: percepcion_discapacidad.tramites_texto,
      otra_nec_diferente: percepcion_discapacidad.otra_nec_diferente,
      otra_nec_diferente_texto:
        percepcion_discapacidad.otra_nec_diferente_texto,
      condicion_discapacidad: percepcion_discapacidad.condicion_discapacidad,
      contexto_universitario: percepcion_discapacidad.contexto_universitario,
      ausencia_ayuda_tec: percepcion_discapacidad.ausencia_ayuda_tec,
      ausencia_espacios_fisicos:
        percepcion_discapacidad.ausencia_espacios_fisicos,
      ausencia_materiales_impresos:
        percepcion_discapacidad.ausencia_materiales_impresos,
      ausencia_personas_apoyo: percepcion_discapacidad.ausencia_personas_apoyo,
      actitudes_negativas_personas:
        percepcion_discapacidad.actitudes_negativas_personas,
      ausencia_servicios_discapacidad:
        percepcion_discapacidad.ausencia_servicios_discapacidad,
      otros_factores: percepcion_discapacidad.otros_factores,
      otros_factores_texto: percepcion_discapacidad.otros_factores_texto,
      condicion_psicoemocional:
        percepcion_discapacidad.condicion_psicoemocional,
      otra_psicoemocional: percepcion_discapacidad.otra_psicoemocional,
      otra_psicoemocional_texto:
        percepcion_discapacidad.otra_psicoemocional_texto,
      escritos_impresos: percepcion_discapacidad.escritos_impresos,
      escritos_impresos_numero:
        percepcion_discapacidad.escritos_impresos_numero,
      imagenes_pantalla: percepcion_discapacidad.imagenes_pantalla,
      imagenes_pantalla_numero:
        percepcion_discapacidad.imagenes_pantalla_numero,
      copia_dictado: percepcion_discapacidad.copia_dictado,
      copia_dictado_numero: percepcion_discapacidad.copia_dictado_numero,
      transcripcion_textos: percepcion_discapacidad.transcripcion_textos,
      transcripcion_textos_numero:
        percepcion_discapacidad.transcripcion_textos_numero,
      manuales_escritos: percepcion_discapacidad.manuales_escritos,
      manuales_escritos_numero:
        percepcion_discapacidad.manuales_escritos_numero,
      textos_pantalla: percepcion_discapacidad.textos_pantalla,
      textos_pantalla_numero: percepcion_discapacidad.textos_pantalla_numero,
      redactar: percepcion_discapacidad.redactar,
      redactar_numero: percepcion_discapacidad.redactar_numero,
      elaborar_ideas: percepcion_discapacidad.elaborar_ideas,
      elaborar_ideas_numero: percepcion_discapacidad.elaborar_ideas_numero,
      escuchar: percepcion_discapacidad.escuchar,
      escuchar_numero: percepcion_discapacidad.escuchar_numero,
      expre_oral: percepcion_discapacidad.expre_oral,
      expre_oral_numero: percepcion_discapacidad.expre_oral_numero,
      compren_oral: percepcion_discapacidad.compren_oral,
      compren_oral_numero: percepcion_discapacidad.compren_oral_numero,
      interactuar: percepcion_discapacidad.interactuar,
      interactuar_numero: percepcion_discapacidad.interactuar_numero,
      rel_interpersonales: percepcion_discapacidad.rel_interpersonales,
      rel_interpersonales_numero:
        percepcion_discapacidad.rel_interpersonales_numero,
      desplazarse: percepcion_discapacidad.desplazarse,
      desplazarse_numero: percepcion_discapacidad.desplazarse_numero,
      manipular_obj: percepcion_discapacidad.manipular_obj,
      manipular_obj_numero: percepcion_discapacidad.manipular_obj_numero,
      mant_sentado: percepcion_discapacidad.mant_sentado,
      mant_sentado_numero: percepcion_discapacidad.mant_sentado_numero,
      asearse: percepcion_discapacidad.asearse,
      asearse_numero: percepcion_discapacidad.asearse_numero,
      vestirse_desves: percepcion_discapacidad.vestirse_desves,
      vestirse_desves_numero: percepcion_discapacidad.vestirse_desves_numero,
      consumier_alimen: percepcion_discapacidad.consumier_alimen,
      consumier_alimen_numero: percepcion_discapacidad.consumier_alimen_numero,
      evacuar: percepcion_discapacidad.evacuar,
      evacuar_numero: percepcion_discapacidad.evacuar_numero,
      otro: percepcion_discapacidad.otro,
      otro_texto: percepcion_discapacidad.otro_texto,
      amigo_apoyo: percepcion_discapacidad.amigo_apoyo,
      pareja_apoyo: percepcion_discapacidad.pareja_apoyo,
      familia_apoyo: percepcion_discapacidad.familia_apoyo,
      salud_apoyo: percepcion_discapacidad.salud_apoyo,
      otro_apoyo: percepcion_discapacidad.otro_apoyo,
      privado_desplazar: percepcion_discapacidad.privado_desplazar,
      publico_desplazar: percepcion_discapacidad.publico_desplazar,
      propio_desplazar: percepcion_discapacidad.propio_desplazar,
      otro_desplazar: percepcion_discapacidad.otro_desplazar,
      participa_org: percepcion_discapacidad.participa_org,
      act_otras_per: percepcion_discapacidad.act_otras_per,
      apoyo_inst: percepcion_discapacidad.apoyo_inst,
      nombre_institucion: percepcion_discapacidad.nombre_institucion,
      tipo_apoyo: percepcion_discapacidad.tipo_apoyo,
    });

  const handleUpdateDatosPercepcionDiscapacidad = (e) => {
    e.preventDefault();
    setStateDisabled(true);
    console.log("Datos Percepción actualizados");
    // console.log(datos_estudiante_entrevistado);
    console.log(statePercepcionDiscapacidad);
  };

  const updateStateDisabled = () => {
    setStateDisabled(!stateDisabled);
  };

  return (
    <div>
      <form className="space_content">
        <div>
          <div className="select_space">
            <label>
              ¿Consideras que presenta algún tipo de discapacidad o limitación?
            </label>
            <div className="checkbox_container sin_borde">
              <div className="select_space">
                <label>Si</label>
                <input
                  type="radio"
                  name="tiene_discapacidad"
                  checked={
                    statePercepcionDiscapacidad.considera_discapacidad === true
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    setStatePercepcionDiscapacidad({
                      ...statePercepcionDiscapacidad,
                      considera_discapacidad:
                        !statePercepcionDiscapacidad.considera_discapacidad,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
              <div className="select_space">
                <label>No</label>
                <input
                  type="radio"
                  name="tiene_discapacidad"
                  checked={
                    statePercepcionDiscapacidad.considera_discapacidad === false
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    setStatePercepcionDiscapacidad({
                      ...statePercepcionDiscapacidad,
                      considera_discapacidad:
                        !statePercepcionDiscapacidad.considera_discapacidad,
                    })
                  }
                  disabled={stateDisabled}
                />
              </div>
            </div>
            <textarea
              className="textarea-input"
              name="adquisicion_discapacidad"
              id="adquisicion_discapacidad"
              placeholder="Describa la consideración"
              value={
                statePercepcionDiscapacidad.consideracion
                  ? statePercepcionDiscapacidad.consideracion
                  : ""
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  consideracion: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <div className="select_space">
            <label>
              ¿Cuál de las siguientes circunstancias corresponde a la
              adquisición de discapacidad?
            </label>
            <label>Adquisición por</label>
            <textarea
              className="textarea-input"
              name="adquisicion_discapacidad"
              id="adquisicion_discapacidad"
              value={
                statePercepcionDiscapacidad.adquisicion
                  ? statePercepcionDiscapacidad.adquisicion
                  : ""
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  adquisicion: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <div className="select_space">
            <label>¿Cuenta con un diagnóstico de su discapacidad?</label>
            <div className="select_space">
              <label>Diagnóstico</label>
              <input
                type="checkbox"
                checked={
                  statePercepcionDiscapacidad.cuenta_con_diagnostico === true
                    ? statePercepcionDiscapacidad.cuenta_con_diagnostico
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    cuenta_con_diagnostico: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
            </div>
            <label>Tipo</label>
            <textarea
              className="textarea-input"
              name="diagnostico_discapacidad"
              id="diagnostico_discapacidad"
              value={
                statePercepcionDiscapacidad.tipo_diagnostico
                  ? statePercepcionDiscapacidad.tipo_diagnostico
                  : ""
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  tipo_diagnostico: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <label>¿Tiene certificado de invalidez?</label>
          <div className="select_space">
            <label>Certificado</label>
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.certificado_invalidez === true
                  ? statePercepcionDiscapacidad.certificado_invalidez
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  certificado_invalidez: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <label>¿Entrega documentos soporte?</label>
          <div className="select_space">
            <label>Soporte</label>
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.documento_soporte === true
                  ? statePercepcionDiscapacidad.documento_soporte
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  documento_soporte: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <hr className="styled-hr" />
          <p className="enunciado">
            ¿De las siguientes funciones en cuales presenta usted dificultad
            permanente?
          </p>
          <table className="table-style">
            <thead>
              <tr>
                <th>Funciones</th>
                <th>¿Cuál?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="vision"
                    name="vision"
                    checked={
                      statePercepcionDiscapacidad.vision === true
                        ? statePercepcionDiscapacidad.vision
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        vision: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="vision">Visión</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="vision_input"
                    value={
                      statePercepcionDiscapacidad.vision_texto
                        ? statePercepcionDiscapacidad.vision_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        vision_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="audicion"
                    name="audicion"
                    checked={
                      statePercepcionDiscapacidad.audicion === true
                        ? statePercepcionDiscapacidad.audicion
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        audicion: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="audicion">Audición</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="audicion_input"
                    value={
                      statePercepcionDiscapacidad.audicion_texto
                        ? statePercepcionDiscapacidad.audicion_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        audicion_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="voz_habla"
                    name="voz_habla"
                    checked={
                      statePercepcionDiscapacidad.voz_y_habla === true
                        ? statePercepcionDiscapacidad.voz_y_habla
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        voz_y_habla: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="audicion">Voz y habla</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="voz_habla_input"
                    value={
                      statePercepcionDiscapacidad.voz_y_habla_texto
                        ? statePercepcionDiscapacidad.voz_y_habla_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        voz_y_habla_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="movimiento_cuerpo"
                    name="movimiento_cuerpo"
                    checked={
                      statePercepcionDiscapacidad.movimiento_cuerpo === true
                        ? statePercepcionDiscapacidad.movimiento_cuerpo
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        movimiento_cuerpo: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="audicion">
                    Movimiento del cuerpo o de alguna parte del cuerpo
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="movimiento_cuerpo_input"
                    value={
                      statePercepcionDiscapacidad.movimiento_cuerpo_texto
                        ? statePercepcionDiscapacidad.movimiento_cuerpo_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        movimiento_cuerpo_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="cognicion"
                    name="cognicion"
                    checked={
                      statePercepcionDiscapacidad.cognicion === true
                        ? statePercepcionDiscapacidad.cognicion
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        cognicion: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="cognicion">Cognición</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="cognicion_input"
                    value={
                      statePercepcionDiscapacidad.cognicion_texto
                        ? statePercepcionDiscapacidad.cognicion_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        cognicion_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="estado_socioemocional"
                    name="estado_socioemocional"
                    checked={
                      statePercepcionDiscapacidad.estado_socio_emocional ===
                      true
                        ? statePercepcionDiscapacidad.estado_socio_emocional
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        estado_socio_emocional: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="audicion">Estado socio-emocional</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="estado_socioemocional_input"
                    value={
                      statePercepcionDiscapacidad.estado_socio_emocional_texto
                        ? statePercepcionDiscapacidad.estado_socio_emocional_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        estado_socio_emocional_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="miccion_relaciones_reproduccion"
                    name="miccion_relaciones_reproduccion"
                    checked={
                      statePercepcionDiscapacidad.relaciones_sexuales === true
                        ? statePercepcionDiscapacidad.relaciones_sexuales
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        relaciones_sexuales: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="audicion">
                    Micción, relaciones sexuales, reproducción
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="miccion_relaciones_reproduccion_input"
                    value={
                      statePercepcionDiscapacidad.relaciones_sexuales_texto
                        ? statePercepcionDiscapacidad.relaciones_sexuales_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        relaciones_sexuales_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="masticaion_deglucion"
                    name="masticaion_deglucion"
                    checked={
                      statePercepcionDiscapacidad.deglucion === true
                        ? statePercepcionDiscapacidad.deglucion
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        deglucion: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="audicion">Masticación y/o deglución</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="masticaion_deglucion_input"
                    value={
                      statePercepcionDiscapacidad.deglucion_texto
                        ? statePercepcionDiscapacidad.deglucion_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        deglucion_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="otra"
                    name="otra"
                    checked={
                      statePercepcionDiscapacidad.otra_dif_permanente === true
                        ? statePercepcionDiscapacidad.otra_dif_permanente
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otra_dif_permanente: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="otra">Otra ¿Cuál?</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="otra_dif_permanente_texto"
                    value={
                      statePercepcionDiscapacidad.otra_dif_permanente_texto
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otra_dif_permanente_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr className="styled-hr" />
          <p className="enunciado">
            ¿De los siguientes órganos y/o sistemas, ¿Cuáles presentan alguna
            condición de salud a tener en cuenta?
          </p>
          <table className="table-style">
            <thead>
              <tr>
                <th>Órganos/Sistemas</th>
                <th>¿Cuál?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="ojos"
                    name="ojos"
                    checked={
                      statePercepcionDiscapacidad.ojos === true
                        ? statePercepcionDiscapacidad.ojos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        ojos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="ojos">Ojos</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="ojos_input"
                    value={statePercepcionDiscapacidad.ojos_texto}
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        ojos_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="oido"
                    name="oido"
                    checked={
                      statePercepcionDiscapacidad.oidos === true
                        ? statePercepcionDiscapacidad.oidos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        oidos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="oido">Oídos</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="oido_input"
                    value={
                      statePercepcionDiscapacidad.oidos_texto
                        ? statePercepcionDiscapacidad.oidos_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        oidos_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="pliegues_labios_lengua_paladar"
                    name="pliegues_labios_lengua_paladar"
                    checked={
                      statePercepcionDiscapacidad.vocales === true
                        ? statePercepcionDiscapacidad.vocales
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        vocales: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="pliegues_labios_lengua_paladar">
                    Pliegues vocales, labios, lengua, paladar
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="pliegues_labios_lengua_paladar_input"
                    value={
                      statePercepcionDiscapacidad.vocales_texto
                        ? statePercepcionDiscapacidad.vocales_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        vocales_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="brazos_manos"
                    name="brazos_manos"
                    checked={
                      statePercepcionDiscapacidad.manos === true
                        ? statePercepcionDiscapacidad.manos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        manos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="brazos_manos">Brazos / manos</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="brazos_manos_input"
                    value={
                      statePercepcionDiscapacidad.manos_texto
                        ? statePercepcionDiscapacidad.manos_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        manos_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="piernas"
                    name="piernas"
                    checked={
                      statePercepcionDiscapacidad.piernas === true
                        ? statePercepcionDiscapacidad.piernas
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        piernas: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="piernas">Piernas</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="piernas_input"
                    value={
                      statePercepcionDiscapacidad.piernas_texto
                        ? statePercepcionDiscapacidad.piernas_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        piernas_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="piel"
                    name="piel"
                    checked={
                      statePercepcionDiscapacidad.piel === true
                        ? statePercepcionDiscapacidad.piel
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        piel: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="piel">Piel</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="piel_input"
                    value={
                      statePercepcionDiscapacidad.piel_texto
                        ? statePercepcionDiscapacidad.piel_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        piel_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="cerebro"
                    name="cerebro"
                    checked={
                      statePercepcionDiscapacidad.cerebro === true
                        ? statePercepcionDiscapacidad.cerebro
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        cerebro: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="cerebro">Cerebro</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="cerebro_input"
                    value={
                      statePercepcionDiscapacidad.cerebro_texto
                        ? statePercepcionDiscapacidad.cerebro_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        cerebro_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="sistema_nervioso"
                    name="sistema_nervioso"
                    checked={
                      statePercepcionDiscapacidad.sistema_nervioso === true
                        ? statePercepcionDiscapacidad.sistema_nervioso
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_nervioso: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="sistema_nervioso">Sistema nervioso</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="sistema_nervioso_input"
                    value={
                      statePercepcionDiscapacidad.sistema_nervioso_texto
                        ? statePercepcionDiscapacidad.sistema_nervioso_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_nervioso_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="sistema_cardiorespiratorio"
                    name="sistema_cardiorespiratorio"
                    checked={
                      statePercepcionDiscapacidad.sistema_cardio === true
                        ? statePercepcionDiscapacidad.sistema_cardio
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_cardio: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="sistema_cardiorespiratorio">
                    Sistema cardio-respiratorio
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="sistema_cardiorespiratorioinput"
                    value={
                      statePercepcionDiscapacidad.sistema_cardio_texto
                        ? statePercepcionDiscapacidad.sistema_cardio_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_cardio_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="sistema_cardiorespiratorio"
                    name="sistema_cardiorespiratorio"
                    checked={
                      statePercepcionDiscapacidad.sistema_genital === true
                        ? statePercepcionDiscapacidad.sistema_genital
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_genital: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="sistema_cardiorespiratorio">
                    Sistema genital, urinario, reproductor
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="sistema_cardiorespiratorioinput"
                    value={
                      statePercepcionDiscapacidad.sistema_genital_texto
                        ? statePercepcionDiscapacidad.sistema_genital_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_genital_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="sistema_cardiorespiratorio"
                    name="sistema_cardiorespiratorio"
                    checked={
                      statePercepcionDiscapacidad.sistema_digestivo === true
                        ? statePercepcionDiscapacidad.sistema_digestivo
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_digestivo: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="sistema_cardiorespiratorio">
                    Sistema digestivo
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="sistema_cardiorespiratorioinput"
                    value={
                      statePercepcionDiscapacidad.sistema_digestivo_texto
                        ? statePercepcionDiscapacidad.sistema_digestivo_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        sistema_digestivo_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="otra_organos"
                    name="otra_organos"
                    checked={
                      statePercepcionDiscapacidad.otra_organos === true
                        ? statePercepcionDiscapacidad.otra_organos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otra_organos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="otra">Otra ¿Cuál?</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="otra_organos_texto"
                    value={
                      statePercepcionDiscapacidad.otra_organos_texto
                        ? statePercepcionDiscapacidad.otra_organos_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otra_organos_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr className="styled-hr" />
          <p className="enunciado">
            Indica en cuales de esta situaciones usted experimenta una necesidad
            diferente o una dificultad
          </p>
          <table className="table-style">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Necesidad o dificultad que presenta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="cursos"
                    name="cursos"
                    checked={
                      statePercepcionDiscapacidad.cursos === true
                        ? statePercepcionDiscapacidad.cursos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        cursos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="ojos">Cursos</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="cursos_texto"
                    value={
                      statePercepcionDiscapacidad.cursos_texto
                        ? statePercepcionDiscapacidad.cursos_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        cursos_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="clases_magistrales"
                    name="clases_magistrales"
                    checked={
                      statePercepcionDiscapacidad.clases_magistrales === true
                        ? statePercepcionDiscapacidad.clases_magistrales
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        clases_magistrales: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="clases_magistrales">Clases magistrales</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="clases_magistrales_input"
                    value={
                      statePercepcionDiscapacidad.clases_magistrales_texto
                        ? statePercepcionDiscapacidad.clases_magistrales_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        clases_magistrales_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="laboratorios"
                    name="laboratorios"
                    checked={
                      statePercepcionDiscapacidad.laboratorios === true
                        ? statePercepcionDiscapacidad.laboratorios
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        laboratorios: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="laboratorios">Laboratorios</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="laboratorios_input"
                    value={
                      statePercepcionDiscapacidad.laboratorios_texto
                        ? statePercepcionDiscapacidad.laboratorios_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        laboratorios_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="secuencias_numericas"
                    name="secuencias_numericas"
                    checked={
                      statePercepcionDiscapacidad.secuencias_numericas === true
                        ? statePercepcionDiscapacidad.secuencias_numericas
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        secuencias_numericas: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="secuencias_numericas">
                    Continuar secuencias numéricas
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="secuencias_numericas_texto_input"
                    value={
                      statePercepcionDiscapacidad.secuencias_numericas_texto
                        ? statePercepcionDiscapacidad.secuencias_numericas_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        secuencias_numericas_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="talleres"
                    name="talleres"
                    checked={
                      statePercepcionDiscapacidad.talleres === true
                        ? statePercepcionDiscapacidad.talleres
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        talleres: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="talleres">Talleres</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="talleres_texto_input"
                    value={
                      statePercepcionDiscapacidad.talleres_texto
                        ? statePercepcionDiscapacidad.talleres_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        talleres_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="conferencias"
                    name="conferencias"
                    checked={
                      statePercepcionDiscapacidad.conferencias === true
                        ? statePercepcionDiscapacidad.conferencias
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        conferencias: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="conferencias">Conferencias</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="conferencias_texto_input"
                    value={
                      statePercepcionDiscapacidad.conferencias_texto
                        ? statePercepcionDiscapacidad.conferencias_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        conferencias_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="practica_deportiva"
                    name="practica_deportiva"
                    checked={
                      statePercepcionDiscapacidad.practica_deportiva === true
                        ? statePercepcionDiscapacidad.practica_deportiva
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        practica_deportiva: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="practica_deportiva">Práctica deportivas</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="practica_deportiva_texto_input"
                    value={
                      statePercepcionDiscapacidad.practica_deportiva_texto
                        ? statePercepcionDiscapacidad.practica_deportiva_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        practica_deportiva_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="ocio"
                    name="ocio"
                    checked={
                      statePercepcionDiscapacidad.ocio === true
                        ? statePercepcionDiscapacidad.ocio
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        ocio: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="ocio">Actividades de ocio</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="ocio_texto_input"
                    value={
                      statePercepcionDiscapacidad.ocio_texto
                        ? statePercepcionDiscapacidad.ocio_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        ocio_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="movilizacion"
                    name="movilizacion"
                    checked={
                      statePercepcionDiscapacidad.movilizacion === true
                        ? statePercepcionDiscapacidad.movilizacion
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        movilizacion: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="movilizacion">
                    Movilizarse de un lugar a otro
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="movilizacion_texto_input"
                    value={
                      statePercepcionDiscapacidad.movilizacion_texto
                        ? statePercepcionDiscapacidad.movilizacion_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        movilizacion_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="conciertos"
                    name="conciertos"
                    checked={
                      statePercepcionDiscapacidad.conciertos === true
                        ? statePercepcionDiscapacidad.conciertos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        conciertos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="conciertos">
                    Audiciones, conciertos, teatro o exposiciones
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="conciertos_texto_input"
                    value={
                      statePercepcionDiscapacidad.conciertos_texto
                        ? statePercepcionDiscapacidad.conciertos_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        conciertos_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="servicios_salud"
                    name="servicios_salud"
                    checked={
                      statePercepcionDiscapacidad.servicios_salud === true
                        ? statePercepcionDiscapacidad.servicios_salud
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        servicios_salud: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="servicios_salud">
                    Citas y actividades en los servicios de salud
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="servicios_salud_texto_input"
                    value={
                      statePercepcionDiscapacidad.servicios_salud_texto
                        ? statePercepcionDiscapacidad.servicios_salud_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        servicios_salud_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="asambleas"
                    name="asambleas"
                    checked={
                      statePercepcionDiscapacidad.asambleas === true
                        ? statePercepcionDiscapacidad.asambleas
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        asambleas: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="asambleas">
                    Asambleas o actividades gremiales
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="asambleas_texto_input"
                    value={
                      statePercepcionDiscapacidad.asambleas_texto
                        ? statePercepcionDiscapacidad.asambleas_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        asambleas_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="alimentos_cafeteria"
                    name="alimentos_cafeteria"
                    checked={
                      statePercepcionDiscapacidad.alimentos_cafeteria === true
                        ? statePercepcionDiscapacidad.alimentos_cafeteria
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        alimentos_cafeteria: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="alimentos_cafeteria">
                    El consumo de alimentos en las cafeterias
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="alimentos_cafeteria_texto_input"
                    value={
                      statePercepcionDiscapacidad.alimentos_cafeteria_texto
                        ? statePercepcionDiscapacidad.alimentos_cafeteria_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        alimentos_cafeteria_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="tramites"
                    name="tramites"
                    checked={
                      statePercepcionDiscapacidad.tramites === true
                        ? statePercepcionDiscapacidad.tramites
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        tramites: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="tramites">
                    Trámites académicos, financieros o arquitectónicas
                    administrativos
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="tramites_texto_input"
                    value={
                      statePercepcionDiscapacidad.tramites_texto
                        ? statePercepcionDiscapacidad.tramites_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        tramites_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="otra_nec_diferente"
                    name="otra_nec_diferente"
                    checked={
                      statePercepcionDiscapacidad.otra_nec_diferente === true
                        ? statePercepcionDiscapacidad.otra_nec_diferente
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otra_nec_diferente: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="otra">Otra ¿Cuál?</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="otra_nec_diferente_texto"
                    value={
                      statePercepcionDiscapacidad.otra_nec_diferente_texto
                        ? statePercepcionDiscapacidad.otra_nec_diferente_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otra_nec_diferente_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr className="styled-hr" />
        </div>
        <div>
          <div>
            <p className="enunciado">
              Frente a la limitación de su participación y óptimo desempeño, el
              factor que más le impacta en los diferentes escenarios de la vida
              universitaria es/son
            </p>
            <div className="select_space">
              <input
                type="checkbox"
                checked={
                  statePercepcionDiscapacidad.condicion_discapacidad === true
                    ? statePercepcionDiscapacidad.condicion_discapacidad
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    condicion_discapacidad: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Condición de discapacidad</label>
            </div>
            <div className="select_space">
              <input
                type="checkbox"
                checked={
                  statePercepcionDiscapacidad.contexto_universitario === true
                    ? statePercepcionDiscapacidad.contexto_universitario
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    contexto_universitario: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Características del contexto universitario</label>
            </div>
          </div>

          <p className="enunciado">
            Características del contexto universitario. Indique cuál(s) de los
            siguientes factores le genera(n) mayor dificultad
          </p>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.ausencia_ayuda_tec === true
                  ? statePercepcionDiscapacidad.ausencia_ayuda_tec
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  ausencia_ayuda_tec: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>
              Ausencia o deficiencia de dispositivos, equipos o ayudas
              tecnológicas
            </label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.ausencia_espacios_fisicos === true
                  ? statePercepcionDiscapacidad.ausencia_espacios_fisicos
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  ausencia_espacios_fisicos: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>
              La ausencia o deficiencia de condiciones de accesibilidad a los
              espacios físicos
            </label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.ausencia_materiales_impresos ===
                true
                  ? statePercepcionDiscapacidad.ausencia_materiales_impresos
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  ausencia_materiales_impresos: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>
              La ausencia o deficiencia de condiciones de accesibilidad a los
              materiales impresos y página web de la universidad
            </label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.ausencia_personas_apoyo === true
                  ? statePercepcionDiscapacidad.ausencia_personas_apoyo
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  ausencia_personas_apoyo: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>
              La ausencia o deficiencia de personas que apoyen el desarrollo de
              las actividades
            </label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.actitudes_negativas_personas ===
                true
                  ? statePercepcionDiscapacidad.actitudes_negativas_personas
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  actitudes_negativas_personas: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>
              Las actitudes negativas de las personas que no se disponen a
              apoyar
            </label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.ausencia_servicios_discapacidad ===
                true
                  ? statePercepcionDiscapacidad.ausencia_servicios_discapacidad
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  ausencia_servicios_discapacidad: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>
              La ausencia de programas o servicios para personas con
              discapacidad en la universidad
            </label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.otros_factores === true
                  ? statePercepcionDiscapacidad.otros_factores
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  otros_factores: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>Otros ¿Cuales?</label>
            <input
              type="text"
              placeholder="Defina el factor del impacto del contexto"
              value={
                statePercepcionDiscapacidad.otros_factores_texto
                  ? statePercepcionDiscapacidad.otros_factores_texto
                  : ""
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  otros_factores_texto: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>

          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.condicion_psicoemocional === true
                  ? statePercepcionDiscapacidad.condicion_psicoemocional
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  condicion_psicoemocional: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>Condición psicoemocional</label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                statePercepcionDiscapacidad.otra_psicoemocional === true
                  ? statePercepcionDiscapacidad.otra_psicoemocional
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  otra_psicoemocional: e.target.checked,
                })
              }
              disabled={stateDisabled}
            />
            <label>Otra ¿Cual?</label>
            <input
              type="text"
              placeholder="Defina el factor del impacto"
              value={
                statePercepcionDiscapacidad.otra_psicoemocional_texto
                  ? statePercepcionDiscapacidad.otra_psicoemocional_texto
                  : ""
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  otra_psicoemocional_texto: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <hr className="styled-hr" />
          <p className="enunciado">
            De acuerdo a su desempeño para las actividades de la vida diaria y
            académica indique las posibilidades con las que cuenta para llevar a
            cabo las siguientes actividades
          </p>
          <table className="table-style">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Posibilidad</th>
                <th>Tipo de apoyo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="ojos"
                    name="ojos"
                    checked={
                      statePercepcionDiscapacidad.escritos_impresos === true
                        ? statePercepcionDiscapacidad.escritos_impresos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        escritos_impresos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="ojos">
                    Leer y/o comprender textos escritos impresos
                  </label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.escritos_impresos_numero
                        ? statePercepcionDiscapacidad.escritos_impresos_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        escritos_impresos_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="imagenes_pantalla"
                    name="imagenes_pantalla"
                    checked={
                      statePercepcionDiscapacidad.imagenes_pantalla === true
                        ? statePercepcionDiscapacidad.imagenes_pantalla
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        imagenes_pantalla: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="imagenes_pantalla">
                    Leer los textos e imágenes en pantalla
                  </label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.imagenes_pantalla_numero
                        ? statePercepcionDiscapacidad.imagenes_pantalla_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        imagenes_pantalla_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="copia_dictado"
                    name="copia_dictado"
                    checked={
                      statePercepcionDiscapacidad.copia_dictado === true
                        ? statePercepcionDiscapacidad.copia_dictado
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        copia_dictado: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="copia_dictado">Copia al dictado</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.copia_dictado_numero
                        ? statePercepcionDiscapacidad.copia_dictado_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        copia_dictado_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="transcripcion_textos"
                    name="transcripcion_textos"
                    checked={
                      statePercepcionDiscapacidad.transcripcion_textos === true
                        ? statePercepcionDiscapacidad.transcripcion_textos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        transcripcion_textos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="transcripcion_textos">
                    Transcripción de textos escritos
                  </label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.transcripcion_textos_numero
                        ? statePercepcionDiscapacidad.transcripcion_textos_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        transcripcion_textos_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="manuales_escritos"
                    name="manuales_escritos"
                    checked={
                      statePercepcionDiscapacidad.manuales_escritos === true
                        ? statePercepcionDiscapacidad.manuales_escritos
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        manuales_escritos: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="manuales_escritos">
                    Escritura y redacción de textos manuales escritos
                  </label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.manuales_escritos_numero
                        ? statePercepcionDiscapacidad.manuales_escritos_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        manuales_escritos_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="textos_pantalla"
                    name="textos_pantalla"
                    checked={
                      statePercepcionDiscapacidad.textos_pantalla === true
                        ? statePercepcionDiscapacidad.textos_pantalla
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        textos_pantalla: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="textos_pantalla">
                    Escritura y redacción de textos en pantalla
                  </label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.textos_pantalla_numero
                        ? statePercepcionDiscapacidad.textos_pantalla_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        textos_pantalla_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="redactar"
                    name="redactar"
                    checked={
                      statePercepcionDiscapacidad.redactar === true
                        ? statePercepcionDiscapacidad.redactar
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        redactar: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="redactar">Escritura y/o redactar</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.redactar_numero
                        ? statePercepcionDiscapacidad.redactar_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        redactar_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="elaborar_ideas"
                    name="elaborar_ideas"
                    checked={
                      statePercepcionDiscapacidad.elaborar_ideas === true
                        ? statePercepcionDiscapacidad.elaborar_ideas
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        elaborar_ideas: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="elaborar_ideas">Elaborar conceptos o ideas</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.elaborar_ideas_numero
                        ? statePercepcionDiscapacidad.elaborar_ideas_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        elaborar_ideas_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="escuchar"
                    name="escuchar"
                    checked={
                      statePercepcionDiscapacidad.escuchar === true
                        ? statePercepcionDiscapacidad.escuchar
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        escuchar: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="escuchar">Escuchar</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.escuchar_numero
                        ? statePercepcionDiscapacidad.escuchar_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        escuchar_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="expre_oral"
                    name="expre_oral"
                    checked={
                      statePercepcionDiscapacidad.expre_oral === true
                        ? statePercepcionDiscapacidad.expre_oral
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        expre_oral: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="expre_oral">Expresarse oralmente</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.expre_oral_numero
                        ? statePercepcionDiscapacidad.expre_oral_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        expre_oral_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="compren_oral"
                    name="compren_oral"
                    checked={
                      statePercepcionDiscapacidad.compren_oral === true
                        ? statePercepcionDiscapacidad.compren_oral
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        compren_oral: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="compren_oral">Comprender mensajes orales</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.compren_oral_numero
                        ? statePercepcionDiscapacidad.compren_oral_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        compren_oral_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="interactuar"
                    name="interactuar"
                    checked={
                      statePercepcionDiscapacidad.interactuar === true
                        ? statePercepcionDiscapacidad.interactuar
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        interactuar: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="interactuar">Conversar / interactuar</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.interactuar_numero
                        ? statePercepcionDiscapacidad.interactuar_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        interactuar_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="rel_interpersonales"
                    name="rel_interpersonales"
                    checked={
                      statePercepcionDiscapacidad.rel_interpersonales === true
                        ? statePercepcionDiscapacidad.rel_interpersonales
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        rel_interpersonales: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="rel_interpersonales">
                    Relaciones interpersonales
                  </label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.rel_interpersonales_numero
                        ? statePercepcionDiscapacidad.rel_interpersonales_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        rel_interpersonales_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="desplazarse"
                    name="desplazarse"
                    checked={
                      statePercepcionDiscapacidad.desplazarse === true
                        ? statePercepcionDiscapacidad.desplazarse
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        desplazarse: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="desplazarse">Desplazarse</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.desplazarse_numero
                        ? statePercepcionDiscapacidad.desplazarse_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        desplazarse_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="manipular_obj"
                    name="manipular_obj"
                    checked={
                      statePercepcionDiscapacidad.manipular_obj === true
                        ? statePercepcionDiscapacidad.manipular_obj
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        manipular_obj: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="manipular_obj">Manipular objetos</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.manipular_obj_numero
                        ? statePercepcionDiscapacidad.manipular_obj_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        manipular_obj_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="mant_sentado"
                    name="mant_sentado"
                    checked={
                      statePercepcionDiscapacidad.mant_sentado === true
                        ? statePercepcionDiscapacidad.mant_sentado
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        mant_sentado: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="mant_sentado">Mantenerse sentado</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.mant_sentado_numero
                        ? statePercepcionDiscapacidad.mant_sentado_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        mant_sentado_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="asearse"
                    name="asearse"
                    checked={
                      statePercepcionDiscapacidad.asearse === true
                        ? statePercepcionDiscapacidad.asearse
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        asearse: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="asearse">Asearse</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.asearse_numero
                        ? statePercepcionDiscapacidad.asearse_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        asearse_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="vestirse_desves"
                    name="vestirse_desves"
                    checked={
                      statePercepcionDiscapacidad.vestirse_desves === true
                        ? statePercepcionDiscapacidad.vestirse_desves
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        vestirse_desves: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="vestirse_desves">Vestirse y desvestirse</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.vestirse_desves_numero
                        ? statePercepcionDiscapacidad.vestirse_desves_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        vestirse_desves_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="consumier_alimen"
                    name="consumier_alimen"
                    checked={
                      statePercepcionDiscapacidad.consumier_alimen === true
                        ? statePercepcionDiscapacidad.consumier_alimen
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        consumier_alimen: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="consumier_alimen">Consumir alimentos</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.consumier_alimen_numero
                        ? statePercepcionDiscapacidad.consumier_alimen_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        consumier_alimen_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="evacuar"
                    name="evacuar"
                    checked={
                      statePercepcionDiscapacidad.evacuar === true
                        ? statePercepcionDiscapacidad.evacuar
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        evacuar: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="evacuar">Evacuar (micción / deposición)</label>
                </td>
                <td>
                  <input
                    type="range"
                    id="vision_range"
                    name="vision_range"
                    min="0"
                    max="100"
                    value={
                      statePercepcionDiscapacidad.evacuar_numero
                        ? statePercepcionDiscapacidad.evacuar_numero
                        : 0
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        evacuar_numero: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <span id="vision_value">Lo hace sin ayuda</span>
                </td>
                <td>
                  <p>NO RESGITRA(WIP)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="otro"
                    name="otro"
                    checked={
                      statePercepcionDiscapacidad.otro === true
                        ? statePercepcionDiscapacidad.otro
                        : false
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otro: e.target.checked,
                      })
                    }
                    disabled={stateDisabled}
                  />
                  <label for="otra">Otro</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="otra_input"
                    value={
                      statePercepcionDiscapacidad.otro_texto
                        ? statePercepcionDiscapacidad.otro_texto
                        : ""
                    }
                    onChange={(e) =>
                      setStatePercepcionDiscapacidad({
                        ...statePercepcionDiscapacidad,
                        otro_texto: e.target.value,
                      })
                    }
                    disabled={stateDisabled}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr className="styled-hr" />
          <p className="enunciado">
            Para realizar actividades cotidianas y académicos en su casa, ¿en
            quién o en qué se apoya?
          </p>
          <p>El principal apoyo con el que cuenta es</p>
          <div className="checkbox_container sin_borde">
            <div>
              <input
                type="checkbox"
                id="amigos"
                name="amigos"
                checked={
                  statePercepcionDiscapacidad.amigo_apoyo === true
                    ? statePercepcionDiscapacidad.amigo_apoyo
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    amigo_apoyo: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="amigos">Amigos</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="pareja"
                name="pareja"
                checked={
                  statePercepcionDiscapacidad.pareja_apoyo === true
                    ? statePercepcionDiscapacidad.pareja_apoyo
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    pareja_apoyo: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="pareja">Pareja</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="familia"
                name="familia"
                checked={
                  statePercepcionDiscapacidad.familia_apoyo === true
                    ? statePercepcionDiscapacidad.familia_apoyo
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    familia_apoyo: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="familia">Familia</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="servicio_salud"
                name="servicio_salud"
                checked={
                  statePercepcionDiscapacidad.salud_apoyo === true
                    ? statePercepcionDiscapacidad.salud_apoyo
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    salud_apoyo: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="servicio_salud">Servicio de salud</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="otro"
                name="otro"
                checked={
                  statePercepcionDiscapacidad.otro_apoyo === true
                    ? statePercepcionDiscapacidad.otro_apoyo
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    otro_apoyo: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="otro">Otro</label>
            </div>
          </div>
          <p className="enunciado">
            Para desplazarse a la universidad usted principalmente
          </p>
          <div className="checkbox_container sin_borde">
            <div>
              <input
                type="checkbox"
                id="privado_desplazar"
                name="privado_desplazar"
                checked={
                  statePercepcionDiscapacidad.privado_desplazar === true
                    ? statePercepcionDiscapacidad.privado_desplazar
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    privado_desplazar: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="privado_desplazar">Paga transporte privado</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="publico_desplazar"
                name="publico_desplazar"
                checked={
                  statePercepcionDiscapacidad.publico_desplazar === true
                    ? statePercepcionDiscapacidad.publico_desplazar
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    publico_desplazar: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="publico_desplazar">Usa el transporte público</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="propio_desplazar"
                name="propio_desplazar"
                checked={
                  statePercepcionDiscapacidad.propio_desplazar === true
                    ? statePercepcionDiscapacidad.propio_desplazar
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    propio_desplazar: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="propio_desplazar">Tiene transporte propio</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="otro_desplazar"
                name="otro_desplazar"
                checked={
                  statePercepcionDiscapacidad.otro_desplazar === true
                    ? statePercepcionDiscapacidad.otro_desplazar
                    : false
                }
                onChange={(e) =>
                  setStatePercepcionDiscapacidad({
                    ...statePercepcionDiscapacidad,
                    otro_desplazar: e.target.checked,
                  })
                }
                disabled={stateDisabled}
              />
              <label for="otro_desplazar">Otro</label>
            </div>
          </div>
          <p className="enunciado">
            ¿Participa de alguna organización o asociación con otras personas
            con discapacidad o con condiciones similares a las que usted
            experimenta?
          </p>
          <div className="select_space">
            <input
              type="radio"
              id="si"
              name="organizacion"
              checked={
                statePercepcionDiscapacidad.participa_org === true
                  ? true
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  participa_org: !statePercepcionDiscapacidad.participa_org,
                })
              }
              disabled={stateDisabled}
            />
            <label for="otro">Si</label>
            <input
              type="radio"
              id="no"
              name="organizacion"
              checked={
                statePercepcionDiscapacidad.participa_org === false
                  ? true
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  participa_org: !statePercepcionDiscapacidad.participa_org,
                })
              }
              disabled={stateDisabled}
            />
            <label for="otro">No</label>
          </div>
          <p className="enunciado">
            ¿Realiza actividades con otras personas con discapacidad?
          </p>
          <div className="select_space">
            <input
              type="radio"
              id="si"
              name="actividades_disca"
              checked={
                statePercepcionDiscapacidad.act_otras_per === true
                  ? true
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  act_otras_per: !statePercepcionDiscapacidad.act_otras_per,
                })
              }
              disabled={stateDisabled}
            />
            <label for="otro">Si</label>
            <input
              type="radio"
              id="no"
              name="actividades_disca"
              checked={
                statePercepcionDiscapacidad.act_otras_per === false
                  ? true
                  : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  act_otras_per: !statePercepcionDiscapacidad.act_otras_per,
                })
              }
              disabled={stateDisabled}
            />
            <label for="otro">No</label>
          </div>
          <p className="enunciado">
            ¿Alguna institución le ha proporcionado apoyo por su situación de
            discapacidad?
          </p>
          <div className="select_space">
            <input
              type="radio"
              id="si"
              name="apoyo_discapacidad"
              checked={
                statePercepcionDiscapacidad.apoyo_inst === true ? true : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  apoyo_inst: !statePercepcionDiscapacidad.apoyo_inst,
                })
              }
              disabled={stateDisabled}
            />
            <label for="otro">Si</label>
            <input
              type="radio"
              id="no"
              name="apoyo_discapacidad"
              checked={
                statePercepcionDiscapacidad.apoyo_inst === false ? true : false
              }
              onChange={(e) =>
                setStatePercepcionDiscapacidad({
                  ...statePercepcionDiscapacidad,
                  apoyo_inst: !statePercepcionDiscapacidad.apoyo_inst,
                })
              }
              disabled={stateDisabled}
            />
            <label for="otro">No</label>
          </div>
          <label>¿Cual?</label>
          <input
            type="text"
            value={
              statePercepcionDiscapacidad.nombre_institucion
                ? statePercepcionDiscapacidad.nombre_institucion
                : ""
            }
            onChange={(e) =>
              setStatePercepcionDiscapacidad({
                ...statePercepcionDiscapacidad,
                nombre_institucion: e.target.value,
              })
            }
            disabled={stateDisabled}
          />
          <label>¿Qué tipo de apoyo?</label>
          <input
            type="text"
            value={
              statePercepcionDiscapacidad.tipo_apoyo
                ? statePercepcionDiscapacidad.tipo_apoyo
                : ""
            }
            onChange={(e) =>
              setStatePercepcionDiscapacidad({
                ...statePercepcionDiscapacidad,
                tipo_apoyo: e.target.value,
              })
            }
            disabled={stateDisabled}
          />
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
          onClick={handleUpdateDatosPercepcionDiscapacidad}
        >
          Enviar
        </button>
      )}
    </div>
  );
};

export default PercepcionCaracteristicasDiscapacidad;
