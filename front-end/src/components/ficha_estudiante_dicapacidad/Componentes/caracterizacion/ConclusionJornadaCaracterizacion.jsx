import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const ConclusionJornadaCaracterizacion = ({ jornada }) => {
  const [stateDisabled, setStateDisabled] = useState(true);

  const [stateJornadaCaracterizacion, setStateJornadaCaracterizacion] =
    useState({
      jornada_caracterizacion: "",
    });

  useEffect(() => {
    if (jornada && jornada.jornada_caracterizacion) {
      setStateJornadaCaracterizacion({
        jornada_caracterizacion: jornada.jornada_caracterizacion,
      });
    }
  }, [jornada]);

  const handleUpdateJornada = (e) => {
    e.preventDefault();
    setStateDisabled(true);

    console.log("Jornada actualizado:");
    console.log("Original:", jornada.jornada_caracterizacion);
    console.log(
      "Actualizado:",
      stateJornadaCaracterizacion.jornada_caracterizacion
    );
  };

  const updateStateDisabled = () => {
    setStateDisabled(!stateDisabled);
  };

  return (
    <div className="space_content">
      <div className="select_space">
        <Col>
          <Row>
            <label>Conclusión de la jornada de la caracterización</label>
          </Row>
          <Row>
            <textarea
              name="jornada_caracterizacion"
              id="jornada_caracterizacion"
              className="textarea-jornada"
              value={stateJornadaCaracterizacion.jornada_caracterizacion}
              onChange={(e) => {
                setStateJornadaCaracterizacion({
                  ...stateJornadaCaracterizacion,
                  jornada_caracterizacion: e.target.value,
                });
              }}
              disabled={stateDisabled}
            />
          </Row>
        </Col>
      </div>
      {stateDisabled ? (
        <button
          className="full-size-button color_red"
          onClick={updateStateDisabled}
        >
          Editar
        </button>
      ) : (
        <button
          className="full-size-button color_red"
          onClick={handleUpdateJornada}
        >
          Enviar
        </button>
      )}
      <hr></hr>
    </div>
  );
};

export default ConclusionJornadaCaracterizacion;
