import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import perfilUsuario from "./Usuario.png";
import "../../../Scss/ficha_estudiante_V2/select.css";
import fetchEstudiante from "../api/fetch_estudiante";

// Componente de Select
// Este componente se encarga de obtener al estudiante seleccionado,
// guardarlo en la varible global estudianteSelected para que otros
// componentes lo puedan usar y mostrar su informacion básica
const Select = () => {
  const { estudiantes, user, setShosenStudent } = useAuthStore();
  const [selectedStudent, setSelectedStudent] = useState({
    id: "identificación",
    nombre: null,
    codigo: null,
    correo: "correo",
    edad: "edad",
    imagen: null,
    programas: [],
    seguimientos: [],
    condicion: "condición",
    profesional: null,
    practicante: null,
    monitor: null,
    ultimaActualizacion: null,
    telefono: "000 000 0000",
  });

  const handleSelectStudent = (e) => {
    const studentCodigo = e.target.value;
    const student_sec = estudiantes.find(
      (estudiante) => estudiante.cod_univalle === studentCodigo
    );
    console.log(selectedStudent);
    setSelectedStudent({
      id: student_sec.id,
    });
  };

  function calcularEdad(fechaNacimiento) {
    const fechaNacimientoMs = Date.parse(fechaNacimiento);
    const edadMs = Date.now() - fechaNacimientoMs;
    const edadFecha = new Date(edadMs);
    return Math.abs(edadFecha.getUTCFullYear() - 1970);
  }

  // Se ejecuta cuando se selecciona un estudiante, trae la informacion
  // del estudiante seleccionado y la guarda en la variable global.
  useEffect(() => {
    setShosenStudent(null);
  }, []);

  useEffect(() => {
    if (selectedStudent.id === "identificación") return;
    // Method setEstudiantes is used to set the students data in the store
    const getStudent = async () => {
      const res = await fetchEstudiante(selectedStudent.id, user.sede_id);
      if (res) {
        setSelectedStudent(res);
        setShosenStudent(res);
      }
      console.log(res);
    };
    getStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent.id, user.sede_id]);

  return (
    <div className="container-main">
      <div className="container-submain">
        <div className="container-basic">
          <select onChange={handleSelectStudent} className="select-item">
            <option value="" disabled selected>
              Select a student
            </option>
            {estudiantes?.map((estudiante) => (
              <option
                key={estudiante.cod_univalle}
                value={estudiante.cod_univalle}
              >
                {estudiante.cod_univalle} - {estudiante.nombre}{" "}
                {estudiante.apellido}
              </option>
            ))}
          </select>

          {selectedStudent && (
            <div className="basic-info">
              <p>{selectedStudent.num_doc}</p>
              <p>{selectedStudent.email}</p>
              <p>{calcularEdad(selectedStudent.fecha_nac)} años</p>
            </div>
          )}
        </div>

        <div className="container-programa">
          <p className="title-prog">PROGRAMAS ACADÉMICOS</p>
          <div className="basic-info">
            <p className="short-info-programa egresado">Egresado</p>
            <p className="short-info-programa encurso">En curso</p>
            <p className="short-info-programa desertor">Desertor</p>
          </div>
        </div>

        {selectedStudent && (
          <div className="condicion">
            <p>Condición de excepción {selectedStudent.nombre_cohorte}</p>
          </div>
        )}

        <div className="info-prof-programa">
          {selectedStudent?.programas?.length === 0 ? (
            <p className="dimen-prog desertor">No hay programas disponibles</p>
          ) : (
            selectedStudent?.programas?.map((programa) => {
              let color;
              if (programa.id_estado_id === 3) {
                color = "egresado";
              } else if (programa.id_estado_id === 1) {
                color = "encurso";
              } else if (programa.id_estado_id === 6) {
                color = "desertor";
              }
              return (
                <p
                  key={programa.cod_univalle}
                  className={`dimen-prog ${color}`}
                >
                  {programa.codigo_estudiante} - {programa.cod_univalle} -{" "}
                  {programa.nombre_programa}
                </p>
              );
            })
          )}
        </div>

        {selectedStudent && (
          <div className="container-otros-datos">
            <div className="more-stud-info">
              <p>
                Profesional: {selectedStudent.profesional?.first_name}{" "}
                {selectedStudent.profesional?.last_name}
              </p>
              <p>
                Practicante: {selectedStudent.practicante?.first_name}{" "}
                {selectedStudent.practicante?.last_name}
              </p>
              <p>
                Monitor: {selectedStudent.info_monitor?.first_name}{" "}
                {selectedStudent.info_monitor?.last_name}
              </p>
              <p>Actualización: {selectedStudent.ult_modificacion}</p>
            </div>
          </div>
        )}
      </div>

      {selectedStudent && (
        <>
          <div className="container-img">
            <img
              className="img"
              src={selectedStudent.imagen || perfilUsuario}
              alt="Student"
            />
          </div>
          <div className="links">
            <a className="link" href="#trayectoria">
              TRAYECTORIA
            </a>
            <a className="link" href={`tel:+57${selectedStudent.celular}`}>
              + 57 {selectedStudent.celular}
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Select;
