import axios from 'axios';

const inicio_semestre = (instancia, nombre_nuevo, fecha_inicio_nuevo, fecha_fin_nuevo) => {

  //URL para el axios
  const url_semestre = 'http://127.0.0.1:8000/wizard/semestre_actual/' + instancia.toString()+"/";

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
  var inicio = new Date(fecha_inicio_nuevo);
  var fin = new Date(fecha_fin_nuevo);

  //conexion con el back para actualizar y crear el semestre en una instancia seleccionada
  axios({
    url: url_semestre,
    method: "GET",
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
    axios.put(url_semestre, semestreActual);
    axios.post(url_semestre, semestreNuevo);
  })
  .catch((err)=>{console.log(err)})
}

export default {
  inicio_semestre
}