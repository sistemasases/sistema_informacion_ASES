import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import React, { useState } from "react";

const DatosAcademicos = ({ datos_academicos }) => {
  const [programas, setProgramas] = useState([
    { anio: "", programaAcademico: "", motivoNo: "", especificarMotivo: "" },
  ]);

  const motivosRetiro = [
    "Bajos académicos",
    "Condición de salud",
    "Fallecimiento",
    "Condición económica",
    "Cambio de programa académico",
    "Cambio de institución educativa",
    "Cambio de ciudad",
    "Retiro voluntario",
    "Prefiero no decirlo",
    "Otra",
  ];

  const handleAddProgram = () => {
    setProgramas([
      ...programas,
      { anio: "", programaAcademico: "", motivoNo: "", especificarMotivo: "" },
    ]);
  };

  const handleRemoveProgram = (index) => {
    const newProgramas = programas.filter((_, i) => i !== index);
    setProgramas(newProgramas);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newProgramas = [...programas];
    newProgramas[index][name] = value;
    setProgramas(newProgramas);
  };

  const handleMotivoChange = (index, event) => {
    const { value } = event.target;
    const newProgramas = [...programas];
    newProgramas[index].motivoNo = value;
    if (value !== "Otra") {
      newProgramas[index].especificarMotivo = ""; // Clear the especificarMotivo field if it's not "Otra"
    }
    setProgramas(newProgramas);
  };

  return (
    <div className="space_content">
      <div className="container_carac">
        <div className="full-width">
          <p className="titulo">Año de ingreso por primera vez</p>
          <p>
            Seleccione el año de ingreso del estudiante:{" "}
            <input
              type="number"
              id="year"
              name="year"
              min="1990"
              max="2099"
              step="1"
              placeholder="Ingresa el año"
            />
          </p>
          <div className="select_space">
            <p className="titulo">Otros programas académicos</p>
            <label>
              Si ha ingresado varias veces relacione los años y los programas
              académicos:
            </label>
            <div className="programas-container">
              {programas.map((programa, index) => (
                <div className="programa-item" key={index}>
                  <input
                    type="number"
                    name="anio"
                    value={programa.anio}
                    min="1990"
                    max="2090"
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Año"
                  />
                  <input
                    type="text"
                    name="programaAcademico"
                    value={programa.programaAcademico}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Programa académico"
                  />
                  <select
                    name="motivoNo"
                    value={programa.motivoNo}
                    onChange={(e) => handleMotivoChange(index, e)}
                  >
                    <option value="">Motivo de retiro</option>
                    {motivosRetiro.map((motivo, i) => (
                      <option key={i} value={motivo}>
                        {motivo}
                      </option>
                    ))}
                  </select>
                  {programa.motivoNo === "Otra" && (
                    <input
                      type="text"
                      name="especificarMotivo"
                      value={programa.especificarMotivo}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Especificar motivo"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveProgram(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddProgram}>
              Añadir Programa
            </button>
          </div>
        </div>
      </div>
      <hr className="styled-hr" />
      <div className="full-width">
        <div>
          <p className="titulo">Estudios realizados</p>
          <p>
            {" "}
            <b>Educación media de egreso: </b>
          </p>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input type="text" />
          </div>
          <div className="inline-input-group">
            <label>Título obtenido</label>
            <input type="text" />
          </div>
          <div className="inline-input-group">
            <label>Tipo de institución</label>
            <div className="checkbox_container sin_borde">
              <div className="checkbox_group">
                <input type="radio" name="tipo-institucion" />
                <label>Pública</label>
              </div>
              <div className="checkbox_group">
                <input type="radio" name="tipo-institucion" />
                <label>Privada</label>
              </div>
              <div className="checkbox_group">
                <input type="radio" name="tipo-institucion" />
                <label>Mixto</label>
              </div>
            </div>
          </div>
          <div>
            <p>
              Relacione las dificultades y los apoyos que se presentaron en la
              institución educativa y/o familia para su permanencia y egreso:
            </p>
            <table className="table-style">
              <thead>
                <tr>
                  <th>Dificultad</th>
                  <th>Apoyos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p>
              <b>
                Educación superior de egreso (Niveles Técnico Profesional,
                Tecnológico, Profesional, especialización, maestría, doctorado,
                posdoctorado):{" "}
              </b>
            </p>
            <div className="inline-input-group">
              <label>Nombre de la institución</label>
              <input
                type="text"
                value={
                  datos_academicos.institucion
                    ? datos_academicos.institucion
                    : ""
                }
              />
            </div>
            <div className="inline-input-group">
              <label>Título obtenido</label>
              <input
                type="text"
                value={
                  datos_academicos.titulo_obtenido
                    ? datos_academicos.titulo_obtenido
                    : ""
                }
              />
            </div>
            <div className="inline-input-group">
              <label>Tipo de institución</label>
              <div className="checkbox_container sin_borde">
                <div className="checkbox_group">
                  <input type="radio" name="tipo-institucion" />
                  <label>Pública</label>
                </div>
                <div className="checkbox_group">
                  <input type="radio" name="tipo-institucion" />
                  <label>Privada</label>
                </div>
                <div className="checkbox_group">
                  <input type="radio" name="tipo-institucion" />
                  <label>Mixto</label>
                </div>
              </div>
            </div>
            <div>
              <p>
                Relacione las dificultades y los apoyos que se presentaron en la
                institución educativa y/o familia para su permanencia y egreso:
              </p>
              <table className="table-style">
                <thead>
                  <tr>
                    <th>Dificultad</th>
                    <th>Apoyos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr className="styled-hr" />
      <div className="container_carac">
        <div className="full-width">
          <div>
            <p className="titulo">
              Periodo académico de ingreso al proyecto de Discapacidad e
              Inclusión
            </p>
            <p>
              Seleccione el periodo:{" "}
              <input type="date" name="anio_ingreso" id="anio_ingreso" />
            </p>
          </div>
          <div className="select_space">
            <label>Observaciones adicionales:</label>
            <textarea
              name="observaciones_adicionales"
              id="observaciones_adicionales"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosAcademicos;
