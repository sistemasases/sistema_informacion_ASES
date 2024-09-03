import "../../../../Scss/ficha_estudiante_discapacidad/formulario.css";
import "../../../../Scss/ficha_estudiante_discapacidad/caracterizacion.css";
import { useAuthStore } from "../../store/auth";

const DatosEntrevistador = ({ datos_entrevistador }) => {
  // console.log(datos_entrevistador);
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
              value={datos_entrevistador.entrevistador}
            />
            <label>Celular</label>
            <input
              type="tel"
              className="input-type-text-tel"
              value={datos_entrevistador.celular}
            />
          </div>
          <div className="inline-input-group">
            <label>Cargo</label>
            <select className="select-type">
              {datos_entrevistador.cargo ? (
                <option value={datos_entrevistador.cargo} selected>
                  {" "}
                  {datos_entrevistador.cargo}
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
            <select className="select-type">
              {datos_entrevistador.profesion ? (
                <option value={datos_entrevistador.profesion} selected>
                  {" "}
                  {datos_entrevistador.profesion}
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
                value={datos_entrevistador.fecha_aplicacion}
              />
              <label>Lugar o Medio de Aplicación</label>
              <select className="select-type">
                {datos_entrevistador.lugar ? (
                  <option value={datos_entrevistador.lugar} selected>
                    {" "}
                    {datos_entrevistador.lugar}
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
        <button className="full-size-button color_red">Editar</button>
      </form>
    </div>
  );
};

export default DatosEntrevistador;
