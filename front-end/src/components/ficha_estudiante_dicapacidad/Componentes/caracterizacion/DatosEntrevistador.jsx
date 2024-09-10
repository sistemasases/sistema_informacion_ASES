import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { useAuthStore } from "../../store/auth";
import { useState } from "react";
import UpdateDatosEntrevistador from "../../../../service/update_datos_entrevistador_disc.js";
import {
  desencriptar,
  desencriptarInt,
} from "../../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const DatosEntrevistador = ({ datos_entrevistador }) => {
  // console.log(datos_entrevistador);
  const [stateDisabled, setStateDisabled] = useState(true);
  const { estudianteSelected } = useAuthStore();

  const [stateEntrevistador, setStateEntrevistador] = useState({
    tipo: "datos_entrevistador",
    id_semestre: 40,
    id_estudiante: estudianteSelected.id,
    fecha: datos_entrevistador.fecha_aplicacion,
    lugar: datos_entrevistador.lugar,
    id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),
    celular: datos_entrevistador.celular,
    profesion: datos_entrevistador.profesion,
    jornada: "",

    entrevistador: datos_entrevistador.entrevistador,
    cargo: datos_entrevistador.cargo,
    // fecha_aplicacion: datos_entrevistador.fecha_aplicacion,
    // id_semestre: desencriptar(sessionStorage.getItem("id_")),
  });

  const handleUpdateEntrevistador = (e) => {
    e.preventDefault();
    setStateDisabled(true);
    console.log(stateEntrevistador.fecha);
    UpdateDatosEntrevistador.Update_datos_entrevistador_disc(stateEntrevistador)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Entrevistador actualizado");
    console.log(stateEntrevistador);
    console.log(datos_entrevistador);
  };

  const updateStateDisabled = () => {
    setStateDisabled(!stateDisabled);
  };

  return (
    <div className="space_content">
      <form>
        <div>
          <p className="titulo">Informacion del entrevistador</p>
          <div className="inline-input-group">
            <label>Entrevistador</label>
            <input
              type="text"
              className="input-type-text"
              value={stateEntrevistador.entrevistador}
              onChange={(e) =>
                setStateEntrevistador({
                  ...stateEntrevistador,
                  entrevistador: e.target.value,
                })
              }
              disabled
            />
            <label>Celular</label>
            <input
              type="tel"
              className="input-type-text-tel"
              value={stateEntrevistador.celular}
              onChange={(e) =>
                setStateEntrevistador({
                  ...stateEntrevistador,
                  celular: e.target.value,
                })
              }
              disabled={stateDisabled}
            />
          </div>
          <div className="inline-input-group">
            <label>Cargo</label>
            <select
              className="select-type"
              value={stateEntrevistador.cargo}
              onChange={(e) =>
                setStateEntrevistador({
                  ...stateEntrevistador,
                  cargo: e.target.value,
                })
              }
              disabled
            >
              <option value="sin_definir">Seleccione una opción</option>
              <option value="Opcion 1">Opcion 1</option>
              <option value="Opcion 2">Opcion 2</option>
              <option value="Opcion 3">Opcion 3</option>
              <option value="Ninguna">No definido</option>
            </select>
            <label>Profesión</label>
            {/* Select profesion */}
            <select
              className="select-type"
              value={stateEntrevistador.profesion}
              onChange={(e) =>
                setStateEntrevistador({
                  ...stateEntrevistador,
                  profesion: e.target.value,
                })
              }
              disabled={stateDisabled}
            >
              <option value="sin_definir">Seleccione una opción</option>
              <option value="Opcion 1">Opcion 1</option>
              <option value="Opcion 2">Opcion 2</option>
              <option value="Opcion 3">Opcion 3</option>
              <option value="Ninguna">No definido</option>
            </select>
          </div>
          <div>
            <p className="titulo">Informacion de la entrevista</p>
            <div className="inline-input-group">
              <label>Fecha de Aplicación</label>
              <input
                type="date"
                className="input-type-date"
                value={stateEntrevistador.fecha}
                onChange={(e) =>
                  setStateEntrevistador({
                    ...stateEntrevistador,
                    fecha: e.target.value,
                  })
                }
                disabled={stateDisabled}
              />
              <label>Lugar o Medio de Aplicación</label>
              {/* Campo Lugar o Medio de Aplicación */}
              <select
                className="select-type"
                value={stateEntrevistador.lugar}
                onChange={(e) =>
                  setStateEntrevistador({
                    ...stateEntrevistador,
                    lugar: e.target.value,
                  })
                }
                disabled={stateDisabled}
              >
                <option value="sin_definir">Seleccione una opción</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>
          </div>
        </div>
      </form>
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
          onClick={handleUpdateEntrevistador}
        >
          Enviar
        </button>
      )}
    </div>
  );
};

export default DatosEntrevistador;
