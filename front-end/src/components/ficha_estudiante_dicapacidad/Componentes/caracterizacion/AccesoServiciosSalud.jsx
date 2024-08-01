import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { useState } from "react";

const AccesoServiciosSalud = () => {
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
            />
          </div>
        </div>


        <div className="full-width">
          <p className="titulo">
            Servicios adicionales
          </p>
          <p>
            ¿Cuenta con un servicio de salud prepagada?
          </p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input type="radio" name="salud-prepagada" />
              <label>Sí</label>
            </div>
            <div className="checkbox_group">
              <input type="radio" name="salud-prepagada" />
              <label>No</label>
            </div>
          </div>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input type="text" />
          </div>

          <p></p>

          <p>
            ¿Cuenta con un servicio de plan complementario?
          </p>
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
          

          <p>
            ¿Cuenta con un servicio de salud estudiantil?
          </p>
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
              <input type="checkbox" />
              <label>Medicina general</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Medicina especializada</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Fonoaudiología</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Optómetra</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Fisioterapia</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Psicología</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Psiquiatría</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Otro servicio</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Trabajo social</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
              <label>Terapia alternativas</label>
            </div>
            <div className="checkbox_group">
              <input type="checkbox" />
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
