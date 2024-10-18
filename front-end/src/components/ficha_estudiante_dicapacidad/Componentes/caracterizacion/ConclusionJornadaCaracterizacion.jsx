import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { desencriptarInt } from "../../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { useAuthStore } from "../../store/auth";
import UpdateDatosEntrevistador from "../../../../service/update_datos_entrevistador_disc.js";

const ConclusionJornadaCaracterizacion = ({ jornada }) => {
  const [stateDisabled, setStateDisabled] = useState(true);
  const { estudianteSelected } = useAuthStore();

  const [stateJornadaCaracterizacion, setStateJornadaCaracterizacion] =
    useState({
      fecha: "",
      lugar: "",
      jornada_caracterizacion: "",
      tipo: "datos_jornada_caracterizacion",
      id_estudiante: estudianteSelected.id,
      // id_semestre: jornada.id_semestre,
      id_semestre: desencriptarInt(
        sessionStorage.getItem("id_semestre_discapacidad")
      ),
      id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),
    });

  // Se utiliza useEffect para establecer el valor inicial cuando 'jornada' cambia
  useEffect(() => {
    if (jornada) {
      setStateJornadaCaracterizacion((prevState) => ({
        ...prevState,
        jornada_caracterizacion: jornada.jornada_caracterizacion,
        fecha: jornada.fecha_nac,
        lugar: jornada.lugar,
      }));
    }
  }, [jornada]);

  const handleUpdateJornada = (e) => {
    e.preventDefault();
    setStateDisabled(true);

    //console.log("Jornada actualizado:");
    //console.log("Original:", jornada);
    //console.log("Actualizado:", stateJornadaCaracterizacion);
    UpdateDatosEntrevistador.Update_datos_entrevistador_disc(
      stateJornadaCaracterizacion
    )
      .then((res) => {
        //console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
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
