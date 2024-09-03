import { useState } from "react";

const PercepcionCaracteristicasDiscapacidad = ({ percepcion_discapacidad }) => {
  const [visionRange1, setVisionRange1] = useState("0");
  const [visionRange2, setVisionRange2] = useState("0");
  const [visionRange3, setVisionRange3] = useState("0");
  const [visionRange4, setVisionRange4] = useState("0");
  const [visionRange5, setVisionRange5] = useState("0");
  const [visionRange6, setVisionRange6] = useState("0");
  const [visionRange7, setVisionRange7] = useState("0");
  const [visionRange8, setVisionRange8] = useState("0");
  const [visionRange9, setVisionRange9] = useState("0");
  const [visionRange10, setVisionRange10] = useState("0");
  const [visionRange11, setVisionRange11] = useState("0");
  const [visionRange12, setVisionRange12] = useState("0");
  const [visionRange13, setVisionRange13] = useState("0");
  const [visionRange14, setVisionRange14] = useState("0");
  const [visionRange15, setVisionRange15] = useState("0");
  const [visionRange16, setVisionRange16] = useState("0");
  const [visionRange17, setVisionRange17] = useState("0");
  const [visionRange18, setVisionRange18] = useState("0");
  const [visionRange19, setVisionRange19] = useState("0");
  const [visionRange20, setVisionRange20] = useState("0");

  return (
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
                  percepcion_discapacidad.considera_discapacidad === true
                    ? percepcion_discapacidad.considera_discapacidad
                    : ""
                }
              />
            </div>
            <div className="select_space">
              <label>No</label>
              <input
                type="radio"
                name="tiene_discapacidad"
                checked={
                  percepcion_discapacidad.considera_discapacidad === false
                    ? percepcion_discapacidad.considera_discapacidad
                    : ""
                }
              />
            </div>
          </div>
          <textarea
            className="textarea-input"
            name="adquisicion_discapacidad"
            id="adquisicion_discapacidad"
            placeholder="Describa la consideración"
            value={
              percepcion_discapacidad.consideracion
                ? percepcion_discapacidad.consideracion
                : ""
            }
          />
        </div>
        <div className="select_space">
          <label>
            ¿Cuál de las siguientes circunstancias corresponde a la adquisición
            de discapacidad?
          </label>
          <label>Adquisición por</label>
          <textarea
            className="textarea-input"
            name="adquisicion_discapacidad"
            id="adquisicion_discapacidad"
            value={
              percepcion_discapacidad.adquisicion
                ? percepcion_discapacidad.adquisicion
                : ""
            }
          />
        </div>
        <div className="select_space">
          <label>¿Cuenta con un diagnóstico de su discapacidad?</label>
          <div className="select_space">
            <label>Diagnóstico</label>
            <input
              type="checkbox"
              checked={
                percepcion_discapacidad.cuenta_con_diagnostico === true
                  ? percepcion_discapacidad.cuenta_con_diagnostico
                  : false
              }
            />
          </div>
          <label>Tipo</label>
          <textarea
            className="textarea-input"
            name="diagnostico_discapacidad"
            id="diagnostico_discapacidad"
            value={
              percepcion_discapacidad.tipo_diagnostico
                ? percepcion_discapacidad.tipo_diagnostico
                : ""
            }
          />
        </div>
        <label>¿Tiene certificado de invalidez?</label>
        <div className="select_space">
          <label>Certificado</label>
          <input
            type="checkbox"
            checked={
              percepcion_discapacidad.certificado_invalidez === true
                ? percepcion_discapacidad.certificado_invalidez
                : false
            }
          />
        </div>
        <label>¿Entrega documentos soporte?</label>
        <div className="select_space">
          <label>Soporte</label>
          <input
            type="checkbox"
            checked={
              percepcion_discapacidad.documento_soporte === true
                ? percepcion_discapacidad.documento_soporte
                : false
            }
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
                    percepcion_discapacidad.vision === true
                      ? percepcion_discapacidad.vision
                      : false
                  }
                />
                <label for="vision">Visión</label>
              </td>
              <td>
                <input
                  type="text"
                  name="vision_input"
                  value={
                    percepcion_discapacidad.vision_texto
                      ? percepcion_discapacidad.vision_texto
                      : ""
                  }
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
                    percepcion_discapacidad.audicion === true
                      ? percepcion_discapacidad.audicion
                      : false
                  }
                />
                <label for="audicion">Audición</label>
              </td>
              <td>
                <input
                  type="text"
                  name="audicion_input"
                  value={
                    percepcion_discapacidad.audicion_texto
                      ? percepcion_discapacidad.audicion_texto
                      : ""
                  }
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
                    percepcion_discapacidad.voz_y_habla === true
                      ? percepcion_discapacidad.voz_y_habla
                      : false
                  }
                />
                <label for="audicion">Voz y habla</label>
              </td>
              <td>
                <input
                  type="text"
                  name="voz_habla_input"
                  value={
                    percepcion_discapacidad.voz_y_habla_texto
                      ? percepcion_discapacidad.voz_y_habla_texto
                      : ""
                  }
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
                    percepcion_discapacidad.movimiento_cuerpo === true
                      ? percepcion_discapacidad.movimiento_cuerpo
                      : false
                  }
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
                    percepcion_discapacidad.movimiento_cuerpo_texto
                      ? percepcion_discapacidad.movimiento_cuerpo_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.cognicion === true
                      ? percepcion_discapacidad.cognicion
                      : false
                  }
                />
                <label for="cognicion">Cognición</label>
              </td>
              <td>
                <input
                  type="text"
                  name="cognicion_input"
                  value={
                    percepcion_discapacidad.cognicion_texto
                      ? percepcion_discapacidad.cognicion_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.estado_socio_emocional === true
                      ? percepcion_discapacidad.estado_socio_emocional
                      : false
                  }
                />
                <label for="audicion">Estado socio-emocional</label>
              </td>
              <td>
                <input
                  type="text"
                  name="estado_socioemocional_input"
                  value={
                    percepcion_discapacidad.estado_socio_emocional_texto
                      ? percepcion_discapacidad.estado_socio_emocional_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.relaciones_sexuales === true
                      ? percepcion_discapacidad.relaciones_sexuales
                      : false
                  }
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
                    percepcion_discapacidad.relaciones_sexuales_texto
                      ? percepcion_discapacidad.relaciones_sexuales_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.deglucion === true
                      ? percepcion_discapacidad.deglucion
                      : false
                  }
                />
                <label for="audicion">Masticación y/o deglución</label>
              </td>
              <td>
                <input
                  type="text"
                  name="masticaion_deglucion_input"
                  value={
                    percepcion_discapacidad.deglucion_texto
                      ? percepcion_discapacidad.deglucion_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.otra === true
                      ? percepcion_discapacidad.otra
                      : false
                  }
                />
                <label for="otra">Otra ¿Cuál?</label>
              </td>
              <td>
                <input
                  type="text"
                  name="otra_input"
                  value={
                    percepcion_discapacidad.otra_texto
                      ? percepcion_discapacidad.otra_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.ojos === true
                      ? percepcion_discapacidad.ojos
                      : false
                  }
                />
                <label for="ojos">Ojos</label>
              </td>
              <td>
                <input
                  type="text"
                  name="ojos_input"
                  value={
                    percepcion_discapacidad.ojos_texto
                      ? percepcion_discapacidad.ojos_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.oidos === true
                      ? percepcion_discapacidad.oidos
                      : false
                  }
                />
                <label for="oido">Oídos</label>
              </td>
              <td>
                <input
                  type="text"
                  name="oido_input"
                  value={
                    percepcion_discapacidad.oidos_texto
                      ? percepcion_discapacidad.oidos_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.vocales === true
                      ? percepcion_discapacidad.vocales
                      : false
                  }
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
                    percepcion_discapacidad.vocales_texto
                      ? percepcion_discapacidad.vocales_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.manos === true
                      ? percepcion_discapacidad.manos
                      : false
                  }
                />
                <label for="brazos_manos">Brazos / manos</label>
              </td>
              <td>
                <input
                  type="text"
                  name="brazos_manos_input"
                  value={
                    percepcion_discapacidad.manos_texto
                      ? percepcion_discapacidad.manos_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.piernas === true
                      ? percepcion_discapacidad.piernas
                      : false
                  }
                />
                <label for="piernas">Piernas</label>
              </td>
              <td>
                <input
                  type="text"
                  name="piernas_input"
                  value={
                    percepcion_discapacidad.piernas_texto
                      ? percepcion_discapacidad.piernas_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.piel === true
                      ? percepcion_discapacidad.piel
                      : false
                  }
                />
                <label for="piel">Piel</label>
              </td>
              <td>
                <input
                  type="text"
                  name="piel_input"
                  value={
                    percepcion_discapacidad.piel_texto
                      ? percepcion_discapacidad.piel_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.cerebro === true
                      ? percepcion_discapacidad.cerebro
                      : false
                  }
                />
                <label for="cerebro">Cerebro</label>
              </td>
              <td>
                <input
                  type="text"
                  name="cerebro_input"
                  value={
                    percepcion_discapacidad.cerebro_texto
                      ? percepcion_discapacidad.cerebro_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.sistema_nervioso === true
                      ? percepcion_discapacidad.sistema_nervioso
                      : false
                  }
                />
                <label for="sistema_nervioso">Sistema nervioso</label>
              </td>
              <td>
                <input
                  type="text"
                  name="sistema_nervioso_input"
                  value={
                    percepcion_discapacidad.sistema_nervioso_texto
                      ? percepcion_discapacidad.sistema_nervioso_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.sistema_cardio === true
                      ? percepcion_discapacidad.sistema_cardio
                      : false
                  }
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
                    percepcion_discapacidad.sistema_cardio_texto
                      ? percepcion_discapacidad.sistema_cardio_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.sistema_genital === true
                      ? percepcion_discapacidad.sistema_genital
                      : false
                  }
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
                    percepcion_discapacidad.sistema_genital_texto
                      ? percepcion_discapacidad.sistema_genital_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.sistema_digestivo === true
                      ? percepcion_discapacidad.sistema_digestivo
                      : false
                  }
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
                    percepcion_discapacidad.sistema_digestivo_texto
                      ? percepcion_discapacidad.sistema_digestivo_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.otro === true
                      ? percepcion_discapacidad.otro
                      : false
                  }
                />
                <label for="otra">Otra ¿Cuál?</label>
              </td>
              <td>
                <input
                  type="text"
                  name="otra_input"
                  value={
                    percepcion_discapacidad.otro_texto
                      ? percepcion_discapacidad.otro_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.cursos === true
                      ? percepcion_discapacidad.cursos
                      : false
                  }
                />
                <label for="ojos">Cursos</label>
              </td>
              <td>
                <input
                  type="text"
                  name="cursos_texto"
                  value={
                    percepcion_discapacidad.cursos_texto
                      ? percepcion_discapacidad.cursos_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.clases_magistrales === true
                      ? percepcion_discapacidad.clases_magistrales
                      : false
                  }
                />
                <label for="clases_magistrales">Clases magistrales</label>
              </td>
              <td>
                <input
                  type="text"
                  name="clases_magistrales_input"
                  value={
                    percepcion_discapacidad.clases_magistrales_texto
                      ? percepcion_discapacidad.clases_magistrales_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.laboratorios === true
                      ? percepcion_discapacidad.laboratorios
                      : false
                  }
                />
                <label for="laboratorios">Laboratorios</label>
              </td>
              <td>
                <input
                  type="text"
                  name="laboratorios_input"
                  value={
                    percepcion_discapacidad.laboratorios_texto
                      ? percepcion_discapacidad.laboratorios_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.secuencias_numericas === true
                      ? percepcion_discapacidad.secuencias_numericas
                      : false
                  }
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
                    percepcion_discapacidad.secuencias_numericas_texto
                      ? percepcion_discapacidad.secuencias_numericas_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.talleres === true
                      ? percepcion_discapacidad.talleres
                      : false
                  }
                />
                <label for="talleres">Talleres</label>
              </td>
              <td>
                <input
                  type="text"
                  name="talleres_texto_input"
                  value={
                    percepcion_discapacidad.talleres_texto
                      ? percepcion_discapacidad.talleres_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.conferencias === true
                      ? percepcion_discapacidad.conferencias
                      : false
                  }
                />
                <label for="conferencias">Conferencias</label>
              </td>
              <td>
                <input
                  type="text"
                  name="conferencias_texto_input"
                  value={
                    percepcion_discapacidad.conferencias_texto
                      ? percepcion_discapacidad.conferencias_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.practica_deportiva === true
                      ? percepcion_discapacidad.practica_deportiva
                      : false
                  }
                />
                <label for="practica_deportiva">Práctica deportivas</label>
              </td>
              <td>
                <input
                  type="text"
                  name="practica_deportiva_texto_input"
                  value={
                    percepcion_discapacidad.practica_deportiva_texto
                      ? percepcion_discapacidad.practica_deportiva_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.ocio === true
                      ? percepcion_discapacidad.ocio
                      : false
                  }
                />
                <label for="ocio">Actividades de ocio</label>
              </td>
              <td>
                <input
                  type="text"
                  name="ocio_texto_input"
                  value={
                    percepcion_discapacidad.ocio_texto
                      ? percepcion_discapacidad.ocio_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.movilizacion === true
                      ? percepcion_discapacidad.movilizacion
                      : false
                  }
                />
                <label for="movilizacion">Movilizarse de un lugar a otro</label>
              </td>
              <td>
                <input
                  type="text"
                  name="movilizacion_texto_input"
                  value={
                    percepcion_discapacidad.movilizacion_texto
                      ? percepcion_discapacidad.movilizacion_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.conciertos === true
                      ? percepcion_discapacidad.conciertos
                      : false
                  }
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
                    percepcion_discapacidad.conciertos_texto
                      ? percepcion_discapacidad.conciertos_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.servicios_salud === true
                      ? percepcion_discapacidad.servicios_salud
                      : false
                  }
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
                    percepcion_discapacidad.servicios_salud_texto
                      ? percepcion_discapacidad.servicios_salud_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.asambleas === true
                      ? percepcion_discapacidad.asambleas
                      : false
                  }
                />
                <label for="asambleas">Asambleas o actividades gremiales</label>
              </td>
              <td>
                <input
                  type="text"
                  name="asambleas_texto_input"
                  value={
                    percepcion_discapacidad.asambleas_texto
                      ? percepcion_discapacidad.asambleas_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.alimentos_cafeteria === true
                      ? percepcion_discapacidad.alimentos_cafeteria
                      : false
                  }
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
                    percepcion_discapacidad.alimentos_cafeteria_texto
                      ? percepcion_discapacidad.alimentos_cafeteria_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.tramites === true
                      ? percepcion_discapacidad.tramites
                      : false
                  }
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
                    percepcion_discapacidad.tramites_texto
                      ? percepcion_discapacidad.tramites_texto
                      : "Sin especificar"
                  }
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
                    percepcion_discapacidad.otra === true
                      ? percepcion_discapacidad.otra
                      : false
                  }
                />
                <label for="otra">Otra ¿Cuál?</label>
              </td>
              <td>
                <input
                  type="text"
                  name="otra_input"
                  value={
                    percepcion_discapacidad.otra_texto
                      ? percepcion_discapacidad.otra_texto
                      : "Sin especificar"
                  }
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
                percepcion_discapacidad.condicion_discapacidad === true
                  ? percepcion_discapacidad.condicion_discapacidad
                  : false
              }
            />
            <label>Condición de discapacidad</label>
          </div>
          <div className="select_space">
            <input
              type="checkbox"
              checked={
                percepcion_discapacidad.contexto_universitario === true
                  ? percepcion_discapacidad.contexto_universitario
                  : false
              }
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
              percepcion_discapacidad.ausencia_ayuda_tec === true
                ? percepcion_discapacidad.ausencia_ayuda_tec
                : false
            }
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
              percepcion_discapacidad.ausencia_espacios_fisicos === true
                ? percepcion_discapacidad.ausencia_espacios_fisicos
                : false
            }
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
              percepcion_discapacidad.ausencia_materiales_impresos === true
                ? percepcion_discapacidad.ausencia_materiales_impresos
                : false
            }
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
              percepcion_discapacidad.ausencia_personas_apoyo === true
                ? percepcion_discapacidad.ausencia_personas_apoyo
                : false
            }
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
              percepcion_discapacidad.actitudes_negativas_personas === true
                ? percepcion_discapacidad.actitudes_negativas_personas
                : false
            }
          />
          <label>
            Las actitudes negativas de las personas que no se disponen a apoyar
          </label>
        </div>
        <div className="select_space">
          <input
            type="checkbox"
            checked={
              percepcion_discapacidad.ausencia_servicios_discapacidad === true
                ? percepcion_discapacidad.ausencia_servicios_discapacidad
                : false
            }
          />
          <label>
            La ausencia de programas o servicios para personas con discapacidad
            en la universidad
          </label>
        </div>
        <div className="select_space">
          <input
            type="checkbox"
            checked={
              percepcion_discapacidad.otros_factores === true
                ? percepcion_discapacidad.otros_factores
                : false
            }
          />
          <label>Otros ¿Cuales?</label>
          <input
            type="text"
            placeholder="Defina el factor del impacto del contexto"
            value={
              percepcion_discapacidad.otros_factores_texto
                ? percepcion_discapacidad.otros_factores_texto
                : "Sin especificar"
            }
          />
        </div>

        <div className="select_space">
          <input
            type="checkbox"
            checked={
              percepcion_discapacidad.condicion_psicoemocional === true
                ? percepcion_discapacidad.condicion_psicoemocional
                : false
            }
          />
          <label>Condición psicoemocional</label>
        </div>
        <div className="select_space">
          <input
            type="checkbox"
            checked={
              percepcion_discapacidad.otra_psicoemocional === true
                ? percepcion_discapacidad.otra_psicoemocional
                : false
            }
          />
          <label>Otra ¿Cual?</label>
          <input
            type="text"
            placeholder="Defina el factor del impacto"
            value={
              percepcion_discapacidad.otra_psicoemocional_texto
                ? percepcion_discapacidad.otra_psicoemocional_texto
                : "Sin especificar"
            }
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
                    percepcion_discapacidad.escritos_impresos === true
                      ? percepcion_discapacidad.escritos_impresos
                      : false
                  }
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
                    percepcion_discapacidad.escritos_impresos_numero
                      ? percepcion_discapacidad.escritos_impresos_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange1(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="imagenes_pantalla"
                  name="imagenes_pantalla"
                  checked={
                    percepcion_discapacidad.imagenes_pantalla === true
                      ? percepcion_discapacidad.imagenes_pantalla
                      : false
                  }
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
                    percepcion_discapacidad.imagenes_pantalla_numero
                      ? percepcion_discapacidad.imagenes_pantalla_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange2(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="copia_dictado"
                  name="copia_dictado"
                  checked={
                    percepcion_discapacidad.copia_dictado === true
                      ? percepcion_discapacidad.copia_dictado
                      : false
                  }
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
                    percepcion_discapacidad.copia_dictado_numero
                      ? percepcion_discapacidad.copia_dictado_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange3(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="transcripcion_textos"
                  name="transcripcion_textos"
                  checked={
                    percepcion_discapacidad.transcripcion_textos === true
                      ? percepcion_discapacidad.transcripcion_textos
                      : false
                  }
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
                    percepcion_discapacidad.transcripcion_textos_numero
                      ? percepcion_discapacidad.transcripcion_textos_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange4(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="manuales_escritos"
                  name="manuales_escritos"
                  checked={
                    percepcion_discapacidad.manuales_escritos === true
                      ? percepcion_discapacidad.manuales_escritos
                      : false
                  }
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
                    percepcion_discapacidad.manuales_escritos_numero
                      ? percepcion_discapacidad.manuales_escritos_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange5(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="textos_pantalla"
                  name="textos_pantalla"
                  checked={
                    percepcion_discapacidad.textos_pantalla === true
                      ? percepcion_discapacidad.textos_pantalla
                      : false
                  }
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
                    percepcion_discapacidad.textos_pantalla_numero
                      ? percepcion_discapacidad.textos_pantalla_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange6(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="redactar"
                  name="redactar"
                  checked={
                    percepcion_discapacidad.redactar === true
                      ? percepcion_discapacidad.redactar
                      : false
                  }
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
                    percepcion_discapacidad.redactar_numero
                      ? percepcion_discapacidad.redactar_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange7(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="elaborar_ideas"
                  name="elaborar_ideas"
                  checked={
                    percepcion_discapacidad.elaborar_ideas === true
                      ? percepcion_discapacidad.elaborar_ideas
                      : false
                  }
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
                    percepcion_discapacidad.elaborar_ideas_numero
                      ? percepcion_discapacidad.elaborar_ideas_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange8(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="escuchar"
                  name="escuchar"
                  checked={
                    percepcion_discapacidad.escuchar === true
                      ? percepcion_discapacidad.escuchar
                      : false
                  }
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
                    percepcion_discapacidad.escuchar_numero
                      ? percepcion_discapacidad.escuchar_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange9(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="expre_oral"
                  name="expre_oral"
                  checked={
                    percepcion_discapacidad.expre_oral === true
                      ? percepcion_discapacidad.expre_oral
                      : false
                  }
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
                    percepcion_discapacidad.expre_oral_numero
                      ? percepcion_discapacidad.expre_oral_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange10(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="compren_oral"
                  name="compren_oral"
                  checked={
                    percepcion_discapacidad.compren_oral === true
                      ? percepcion_discapacidad.compren_oral
                      : false
                  }
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
                    percepcion_discapacidad.compren_oral_numero
                      ? percepcion_discapacidad.compren_oral_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange11(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="interactuar"
                  name="interactuar"
                  checked={
                    percepcion_discapacidad.interactuar === true
                      ? percepcion_discapacidad.interactuar
                      : false
                  }
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
                    percepcion_discapacidad.interactuar_numero
                      ? percepcion_discapacidad.interactuar_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange12(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="rel_interpersonales"
                  name="rel_interpersonales"
                  checked={
                    percepcion_discapacidad.rel_interpersonales === true
                      ? percepcion_discapacidad.rel_interpersonales
                      : false
                  }
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
                    percepcion_discapacidad.rel_interpersonales_numero
                      ? percepcion_discapacidad.rel_interpersonales_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange13(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="desplazarse"
                  name="desplazarse"
                  checked={
                    percepcion_discapacidad.desplazarse === true
                      ? percepcion_discapacidad.desplazarse
                      : false
                  }
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
                    percepcion_discapacidad.desplazarse_numero
                      ? percepcion_discapacidad.desplazarse_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange14(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="manipular_obj"
                  name="manipular_obj"
                  checked={
                    percepcion_discapacidad.manipular_obj === true
                      ? percepcion_discapacidad.manipular_obj
                      : false
                  }
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
                    percepcion_discapacidad.manipular_obj_numero
                      ? percepcion_discapacidad.manipular_obj_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange15(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="mant_sentado"
                  name="mant_sentado"
                  checked={
                    percepcion_discapacidad.mant_sentado === true
                      ? percepcion_discapacidad.mant_sentado
                      : false
                  }
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
                    percepcion_discapacidad.mant_sentado_numero
                      ? percepcion_discapacidad.mant_sentado_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange16(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="asearse"
                  name="asearse"
                  checked={
                    percepcion_discapacidad.asearse === true
                      ? percepcion_discapacidad.asearse
                      : false
                  }
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
                    percepcion_discapacidad.asearse_numero
                      ? percepcion_discapacidad.asearse_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange17(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="vestirse_desves"
                  name="vestirse_desves"
                  checked={
                    percepcion_discapacidad.vestirse_desves === true
                      ? percepcion_discapacidad.vestirse_desves
                      : false
                  }
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
                    percepcion_discapacidad.vestirse_desves_numero
                      ? percepcion_discapacidad.vestirse_desves_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange18(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="consumier_alimen"
                  name="consumier_alimen"
                  checked={
                    percepcion_discapacidad.consumier_alimen === true
                      ? percepcion_discapacidad.consumier_alimen
                      : false
                  }
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
                    percepcion_discapacidad.consumier_alimen_numero
                      ? percepcion_discapacidad.consumier_alimen_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange19(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="evacuar"
                  name="evacuar"
                  checked={
                    percepcion_discapacidad.evacuar === true
                      ? percepcion_discapacidad.evacuar
                      : false
                  }
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
                    percepcion_discapacidad.evacuar_numero
                      ? percepcion_discapacidad.evacuar_numero
                      : 0
                  }
                  onChange={(e) => setVisionRange20(e.target.value)}
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="otro"
                  name="otro"
                  checked={
                    percepcion_discapacidad.otro === true
                      ? percepcion_discapacidad.otro
                      : false
                  }
                />
                <label for="otra">Otro</label>
              </td>
              <td>
                <input
                  type="text"
                  name="otra_input"
                  value={
                    percepcion_discapacidad.otro_texto
                      ? percepcion_discapacidad.otro_texto
                      : "Sin especificar"
                  }
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
                percepcion_discapacidad.amigo_apoyo === true
                  ? percepcion_discapacidad.amigo_apoyo
                  : false
              }
            />
            <label for="amigos">Amigos</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pareja"
              name="pareja"
              checked={
                percepcion_discapacidad.pareja_apoyo === true
                  ? percepcion_discapacidad.pareja_apoyo
                  : false
              }
            />
            <label for="pareja">Pareja</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="familia"
              name="familia"
              checked={
                percepcion_discapacidad.familia_apoyo === true
                  ? percepcion_discapacidad.familia_apoyo
                  : false
              }
            />
            <label for="familia">Familia</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="servicio_salud"
              name="servicio_salud"
              checked={
                percepcion_discapacidad.salud_apoyo === true
                  ? percepcion_discapacidad.salud_apoyo
                  : false
              }
            />
            <label for="servicio_salud">Servicio de salud</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="otro"
              name="otro"
              checked={
                percepcion_discapacidad.otro_apoyo === true
                  ? percepcion_discapacidad.otro_apoyo
                  : false
              }
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
                percepcion_discapacidad.privado_desplazar === true
                  ? percepcion_discapacidad.privado_desplazar
                  : false
              }
            />
            <label for="privado_desplazar">Paga transporte privado</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="publico_desplazar"
              name="publico_desplazar"
              checked={
                percepcion_discapacidad.publico_desplazar === true
                  ? percepcion_discapacidad.publico_desplazar
                  : false
              }
            />
            <label for="publico_desplazar">Usa el transporte público</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="propio_desplazar"
              name="propio_desplazar"
              checked={
                percepcion_discapacidad.propio_desplazar === true
                  ? percepcion_discapacidad.propio_desplazar
                  : false
              }
            />
            <label for="propio_desplazar">Tiene transporte propio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="otro_desplazar"
              name="otro_desplazar"
              checked={
                percepcion_discapacidad.otro_desplazar === true
                  ? percepcion_discapacidad.otro_desplazar
                  : false
              }
            />
            <label for="otro_desplazar">Otro</label>
          </div>
        </div>
        <p className="enunciado">
          ¿Participa de alguna organización o asociación con otras personas con
          discapacidad o con condiciones similares a las que usted experimenta?
        </p>
        <div className="select_space">
          <input
            type="radio"
            id="si"
            name="organizacion"
            checked={
              percepcion_discapacidad.participa_org === true
                ? percepcion_discapacidad.participa_org
                : false
            }
          />
          <label for="otro">Si</label>
          <input
            type="radio"
            id="no"
            name="organizacion"
            checked={
              percepcion_discapacidad.participa_org === false
                ? !percepcion_discapacidad.participa_org
                : false
            }
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
              percepcion_discapacidad.act_otras_per === true
                ? percepcion_discapacidad.act_otras_per
                : false
            }
          />
          <label for="otro">Si</label>
          <input
            type="radio"
            id="no"
            name="actividades_disca"
            checked={
              percepcion_discapacidad.act_otras_per === false
                ? !percepcion_discapacidad.act_otras_per
                : false
            }
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
              percepcion_discapacidad.apoyo_inst === true
                ? percepcion_discapacidad.apoyo_inst
                : false
            }
          />
          <label for="otro">Si</label>
          <input
            type="radio"
            id="no"
            name="apoyo_discapacidad"
            checked={
              percepcion_discapacidad.apoyo_inst === false
                ? !percepcion_discapacidad.apoyo_inst
                : false
            }
          />
          <label for="otro">No</label>
        </div>
        <label>¿Cual?</label>
        <input
          type="text"
          value={
            percepcion_discapacidad.nombre_institucion
              ? percepcion_discapacidad.nombre_institucion
              : "Sin especificar"
          }
        />
        <label>¿Qué tipo de apoyo?</label>
        <input
          type="text"
          value={
            percepcion_discapacidad.tipo_apoyo
              ? percepcion_discapacidad.tipo_apoyo
              : "Sin especificar"
          }
        />
      </div>
    </form>
  );
};

export default PercepcionCaracteristicasDiscapacidad;
