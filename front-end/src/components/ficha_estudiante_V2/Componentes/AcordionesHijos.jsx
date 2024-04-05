/**
 * @file AcordionesHijos.jsx
 * @version 1.0.0
 * @description Este componente se encarga de renderizar un conjunto de acordeones 
 *              hijos, utilizando el componente Acordion para cada uno de ellos. 
 *              Recibe como props un arreglo de acordeones y clases para estilizar 
 *              el acordeón y su contenido.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import Acordion from "./Acordion";

// Componente de AcordionesHijos
// Recibe como props:
// acordiones: arreglo de acordeones
// claseAcor: clase del acordeón
// claseCon: clase del contenido del acordeón
const AcordionesHijos = ({ acordiones, claseAcor, claseCon }) => {
  return (
    <div className="container-acordion container-subacordion">
      {acordiones.map((acordion, index) => (
        <Acordion
          key={index}
          title={acordion.title}
          claseAcordion={claseAcor}
          flechaUp={
            <img
              className="flechas"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
              alt="Flecha Up"
            />
          }
          flechaDown={
            <img
              className="flechas"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
              alt="Flecha Down"
            />
          }
        >
          <p className={claseCon}>{acordion.content}</p>
        </Acordion>
      ))}
    </div>
  );
};

export default AcordionesHijos;
