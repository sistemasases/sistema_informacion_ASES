import { useEffect, useState } from "react";
import "../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import { Formik } from "formik";

const Formulario = () => {
  const [form, setForm] = useState(true);
  const [nombreBoton, setNombreBoton] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (form) {
      setNombreBoton("Registrar Inasistencia");
      setDescripcion("Seguimiento individual");
    } else {
      setNombreBoton("Registrar Seguimiento");
      setDescripcion("Inasistencia");
    }
  }, [form]);

  // En la consola sale error porque hay ciertos campo que tienen el mismo atributo id, 
  // esto se corregira cuando se definan las consultas al backend, Este componente se 
  // terminara cuando se definan las consultas al backend

  return (
    <>
      <div className="otherForm">
        <p>{descripcion}</p>
        <button className="boton" onClick={() => setForm(!form)}>
          {nombreBoton}
        </button>
      </div>
      <Formik
        initialValues={{
          fecha: "",
          lugar: "",
          horaI: "",
          horaF: "",
          objetivo: "",
          individual: "",
          bajo: "",
          medio: "",
          alto: "",
          autoconocimiento: "",
          proyecto_vida: "",
          historia_vida: "",
          rasgos_personalidad: "",
          salud: "",
          erotico_afectivas: "",
          identificación: "",
          aspecto_motivacionales: "",
          diversidad_sexual: "",
          red_apoyo: "",
          familiar: "",
          dinamica_familiar: "",
          academico: "",
          desempeño_academico: "",
          eleccion_vocacional: "",
          manejo_tiempo: "",
          economico: "",
          apoyo_economico_ins: "",
          manejo_finanzas: "",
          //Faltan mas pero se definiran cuando esten listas las consultas al backend
        }}
        validate={(values) => {

        }}
        onSubmit={(values) => {
          console.log("Formulario enviado", values);
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur}) => (
          <form className="formulario" onSubmit={handleSubmit}>
            {form ? (
              <>
                <p className="titleG">Seguimiento de Pares</p>
                <div className="inputs">
                  <div>
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                      type="date"
                      name="fecha"
                      id="fecha"
                      value={values.fecha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label htmlFor="lugar">Lugar:</label>
                    <input
                      type="text"
                      name="lugar"
                      id="lugar"
                      value={values.lugar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label htmlFor="horaI">Hora de inicio:</label>
                    <input
                      type="time"
                      name="horaI"
                      id="horaI"
                      value={values.horaI}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label htmlFor="horaF">Hora de finalización:</label>
                    <input
                      type="time"
                      name="horaF"
                      id="horaF"
                      value={values.horaF}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="objetivo">Objetivos:</label>
                  <textarea
                    name="objetivo"
                    id="objetivo"
                    value={values.objetivo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="individual">Individual:</label>
                  <textarea
                    name="individual"
                    id="individual"
                    value={values.individual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="checkbox_container sin_borde">
                  <div className="checkbox_group">
                    <input type="checkbox" name="bajo" id="bajo" />
                    <label htmlFor="bajo">Bajo</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="medio" id="medio" />
                    <label htmlFor="medio">Medio</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="alto" id="alto" />
                    <label htmlFor="alto">Alto</label>
                  </div>
                </div>
                <p>Temáticas (individual)</p>
                <div className="checkbox_container">
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="autoconocimiento"
                      id="autoconocimiento"
                    />
                    <label htmlFor="autoconocimiento">Autoconocimiento</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="proyecto_vida"
                      id="proyecto_vida"
                    />
                    <label htmlFor="proyecto_vida">Proyecto de vida</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="historia_vida"
                      id="historia_vida"
                    />
                    <label htmlFor="historia_vida">Historia de vida</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="rasgos_personalidad"
                      id="rasgos_personalidad"
                    />
                    <label htmlFor="rasgos_personalidad">
                      Rasgos de personalidad
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="salud" id="salud" />
                    <label htmlFor="salud">Salud</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="erotico_afectivas"
                      id="erotico_afectivas"
                    />
                    <label htmlFor="erotico_afectivas">
                      Relaciones erótico-afectivas
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="identificación"
                      id="identificación"
                    />
                    <label htmlFor="identificación">Identificación</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="aspecto_motivacionales"
                      id="aspecto_motivacionales"
                    />
                    <label htmlFor="aspecto_motivacionales">
                      Aspectos motivacionales
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="diversidad_sexual"
                      id="diversidad_sexual"
                    />
                    <label htmlFor="diversidad_sexual">Diversidad sexual</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="red_apoyo" id="red_apoyo" />
                    <label htmlFor="red_apoyo">Red de apoyo</label>
                  </div>
                </div>
                <div>
                  <label htmlFor="familiar">Familiar:</label>
                  <textarea name="familiar" id="familiar" />
                </div>
                <div className="checkbox_container sin_borde">
                  <div className="checkbox_group">
                    <input type="checkbox" name="bajo" id="bajo" />
                    <label htmlFor="bajo">Bajo</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="medio" id="medio" />
                    <label htmlFor="medio">Medio</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="alto" id="alto" />
                    <label htmlFor="alto">Alto</label>
                  </div>
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
                <div className="checkbox_container sin_borde">
                  <div className="checkbox_group">
                    <input type="checkbox" name="bajo" id="bajo" />
                    <label htmlFor="bajo">Bajo</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="medio" id="medio" />
                    <label htmlFor="medio">Medio</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="alto" id="alto" />
                    <label htmlFor="alto">Alto</label>
                  </div>
                </div>
                <p>Temáticas (Académico)</p>
                <div className="checkbox_container">
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="desempeño_academico"
                      id="desempeño_academico"
                    />
                    <label htmlFor="desempeño_academico">
                      Desempeño académico
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="eleccion_vocacional"
                      id="eleccion_vocacional"
                    />
                    <label htmlFor="eleccion_vocacional">
                      Elección vocacional
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="manejo_tiempo"
                      id="manejo_tiempo"
                    />
                    <label htmlFor="manejo_tiempo">Manejo del tiempo</label>
                  </div>
                </div>
                <div>
                  <label htmlFor="economico">Económico:</label>
                  <textarea name="economico" id="economico" />
                </div>
                <div className="checkbox_container sin_borde">
                  <div className="checkbox_group">
                    <input type="checkbox" name="bajo" id="bajo" />
                    <label htmlFor="bajo">Bajo</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="medio" id="medio" />
                    <label htmlFor="medio">Medio</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="alto" id="alto" />
                    <label htmlFor="alto">Alto</label>
                  </div>
                </div>
                <p>Temáticas (Económico)</p>
                <div className="checkbox_container">
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="apoyo_economico_ins"
                      id="apoyo_economico_ins"
                    />
                    <label htmlFor="apoyo_economico_ins">
                      Apoyos económicos institucionales
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="manejo_finanzas"
                      id="manejo_finanzas"
                    />
                    <label htmlFor="manejo_finanzas">
                      Manejo de sus finanzas
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="apoyo_economico"
                      id="apoyo_economico"
                    />
                    <label htmlFor="apoyo_economico">
                      Apoyo económico familiar
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="situacion_lab_ocu"
                      id="situacion_lab_ocu"
                    />
                    <label htmlFor="situacion_lab_ocu">
                      Situación laboral y ocupacional
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="vida_uni_ciu">
                    Vida universitaria y ciudad:
                  </label>
                  <textarea name="vida_uni_ciu" id="vida_uni_ciu" />
                </div>
                <div className="checkbox_container sin_borde">
                  <div className="checkbox_group">
                    <input type="checkbox" name="bajo" id="bajo" />
                    <label htmlFor="bajo">Bajo</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="medio" id="medio" />
                    <label htmlFor="medio">Medio</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="alto" id="alto" />
                    <label htmlFor="alto">Alto</label>
                  </div>
                </div>
                <p>Temáticas (Vida universitaria y ciudad)</p>
                <div className="checkbox_container">
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="motiva_acompaña"
                      id="motiva_acompaña"
                    />
                    <label htmlFor="motiva_acompaña">
                      Motivación para el acompañamiento
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="referen_geografica"
                      id="referen_geografica"
                    />
                    <label htmlFor="referen_geografica">
                      Referencia geográfica
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="adap_ciud_uni"
                      id="adap_ciud_uni"
                    />
                    <label htmlFor="adap_ciud_uni">
                      Adaptación a la ciudad y Universidad
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="oferta_servicio"
                      id="oferta_servicio"
                    />
                    <label htmlFor="oferta_servicio">Oferta de servicios</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="vivienda" id="vivienda" />
                    <label htmlFor="vivienda">Vivienda</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="vincu_activ"
                      id="vincu_activ"
                    />
                    <label htmlFor="vincu_activ">
                      Vinculación a grupos y realización de actividades
                      extracurriculares
                    </label>
                  </div>
                </div>
                <p>
                  Acciones (Ubique el cursor sobre la acción para obtener más
                  información)
                </p>
                <div className="checkbox_container">
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="apoyo_academico"
                      id="apoyo_academico"
                    />
                    <label htmlFor="apoyo_academico">Apoyo académico</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="actividades_grupales"
                      id="actividades_grupales"
                    />
                    <label htmlFor="actividades_grupales">
                      Rem. Actividades grupales
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="adap_ciud_uni"
                      id="adap_ciud_uni"
                    />
                    <label htmlFor="adap_ciud_uni">
                      Rem. Matrícula financiera
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="oferta_servicio"
                      id="oferta_servicio"
                    />
                    <label htmlFor="oferta_servicio">Taller par-par</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="vivienda" id="vivienda" />
                    <label htmlFor="vivienda">Rem. Monitorías académicas</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="vincu_activ"
                      id="vincu_activ"
                    />
                    <label htmlFor="vincu_activ">
                      Rem. Desarrollo humano y promoción SE
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="oferta_servicio"
                      id="oferta_servicio"
                    />
                    <label htmlFor="oferta_servicio">
                      Reconocimiento ciudad y U.
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="vivienda" id="vivienda" />
                    <label htmlFor="vivienda">
                      Rem. Proyectos de la Universidad
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="vincu_activ"
                      id="vincu_activ"
                    />
                    <label htmlFor="vincu_activ">
                      Rem. Directores de programa
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="oferta_servicio"
                      id="oferta_servicio"
                    />
                    <label htmlFor="oferta_servicio">Rem. Profesional SE</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="vivienda" id="vivienda" />
                    <label htmlFor="vivienda">Rem. Servicio de salud</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="vincu_activ"
                      id="vincu_activ"
                    />
                    <label htmlFor="vincu_activ">
                      Rem. Grupos de la Universidad
                    </label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="oferta_servicio"
                      id="oferta_servicio"
                    />
                    <label htmlFor="oferta_servicio">Rem. Practicante SE</label>
                  </div>
                  <div className="checkbox_group">
                    <input type="checkbox" name="vivienda" id="vivienda" />
                    <label htmlFor="vivienda">Rem. Registro académico</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="vincu_activ"
                      id="vincu_activ"
                    />
                    <label htmlFor="vincu_activ">Rem. Externa</label>
                  </div>
                  <div className="checkbox_group">
                    <input
                      type="checkbox"
                      name="vincu_activ"
                      id="vincu_activ"
                    />
                    <label htmlFor="vincu_activ">
                      Ninguna acción realizada
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="observaciones">Observaciones:</label>
                  <textarea name="observaciones" id="observaciones" />
                </div>
                <div className="botones">
                  <button type="submit">Registrar</button>
                  <button type="reset">Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <p className="titleG">Inasistencia</p>
                <div>
                  <label htmlFor="fecha">Fecha:</label>
                  <input type="date" name="fecha" id="fecha" />
                </div>
                <div>
                  <label htmlFor="observaciones">Observaciones:</label>
                  <textarea name="observaciones" id="observaciones" />
                </div>
                <div className="botones">
                  <button type="submit">Registrar</button>
                  <button type="reset">Cancelar</button>
                </div>
              </>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default Formulario;
