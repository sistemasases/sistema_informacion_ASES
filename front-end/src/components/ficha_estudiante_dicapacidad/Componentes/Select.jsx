import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import perfilUsuario from "./Usuario.png";
import "../../../Scss/ficha_estudiante_discapacidad/select.css";
import all_estudiantes_discapacidad from "../../../service/all_estudiantes_discapacidad";
import estudiante_discapacidad from "../../../service/estudiante_discapacidad";

// Componente de Select
// Este componente se encarga de obtener al estudiante seleccionado,
// guardarlo en la varible global estudianteSelected para que otros
// componentes lo puedan usar y mostrar su informacion básica
const Select = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const { setEstudianteSelected, estudianteSelected } = useAuthStore(); // Obtener y establecer estudiante seleccionado

  const handleSelectStudent = (student) => {
    const newSelectedStudent = {
      id: student.id,
      tipo_documento: student.tipo_doc,
      documento: student.num_doc,
      nombre: student.nombre,
      apellido: student.apellido,
      sexo: student.sexo,
      identidad_genero: student.el_id_de_identidad_gen,
      deporte: student.actividades_ocio_deporte,
      contacto_emergencia: student.contacto_emergencia,
      programas: student.programas,
      anio_ingreso: student.anio_ingreso,
      codigo: student.cod_univalle,
      email: student.email,
      edad: student.edad,
      imagen: student.imagen,
      seguimientos: student.seguimientos,
      condicion: student.el_id_de_cond_excepcion,
      profesional: student.profesional,
      practicante: student.practicante,
      monitor: student.monitor,
      ultimaActualizacion: student.ultimaActualizacion,
      telefono: student.telefono_res,
      celular: student.celular,
      direccion_residencia: student.dir_res,
      barrio: student.barrio,
      tipo_discapacidad: student.tipo_discapacidad,
      diagnosticos: student.diagnosticos,
    };
    setEstudianteSelected(newSelectedStudent);
  };

  useEffect(() => {
    all_estudiantes_discapacidad.all_estudiantes_discapacidad().then((res) => {
      setEstudiantes(res);
    });
  }, []);

  const handleChange = async (e) => {
    const studentCodigo = e.target.value;
    const selectedStudent = estudiantes.find(
      (estudiante) => estudiante.cod_univalle === studentCodigo
    );

    if (selectedStudent) {
      const studentDetails =
        await estudiante_discapacidad.estudiante_discapacidad(
          selectedStudent.id
        );
      handleSelectStudent(studentDetails);
    }
  };

  return (
    <div className="container-main">
      <div className="container-submain">
        <div className="container-basic">
          <select onChange={handleChange} className="select-item">
            <option>Select a student</option>
            {estudiantes.map((estudiante) => (
              <option
                key={estudiante.cod_univalle}
                value={estudiante.cod_univalle}
              >
                {estudiante.cod_univalle} - {estudiante.nombre}{" "}
                {estudiante.apellido}
              </option>
            ))}
          </select>

          <div className="general-info">
            <p>
              <b>Correo: </b>
              {estudianteSelected
                ? estudianteSelected.email
                : "Correo no disponible"}
            </p>
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

        <div className="info-prof-programa">
          {estudianteSelected &&
          estudianteSelected.programas &&
          estudianteSelected.programas.length === 0 ? (
            <p className="dimen-prog desertor"></p>
          ) : (
            estudianteSelected &&
            estudianteSelected.programas &&
            estudianteSelected.programas.map((programa, index) => {
              let color;
              if (programa.id_estado_id === 3) {
                color = "egresado";
              } else if (programa.id_estado_id === 1) {
                color = "encurso";
              } else if (programa.id_estado_id === 6) {
                color = "desertor";
              }
              return (
                <p key={index} className={`dimen-prog ${color}`}>
                  {programa.codigo_estudiante} - {programa.cod_univalle} -{" "}
                  {programa.nombre_programa}
                </p>
              );
            })
          )}
        </div>

        <div className="condicion">
          <p>
            Condición de excepción{" "}
            {estudianteSelected
              ? estudianteSelected.condicion
              : "Condición no disponible"}
          </p>
        </div>

        <div className="container-otros-datos">
          <div className="more-stud-info">
            <p>
              Profesional:{" "}
              {estudianteSelected
                ? estudianteSelected.profesional
                : "No disponible"}
            </p>
            <p>
              Practicante:{" "}
              {estudianteSelected
                ? estudianteSelected.practicante
                : "No disponible"}
            </p>
            <p>
              Monitor:{" "}
              {estudianteSelected
                ? estudianteSelected.monitor
                : "No disponible"}
            </p>
            <p>
              Actualización:{" "}
              {estudianteSelected
                ? estudianteSelected.ultimaActualizacion
                : "No disponible"}
            </p>
          </div>
        </div>
      </div>
      <div className="container-img">
        <a
          href={`https://wa.me/57${
            estudianteSelected ? estudianteSelected.telefono : "0000000000"
          }`}
          target="_blank"
        >
          <img className="img" src={perfilUsuario} alt="Student" />
        </a>
      </div>
      <div className="links">
        <a className="link" href="#trayectoria">
          TRAYECTORIA
        </a>
      </div>
    </div>
  );
};

export default Select;
