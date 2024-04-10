/**
  * @file inicio_semestre.js
  * @version 1.0.0
  * @description service que inicio un nuevo semestre en el sistema en la misma sede actual y cierra el semestre anterior.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const inicio_semestre = (instancia, nombre_nuevo, fecha_inicio_nuevo, fecha_fin_nuevo) => {
  //URL para el axios
  const url_post = `${process.env.REACT_APP_API_URL}/wizard/semestre/`;
  const url_semestre = `${process.env.REACT_APP_API_URL}/wizard/semestre/` + instancia.toString()+"/";
  // header para la autorizacion con token
  const config = {
    Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
  };
  const config2 = {
    headers: {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
    }
  };
  //variables para la creacion y finalizacion del semestre
  var semestreActual = {
    nombre: '',
    fecha_inicio: null,
    fecha_fin: null,
    semestre_actual: false,
    id_instancia: 0
  }
  var semestreNuevo = {
    nombre: '',
    fecha_inicio: null,
    fecha_fin: null,
    semestre_actual: false,
    id_instancia: 0
  }
  //Varaiables para la fecha
  var inicio = new Date();
  var fin = new Date();
  const fechaI = fecha_inicio_nuevo.split('-');
  inicio.setFullYear(fechaI[0]);
  inicio.setMonth(fechaI[1] - 1);
  inicio.setDate(fechaI[2]);
  inicio.setHours(inicio.getHours() - 5);
  const fechaF = fecha_fin_nuevo.split('-');
  fin.setFullYear(fechaF[0]);
  fin.setMonth(fechaF[1] - 1);
  fin.setDate(fechaF[2]);
  fin.setHours(fin.getHours() - 5);
  //conexion con el back para actualizar y crear el semestre en una instancia seleccionada
  axios({
    url: url_semestre,
    method: "GET",
    headers: config,
  })
  .then((respuesta)=>{
    semestreActual = {
      nombre: respuesta.data['nombre'],
      fecha_inicio: respuesta.data['fecha_inicio'],
      fecha_fin: respuesta.data['fecha_fin'],
      semestre_actual: false,
      id_instancia: instancia
    }
    semestreNuevo = {
      nombre: nombre_nuevo,
      fecha_inicio: inicio.toISOString(),
      fecha_fin: fin.toISOString(),
      semestre_actual: true,
      id_instancia: instancia
    }
    axios.put(url_semestre, semestreActual, config2);
    axios.post(url_post, semestreNuevo, config2);
  })
  .catch((err)=>{console.log(err)})
}

export default {
  inicio_semestre
}