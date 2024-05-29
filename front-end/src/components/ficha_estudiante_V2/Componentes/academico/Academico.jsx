/**
 * @file Academico.jsx
 * @version 1.0.0
 * @description Este componente se encarga de mostrar los periodos academicos de un estudiante.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { useAuthStore } from "../../store/auth";
import Acordion from "../Acordion";
import "../../../../Scss/ficha_estudiante_discapacidad/seguimiento.css";
import withSwal from "../withSwal";
import { useEffect, useState } from "react";
import fetchAcademico from "../../api/fetch_acadecmico";

// Componente de Academico - EN CONSTRUCCION.
const Academico = () => {
  const { user, shosenStudent } = useAuthStore();
  const [semestre, setSemestre] = useState([]);

  useEffect(() => {
    // Method setEstudiantes is used to set the students data in the store
    const getSeguimientos = async () => {
      const res = await fetchAcademico(shosenStudent.id, user.sede_id);
      if (res) {
        setSemestre(res);
      }
      console.log(res);
    };
    getSeguimientos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shosenStudent.id, user.sede_id]);

  return (
    <>
      <p className="title">Seguimiento de pares</p>
      {semestre && semestre.length > 0 ? (
        semestre.map((periodo, index) => (
          <Acordion
            key={index}
            title={"Semestre: " + periodo[0].nombre}
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
            {/* <div key={index} className="seguimiento">
              <p>{semestre[1]}</p>
            </div> */}
          </Acordion>
        ))
      ) : (
        <p className="mx-5">No hay seguimientos</p>
      )}
    </>
  );
};

export default withSwal(Academico); // This is the original line when everything is done
