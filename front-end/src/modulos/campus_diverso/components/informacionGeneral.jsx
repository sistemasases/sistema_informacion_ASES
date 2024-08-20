import React from 'react';
import { Container, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';
export const preventNonNumericValues = (e) => {
  const nonNumericKeys = ["e", "E", "+", "-", ".", ",", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Tab", "Enter", "Shift", "Control", "Alt", "CapsLock"];
  if (!/^[1-5]$/.test(e.key) && !nonNumericKeys.includes(e.key)) {
    e.preventDefault();
  }
};export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()


const InformacionGeneral = ({state,
    handleChange,
    handleSelectChange,
    handleArrayFieldChange,
    handleAgregarItem,
    handleEliminarItem,
    handleArrayChange,
    handleAddItem,
    handleDeleteItem,
    factoresOptions,
    actividadesOptions,
    fuentesOptions,
    redesOptions,
    isLoading,
    handleSelectChange2,
    maxLengthBasicInput,
    maxLengthTextAreas

}) => {
  return (
    <>
    <h1 className='title-banner'> Información General </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>

        <div>
                <label className='custom-div'>Dedicacion externa</label>
                
                <input
                  className='input-updated'
                  type="text"
                  name="dedicacion_externa"
                  placeholder='Ingrese la dedicacion externa'
                  value={state.dedicacion_externa}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.dedicacion_externa.length}`}</span>
        </div>

        <div>
                <label className='custom-div'>¿Tiene eps?</label>
                <input
                  className='input-updated'
                  type="text"
                  name="tiene_eps"
                  placeholder='Ingrese la EPS'
                  value={state.tiene_eps}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.tiene_eps.length}`}</span>
        </div>

        <div>
                <label className='custom-div'>regimen de la EPS</label>
                <input
                  className='input-updated'
                  type="text"
                  name="regimen_eps"
                  placeholder='Ingrese el regimen'
                  value={state.regimen_eps}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.regimen_eps.length}`}</span>
        </div>



        <div>
                <label className='custom-div'>tipo de entidad que brinda acompañamiento recibido</label>
                <input
                  className='input-updated'
                  type="text"
                  name="tipo_entidad_acompanamiento_recibido"
                  placeholder='Ingrese la entidad'
                  value={state.tipo_entidad_acompanamiento_recibido}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.tipo_entidad_acompanamiento_recibido.length}`}</span>
        </div>

        <div>
          <label className='custom-div'>
            Calificación de acompañamiento recibido
            <span className="tooltip-icon">?
              <span className="tooltip-text">
                Por favor califique del 1 al 5. (1 significa muy malo, 5 significa muy bueno)
              </span>
            </span>
          </label>
          <input
            className='input-updated'
            type="text"
            name="calificacion_acompanamiento_recibido"
            placeholder='Ingrese la calificación'
            pattern='[0-9]*'
            onKeyDown={preventNonNumericValues}
            min="0"
            value={state.calificacion_acompanamiento_recibido}
            onChange={handleChange}
            maxLength="1"
          />
        </div>

        
        <div>
                <label className='custom-div'>Motivo de calificacion de acompañamiento recibido</label>
                <textarea
                className='input-updated'
                  type="text"
                  name="motivo_calificacion_acompanamiento"
                  placeholder='Ingrese el motivo'
                  value={state.motivo_calificacion_acompanamiento}
                  onChange={handleChange}
                  maxLength={maxLengthTextAreas}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthTextAreas - state.motivo_calificacion_acompanamiento.length}`}</span>
        </div>

        <div>
                <label className='custom-div'>Actividad específica en tiempo libre</label>
                <input
                className='input-updated'
                  type="text"
                  name="actividades_especificas_tiempo_libre"
                  placeholder='Ingrese la actividad'
                  value={state.actividades_especificas_tiempo_libre}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.actividades_especificas_tiempo_libre.length}`}</span>
        </div>

        <div>
                <label className='custom-div'>Calificacion de relación familiar</label>
                <input
                className='input-updated'
                  type="text"
                  name="calificacion_relacion_familiar"
                  placeholder='Califíque del 1 al 5. (1 significa muy malo, 5 significa muy bueno)'
                  pattern='[0-9]*'
                  onKeyDown={preventNonNumericValues}
                  min="0"
                  value={state.calificacion_relacion_familiar}
                  onChange={handleChange}
                  maxLength="1"
                />
        </div>

        <div>
                <label className='custom-div'>Observación general de fuente de ingresos</label>
                <textarea
                className='input-updated'
                  type="text"
                  name="observacion_general_fuente_de_ingresos"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_fuente_de_ingresos}
                  onChange={handleChange}
                />
        </div>  
    {/*
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
                <Button variant="danger" className='boton-container' onClick={() => handleEliminarItem('encuentro_dias_horas', index)}>Eliminar</Button>
              </div>             
            ))}
            <div>
            <Button variant="secondary" className='boton-container' 
            onClick={() => handleAgregarItem('encuentro_dias_horas', { dia: '', hora: '' })}
            disabled={state.encuentro_dias_horas.length >= 3}
            >
              Agregar Encuentro
            </Button></div>
          </div>
      */}

          <div>
              <label className='custom-div'>Redes de apoyo</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='create-select'
                  name="redes_apoyo"
                  placeholder='Seleccione sus redes de apoyo'
                  options={redesOptions}
                  value={state.redes_apoyo.map(option => ({
                  label: option,
                  value: redesOptions.find(o => o.label === option).value
                  }))}
                  onChange={handleSelectChange2}
    
                  />
                  )}
              </div>
            </div>


  

 


    </Col>


    <Col className="form-column" xs={"10"} md={"6"}>

        <div>
                <label className='custom-div'>Observación general de redes de apoyo</label>
                <div>
                <textarea
                className='input-updated'
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
                <textarea
                className='input-updated'
                  type="text"
                  name="observacion_general_factores_de_riesgo"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_factores_de_riesgo}
                  onChange={handleChange}
                />
                </div>
        </div>  

        <div>
                <label className='custom-div'>Creencia religiosa</label>
                <input
                className='input-updated'
                  type="text"
                  name="creencia_religiosa"
                  placeholder='Ingrese la creencia'
                  value={state.creencia_religiosa}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.creencia_religiosa.length}`}</span>
        </div> 

        <div>
                <label className='custom-div'>Decisión encuentro inicial con profesional</label>
                
                <input
                className='input-updated'
                  type="text"
                  name="decision_encuentro_inicial_con_profesional"
                  placeholder='Ingrese la decisión'
                  value={state.decision_encuentro_inicial_con_profesional}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.decision_encuentro_inicial_con_profesional.length}`}</span>
        </div> 

        <div>
                <label className='custom-div'>Observación horario</label>
                <div>
                <input
                className='input-updated'
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
                <input
                className='input-updated'
                  type="text"
                  name="origen_descubrimiento_campus_diverso"
                  placeholder='Ingrese el origen'
                  value={state.origen_descubrimiento_campus_diverso}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.origen_descubrimiento_campus_diverso.length}`}</span>
        </div> 

        <div>
                <label className='custom-div'>Comentarios o sugerencias de usuario</label>
                <input
                className='input-updated'
                  type="text"
                  name="comentarios_o_sugerencias_de_usuario"
                  placeholder='Ingrese el comentario o sugerencia'
                  value={state.comentarios_o_sugerencias_de_usuario}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.comentarios_o_sugerencias_de_usuario.length}`}</span>
        </div> 


              <div>
        <label className='custom-div'>Observación convivencia de vivienda</label>
        <div>
          <textarea
          className='input-updated'
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
                <textarea
                className='input-updated'
                  name="observacion_general_actividades_especificas_tiempo_libre"
                  placeholder='Ingrese la observación'
                  value={state.observacion_general_actividades_especificas_tiempo_libre}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>¿Ocupación actual?</label>
                <div>
                <input
                className='input-updated'
                  type="text"
                  name="Ocupaciones_actules"
                  placeholder='Ingrese su ocupación'
                  value={state.Ocupaciones_actules}
                  onChange={handleChange}
                />
                </div>
        </div>  

        <div>
                <label className='custom-div'>¿Qué profesionales le han brindado atención?</label>
                <div>
                <input
                className='input-updated'
                  type="text"
                  name="profesionales_que_brindaron_atencion"
                  placeholder='Ingrese los profesionales'
                  value={state.profesionales_que_brindaron_atencion}
                  onChange={handleChange}
                />
                </div>
        </div>  

        <div>
                <label className='custom-div'>¿Qué acompañamiento ha recibido?</label>
                <div>
                <textarea
                className='input-updated'
                  type="text"
                  name="acompanamiento_que_recibio"
                  placeholder='Ingrese el acompañamiento que ha recibido'
                  value={state.acompanamiento_que_recibio}
                  onChange={handleChange}
                />
                </div>
        </div>  




        <div>
              <label className='custom-div'>Factores de riesgo</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='create-select'
                  name="factores_riesgos"
                  placeholder='Seleccione sus factores de riesgo'
                  options={factoresOptions}
                  value={state.factores_riesgos.map(option => ({
                  label: option,
                  value: factoresOptions.find(o => o.label === option).value
                  }))}
                  onChange={handleSelectChange2}
    
                  />
                  )}
              </div>
            </div>




            <div>
              <label className='custom-div'>Fuentes de ingresos</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='create-select'
                  name="fuentes_ingresos"
                  placeholder='Seleccione sus fuentes de ingresos'
                  options={fuentesOptions}
                  value={state.fuentes_ingresos.map(option => ({
                  label: option,
                  value: fuentesOptions.find(o => o.label === option).value
                  }))}
                  onChange={handleSelectChange2}
    
                  />
                  )}
              </div>
            </div>

            <div>
              <label className='custom-div'>Actividades en tiempo libre</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='create-select'
                  name="actividades_tiempo_libre"
                  placeholder='Seleccione sus Actividades en tiempo libre'
                  options={actividadesOptions}
                  value={state.actividades_tiempo_libre.map(option => ({
                  label: option,
                  value: actividadesOptions.find(o => o.label === option).value
                  }))}
                  onChange={handleSelectChange2}
    
                  />
                  )}
              </div>
            </div>



    </Col>
    </Container>
    </>
  );
};

export default InformacionGeneral;