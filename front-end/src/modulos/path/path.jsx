/**
 * @file path.jsx
 * @version 1.0.0
 * @description controlador para las rutas estaticas.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 29 de abril de 2024
 */

import { desencriptar } from '../utilidades_seguridad/utilidades_seguridad';
import React from "react";
import Inicio from "../pagina_inicio/pagina_inicio.jsx";
import Carga_masiva from "../carga_masiva/carga_masiva.jsx";
import Descarga_fichas from "../descarga_fichas/descarga_fichas.jsx";
import Pagina_no_encontrada from "../../components/componentes_generales/pagina_no_encontrada.jsx";
import Asignaciones from "../asignaciones/asignaciones.jsx";
import Inicio_semestre_sistemas from "../inicio_semestre_sistemas/inicio_semestre_sistemas_instancia.jsx";
import Semestre_sistemas from "../inicio_semestre_sistemas/inicio_semestre_sistemas.jsx";
import Reporte from "../reportes/reporte.jsx";
import Alertas from '../alertas/alertas.jsx';
import Gestion_usuario_rol from "../gestion_usuario_rol/gestion_usuario_rol.jsx";
import Ficha_estudiante from "../ficha_estudiante/ficha_estudiante.jsx";
import Ficha_monitor from "../ficha_monitor/ficha_monitor.jsx";
import Reporte_seguimientos from "../reporte_seguimientos/reporte_seguimientos.jsx";
import Sin_seguimientos from "../sin_seguimientos/sin_seguimiento.jsx";
import Desercion from "../desercion/desercion.jsx";
import Academico_pestaña from "../academico_pestaña/academico_pestaña.jsx";
import Calificador from "../academico_pestaña/calificador.jsx";
import FichaEstudianteDiscapacidad from "../discapacidad/ficha_estudiante/FichaEstudianteDiscapacidad.jsx";
import ReporteDiscapacidad from "../discapacidad/reporte/ReporteDiscapacidad.jsx";
import Registro from "../discapacidad/registro/Registro.jsx";
import FichaEstudianteV2 from "../ficha_estudiante_V2/FichaEstudianteV2.jsx";

import Academico_reportes from "../../modulos/academico_reportes/academico_reportes.jsx";
import AcademicoAsistencia from '../academico_asistencia/AcademicoAsistencia.jsx';
import AcademicoListadoAsistencia from '../academico_asistencia/AcademicoListadoAsistencia.jsx';

/**
 * Controla las rutas del path
*/
const Path = (props) => {
  var path = desencriptar(sessionStorage.getItem('path'));

  return (
    <>
    {path !== undefined ? (
        <>
          {path === "/" || path === "" ? (<Inicio path_actual={"/"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/carga_masiva') ? (<Carga_masiva path_actual={"/carga_masiva"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/descarga_fichas') ? (<Descarga_fichas path_actual={"/descarga_fichas"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/alertas') ? (<Alertas path_actual={"/alertas"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path === '/reporte' ? (<Reporte path_actual={"/reporte"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/crear_semestre_sistemas') ? (<Semestre_sistemas path_actual={"/crear_semestre_sistemas"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/inicio_semestre_sistemas') ? (<Inicio_semestre_sistemas path_actual={"/inicio_semestre_sistemas"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/asignaciones') ? (<Asignaciones path_actual={"/asignaciones"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/gestion_usuario_rol') ? (<Gestion_usuario_rol path_actual={"/gestion_usuario_rol"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)} {/** usuario={nombreUsuario}/> */}
          {path == '/academico' ? (<Academico_pestaña path_actual={"desercion"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path === '/academico_reportes' ? (<Academico_reportes path_actual={"desercion"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/academico_asistencia') ? ( <AcademicoAsistencia path_actual={"academico_asistencia"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/academico_listado_asistencia') ? ( <AcademicoListadoAsistencia path_actual={"academico_listado_asistencia"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/calificador:profesor/:curso/:cod/:franja') ? (<Calificador path_actual={"desercion"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
                        
          {/* {path.startsWith('/academico') ? (<Academico_pestaña path_actual={"/academico"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)} */}
          
          {path.startsWith('/desercion') ? (<Desercion path_actual={"/desercion"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/sin_seguimientos') ? (<Sin_seguimientos path_actual={"/sin_seguimientos"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/reporte_seguimientos') ? (<Reporte_seguimientos path_actual={"/reporte_seguimientos"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/ficha_monitor') ? (<Ficha_monitor path_actual={"/ficha_monitor"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith('/ficha_estudiante') ? 
            (path.startsWith("/ficha_estudiante_discapacidad") ? (<FichaEstudianteDiscapacidad path_actual={"/ficha_estudiante_discapacidad"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):
                                                                 (<Ficha_estudiante path_actual={"/ficha_estudiante/sin_seleccion"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>)):(<></>)}
          {path.startsWith("/calificador") ? (<Calificador path_actual={"/calificador"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith("/reporte_discapacidad") ? (<ReporteDiscapacidad path_actual={"/reporte_discapacidad"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith("/registro_discapacidad") ? (<Registro path_actual={"/registro_discapacidad"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
          {path.startsWith("/ficha_est_v2") ? (<FichaEstudianteV2 path_actual={"/ficha_est_v2"} usuario={props.usuario} rolUsuario={props.rolUsuario} area={props.area} periodo={props.periodo}/>):(<></>)}
        </>
      ) : (
        <Pagina_no_encontrada/>
      )}
    </>
  );
};

export default Path;