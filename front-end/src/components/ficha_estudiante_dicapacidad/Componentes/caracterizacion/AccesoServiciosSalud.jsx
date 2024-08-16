import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { useState } from "react";

const AccesoServiciosSalud = ({ servicio_salud }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="space_content">
      <div className="container_carac">
        <div>
          <p className="titulo">Régimen de salud vinculado(a)</p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input type="radio" name="regimen" />
              <label>Regimen contributario</label>
            </div>
            <div className="checkbox_group">
              <input type="radio" name="regimen" />
              <label>Regimen subsidiado</label>
            </div>
          </div>
        </div>

        <div>
          <p className="titulo">Servicio de salud</p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input
                type="radio"
                name="servicio"
                id="eps"
                value="EPS"
                checked={selectedOption === "EPS"}
                onChange={handleOptionChange}
              />
              <label htmlFor="eps">EPS</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="servicio"
                id="sisben"
                value="SISBEN"
                checked={selectedOption === "SISBEN"}
                onChange={handleOptionChange}
              />
              <label htmlFor="sisben">SISBEN</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="servicio"
                id="otra"
                value="Otra"
                checked={selectedOption === "Otra"}
                onChange={handleOptionChange}
              />
              <label htmlFor="otra">Otra</label>
            </div>
          </div>
          <div className="checkbox_group">
            <label htmlFor="otra-text">Escriba aquí</label>
            <input
              type="text"
              id="otra-text"
              disabled={selectedOption !== "Otra"}
              value={
                servicio_salud.salud_otra_texto
                  ? servicio_salud.salud_otra_texto
                  : ""
              }
            />
          </div>
        </div>

        <div className="full-width">
          <p className="titulo">Servicios adicionales</p>
          <p>¿Cuenta con un servicio de salud prepagada?</p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input
                type="radio"
                name="salud-prepagada"
                checked={
                  servicio_salud.servicio_salud === true
                    ? servicio_salud.servicio_salud
                    : false
                }
              />
              <label>Sí</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="salud-prepagada"
                checked={
                  servicio_salud.servicio_salud === true
                    ? !servicio_salud.servicio_salud
                    : false
                }
              />
              <label>No</label>
            </div>
          </div>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input
              type="text"
              value={
                servicio_salud.nombre_institucion
                  ? servicio_salud.nombre_institucion
                  : ""
              }
            />
          </div>

          <p></p>

          <p>¿Cuenta con un servicio de plan complementario?</p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input type="radio" name="plan-complementario" />
              <label>Sí</label>
            </div>
            <div className="checkbox_group">
              <input type="radio" name="plan-complementario" />
              <label>No</label>
            </div>
          </div>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input type="text" />
          </div>

          <p></p>

          <p>¿Cuenta con un servicio de salud estudiantil?</p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input type="radio" name="salud-estudiantil" />
              <label>Sí</label>
            </div>
            <div className="checkbox_group">
              <input type="radio" name="salud-estudiantil" />
              <label>No</label>
            </div>
          </div>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input type="text" />
          </div>
        </div>

        <div className="full-width">
          <p className="titulo">
            Actualmente usted es usuario de los servicios de
          </p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_general
                    ? servicio_salud.servicio_general
                    : false
                }
              />
              <label>Medicina general</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_especializado
                    ? servicio_salud.servicio_especializado
                    : false
                }
              />
              <label>Medicina especializada</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_fonoaudiologia
                    ? servicio_salud.servicio_fonoaudiologia
                    : false
                }
              />
              <label>Fonoaudiología</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_optometra
                    ? servicio_salud.servicio_optometra
                    : false
                }
              />
              <label>Optómetra</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_fisioterapia
                    ? servicio_salud.servicio_fisioterapia
                    : false
                }
              />
              <label>Fisioterapia</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_psicologia
                    ? servicio_salud.servicio_psicologia
                    : false
                }
              />
              <label>Psicología</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_psiquiatria
                    ? servicio_salud.servicio_psiquiatria
                    : false
                }
              />
              <label>Psiquiatría</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_otro
                    ? servicio_salud.servicio_otro
                    : false
                }
              />
              <label>Otro servicio</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_social
                    ? servicio_salud.servicio_social
                    : false
                }
              />
              <label>Trabajo social</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_alternativas
                    ? servicio_salud.servicio_alternativas
                    : false
                }
              />
              <label>Terapia alternativas</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  servicio_salud.servicio_ocupacional
                    ? servicio_salud.servicio_ocupacional
                    : false
                }
              />
              <label>Terapia ocupacional</label>
            </div>
          </div>
        </div>
      </div>
      <button className="full-size-button color_red">Editar</button>
    </div>
  );
};

export default AccesoServiciosSalud;
