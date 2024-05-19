const DatosAcademicosAdicionales = () => {
  const current_semestre = '2019-B';
  const nombre_colegio = 'COLEGIO DEPARTAMENTAL DE LLORENTE (OFICIAL)';
  return<form>
    <p>Datos académicos adicionales en la Universidad del Valle | Semestre actual ${current_semestre}</p>
    <p>Facultad por programa registrado.</p>
    <p>3651-SALUD</p>
    <p>Jornada por programa registrado.</p>
    <p>3651-DIURNA</p>
    <p>Datos del programa actual <b>(TERAPIA OCUPACIONAL - 3651)</b></p>
    <label>Número de resolución</label>
    <input type="text" />
    <label>Créditos del programa</label>
    <input type="number" />
    <p>Datos académicos adicionales en otras instituciones educativas</p>
    <p>Colegio en el que estudió: </p>
    <p>{nombre_colegio}</p>
    <label>Título académico obtenido</label>
    <input type="text" />
    <p>Resalte aspectos positivos que favorecieron el desempeño, avance y graduación.</p>
    <label>Institución</label>
    <input type="text" />
    <label>Nivel de formación</label>
    <input type="text" />
    <label>Apoyos recibidos</label>
    <input type="text" />
    <label>Observaciones</label>
    <input type="textarea" />
    <label>Dificultades</label>
    <input type="textarea" />
    <button>Editar</button>
  </form>;
};

export default DatosAcademicosAdicionales;
