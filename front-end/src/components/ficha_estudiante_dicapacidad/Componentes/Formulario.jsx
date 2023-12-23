import "../../../Scss/ficha_estudiante_discapacidad/formulario.css";

const Formulario = () => {
  return (
    <>
      <p>Seguimiento Individual</p>
      <button className="btn btn-primary">Registrar Inasistencia</button>
      <p>Seguimiento de Pares</p>
      <form className="formulario">
        <div className=".input-container">
          <label htmlFor="fecha">Fecha:</label>
          <input type="date" name="fecha" id="fecha" />
        </div>
        <div className=".input-container">
          <label htmlFor="lugar">Lugar:</label>
          <input type="text" name="lugar" id="lugar" />
        </div>
        <div className=".input-container">
          <label htmlFor="horaI">Hora de inicio:</label>
          <input type="time" name="horaI" id="horaI" />
        </div>
        <div className=".input-container">
          <label htmlFor="horaF">Hora de finalización:</label>
          <input type="time" name="horaF" id="horaF" />
        </div>
        <div className=".input-container">
          <label htmlFor="objetivo">Objetivos:</label>
          <textarea name="objetivo" id="objetivo" />
        </div>
        <div className=".input-container">
          <label htmlFor="individual">Individual:</label>
          <textarea name="individual" id="individual" />
        </div>
        <div>
          <input type="checkbox" name="bajo" id="bajo" />
          <label htmlFor="bajo">Bajo</label>
          <input type="checkbox" name="medio" id="medio" />
          <label htmlFor="medio">Medio</label>
          <input type="checkbox" name="alto" id="alto" />
          <label htmlFor="alto">Alto</label>
        </div>
        <p>Temáticas (individual)</p>
        <div>
          <input
            type="checkbox"
            name="autoconocimiento"
            id="autoconocimiento"
          />
          <label htmlFor="autoconocimiento">Autoconocimiento</label>
          <input type="checkbox" name="proyecto_vida" id="proyecto_vida" />
          <label htmlFor="proyecto_vida">Proyecto de vida</label>
          <input type="checkbox" name="historia_vida" id="historia_vida" />
          <label htmlFor="historia_vida">Historia de vida</label>
          <input
            type="checkbox"
            name="rasgos_personalidad"
            id="rasgos_personalidad"
          />
          <label htmlFor="rasgos_personalidad">Rasgos de personalidad</label>
          <input type="checkbox" name="salud" id="salud" />
          <label htmlFor="salud">Salud</label>
          <input
            type="checkbox"
            name="erotico-afectivas"
            id="erotico-afectivas"
          />
          <label htmlFor="erotico-afectivas">
            Relaciones erótico-afectivas
          </label>
          <input type="checkbox" name="identificación" id="identificación" />
          <label htmlFor="identificación">Identificación</label>
          <input
            type="checkbox"
            name="aspecto_motivacionales"
            id="aspecto_motivacionales"
          />
          <label htmlFor="aspecto_motivacionales">
            Aspectos motivacionales
          </label>
          <input
            type="checkbox"
            name="diversidad_sexual"
            id="diversidad_sexual"
          />
          <label htmlFor="diversidad_sexual">Diversidad sexual</label>
          <input type="checkbox" name="red_apoyo" id="red_apoyo" />
          <label htmlFor="red_apoyo">Red de apoyo</label>
        </div>
        <div>
          <label htmlFor="familiar">Familiar:</label>
          <textarea name="familiar" id="familiar" />
        </div>
        <div>
          <input type="checkbox" name="bajo" id="bajo" />
          <label htmlFor="bajo">Bajo</label>
          <input type="checkbox" name="medio" id="medio" />
          <label htmlFor="medio">Medio</label>
          <input type="checkbox" name="alto" id="alto" />
          <label htmlFor="alto">Alto</label>
        </div>
        <p>Temáticas (Familiar)</p>
        <div>
          <input
            type="checkbox"
            name="dinamica_familiar"
            id="dinamica_familiar"
          />
          <label htmlFor="dinamica_familiar">Dinámica Familiar</label>
        </div>
        <div>
          <label htmlFor="academico">Académico:</label>
          <textarea name="academico" id="academico" />
        </div>
        <div>
          <input type="checkbox" name="bajo" id="bajo" />
          <label htmlFor="bajo">Bajo</label>
          <input type="checkbox" name="medio" id="medio" />
          <label htmlFor="medio">Medio</label>
          <input type="checkbox" name="alto" id="alto" />
          <label htmlFor="alto">Alto</label>
        </div>
        <p>Temáticas (Académico)</p>
        <div>
          <input
            type="checkbox"
            name="desempeño_academico"
            id="desempeño_academico"
          />
          <label htmlFor="desempeño_academico">Desempeño académico</label>
          <input
            type="checkbox"
            name="eleccion_vocacional"
            id="eleccion_vocacional"
          />
          <label htmlFor="eleccion_vocacional">Elección vocacional</label>
          <input type="checkbox" name="manejo_tiempo" id="manejo_tiempo" />
          <label htmlFor="manejo_tiempo">Manejo del tiempo</label>
        </div>
        <div>
          <label htmlFor="economico">Económico:</label>
          <textarea name="economico" id="economico" />
        </div>
        <div>
          <input type="checkbox" name="bajo" id="bajo" />
          <label htmlFor="bajo">Bajo</label>
          <input type="checkbox" name="medio" id="medio" />
          <label htmlFor="medio">Medio</label>
          <input type="checkbox" name="alto" id="alto" />
          <label htmlFor="alto">Alto</label>
        </div>
        <p>Temáticas (Económico)</p>
        <div>
          <input
            type="checkbox"
            name="apoyo_economico_ins"
            id="apoyo_economico_ins"
          />
          <label htmlFor="apoyo_economico_ins">
            Apoyos económicos institucionales
          </label>
          <input type="checkbox" name="manejo_finanzas" id="manejo_finanzas" />
          <label htmlFor="manejo_finanzas">Manejo de sus finanzas</label>
          <input type="checkbox" name="apoyo_economico" id="apoyo_economico" />
          <label htmlFor="apoyo_economico">Apoyo económico familiar</label>
          <input
            type="checkbox"
            name="situacion_lab_ocu"
            id="situacion_lab_ocu"
          />
          <label htmlFor="situacion_lab_ocu">
            Situación laboral y ocupacional
          </label>
        </div>
        <div>
          <label htmlFor="vida_uni_ciu">Vida universitaria y ciudad:</label>
          <textarea name="vida_uni_ciu" id="vida_uni_ciu" />
        </div>
        <div>
          <input type="checkbox" name="bajo" id="bajo" />
          <label htmlFor="bajo">Bajo</label>
          <input type="checkbox" name="medio" id="medio" />
          <label htmlFor="medio">Medio</label>
          <input type="checkbox" name="alto" id="alto" />
          <label htmlFor="alto">Alto</label>
        </div>
        <p>Temáticas (Vida universitaria y ciudad)</p>
        <div>
          <input type="checkbox" name="motiva_acompaña" id="motiva_acompaña" />
          <label htmlFor="motiva_acompaña">
            Motivación para el acompañamiento
          </label>
          <input
            type="checkbox"
            name="referen_geografica"
            id="referen_geografica"
          />
          <label htmlFor="referen_geografica">Referencia geográfica</label>
          <input type="checkbox" name="adap_ciud_uni" id="adap_ciud_uni" />
          <label htmlFor="adap_ciud_uni">
            Adaptación a la ciudad y Universidad
          </label>
          <input type="checkbox" name="oferta_servicio" id="oferta_servicio" />
          <label htmlFor="oferta_servicio">Oferta de servicios</label>
          <input type="checkbox" name="vivienda" id="vivienda" />
          <label htmlFor="vivienda">Vivienda</label>
          <input type="checkbox" name="vincu_activ" id="vincu_activ" />
          <label htmlFor="vincu_activ">
            Vinculación a grupos y realización de actividades extracurriculares
          </label>
        </div>
        <p>
          Acciones (Ubique el cursor sobre la acción para obtener más
          información)
        </p>
        <div>
          <input type="checkbox" name="motiva_acompaña" id="motiva_acompaña" />
          <label htmlFor="motiva_acompaña">Apoyo académico</label>
          <input
            type="checkbox"
            name="referen_geografica"
            id="referen_geografica"
          />
          <label htmlFor="referen_geografica">Rem. Actividades grupales</label>
          <input type="checkbox" name="adap_ciud_uni" id="adap_ciud_uni" />
          <label htmlFor="adap_ciud_uni">Rem. Matrícula financiera</label>
          <input type="checkbox" name="oferta_servicio" id="oferta_servicio" />
          <label htmlFor="oferta_servicio">Taller par-par</label>
          <input type="checkbox" name="vivienda" id="vivienda" />
          <label htmlFor="vivienda">Rem. Monitorías académicas</label>
          <input type="checkbox" name="vincu_activ" id="vincu_activ" />
          <label htmlFor="vincu_activ">
            Rem. Desarrollo humano y promoción SE
          </label>
          <input type="checkbox" name="oferta_servicio" id="oferta_servicio" />
          <label htmlFor="oferta_servicio">Reconocimiento ciudad y U.</label>
          <input type="checkbox" name="vivienda" id="vivienda" />
          <label htmlFor="vivienda">Rem. Proyectos de la Universidad</label>
          <input type="checkbox" name="vincu_activ" id="vincu_activ" />
          <label htmlFor="vincu_activ">Rem. Directores de programa</label>
          <input type="checkbox" name="oferta_servicio" id="oferta_servicio" />
          <label htmlFor="oferta_servicio">Rem. Profesional SE</label>
          <input type="checkbox" name="vivienda" id="vivienda" />
          <label htmlFor="vivienda">Rem. Servicio de salud</label>
          <input type="checkbox" name="vincu_activ" id="vincu_activ" />
          <label htmlFor="vincu_activ">Rem. Grupos de la Universidad</label>
          <input type="checkbox" name="oferta_servicio" id="oferta_servicio" />
          <label htmlFor="oferta_servicio">Rem. Practicante SE</label>
          <input type="checkbox" name="vivienda" id="vivienda" />
          <label htmlFor="vivienda">Rem. Registro académico</label>
          <input type="checkbox" name="vincu_activ" id="vincu_activ" />
          <label htmlFor="vincu_activ">Rem. Externa</label>
          <input type="checkbox" name="vincu_activ" id="vincu_activ" />
          <label htmlFor="vincu_activ">Ninguna acción realizada</label>
        </div>
        <div>
          <label htmlFor="observaciones">Observaciones:</label>
          <textarea name="observaciones" id="observaciones" />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Formulario;
