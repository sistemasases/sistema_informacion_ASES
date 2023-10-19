import axios from 'axios';

const close_session = async () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refresh-token');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('first_name');
  sessionStorage.removeItem('instancia');
  sessionStorage.removeItem('last_name');
  sessionStorage.removeItem('nombre_completo');
  sessionStorage.removeItem('instancia_id');
  sessionStorage.removeItem('rol');
  sessionStorage.removeItem('semestre_actual');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('message');
  sessionStorage.removeItem('sede_id');
  sessionStorage.removeItem('sede');
  sessionStorage.removeItem('lastVisitedRoutes');
  sessionStorage.removeItem('id_estudiante_seleccionado');
  window.location.reload();
}

export default {
  close_session
}