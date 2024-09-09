import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { useState } from "react";

const AccesoServiciosSalud = ({ servicio_salud }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [stateServicioSalud, setStateServicioSalud] = useState({
    id: servicio_salud.id,
    regimen_vinculado: servicio_salud.regimen_vinculado,
    servicio_salud: servicio_salud.servicio_salud,
    salud_otra_texto: servicio_salud.salud_otra_texto,
    servicio_general: servicio_salud.servicio_general,
    servicio_optometra: servicio_salud.servicio_optometra,
    servicio_psiquiatria: servicio_salud.servicio_psiquiatria,
    servicio_alternativas: servicio_salud.servicio_alternativas,
    servicio_especializado: servicio_salud.servicio_especializado,
    servicio_fisioterapia: servicio_salud.servicio_fisioterapia,
    servicio_otro: servicio_salud.servicio_otro,
    servicio_ocupacional: servicio_salud.servicio_ocupacional,
    servicio_fonoaudiologia: servicio_salud.servicio_fonoaudiologia,
    servicio_psicologia: servicio_salud.servicio_psicologia,
    servicio_social: servicio_salud.servicio_social,
    salud_prepagada: servicio_salud.salud_prepagada,
    salud_pre_nombre_institucion: servicio_salud.salud_pre_nombre_institucion,
    servicio_complementario: servicio_salud.servicio_complementario,
    servicio_complementario_nombre:
      servicio_salud.servicio_complementario_nombre,
    servicio_estudiantil: servicio_salud.servicio_estudiantil,
    servicio_estudiantil_nombre: servicio_salud.servicio_estudiantil_nombre,
  });

  const [stateDisabled, setStateDisabled] = useState(true);

  const handleUpdateDatosServicioSalud = (e) => {
    e.preventDefault();
    setStateDisabled(true);
    console.log("Datos servicio de salud actualizados");
    // console.log(datos_estudiante_entrevistado);
    console.log(stateServicioSalud);
  };

  const updateStateDisabled = () => {
    setStateDisabled(!stateDisabled);
  };

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
              <input
                type="radio"
                name="regimen"
                checked={
                  stateServicioSalud.regimen_vinculado === true
                    ? stateServicioSalud.regimen_vinculado
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    regimen_vinculado: !stateServicioSalud.regimen_vinculado,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Regimen contributario</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="regimen"
                checked={
                  stateServicioSalud.regimen_vinculado === false ? true : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    regimen_vinculado: !stateServicioSalud.regimen_vinculado,
                  })
                }
                disabled={stateDisabled}
              />
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
                checked={
                  stateServicioSalud.servicio_salud === "eps" ? true : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_salud: "eps",
                  })
                }
                disabled={stateDisabled}
              />
              <label htmlFor="eps">EPS</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="servicio"
                id="sisben"
                value={
                  stateServicioSalud.servicio_salud === "sisben" ? true : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_salud: "sisben",
                  })
                }
                disabled={stateDisabled}
              />
              <label htmlFor="sisben">SISBEN</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="servicio"
                id="otra"
                checked={
                  stateServicioSalud.servicio_salud === "otra" ? true : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_salud: "otra",
                  })
                }
                disabled={stateDisabled}
              />
              <label htmlFor="otra">Otra</label>
            </div>
          </div>
          <div className="checkbox_group">
            <label htmlFor="otra-text">Escriba aquí</label>
            <input
              type="text"
              className="input-type-text"
              id="otra-text"
              disabled={stateServicioSalud.servicio_salud !== "otra"}
              value={
                stateServicioSalud.servicio_salud !== "otra"
                  ? ""
                  : stateServicioSalud.salud_otra_texto
              }
              onChange={(e) =>
                setStateServicioSalud({
                  ...stateServicioSalud,
                  salud_otra_texto: e.target.value,
                })
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
                  stateServicioSalud.salud_prepagada === true ? true : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    salud_prepagada: !stateServicioSalud.salud_prepagada,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Sí</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="salud-prepagada"
                checked={
                  stateServicioSalud.salud_prepagada === false ? true : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    salud_prepagada: !stateServicioSalud.salud_prepagada,
                  })
                }
                disabled={stateDisabled}
              />
              <label>No</label>
            </div>
          </div>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input
              type="text"
              className="input-type-text"
              value={
                stateServicioSalud.salud_prepagada === true
                  ? stateServicioSalud.salud_pre_nombre_institucion
                  : ""
              }
              onChange={(e) =>
                setStateServicioSalud({
                  ...stateServicioSalud,
                  salud_pre_nombre_institucion: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>

          <p></p>

          <p>¿Cuenta con un servicio de plan complementario?</p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input
                type="radio"
                name="plan-complementario"
                checked={
                  stateServicioSalud.servicio_complementario === true
                    ? true
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_complementario:
                      !stateServicioSalud.servicio_complementario,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Sí</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="plan-complementario"
                checked={
                  stateServicioSalud.servicio_complementario === false
                    ? true
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_complementario:
                      !stateServicioSalud.servicio_complementario,
                  })
                }
                disabled={stateDisabled}
              />
              <label>No</label>
            </div>
          </div>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input
              type="text"
              className="input-type-text"
              value={
                stateServicioSalud.servicio_complementario === true
                  ? stateServicioSalud.servicio_complementario_nombre
                  : ""
              }
              onChange={(e) =>
                setStateServicioSalud({
                  ...stateServicioSalud,
                  servicio_complementario_nombre: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>

          <p></p>

          <p>¿Cuenta con un servicio de salud estudiantil?</p>
          <div className="checkbox_container sin_borde">
            <div className="checkbox_group">
              <input
                type="radio"
                name="salud-estudiantil"
                checked={
                  stateServicioSalud.servicio_estudiantil === true
                    ? true
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_estudiantil:
                      !stateServicioSalud.servicio_estudiantil,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Sí</label>
            </div>
            <div className="checkbox_group">
              <input
                type="radio"
                name="salud-estudiantil"
                checked={
                  stateServicioSalud.servicio_estudiantil === false
                    ? true
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_estudiantil:
                      !stateServicioSalud.servicio_estudiantil,
                  })
                }
                disabled={stateDisabled}
              />
              <label>No</label>
            </div>
          </div>
          <div className="inline-input-group">
            <label>Nombre de la institución</label>
            <input
              type="text"
              className="input-type-text"
              value={
                stateServicioSalud.servicio_estudiantil === true
                  ? stateServicioSalud.servicio_estudiantil_nombre
                  : ""
              }
              onChange={(e) =>
                setStateServicioSalud({
                  ...stateServicioSalud,
                  servicio_estudiantil_nombre: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
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
                  stateServicioSalud.servicio_general
                    ? stateServicioSalud.servicio_general
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_general: !stateServicioSalud.servicio_general,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Medicina general</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_especializado
                    ? stateServicioSalud.servicio_especializado
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_especializado:
                      !stateServicioSalud.servicio_especializado,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Medicina especializada</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_fonoaudiologia
                    ? stateServicioSalud.servicio_fonoaudiologia
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_fonoaudiologia:
                      !stateServicioSalud.servicio_fonoaudiologia,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Fonoaudiología</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_optometra
                    ? stateServicioSalud.servicio_optometra
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_optometra: !stateServicioSalud.servicio_optometra,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Optómetra</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_fisioterapia
                    ? stateServicioSalud.servicio_fisioterapia
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_fisioterapia:
                      !stateServicioSalud.servicio_fisioterapia,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Fisioterapia</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_psicologia
                    ? stateServicioSalud.servicio_psicologia
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_psicologia:
                      !stateServicioSalud.servicio_psicologia,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Psicología</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_psiquiatria
                    ? stateServicioSalud.servicio_psiquiatria
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_psiquiatria:
                      !stateServicioSalud.servicio_psiquiatria,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Psiquiatría</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_otro
                    ? stateServicioSalud.servicio_otro
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_otro: !stateServicioSalud.servicio_otro,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Otro servicio</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_social
                    ? stateServicioSalud.servicio_social
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_social: !stateServicioSalud.servicio_social,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Trabajo social</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_alternativas
                    ? stateServicioSalud.servicio_alternativas
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_alternativas:
                      !stateServicioSalud.servicio_alternativas,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Terapia alternativas</label>
            </div>
            <div className="checkbox_group">
              <input
                type="checkbox"
                checked={
                  stateServicioSalud.servicio_ocupacional
                    ? stateServicioSalud.servicio_ocupacional
                    : false
                }
                onChange={(e) =>
                  setStateServicioSalud({
                    ...stateServicioSalud,
                    servicio_ocupacional:
                      !stateServicioSalud.servicio_ocupacional,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Terapia ocupacional</label>
            </div>
          </div>
        </div>
      </div>
      {stateDisabled === true ? (
        <button
          className="full-size-button color_red"
          onClick={(e) => updateStateDisabled()}
        >
          Editar
        </button>
      ) : (
        <button
          className="full-size-button color_red"
          onClick={handleUpdateDatosServicioSalud}
        >
          Enviar
        </button>
      )}
    </div>
  );
};

export default AccesoServiciosSalud;
