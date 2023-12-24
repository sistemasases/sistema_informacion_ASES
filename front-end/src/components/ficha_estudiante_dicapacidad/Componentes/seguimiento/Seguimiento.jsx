import { useAuthStore } from "../../store/auth";
import Acordion from "../Acordion";
import "../../../../Scss/ficha_estudiante_discapacidad/seguimiento.css";

// Componente de Seguimiento
// Este componente se encarga de mostrar los seguimientos que tiene un estudiante
// y de mostrar un formulario con la información de cada seguimiento almacenado.
const Seguimiento = () => {
  // const { estudianteSelected } = useAuthStore()

  //Solo para pruebas
  const estudianteSelected = {
    semestre_actual: "2023-B",
    seguimientos: [
      { fecha: "2021-1" },
      { fecha: "2021-2" },
      { fecha: "2022-1" },
      { fecha: "2022-2" },
      { fecha: "2023-1" },
      { fecha: "2023-2" },
    ],
  };
  return (
    <>
      <p className="title">Seguimiento de pares</p>

      <Acordion
        title={estudianteSelected.semestre_actual}
        claseAcordion={"acordion subacordion"}
        claseContenido={"accordion-content"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
            alt="flechaUp"
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
            alt="flechaDown"
          />
        }
      >
        {estudianteSelected.seguimientos.map((seguimiento, index) => (
          <div key={index} className="seguimiento">
            <p>Seguimiento individual: {seguimiento.fecha}</p>
          </div>
        ))}
      </Acordion>
    </>
  );
};

export default Seguimiento;
// export default withSwal(Seguimiento) // This is the original line when everything is done
