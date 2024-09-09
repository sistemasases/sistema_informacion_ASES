import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { useAuthStore } from "../../store/auth";
import { useState } from "react";
import UpdateDatosEntrevistador from "../../../../service/update_datos_entrevistador_disc.js";
import { desencriptar, desencriptarInt } from "../../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const DatosEntrevistador = ({ datos_entrevistador }) => {
  // console.log(datos_entrevistador);
  const [stateDisabled, setStateDisabled] = useState(true);
  const { estudianteSelected } = useAuthStore();

  const [stateEntrevistador, setStateEntrevistador] = useState({
    entrevistador: datos_entrevistador.entrevistador,
    celular: datos_entrevistador.celular,
    cargo: datos_entrevistador.cargo,
    profesion: datos_entrevistador.profesion,
    fecha_aplicacion: datos_entrevistador.fecha_aplicacion,
    lugar: datos_entrevistador.lugar,
    tipo: "datos_entrevistador",
    // id_semestre: desencriptar(sessionStorage.getItem("id_")),
    id_semestre: 40,
    id_estudiante: estudianteSelected.id,
    fecha: datos_entrevistador.fecha_aplicacion,
    id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),

  });

  const handleUpdateEntrevistador = (e) => {
    e.preventDefault();
    setStateDisabled(true);
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
                stateDisabled ? (
                  <></>
                ) : (
                  setStateEntrevistador({
                    ...stateEntrevistador,
                    entrevistador: e.target.value,
                  })
                )
              }
              disabled={stateDisabled}
            />
            <label>Celular</label>
            <input
              type="tel"
              className="input-type-text-tel"
              value={stateEntrevistador.celular}
              onChange={(e) =>
                stateDisabled ? (
                  <></>
                ) : (
                  setStateEntrevistador({
                    ...stateEntrevistador,
                    celular: e.target.value,
                  })
                )
              }
              disabled={stateDisabled}
            />
          </div>
          <div className="inline-input-group">
            <label>Cargo</label>
            <select
              className="select-type"
              onChange={(e) =>
                stateDisabled ? (
                  <></>
                ) : (
                  setStateEntrevistador({
                    ...stateEntrevistador,
                    cargo: e.target.value,
                  })
                )
              }
              disabled={stateDisabled}
            >
              {stateEntrevistador.cargo ? (
                <option value={stateEntrevistador.cargo} selected>
                  {" "}
                  {stateEntrevistador.cargo}
                </option>
              ) : (
                <option value="">Seleccione una opción</option>
              )}
              <option value="Opcion 1">Opcion 1</option>
              <option value="Opcion 2">Opcion 2</option>
              <option value="Opcion 3">Opcion 3</option>
              <option value="Ninguna">No definido</option>
            </select>
            <label>Profesión</label>
            {/* Select profesion */}
            <select
              className="select-type"
              onChange={(e) =>
                stateDisabled ? (
                  <></>
                ) : (
                  setStateEntrevistador({
                    ...stateEntrevistador,
                    profesion: e.target.value,
                  })
                )
              }
              disabled={stateDisabled}
            >
              {stateEntrevistador.profesion ? (
                <option value={stateEntrevistador.profesion} selected>
                  {" "}
                  {stateEntrevistador.profesion}
                </option>
              ) : (
                <option value="">Seleccione una opción</option>
              )}
              {/* <option value="">Seleccione una opción</option> */}
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
                value={stateEntrevistador.fecha_aplicacion}
                onChange={(e) =>
                  stateDisabled ? (
                    <></>
                  ) : (
                    setStateEntrevistador({
                      ...stateEntrevistador,
                      fecha_aplicacion: e.target.value,
                    })
                  )
                }
                disabled={stateDisabled}
              />
              <label>Lugar o Medio de Aplicación</label>
              {/* Campo Lugar o Medio de Aplicación */}
              <select
                className="select-type"
                onChange={(e) =>
                  stateDisabled ? (
                    <></>
                  ) : (
                    setStateEntrevistador({
                      ...stateEntrevistador,
                      lugar: e.target.value,
                    })
                  )
                }
                disabled={stateDisabled}
              >
                {stateEntrevistador.lugar ? (
                  <option value={stateEntrevistador.lugar} selected>
                    {" "}
                    {stateEntrevistador.lugar}
                  </option>
                ) : (
                  <option value="">Seleccione una opción</option>
                )}
                {/* <option value="">Seleccione una opción</option> */}
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
