import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const DatosAcademicosAdicionales = ({ datos_academicos }) => {
  const current_semestre = "2019-B";
  const nombre_colegio = "COLEGIO DEPARTAMENTAL DE LLORENTE (OFICIAL)";
  return (
    <form className="space_content">
      <p className="descripcion">
        Datos académicos adicionales en la Universidad del Valle | Semestre
        actual ${current_semestre}
      </p>
      <hr className="styled-hr" />
      <div className="container_carac">
        <div>
          <p className="titulo">Facultad por programa registrado.</p>
          <p>3651-SALUD</p>
          <p className="titulo">Jornada por programa registrado.</p>
          <p>3651-DIURNA</p>
        </div>
        <div>
          <p className="titulo">
            Datos del programa actual <b>(TERAPIA OCUPACIONAL - 3651)</b>
          </p>
          <div className="select_space">
            <label>Número de resolución</label>
            <input
              type="text"
              className="input-type-text"
              value={
                datos_academicos.numero_resolucion
                  ? datos_academicos.numero_resolucion
                  : ""
              }
            />
            <label>Créditos del programa</label>
            <input
              className="input-type-number"
              type="number"
              value={
                datos_academicos.creditos_programa
                  ? datos_academicos.creditos_programa
                  : ""
              }
            />
          </div>
        </div>

        <div className="full-width">
          <p className="descripcion">
            Datos académicos adicionales en otras instituciones educativas
          </p>
          <hr className="styled-hr" />
          <div className="inline-input-group">
            <p>Colegio en el que estudió: </p>
            <p>{nombre_colegio}</p>
          </div>
          <div className="inline-input-group">
            <label>Título académico obtenido</label>
            <input type="text" className="input-type-text" />
          </div>
          <p className="titulo">
            Resalte aspectos positivos que favorecieron el desempeño, avance y
            graduación.
          </p>
          <div className="checkbox_container sin_borde">
            <div>
              <label>Institución</label>
              <input type="text" className="input-type-text" />
            </div>
            <div>
              <label>Nivel de formación</label>
              <input type="text" className="input-type-text" />
            </div>
            <div>
              <label>Apoyos recibidos</label>
              <input type="text" className="input-type-text" />
            </div>
          </div>
          <div className="checkbox_container sin_borde">
            <div>
              <label>Observaciones</label>
              <textarea
                name="observaciones"
                id="observaciones"
                className="textarea-input"
                value={
                  datos_academicos.observaciones
                    ? datos_academicos.observaciones
                    : ""
                }
              />
            </div>
            <div>
              <label>Dificultades</label>
              <textarea
                name="dificultades"
                id="dificultades"
                className="textarea-input"
                value={
                  datos_academicos.dificultades
                    ? datos_academicos.dificultades
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
      <button className="full-size-button color_red">Editar</button>
    </form>
  );
};

export default DatosAcademicosAdicionales;
