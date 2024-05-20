import AcordionesHijos from "../AcordionesHijos";
import Columns from "../Columns";

const PercepcionCaracteristicasDiscapacidad = () => {
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
              <input type="radio" name="tiene_discapacidad"/>
            </div>
            <div className="select_space">
              <label>No</label>
              <input type="radio" name="tiene_discapacidad"/>
            </div>
          </div>
          <textarea
              name="adquisicion_discapacidad"
              id="adquisicion_discapacidad"
              placeholder="Describa la consideración"
            />
        </div>
        <div className="select_space">
          <label>
            ¿Cuál de las siguientes circunstancias corresponde a la adquisición de
            discapacidad?
          </label>
          <label>Adquisición por</label>
          <textarea
                  name="adquisicion_discapacidad"
                  id="adquisicion_discapacidad"
                />
        </div>
        <div className="select_space">
          <label>¿Cuenta con un diagnóstico de su discapacidad?</label>
          <div className="select_space">
          <label>Diagnóstico</label>
          <input type="checkbox" />
          </div>
          <label>Tipo</label>
          <textarea
            name="diagnostico_discapacidad"
            id="diagnostico_discapacidad"
          />
        </div>
        <label>¿Tiene certificado de invalidez?</label>
        <div className="select_space">
          <label>Certificado</label>
          <input type="checkbox" />
        </div>
        <label>¿Entrega documentos soporte?</label>     
        <div className="select_space">
        <label>Soporte</label>
          <input type="checkbox" />
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
                <input type="checkbox" id="vision" name="vision" />
                <label for="vision">Visión</label>
              </td>
              <td>
                <input type="text" name="vision_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="audicion" name="audicion" />
                <label for="audicion">Audición</label>
              </td>
              <td>
                <input type="text" name="audicion_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="voz_habla" name="voz_habla" />
                <label for="audicion">Voz y habla</label>
              </td>
              <td>
                <input type="text" name="voz_habla_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="movimiento_cuerpo"
                  name="movimiento_cuerpo"
                />
                <label for="audicion">
                  Movimiento del cuerpo o de alguna parte del cuerpo
                </label>
              </td>
              <td>
                <input type="text" name="movimiento_cuerpo_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="cognicion" name="cognicion" />
                <label for="cognicion">Cognición</label>
              </td>
              <td>
                <input type="text" name="cognicion_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="estado_socioemocional"
                  name="estado_socioemocional"
                />
                <label for="audicion">Estado socio-emocional</label>
              </td>
              <td>
                <input type="text" name="estado_socioemocional_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="miccion_relaciones_reproduccion"
                  name="miccion_relaciones_reproduccion"
                />
                <label for="audicion">
                  Micción, relaciones sexuales, reproducción
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="miccion_relaciones_reproduccion_input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="masticaion_deglucion"
                  name="masticaion_deglucion"
                />
                <label for="audicion">Masticación y/o deglución</label>
              </td>
              <td>
                <input type="text" name="masticaion_deglucion_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="otra" name="otra" />
                <label for="otra">Otra ¿Cuál?</label>
              </td>
              <td>
                <input type="text" name="otra_input" />
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
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Ojos</label>
              </td>
              <td>
                <input type="text" name="ojos_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="oido" name="oido" />
                <label for="oido">Oídos</label>
              </td>
              <td>
                <input type="text" name="oido_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="pliegues_labios_lengua_paladar"
                  name="pliegues_labios_lengua_paladar"
                />
                <label for="pliegues_labios_lengua_paladar">
                  Pliegues vocales, labios, lengua, paladar
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="pliegues_labios_lengua_paladar_input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="brazos_manos" name="brazos_manos" />
                <label for="brazos_manos">Brazos / manos</label>
              </td>
              <td>
                <input type="text" name="brazos_manos_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="piernas" name="piernas" />
                <label for="piernas">Piernas</label>
              </td>
              <td>
                <input type="text" name="piernas_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="piel" name="piel" />
                <label for="piel">Piel</label>
              </td>
              <td>
                <input type="text" name="piel_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="cerebro" name="cerebro" />
                <label for="cerebro">Cerebro</label>
              </td>
              <td>
                <input type="text" name="cerebro_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_nervioso"
                  name="sistema_nervioso"
                />
                <label for="sistema_nervioso">Sistema nervioso</label>
              </td>
              <td>
                <input type="text" name="sistema_nervioso_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Sistema cardio-respiratorio
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Sistema genital, urinario, reproductor
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Sistema digestivo
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="otra" name="otra" />
                <label for="otra">Otra ¿Cuál?</label>
              </td>
              <td>
                <input type="text" name="otra_input" />
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
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Cursos</label>
              </td>
              <td>
                <input type="text" name="ojos_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="oido" name="oido" />
                <label for="oido">Clases magistrales</label>
              </td>
              <td>
                <input type="text" name="oido_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="pliegues_labios_lengua_paladar"
                  name="pliegues_labios_lengua_paladar"
                />
                <label for="pliegues_labios_lengua_paladar">Laboratorios</label>
              </td>
              <td>
                <input
                  type="text"
                  name="pliegues_labios_lengua_paladar_input"
                />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="brazos_manos" name="brazos_manos" />
                <label for="brazos_manos">Continuar secuencias numéricas</label>
              </td>
              <td>
                <input type="text" name="brazos_manos_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="piernas" name="piernas" />
                <label for="piernas">Talleres</label>
              </td>
              <td>
                <input type="text" name="piernas_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="piel" name="piel" />
                <label for="piel">Conferencias</label>
              </td>
              <td>
                <input type="text" name="piel_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="cerebro" name="cerebro" />
                <label for="cerebro">Práctica deportivas</label>
              </td>
              <td>
                <input type="text" name="cerebro_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_nervioso"
                  name="sistema_nervioso"
                />
                <label for="sistema_nervioso">Actividades de ocio</label>
              </td>
              <td>
                <input type="text" name="sistema_nervioso_input" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Movilizarse de un lugar a otro
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Audiciones, conciertos, teatro o exposiciones
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Citas y actividades en los servicios de salud
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Asambleas o actividades gremiales
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  El consumo de alimentos en las cafeterias
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="sistema_cardiorespiratorio"
                  name="sistema_cardiorespiratorio"
                />
                <label for="sistema_cardiorespiratorio">
                  Trámites académicos, financieros o arquitectónicas
                  administrativos
                </label>
              </td>
              <td>
                <input type="text" name="sistema_cardiorespiratorioinput" />
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="otra" name="otra" />
                <label for="otra">Otra ¿Cuál?</label>
              </td>
              <td>
                <input type="text" name="otra_input" />
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
            <input type="checkbox" />
            <label>Condición de discapacidad</label>
          </div>
          <div className="select_space">
            <input type="checkbox" />
            <label>Características del contexto universitario</label>
          </div>
        </div>

        <p className="enunciado">
          Características del contexto universitario. Indique cuál(s) de los
          siguientes factores le genera(n) mayor dificultad
        </p>
        <div className="select_space">
          <input type="checkbox" />
          <label>
            Ausencia o deficiencia de dispositivos, equipos o ayudas tecnológicas
          </label>
        </div>
        <div className="select_space">
          <input type="checkbox" />
          <label>
            La ausencia o deficiencia de condiciones de accesibilidad a los espacios físicos
          </label>
        </div>
        <div className="select_space">
          <input type="checkbox" />
          <label>
            La ausencia o deficiencia de condiciones de accesibilidad a los
            materiales impresos y página web de la universidad
          </label>
        </div>
        <div className="select_space">
          <input type="checkbox" />
          <label>
            La ausencia o deficiencia de personas que apoyen el desarrollo de las
            actividades
          </label>
        </div>
        <div className="select_space">
          <input type="checkbox" />
          <label>
            Las actitudes negativas de las personas que no se disponen a apoyar
          </label>
        </div>
        <div className="select_space">
          <input type="checkbox" />
          <label>
            La ausencia de programas o servicios para personas con discapacidad en
            la universidad
          </label>
        </div>
        <div className="select_space">
          <input type="checkbox" />
          <label>Otros ¿Cuales?</label>
          <input
            type="text"
            placeholder="Defina el factor del impacto del contexto"
          />
        </div>

        <div className="select_space">
          <input type="checkbox" />
          <label>Condición psicoemocional</label>
        </div>
        <div className="select_space">
          <input type="checkbox" />
          <label>Otra ¿Cual?</label>
          <input type="text" placeholder="Defina el factor del impacto" />
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
                <input type="checkbox" id="ojos" name="ojos" />
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
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Leer los textos e imágenes en pantalla</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Copia al dictado</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Transcripción de textos escritos</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">
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
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">
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
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Escritura y/o redactar</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Elaborar conceptos o ideas</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Escuchar</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Expresarse oralmente</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Comprender mensajes orales</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Conversar / interactuar</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Relaciones interpersonales</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Desplazarse</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Manipular objetos</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Mantenerse sentado</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Asearse</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Vestirse y desvestirse</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Consumir alimentos</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="ojos" name="ojos" />
                <label for="ojos">Evacuar (micción / deposición)</label>
              </td>
              <td>
                <input
                  type="range"
                  id="vision_range"
                  name="vision_range"
                  min="0"
                  max="100"
                  value="Lo hace sin ayuda"
                />
                <span id="vision_value">Lo hace sin ayuda</span>
              </td>
              <td>
                <p>NO RESGITRA</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="otra" name="otra" />
                <label for="otra">Otro</label>
              </td>
              <td>
                <input type="text" name="otra_input" />
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
            <input type="checkbox" id="amigos" name="amigos" />
            <label for="amigos">Amigos</label>
          </div>
          <div>
            <input type="checkbox" id="pareja" name="pareja" />
            <label for="pareja">Pareja</label>
          </div>
          <div>
            <input type="checkbox" id="familia" name="familia" />
            <label for="familia">Familia</label>
          </div>
          <div>
            <input type="checkbox" id="servicio_salud" name="servicio_salud" />
            <label for="servicio_salud">Servicio de salud</label>
          </div>
          <div>
            <input type="checkbox" id="otro" name="otro" />
            <label for="otro">Otro</label>
          </div>
        </div>
        <p className="enunciado">Para desplazarse a la universidad usted principalmente</p>
        <div className="checkbox_container sin_borde">
          <div>
            <input type="checkbox" id="amigos" name="amigos" />
            <label for="amigos">Paga transporte privado</label>
          </div>
          <div>
            <input type="checkbox" id="pareja" name="pareja" />
            <label for="pareja">Usa el transporte público</label>
          </div>
          <div>
            <input type="checkbox" id="familia" name="familia" />
            <label for="familia">Tiene transporte propio</label>
          </div>
          <div>
            <input type="checkbox" id="otro" name="otro" />
            <label for="otro">Otro</label>
          </div>
        </div>
        <p className="enunciado">
          ¿Participa de alguna organización o asociación con otras personas con
          discapacidad o con condiciones similares a las que usted experimenta?
        </p>
        <div className="select_space">
          <input type="radio" id="si" name="organizacion" />
          <label for="otro">Si</label>
          <input type="radio" id="no" name="organizacion" />
          <label for="otro">No</label>
        </div>
        <p className="enunciado">¿Realiza actividades con otras personas con discapacidad?</p>
        <div className="select_space">
          <input type="radio" id="si" name="actividades_disca" />
          <label for="otro">Si</label>
          <input type="radio" id="no" name="actividades_disca" />
          <label for="otro">No</label>
        </div>
        <p className="enunciado">
          ¿Alguna institución le ha proporcionado apoyo por su situación de
          discapacidad?
        </p>
        <div className="select_space">
          <input type="radio" id="si" name="apoyo_discapacidad" />
          <label for="otro">Si</label>
          <input type="radio" id="no" name="apoyo_discapacidad" />
          <label for="otro">No</label>
        </div>
        <label>¿Cual?</label>
        <input type="text" />
        <label>¿Qué tipo de apoyo?</label>
        <input type="text" />
      </div>
    </form>
  );
};

export default PercepcionCaracteristicasDiscapacidad;
