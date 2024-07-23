import React, { useState } from 'react';
import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";

const DatosEconomicos = () => {
  const [recibeBeneficio, setRecibeBeneficio] = useState(false);
  const [requiereMateriales, setRequiereMateriales] = useState(false);
  const [vivienda, setVivienda] = useState("");
  const [tieneHijos, setTieneHijos] = useState("");

  const handleBeneficioChange = (e) => {
    setRecibeBeneficio(e.target.value === "si");
  };

  const handleRequiereMaterialesChange = (e) => {
    setRequiereMateriales(e.target.value === "si");
  };

  const handleViviendaChange = (e) => {
    setVivienda(e.target.value);
  };

  const handleTieneHijosChange = (e) => {
    setTieneHijos(e.target.value);
  };

  return (
    <div className="space_content">
      <form>
        <div className="container_carac">
          <div className="full-width">
            <div className="checkbox_group">
              <label>Estrato socio-económico de acuerdo con el recibo de servicios públicos de su vivienda es</label>
              <select id="estrato" name="estrato" style={{ width: "70px" }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>¿Cómo sostiene su permanencia en la universidad?</label>
              <div>
                <input type="checkbox" />
                <label>Ingresos propios</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Ingresos Familiares</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Otros ¿cuáles?:</label>
                <input type="text" />
              </div>
            </div>
            <div className="separator" />
            <div className="checkbox_container sin_borde">
              <div className="checkbox_group">
                <input type="checkbox" />
                <label>Recibe alguna prestación económica</label>
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
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>¿Requiere materiales durante su carrera?</label>
              <select onChange={handleRequiereMaterialesChange}>
                <option value="">Seleccione...</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                <option value="no_sabe">No sabe</option>
              </select>
              {requiereMateriales && (
                <div>
                  <label>¿Cuál es el valor aproximado en materiales, durante un semestre?</label>
                  <select>
                    <option value="">Seleccione...</option>
                    <option value="0-50k">Desde $0 a $50.000</option>
                    <option value="100k-200k">Desde $100.000 a $200.000</option>
                    <option value="200k-300k">Desde $200.000 a $300.000</option>
                    <option value="300k-500k">Desde $300.000 a $500.000</option>
                    <option value="500k-1M">Desde $500.000 a $1.000.000</option>
                    <option value="1M+">Superiores a $1.000.000</option>
                  </select>
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>Para desplazarse a la universidad usted:</label>
              <div>
                <input type="checkbox" />
                <label>Paga transporte privado</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Paga el transporte público</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Tiene transporte propio</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Otro ¿Cuál?:</label>
                <input type="text" />
              </div>
              <div>
                <label>¿Cuál es el valor aproximado para el transporte, durante un semestre?</label>
                <input type="number" min="0" step="1000" />
              </div>
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>¿Cuál es el valor aproximado en sostenimiento (alimentación, arriendo, servicios públicos incluido internet, entre otros), durante un semestre?</label>
              <select>
                <option value="">Seleccione...</option>
                <option value="0-50k">Desde $0 a $50.000</option>
                <option value="100k-200k">Desde $100.000 a $200.000</option>
                <option value="200k-300k">Desde $200.000 a $300.000</option>
                <option value="300k-500k">Desde $300.000 a $500.000</option>
                <option value="500k-1M">Desde $500.000 a $1.000.000</option>
                <option value="1M+">Superiores a $1.000.000</option>
              </select>
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>Actualmente vive:</label>
              <select onChange={handleViviendaChange}>
                <option value="">Seleccione...</option>
                <option value="solo">Solo(a)</option>
                <option value="acompanado">Acompañado(a)</option>
              </select>
              {vivienda === "acompanado" && (
                <div>
                  <label>Describa el parentesco con quién vive actualmente:</label>
                  <input type="text" />
                </div>
              )}
            </div>
            <div className="separator" />
            <div className="checkbox_group">
              <label>¿Tiene hijos/as?</label>
              <select onChange={handleTieneHijosChange}>
                <option value="">Seleccione...</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              {tieneHijos === "si" && (
                <div>
                  <label>¿Cuántos?:</label>
                  <input type="number" min="1" />
                </div>
              )}
            </div>
            <div className="separator" />
            <p className="titulo">Proyecto de Vida</p>
            <div className="checkbox_group">
              <div>
                <label>¿Qué le motivó el ingreso a su carrera?</label>
                <textarea name="motivoIngresoCarrera" />
              </div>
              <div>
                <label>¿Cuáles son sus expectativas en esta carrera?</label>
                <textarea name="expectativasCarrera" />
              </div>
              <div>
                <label>¿Cuáles son sus expectativas al graduarse?</label>
                <textarea name="expectativasGraduacion" />
              </div>
            </div>
            <div className="select_space">
              <label>Expectativas laborales</label>
              <textarea name="expectativas_laborales" id="expectativas_laborales" />
            </div>
          <div className='separator'/>
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
                  <option value="analfabeta">Analfabeta</option>
                </select>
              </div>
              <div className="select_space">
                <label>Situación económica</label>
                <select>
                  <option value="">Seleccione una opción</option>
                  <option value="trabajando">Trabajando</option>
                  <option value="cesante">Cesante</option>
                  <option value="trabajo ocasional">Trabajo ocasional</option>
                  <option value="dependiente">Dependiente</option>
                  <option value="independiente">Independiente</option>
                  <option value="pensionado">Pensionado</option>
                  <option value="fallecido">Fallecido</option>
                </select>
              </div>
              <div className="select_space">
                <label>Actividad económica (Si está trabajando)</label>
                <input type="text" />
              </div>
              <div className="select_space">
                <label>Labor que desempeña</label>
                <input type="text" />
              </div>
            </div>
          </div>
          
          <div>
            <p className="titulo">Informacion de la madre (si aplica)</p>
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
                  <option value="analfabeta">Analfabeta</option>
                </select>
              </div>
              <div className="select_space">
                <label>Situación económica</label>
                <select>
                  <option value="">Seleccione una opción</option>
                  <option value="trabajando">Trabajando</option>
                  <option value="cesante">Cesante</option>
                  <option value="trabajo ocasional">Trabajo ocasional</option>
                  <option value="dependiente">Dependiente</option>
                  <option value="independiente">Independiente</option>
                  <option value="pensionado">Pensionado</option>
                  <option value="fallecido">Fallecido</option>
                </select>
              </div>
              <div className="select_space">
                <label>Actividad económica (Si está trabajando)</label>
                <input type="text" />
              </div>
              <div className="select_space">
                <label>Labor que desempeña</label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div className='full-width'>
          <div>
            <p className="titulo">Información de otros familiares que se hayan hecho a cargo en caso diferente a los anteriores</p>
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
                  <option value="analfabeta">Analfabeta</option>
                </select>
              </div>
              <div className="select_space">
                <label>Situación económica</label>
                <select>
                  <option value="">Seleccione una opción</option>
                  <option value="trabajando">Trabajando</option>
                  <option value="cesante">Cesante</option>
                  <option value="trabajo ocasional">Trabajo ocasional</option>
                  <option value="dependiente">Dependiente</option>
                  <option value="independiente">Independiente</option>
                  <option value="pensionado">Pensionado</option>
                  <option value="fallecido">Fallecido</option>
                </select>
              </div>
              <div className="select_space">
                <label>Actividad económica (Si está trabajando)</label>
                <input type="text" />
              </div>
              <div className="select_space">
                <label>Labor que desempeña</label>
                <input type="text" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DatosEconomicos;
