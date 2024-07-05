import React from 'react';
import { Container, Row, Col, Button, Modal,  } from 'react-bootstrap';
import Select from 'react-select';
export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()


const InformacionGeneral = ({state,
    handleChange,
    handleSelectChange,
    factoresRiesgo,
    handleArrayFieldChange,
    handleAgregarItem,
    handleEliminarItem,
    handleArrayChange,
    handleAddItem,
    handleDeleteItem,

}) => {
  return (
    <>
    <h1> Información General </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>

        <div>
                <label className='custom-div'>Dedicacion externa</label>
                <div>
                <input
                  type="text"
                  name="dedicacion_externa"
                  placeholder='Ingrese la dedicacion externa'
                  value={state.dedicacion_externa}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>Tiene eps?</label>
                <div>
                <input
                  type="text"
                  name="tiene_eps"
                  placeholder='Ingrese la EPS'
                  value={state.tiene_eps}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>regimen de la EPS</label>
                <div>
                <input
                  type="text"
                  name="regimen_eps"
                  placeholder='Ingrese el regimen'
                  value={state.regimen_eps}
                  onChange={handleChange}
                />
                </div>
        </div>



        <div>
                <label className='custom-div'>tipo de entidad que brinda acompañamiento recibido</label>
                <div>
                <input
                  type="text"
                  name="tipo_entidad_acompanamiento_recibido"
                  placeholder='Ingrese la entidad'
                  value={state.tipo_entidad_acompanamiento_recibido}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>Calificacion de acompañamiento recibido</label>
                <div>
                <input
                  type="number"
                  name="calificacion_acompanamiento_recibido"
                  placeholder='Ingrese calificacion'
                  pattern='[0-9]*'
                  onKeyDown={preventNegativeValues}
                  min="0"
                  value={state.calificacion_acompanamiento_recibido}
                  onChange={handleChange}
                />
                </div>
        </div>
        
        <div>
                <label className='custom-div'>Motivo de calificacion de acompañamiento recibido</label>
                <div>
                <input
                  type="text"
                  name="motivo_calificacion_acompanamiento"
                  placeholder='Ingrese el motivo'
                  value={state.motivo_calificacion_acompanamiento}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>Actividad específica en tiempo libre</label>
                <div>
                <input
                  type="text"
                  name="actividades_especificas_tiempo_libre"
                  placeholder='Ingrese la actividad'
                  value={state.actividades_especificas_tiempo_libre}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>Calificacion de relación familiar</label>
                <div>
                <input
                  type="number"
                  name="calificacion_relacion_familiar"
                  placeholder='Ingrese calificacion'
                  pattern='[0-9]*'
                  onKeyDown={preventNegativeValues}
                  min="0"
                  value={state.calificacion_relacion_familiar}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>Observación general de fuente de ingresos</label>
                <div>
                <input
                  type="text"
                  name="observacion_general_fuente_de_ingresos"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_fuente_de_ingresos}
                  onChange={handleChange}
                />
                </div>
        </div>  

        <div>
            <label className='custom-div'>Encuentro Dias/horas</label>
            {state.encuentro_dias_horas.map((encuentro, index) => (
                
              <div key={index}>
                <input
                  type="text"
                  name="dia"
                  placeholder="Nombre del día"
                  value={encuentro.dia}
                  onChange={(e) => handleArrayFieldChange('encuentro_dias_horas', index, 'dia', e.target.value)}
                />
                <input 
                  type="time"
                  name="hora"
                  placeholder="ingrese hora"
                  value={encuentro.hora}
                  onChange={(e) => handleArrayFieldChange('encuentro_dias_horas', index, 'hora', e.target.value)}
                />
                <Button className='boton-container' onClick={() => handleEliminarItem('encuentro_dias_horas', index)}>Eliminar</Button>
              </div>             
            ))}
            <div>
            <Button className='boton-container' onClick={() => handleAgregarItem('encuentro_dias_horas', { dia: '', hora: '' })}>
              Agregar Encuentro
            </Button></div>
          </div>


          <div>
            <label className='custom-div'>redes de apoyo</label>
            {state.redes_de_apoyo.map((red, index) => (
                
              <div key={index}>
                <input
                  type="text"
                  name="nombre_red_apoyo"
                  placeholder="Nombre de la red de apoyo"
                  value={red.nombre_red_apoyo}
                  onChange={(e) => handleArrayFieldChange('redes_de_apoyo', index, 'nombre_red_apoyo', e.target.value)}
                />
                <input 
                  type="text"
                  name="observacion_red_apoyo"
                  placeholder="ingrese obersvacion"
                  value={red.observacion_red_apoyo}
                  onChange={(e) => handleArrayFieldChange('redes_de_apoyo', index, 'observacion_red_apoyo', e.target.value)}
                />
                <Button className='boton-container' onClick={() => handleEliminarItem('redes_de_apoyo', index)}>Eliminar</Button>
              </div>             
            ))}
            <div>
            <Button className='boton-container' onClick={() => handleAgregarItem('redes_de_apoyo', { nombre_red_apoyo: '', observacion_red_apoyo: '' })}>
              Agregar Red de apoyo
            </Button></div>
          </div>


          <div>
      <label className="custom-div">Ocupaciones Actuales</label>
      {state.ocupaciones_actuales.map((ocupacion, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder='ingrese ocupación'
            value={ocupacion}
            onChange={(e) => handleArrayChange('ocupaciones_actuales', index, e.target.value)}
          />
          <Button className='boton-container' onClick={() => handleDeleteItem('ocupaciones_actuales', index)}>Eliminar</Button>
        </div>
      ))}
      <Button className='boton-container' onClick={() => handleAddItem('ocupaciones_actuales')}>Agregar Ocupación</Button>
    </div>

    <div>
      <label className="custom-div">Profesionales que brindarion atención</label>
      {state.profesionales_que_brindo_atencion.map((profesional, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder='Ingrese profesional'
            value={profesional}
            onChange={(e) => handleArrayChange('profesionales_que_brindo_atencion', index, e.target.value)}
          />
          <Button className='boton-container' onClick={() => handleDeleteItem('profesionales_que_brindo_atencion', index)}>Eliminar</Button>
        </div>
      ))}
      <Button className='boton-container' onClick={() => handleAddItem('profesionales_que_brindo_atencion')}>Agregar profesional</Button>
    </div>


    </Col>


    <Col>

        <div>
                <label className='custom-div'>Observación general de redes de apoyo</label>
                <div>
                <input
                  type="text"
                  name="observacion_general_redes_de_apoyo"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_redes_de_apoyo}
                  onChange={handleChange}
                />
                </div>
        </div>  

        <div>
                <label className='custom-div'>Observación general factores de riesgo</label>
                <div>
                <input
                  type="text"
                  name="observacion_general_factores_de_riesgo"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_factores_de_riesgo}
                  onChange={handleChange}
                />
                </div>
        </div>  

        <div>
                <label className='custom-div'>Creeencia religiosa</label>
                <div>
                <input
                  type="text"
                  name="creencia_religiosa"
                  placeholder='Ingrese la creencia'
                  value={state.creencia_religiosa}
                  onChange={handleChange}
                />
                </div>
        </div> 

        <div>
                <label className='custom-div'>Decisión encuentro inicial con profesional</label>
                <div>
                <input
                  type="text"
                  name="decision_encuentro_inicial_con_profesional"
                  placeholder='Ingrese la decisión'
                  value={state.decision_encuentro_inicial_con_profesional}
                  onChange={handleChange}
                />
                </div>
        </div> 

        <div>
                <label className='custom-div'>Observación horario</label>
                <div>
                <input
                  type="text"
                  name="observacion_horario"
                  placeholder='Ingrese la observación'
                  value={state.observacion_horario}
                  onChange={handleChange}
                />
                </div>
        </div> 


        <div>
                <label className='custom-div'>Origen de descubrimiento de campus diverso</label>
                <div>
                <input
                  type="text"
                  name="origen_descubrimiento_campus_diverso"
                  placeholder='Ingrese el origen'
                  value={state.origen_descubrimiento_campus_diverso}
                  onChange={handleChange}
                />
                </div>
        </div> 

        <div>
                <label className='custom-div'>Comentarios o sugerencias de usuario</label>
                <div>
                <input
                  type="text"
                  name="comentarios_o_sugerencias_de_usuario"
                  placeholder='Ingrese el comentario o sugerencia'
                  value={state.comentarios_o_sugerencias_de_usuario}
                  onChange={handleChange}
                />
                </div>
        </div> 


        <div>
                <label className='custom-div'>Observación convivencia de vivienda</label>
                <div>
                <input
        
                  type="text"
                  name="observacion_general_relacion_convivencia_vivienda"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_relacion_convivencia_vivienda}
                  onChange={handleChange}
                />
                </div>
        </div> 

        <div>
                <label className='custom-div'>Observación actividades especificas en tiempo libre</label>
                <div>
                <input
                  type="text"
                  name="observacion_general_actividades_especificas_tiempo_libre"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_actividades_especificas_tiempo_libre}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
            <label className='custom-div'>Factores de Riesgo</label>
            {state.factores_de_riesgo.map((factor, index) => (
                
              <div key={index}>
                <input
                  type="text"
                  name="nombre_factor_riesgo"
                  placeholder="Nombre del factor de riesgo"
                  value={factor.nombre_factor_riesgo}
                  onChange={(e) => handleArrayFieldChange('factores_de_riesgo', index, 'nombre_factor_riesgo', e.target.value)}
                />
                <input 
                  type="text"
                  name="observacion_factor_riesgo"
                  placeholder="Observación del factor de riesgo"
                  value={factor.observacion_factor_riesgo}
                  onChange={(e) => handleArrayFieldChange('factores_de_riesgo', index, 'observacion_factor_riesgo', e.target.value)}
                />
                <Button className='boton-container' onClick={() => handleEliminarItem('factores_de_riesgo', index)}>Eliminar</Button>
              </div>             
            ))}
            <div >
            <Button className='boton-container' onClick={() => handleAgregarItem('factores_de_riesgo', { nombre_factor_riesgo: '', observacion_factor_riesgo: '' })}>
              Agregar Factor de Riesgo
            </Button></div>
          </div>




        <div>
            <label className='custom-div'>Convivencias en vivienda</label>
            {state.convivencias_en_vivienda.map((convivencias, index) => (
                
              <div key={index}>
                <input
                  type="text"
                  name="nombre_convivencia_vivienda"
                  placeholder="Nombre de la convivencia"
                  value={convivencias.nombre_convivencia_vivienda}
                  onChange={(e) => handleArrayFieldChange('convivencias_en_vivienda', index, 'nombre_convivencia_vivienda', e.target.value)}
                />
                <input 
                  type="text"
                  name="observacion_convivencia_vivienda"
                  placeholder="ingrese observacion"
                  value={convivencias.observacion_convivencia_vivienda}
                  onChange={(e) => handleArrayFieldChange('convivencias_en_vivienda', index, 'observacion_convivencia_vivienda', e.target.value)}
                />
                <Button className='boton-container' onClick={() => handleEliminarItem('convivencias_en_vivienda', index)}>Eliminar</Button>
              </div>             
            ))}
            <div>
            <Button className='boton-container' onClick={() => handleAgregarItem('convivencias_en_vivienda', { nombre_convivencia_vivienda: '', observacion_convivencia_vivienda: '' })}>
              Agregar Convivencia
            </Button></div>
          </div>


          <div>
            <label className='custom-div'>Fuentes de ingresos</label>
            {state.fuentes_de_ingresos.map((fuentes, index) => (
                
              <div key={index}>
                <input
                  type="text"
                  name="nombre_fuente_ingresos"
                  placeholder="Nombre de la fuente de ingresos"
                  value={fuentes.nombre_fuente_ingresos}
                  onChange={(e) => handleArrayFieldChange('fuentes_de_ingresos', index, 'nombre_fuente_ingresos', e.target.value)}
                />
                <input 
                  type="text"
                  name="observacion_fuente_ingresos"
                  placeholder="ingrese observacion"
                  value={fuentes.observacion_fuente_ingresos}
                  onChange={(e) => handleArrayFieldChange('fuentes_de_ingresos', index, 'observacion_fuente_ingresos', e.target.value)}
                />
                <Button className='boton-container' onClick={() => handleEliminarItem('fuentes_de_ingresos', index)}>Eliminar</Button>
              </div>             
            ))}
            <div>
            <Button className='boton-container' onClick={() => handleAgregarItem('fuentes_de_ingresos', { nombre_fuente_ingresos: '', observacion_fuente_ingresos: '' })}>
              Agregar Fuente de Ingresos
            </Button></div>
          </div>


          <div>
            <label className='custom-div'>Actividades en tiempo libre</label>
            {state.actividades_tiempo_libre.map((actividad, index) => (
                
              <div key={index}>
                <input
                  type="text"
                  name="nombre_actividad_tiempo_libre"
                  placeholder="Nombre de la actividad"
                  value={actividad.nombre_actividad_tiempo_libre}
                  onChange={(e) => handleArrayFieldChange('actividades_tiempo_libre', index, 'nombre_actividad_tiempo_libre', e.target.value)}
                />
                <input 
                  type="text"
                  name="observacion_actividad_tiempo_libre"
                  placeholder="ingrese observacion"
                  value={actividad.observacion_actividad_tiempo_libre}
                  onChange={(e) => handleArrayFieldChange('actividades_tiempo_libre', index, 'observacion_actividad_tiempo_libre', e.target.value)}
                />
                <Button className='boton-container' onClick={() => handleEliminarItem('actividades_tiempo_libre', index)}>Eliminar</Button>
              </div>             
            ))}
            <div >
            <Button className='boton-container' onClick={() => handleAgregarItem('actividades_tiempo_libre', { nombre_actividad_tiempo_libre: '', observacion_actividad_tiempo_libre: '' })}>
              Agregar Actividad
            </Button></div>
          </div>


          <div>
            <label className='custom-div'>Acompañamiento recibido</label>
            {state.acompanamientos_recibido.map((acompañamiento, index) => (
                
              <div key={index}>
                <input
                  type="text"
                  name="nombre_acompanamiento_recibido"
                  placeholder="Nombre del acompañamiento"
                  value={acompañamiento.nombre_acompanamiento_recibido}
                  onChange={(e) => handleArrayFieldChange('acompanamientos_recibido', index, 'nombre_acompanamiento_recibido', e.target.value)}
                />
                <input 
                  type="text"
                  name="observacion_acompanamiento_recibido"
                  placeholder="ingrese observacion"
                  value={acompañamiento.observacion_acompanamiento_recibido}
                  onChange={(e) => handleArrayFieldChange('acompanamientos_recibido', index, 'observacion_acompanamiento_recibido', e.target.value)}
                />
                <Button className='boton-container' onClick={() => handleEliminarItem('acompanamientos_recibido', index)}>Eliminar</Button>
              </div>             
            ))}
            <div>
            <Button className='boton-container' onClick={() => handleAgregarItem('acompanamientos_recibido', { nombre_acompanamiento_recibido: '', observacion_acompanamiento_recibido: '' })}>
              Agregar Acompañamiento
            </Button></div>
          </div>
    </Col>
    </Container>
    </>
  );
};

export default InformacionGeneral;