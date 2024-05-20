import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const DatosAcademicosAdicionales = () => {
  const current_semestre = "2019-B";
  const nombre_colegio = "COLEGIO DEPARTAMENTAL DE LLORENTE (OFICIAL)";
  return (
    <form>
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
            <input type="text" />
            <label>Créditos del programa</label>
            <input type="number" />
          </div>
        </div>

        <div className="full-width">
          <p className="descripcion">Datos académicos adicionales en otras instituciones educativas</p>
          <hr className="styled-hr" />
          <div className="inline-input-group">
            <p>Colegio en el que estudió: </p>
            <p>{nombre_colegio}</p>
          </div>
          <div className="inline-input-group">
            <label>Título académico obtenido</label>
            <input type="text" />
          </div>
          <p className="titulo">
            Resalte aspectos positivos que favorecieron el desempeño, avance y
            graduación.
          </p>
          <div className="checkbox_container sin_borde">
            <div>
              <label>Institución</label>
              <input type="text" />
            </div>
            <div>
              <label>Nivel de formación</label>
              <input type="text" />
            </div>
            <div>
              <label>Apoyos recibidos</label>
              <input type="text" />
            </div>
          </div>
          <div className="checkbox_container sin_borde">
            <div>
              <label>Observaciones</label>
              <textarea
                  name="observaciones"
                  id="observaciones"
                />
            </div>
            <div>
              <label>Dificultades</label>
              <textarea
                  name="dificultades"
                  id="dificultades"
                />
            </div>
          </div>
        </div>
      </div>
      <button>Editar</button>
    </form>
  );
};

export default DatosAcademicosAdicionales;
