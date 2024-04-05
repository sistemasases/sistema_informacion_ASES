import { useAuthStore } from "../../store/auth";
import Acordion from "../Acordion";
import "../../../../Scss/ficha_estudiante_V2/seguimiento.css";
import withSwal from "../withSwal";
import { useEffect, useState } from "react";
import fetchAcademico from "../../api/fetch_acadecmico";

// Componente de Seguimiento
// Este componente se encarga de mostrar los seguimientos que tiene un estudiante
// y de mostrar un formulario con la información de cada seguimiento almacenado.
const Academico = () => {
  const { user, shosenStudent } = useAuthStore();
  const [periodos, setPeriodos] = useState([]);

  useEffect(() => {
    // Method setEstudiantes is used to set the students data in the store
    const getSeguimientos = async () => {
      const res = await fetchAcademico(shosenStudent.id, user.sede_id);
      if (res) {
        setPeriodos(res);
      }
      console.log(res);
    };
    getSeguimientos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shosenStudent.id, user.sede_id]);

  return (
    <>
      <p className="title">Seguimiento de pares</p>
      {periodos && periodos.length > 0 ? (
        periodos.map((periodo, index) => (
          <Acordion
            key={index}
            title={periodo[0].nombre}
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
            {periodos.slice(1).map((seg, index) => (
              <div key={index} className="seguimiento">
                <p>Seguimiento individual: {seg.fecha}</p>
              </div>
            ))}
          </Acordion>
        ))
      ) : (
        <p className="mx-5">No hay seguimientos</p>
      )}
    </>
  );
};

export default withSwal(Academico); // This is the original line when everything is done
