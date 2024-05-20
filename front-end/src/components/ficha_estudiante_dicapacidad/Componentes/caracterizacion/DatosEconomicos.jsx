import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const DatosEconomicos = () => {
  return (
    <div>
      <form>
        <div className="container_carac">

          <div className="full-width">
            <p className="titulo">Informacion del estudiante</p>
            <div className="checkbox_container sin_borde">
              <div className="checkbox_group">
                <label>Estrato socio-económico</label>
                <input type="number" style={{ width: "70px" }} />
              </div>
              <div className="checkbox_group">
                <input type="checkbox" />
                <label>Recibe alguna prestacion económica</label>
              </div>
              <div className="checkbox_group">
                <input type="checkbox" />
                <label>Recibe alguna beca</label>
              </div>
              <div className="checkbox_group">
                <input type="checkbox" />
                <label>Recibe ayuda para el transporte</label>
              </div>
              <div className="checkbox_group">
                <input type="checkbox" />
                <label>Recibe ayuda para financiar materiales</label>
              </div>
              <div className="checkbox_group">
                <input type="checkbox" />
                <label>Solvencia económica</label>
              </div>
              <div className="checkbox_group">
                <label>Expectativas laborales</label>
                <textarea
                  name="expectativas_laborales"
                  id="expectativas_laborales"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="titulo">Informacion del padre (si aplica)</p>
            <div>
              <div className="select_space">
                <label>Nivel educativo (Máximo alcanzado)</label>
                <select>
                  <option value="">Seleccione una opción</option>
                  <option value="primaria completo">Primaria completo</option>
                  <option value="primaria incompleto">
                    Primaria incompleto
                  </option>
                  <option value="secundaria completo">
                    Secundaria completo
                  </option>
                  <option value="secundaria incompleto">
                    Secundaria incompleto
                  </option>
                  <option value="técnico completo">Técnico completo</option>
                  <option value="técnico incompleto">Técnico incompleto</option>
                  <option value="tecnólogo completo">Tecnólogo completo</option>
                  <option value="tecnólogo incompleto">
                    Tecnólogo incompleto
                  </option>
                  <option value="profesional pregrado completo">
                    Profesional pregrado completo
                  </option>
                  <option value="profesional pregrado incompleto">
                    Profesional pregrado incompleto
                  </option>
                  <option value="profesional posgrado completo">
                    Profesional posgrado completo
                  </option>
                  <option value="profesional posgrado incompleto">
                    Profesional posgrado incompleto
                  </option>
                </select>
              </div>
              <div className="select_space">
                <label>Ocupación</label>
                <select>
                  <option value="">Seleccione una opción</option>
                  <option value="FUERZAS MILITARES">
                    FUERZAS MILITARES (E...)
                  </option>
                  <option value="POLICIA">POLICÍA ...</option>
                  <option value="MIEMBROS DEL PODER">
                    MIEMBROS DEL PODER E...
                  </option>
                  <option value="FUERZAS MILITARES">
                    DIRECTORES Y GERENTE...
                  </option>
                  <option value="DIRECTORES DE DEPART">
                    DIRECTORES DE DEPART...
                  </option>
                  <option value="COORDINADORES Y SUPE">
                    COORDINADORES Y SUPE...
                  </option>
                  <option value="PROFESIONALES DE LAS">
                    PROFESIONALES DE LAS...
                  </option>
                  <option value="PROFESIONALES DE LAS">
                    PROFESIONALES DE LAS...
                  </option>
                  <option value="PROFESIONALES DE LA">
                    PROFESIONALES DE LA ...
                  </option>
                  <option value="OTROS PROFESIONALES">
                    OTROS PROFESIONALES ...
                  </option>
                  <option value="TÉCNICO Y POSTSECU">
                    TÉCNICO Y POSTSECU...
                  </option>
                  <option value="TÉCNICO Y POSTSECU">
                    TÉCNICO Y POSTSECU...
                  </option>
                  <option value="ASISTENTES DE ENSEÑ">
                    ASISTENTES DE ENSEÑ...
                  </option>
                  <option value="MIEMBROS DEL PODER">
                    OTROS TÉCNICOS, POS...
                  </option>
                  <option value="OFICINIST">OFICINIST ...</option>
                  <option value="EMPLEADOS DE TRATO D">
                    EMPLEADOS DE TRATO D ...
                  </option>
                  <option value="TRABAJADORES DE LOS">
                    TRABAJADORES DE LOS...
                  </option>
                  <option value="PROFESIONAL DE LOS SERV">
                    PROFESIONAL DE LOS SERV ...
                  </option>
                  <option value="MODELOS, VENDEDORES">
                    MODELOS, VENDEDORES ...
                  </option>
                  <option value="NINGUNA DE LAS ANTERIORES">
                    NINGUNA DE LAS ANTERIORES
                  </option>
                </select>
              </div>
              <div className="select_space">
                <label>Situación laboral</label>
                <select>
                  <option value="">Seleccione una opción</option>
                  <option value="Opcion 1">Opcion 1</option>
                  <option value="Opcion 2">Opcion 2</option>
                  <option value="Opcion 3">Opcion 3</option>
                  <option value="Ninguna">No definido</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <p className="titulo">Informacion de la madre (si aplica)</p>

            <div className="select_space">
              <label>Nivel educativo (Máximo alcanzado)</label>
              <select>
                <option value="">Seleccione una opción</option>
                <option value="primaria completo">Primaria completo</option>
                <option value="primaria incompleto">Primaria incompleto</option>
                <option value="secundaria completo">Secundaria completo</option>
                <option value="secundaria incompleto">
                  Secundaria incompleto
                </option>
                <option value="técnico completo">Técnico completo</option>
                <option value="técnico incompleto">Técnico incompleto</option>
                <option value="tecnólogo completo">Tecnólogo completo</option>
                <option value="tecnólogo incompleto">
                  Tecnólogo incompleto
                </option>
                <option value="profesional pregrado completo">
                  Profesional pregrado completo
                </option>
                <option value="profesional pregrado incompleto">
                  Profesional pregrado incompleto
                </option>
                <option value="profesional posgrado completo">
                  Profesional posgrado completo
                </option>
                <option value="profesional posgrado incompleto">
                  Profesional posgrado incompleto
                </option>
              </select>
            </div>
            <div className="select_space">
              <label>Ocupación</label>
              <select>
                <option value="">Seleccione una opción</option>
                <option value="FUERZAS MILITARES">
                  FUERZAS MILITARES (E...)
                </option>
                <option value="POLICIA">POLICÍA ...</option>
                <option value="MIEMBROS DEL PODER">
                  MIEMBROS DEL PODER E...
                </option>
                <option value="FUERZAS MILITARES">
                  DIRECTORES Y GERENTE...
                </option>
                <option value="DIRECTORES DE DEPART">
                  DIRECTORES DE DEPART...
                </option>
                <option value="COORDINADORES Y SUPE">
                  COORDINADORES Y SUPE...
                </option>
                <option value="PROFESIONALES DE LAS">
                  PROFESIONALES DE LAS...
                </option>
                <option value="PROFESIONALES DE LAS">
                  PROFESIONALES DE LAS...
                </option>
                <option value="PROFESIONALES DE LA">
                  PROFESIONALES DE LA ...
                </option>
                <option value="OTROS PROFESIONALES">
                  OTROS PROFESIONALES ...
                </option>
                <option value="TÉCNICO Y POSTSECU">
                  TÉCNICO Y POSTSECU...
                </option>
                <option value="TÉCNICO Y POSTSECU">
                  TÉCNICO Y POSTSECU...
                </option>
                <option value="ASISTENTES DE ENSEÑ">
                  ASISTENTES DE ENSEÑ...
                </option>
                <option value="MIEMBROS DEL PODER">
                  OTROS TÉCNICOS, POS...
                </option>
                <option value="OFICINIST">OFICINIST ...</option>
                <option value="EMPLEADOS DE TRATO D">
                  EMPLEADOS DE TRATO D ...
                </option>
                <option value="TRABAJADORES DE LOS">
                  TRABAJADORES DE LOS...
                </option>
                <option value="PROFESIONAL DE LOS SERV">
                  PROFESIONAL DE LOS SERV ...
                </option>
                <option value="MODELOS, VENDEDORES">
                  MODELOS, VENDEDORES ...
                </option>
                <option value="NINGUNA DE LAS ANTERIORES">
                  NINGUNA DE LAS ANTERIORES
                </option>
              </select>
            </div>
            <div className="select_space">
              <label>Situación laboral</label>
              <select>
                <option value="">Seleccione una opción</option>
                <option value="Opcion 1">Opcion 1</option>
                <option value="Opcion 2">Opcion 2</option>
                <option value="Opcion 3">Opcion 3</option>
                <option value="Ninguna">No definido</option>
              </select>
            </div>
          </div>
        </div>
        <button>Editar</button>
      </form>
    </div>
  );
};

export default DatosEconomicos;
