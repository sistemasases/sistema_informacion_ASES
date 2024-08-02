import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import perfilUsuario from "./Usuario.png";
import "../../../Scss/ficha_estudiante_discapacidad/select.css";

// Componente de Select
// Este componente se encarga de obtener al estudiante seleccionado,
// guardarlo en la varible global estudianteSelected para que otros
// componentes lo puedan usar y mostrar su informacion básica
const Select = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const { estudiantesDiscapacidad, setEstudianteSelected } = useAuthStore();
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
    telefono: "0000000000",
    tipo_discapacidad: "tipo_discapacidad",
    diagnosticos: ["diagnostico1", "diagnostico2"],
  });

  const handleSelectStudent = (student) => {
    setSelectedStudent({
      id: student.id,
      codigo: student.codigo,
      correo: student.correo,
      edad: student.edad,
      imagen: student.imagen,
      programas: student.programas,
      seguimientos: student.seguimientos,
      condicion: student.condicion,
      profesional: student.profesional,
      practicante: student.practicante,
      monitor: student.monitor,
      ultimaActualizacion: student.ultimaActualizacion,
      telefono: student.telefono,
      tipo_discapacidad: student.tipo_discapacidad,
      diagnosticos: student.diagnosticos,
    });
    setEstudianteSelected(selectedStudent);
  };

  useEffect(() => {
    if (estudiantesDiscapacidad.length > 0) return;
    setEstudiantes(estudiantesDiscapacidad);
  }, [estudiantesDiscapacidad]);

  return (
    <div className="container-main">
      <div className="container-submain">
        <div className="container-basic">
          <select
            onChange={(e) => {
              const studentCodigo = e.target.value;
              const selectedStudent = estudiantes.find(
                (estudiante) => estudiante.codigo === studentCodigo
              );
              handleSelectStudent(selectedStudent);
            }}
            className="select-item"
          >
            <option>Select a student</option>
            {estudiantes.map((estudiante) => (
              <option value={estudiante.codigo}>
                {estudiante.codigo} - {estudiante.nombre}
              </option>
            ))}
          </select>

          <div className="general-info">
            <p><b>Tipo Discapacidad: </b>{selectedStudent.tipo_discapacidad}</p>
            <p><b>Diagnóstico/s: </b> {selectedStudent.diagnosticos.join(', ')}</p>
            <p><b>Correo: </b>{selectedStudent.correo}</p>
          </div>
        </div>

        <div className="container-programa">
          <p className="title-prog">PROGRAMAS ACADÉMICOS</p>
          <div className="basic-info">
            <p className="short-info-programa egresado">Egresado</p>
            <p className="short-info-programa encurso">En curso</p>
            <p className="short-info-programa desertor">Desertor</p>
          </div>
        </div>

        <div className="condicion">
          <p>Condición de excepción {selectedStudent.condicion}</p>
        </div>

        <div className="info-prof-programa">
          {selectedStudent.programas.length === 0 ? (
            <p className="dimen-prog desertor"></p>
          ) : (
            selectedStudent.programas.map((programa) => {
              let color;
              if (programa.estado === "egresado") {
                color = "egresado";
              } else if (programa.estado === "en curso") {
                color = "encurso";
              } else if (programa.estado === "desertor") {
                color = "desertor";
              }
              return (
                <p className={`dimen-prog ${color}`}>
                  {programa.codigoEst} - {programa.codigo} - {programa.nombre}
                </p>
              );
            })
          )}
        </div>

        <div className="container-otros-datos">
          <div className="more-stud-info">
            <p>Profesional: {selectedStudent.profesional}</p>
            <p>Practicante: {selectedStudent.practicante}</p>
            <p>Monitor: {selectedStudent.monitor}</p>
            <p>Actualización: {selectedStudent.ultimaActualizacion}</p>
          </div>
        </div>
      </div>
      <div className="container-img">
      <a href={`https://wa.me/57${selectedStudent.telefono}`} target="_blank">
        <img
          className="img"
          src={perfilUsuario}
          alt="Student"
        />
        </a>
      </div>
      <div className="links">
        <a className="link" href="#trayectoria">
          TRAYECTORIA
        </a>
        <a className="link" href={`tel:+57${selectedStudent.telefono}`}>
        + 57 {selectedStudent.telefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
        </a>
      </div>
    </div>
  );
};

export default Select;
