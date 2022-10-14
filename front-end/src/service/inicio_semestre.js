import axios from 'axios';

const inicio_semestre = async (instancia) => {

  const url_semestre = 'http://127.0.0.1:8000/wizard/semestre_actual/' + instancia.toString()+"/";

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

  var nombre_nuevo = 'Error';

  var yesterday = new Date();
  var today = new Date();
  var finish = new Date();

  yesterday.setDate(yesterday.getDate() - 1)
  finish.setMonth(finish.getMonth() + 6)

  yesterday.setHours(yesterday.getHours() - 5)
  today.setHours(today.getHours() - 5)
  finish.setHours(finish.getHours() - 5)

  var fechaAnterior = yesterday.toISOString();
  var fechaNueva_inico = today.toISOString();
  var fechaNueva_fin = finish.toISOString();

  axios({
    url: url_semestre,
    method: "GET",
  })
  .then((respuesta)=>{

    semestreActual = {
      nombre: respuesta.data['nombre'],
      fecha_inicio: respuesta.data['fecha_inicio'],
      fecha_fin: fechaAnterior,
      semestre_actual: false,
      id_instancia: instancia
    }

    const nombre_semestre = respuesta.data['nombre'].split('-');
    
    if(nombre_semestre[1]==='A'){
      nombre_nuevo = nombre_semestre[0] + '-B'
    } else {
      nombre_nuevo = (parseInt(nombre_semestre[0])+1).toString() + '-A';
    }

    semestreNuevo = {
      nombre: nombre_nuevo,
      fecha_inicio: fechaNueva_inico,
      fecha_fin: fechaNueva_fin,
      semestre_actual: true,
      id_instancia: instancia
    }
    axios.put(url_semestre, semestreActual);
    axios.post(url_semestre, semestreNuevo);
  })
  .catch((err)=>{console.log(err)})
}

const nombre_semeste_nuevo = (instancia) => {

  const url_semestre = 'http://127.0.0.1:8000/wizard/semestre_actual/' + instancia.toString()+"/";

  var nombre_nuevo = 'Error';

  axios({
    url: url_semestre,
    method: "GET",
  })
  .then((respuesta)=>{

    const nombre_semestre = respuesta.data['nombre'].split('-');
    
    if(!(isNaN(nombre_semestre[0]))){
      if(nombre_semestre[1]==='A'){
        nombre_nuevo = nombre_semestre[0] + '-B'
      } else {
        nombre_nuevo = (parseInt(nombre_semestre[0])+1).toString() + '-A';
      }
    }
  })
  .catch((err)=>{console.log(err)})

  return nombre_nuevo;
}

export default {
  inicio_semestre
}