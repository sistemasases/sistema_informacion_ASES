import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const DatosAcademicos = () => {
    return (
        <div className="space_content">
            <div className="container_carac">
                <div className="full-width">
                    <p className="titulo">Año de ingreso por primera vez</p>
                    <p>Seleccione el año de ingreso del estudiante: <input type="date" name="anio_ingreso" id="anio_ingreso" /></p>
                    <div className="select_space">
                        <label>Si ha ingresado varias veces relacione los años y los programas académicos:</label>
                        <ul>
                            <li>
                                Año: <input type="number" name="anio" id="anio" style={{ width: "70px" }} /> Programa académico: <input type="text" name="programa_academico" id="programa_academico" style={{ width: "240px" }} /> Motivo No: <input type="text" name="motivo_no" id="motivo_no" style={{ width: "100px" }} />
                            </li>
                            <li>
                                Año: <input type="number" name="anio" id="anio" style={{ width: "70px" }} /> Programa académico: <input type="text" name="programa_academico" id="programa_academico" style={{ width: "240px" }} /> Motivo No: <input type="text" name="motivo_no" id="motivo_no" style={{ width: "100px" }} />
                            </li>
                            <li>
                                Año: <input type="number" name="anio" id="anio" style={{ width: "70px" }} /> Programa académico: <input type="text" name="programa_academico" id="programa_academico" style={{ width: "240px" }} /> Motivo No: <input type="text" name="motivo_no" id="motivo_no" style={{ width: "100px" }} />
                            </li>
                            <li>
                                Año: <input type="number" name="anio" id="anio" style={{ width: "70px" }} /> Programa académico: <input type="text" name="programa_academico" id="programa_academico" style={{ width: "240px" }} /> Motivo No: <input type="text" name="motivo_no" id="motivo_no" style={{ width: "100px" }} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="full-width">
                    <p className="titulo">Motivo de retiro/s de la universidad</p>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Bajos académicos</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Condición de salud</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Fallecimiento</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Condición económica</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Cambio de programa académico </label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Cambio de institución educativa</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Cambio de ciudad</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Retiro voluntario</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Prefiero no decirlo</label>
                    </div>
                    <div className="select_space">
                        <input type="checkbox" />
                        <label>Otra ¿cuál? <input type="text" name="motivo_no" id="motivo_no" style={{ width: "200px" }} /></label>

                    </div>
                </div>
            </div>
            <hr className="styled-hr" />
            <div className="container_carac">
                <div>
                    <p className="titulo">Estudios realizados</p>
                    <p> <b>Educación media de egreso: </b></p>
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
                        <p>Relacione las dificultades y los apoyos que se presentaron en la institución educativa y/o familia para su permanencia y egreso:</p>
                        <table className="table-style">
                            <thead>
                                <tr>
                                    <th>Dificultad</th>
                                    <th>Apoyos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p><b>Educación superior de egreso (Niveles Técnico Profesional, Tecnológico, Profesional, especialización, maestría, doctorado, posdoctorado): </b></p>
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
                            <p>Relacione las dificultades y los apoyos que se presentaron en la institución educativa y/o familia para su permanencia y egreso:</p>
                            <table className="table-style">
                                <thead>
                                    <tr>
                                        <th>Dificultad</th>
                                        <th>Apoyos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="text" /></td>
                                        <td><input type="text" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" /></td>
                                        <td><input type="text" /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" /></td>
                                        <td><input type="text" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="titulo">Estudios paralelos</p>
                    <p><b>Instituciones de estudio actual (adicional a su carrera):</b></p>
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
                        <p>Relacione las dificultades y los apoyos que se presentaron en la institución educativa y/o familia para su permanencia y egreso:</p>
                        <table className="table-style">
                            <thead>
                                <tr>
                                    <th>Dificultad</th>
                                    <th>Apoyos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <hr className="styled-hr" />
            <div className="container_carac">
                <div className="full-width">
                    <div>
                        <p className="titulo">Periodo académico de ingreso al proyecto de Discapacidad e Inclusión</p>
                        <p>Seleccione el periodo: <input type="date" name="anio_ingreso" id="anio_ingreso" /></p>
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
    )
}

export default DatosAcademicos;