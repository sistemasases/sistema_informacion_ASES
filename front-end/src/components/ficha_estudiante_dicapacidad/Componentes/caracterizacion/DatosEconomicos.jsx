const DatosEconomicos = () => {
  return <div>
    <form>
      <p>Informacion del estudiante</p>
      <div>
        <label>Estrato socio-económico</label>
        <input type="number" />
      </div>
      <div>
        <label>Recibe alguna prestacion económica</label>
        <input type="checkbox" />
      </div>
      <div>
        <label>Recibe alguna beca</label>
        <input type="checkbox" />
      </div>
      <div>
        <label>Recibe ayuda para el transporte</label>
        <input type="checkbox" />
      </div>
      <div>
        <label>Recibe ayuda para financiar materiales</label>
        <input type="checkbox" />
      </div>
      <div>
        <label>Solvencia económica</label>
        <input type="checkbox" />
      </div>
      <div>
        <label>Expectativas laborales</label>
        <input type="textarea" />
      </div>
    
    <p>Informacion del padre (si aplica)</p>
    
    <div>
      <label>Nivel educativo (Máximo alcanzado)</label>
      <select>
        <option value="">Seleccione una opción</option>
        <option value="primaria completo">Primaria completo</option>
        <option value="primaria incompleto">Primaria incompleto</option>
        <option value="secundaria completo">Secundaria completo</option>
        <option value="secundaria incompleto">Secundaria incompleto</option>
        <option value="técnico completo">Técnico completo</option>
        <option value="técnico incompleto">Técnico incompleto</option>
        <option value="tecnólogo completo">Tecnólogo completo</option>
        <option value="tecnólogo incompleto">Tecnólogo incompleto</option>
        <option value="profesional pregrado completo">Profesional pregrado completo</option>
        <option value="profesional pregrado incompleto">Profesional pregrado incompleto</option>
        <option value="profesional posgrado completo">Profesional posgrado completo</option>
        <option value="profesional posgrado incompleto">Profesional posgrado incompleto</option>
      </select>
    </div>
      <div>
        <label>Ocupación</label>
          <select>
            <option value="">Seleccione una opción</option>
            <option value="FUERZAS MILITARES">FUERZAS MILITARES (E...)</option>
            <option value="POLICIA">POLICÍA ...</option>
            <option value="MIEMBROS DEL PODER">MIEMBROS DEL PODER E...</option>
            <option value="FUERZAS MILITARES">DIRECTORES Y GERENTE...</option>
            <option value="DIRECTORES DE DEPART">DIRECTORES DE DEPART...</option>
            <option value="COORDINADORES Y SUPE">COORDINADORES Y SUPE...</option>
            <option value="PROFESIONALES DE LAS">PROFESIONALES DE LAS...</option>
            <option value="PROFESIONALES DE LAS">PROFESIONALES DE LAS...</option>
            <option value="PROFESIONALES DE LA">PROFESIONALES DE LA ...</option>
            <option value="OTROS PROFESIONALES">OTROS PROFESIONALES ...</option>
            <option value="TÉCNICO Y POSTSECU">TÉCNICO Y POSTSECU...</option>
            <option value="TÉCNICO Y POSTSECU">TÉCNICO Y POSTSECU...</option>
            <option value="ASISTENTES DE ENSEÑ">ASISTENTES DE ENSEÑ...</option>
            <option value="MIEMBROS DEL PODER">OTROS TÉCNICOS, POS...</option>
            <option value="OFICINIST">OFICINIST ...</option>
            <option value="EMPLEADOS DE TRATO D">EMPLEADOS DE TRATO D ...</option>
            <option value="TRABAJADORES DE LOS">TRABAJADORES DE LOS...</option>
            <option value="PROFESIONAL DE LOS SERV">PROFESIONAL DE LOS SERV ...</option>
            <option value="MODELOS, VENDEDORES">MODELOS, VENDEDORES ...</option>
            <option value="NINGUNA DE LAS ANTERIORES">NINGUNA DE LAS ANTERIORES</option>
          </select>
      </div>
      <div>
        <label>Situación laboral</label>
        <select>
          <option value="">Seleccione una opción</option>
          <option value="Opcion 1">Opcion 1</option>
          <option value="Opcion 2">Opcion 2</option>
          <option value="Opcion 3">Opcion 3</option>
          <option value="Ninguna">No definido</option>
        </select>
      </div>

      <p>Informacion del padre (si aplica)</p>
    
    <div>
      <label>Nivel educativo (Máximo alcanzado)</label>
      <select>
        <option value="">Seleccione una opción</option>
        <option value="primaria completo">Primaria completo</option>
        <option value="primaria incompleto">Primaria incompleto</option>
        <option value="secundaria completo">Secundaria completo</option>
        <option value="secundaria incompleto">Secundaria incompleto</option>
        <option value="técnico completo">Técnico completo</option>
        <option value="técnico incompleto">Técnico incompleto</option>
        <option value="tecnólogo completo">Tecnólogo completo</option>
        <option value="tecnólogo incompleto">Tecnólogo incompleto</option>
        <option value="profesional pregrado completo">Profesional pregrado completo</option>
        <option value="profesional pregrado incompleto">Profesional pregrado incompleto</option>
        <option value="profesional posgrado completo">Profesional posgrado completo</option>
        <option value="profesional posgrado incompleto">Profesional posgrado incompleto</option>
      </select>
    </div>
      <div>
        <label>Ocupación</label>
        <select>
          <option value="">Seleccione una opción</option>
          <option value="FUERZAS MILITARES">FUERZAS MILITARES (E...)</option>
          <option value="POLICIA">POLICÍA ...</option>
          <option value="MIEMBROS DEL PODER">MIEMBROS DEL PODER E...</option>
          <option value="FUERZAS MILITARES">DIRECTORES Y GERENTE...</option>
          <option value="DIRECTORES DE DEPART">DIRECTORES DE DEPART...</option>
          <option value="COORDINADORES Y SUPE">COORDINADORES Y SUPE...</option>
          <option value="PROFESIONALES DE LAS">PROFESIONALES DE LAS...</option>
          <option value="PROFESIONALES DE LAS">PROFESIONALES DE LAS...</option>
          <option value="PROFESIONALES DE LA">PROFESIONALES DE LA ...</option>
          <option value="OTROS PROFESIONALES">OTROS PROFESIONALES ...</option>
          <option value="TÉCNICO Y POSTSECU">TÉCNICO Y POSTSECU...</option>
          <option value="TÉCNICO Y POSTSECU">TÉCNICO Y POSTSECU...</option>
          <option value="ASISTENTES DE ENSEÑ">ASISTENTES DE ENSEÑ...</option>
          <option value="MIEMBROS DEL PODER">OTROS TÉCNICOS, POS...</option>
          <option value="OFICINIST">OFICINIST ...</option>
          <option value="EMPLEADOS DE TRATO D">EMPLEADOS DE TRATO D ...</option>
          <option value="TRABAJADORES DE LOS">TRABAJADORES DE LOS...</option>
          <option value="PROFESIONAL DE LOS SERV">PROFESIONAL DE LOS SERV ...</option>
          <option value="MODELOS, VENDEDORES">MODELOS, VENDEDORES ...</option>
          <option value="NINGUNA DE LAS ANTERIORES">NINGUNA DE LAS ANTERIORES</option>
        </select>
      </div>
      <div>
        <label>Situación laboral</label>
        <select>
          <option value="">Seleccione una opción</option>
          <option value="Opcion 1">Opcion 1</option>
          <option value="Opcion 2">Opcion 2</option>
          <option value="Opcion 3">Opcion 3</option>
          <option value="Ninguna">No definido</option>
        </select>
      </div>
      <button>Editar</button>
    </form>
  </div>
};

export default DatosEconomicos;
