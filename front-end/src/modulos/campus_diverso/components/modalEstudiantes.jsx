import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ModalSeguimientos from './modalSeguimientos';
import Select from 'react-select';
import axios from 'axios';


const ModalEstudiantes = ({
  isModalOpen,
  closeModal,
  selectedUser,
  diversidadInfo,
  academicoInfo,
  generalInfo,
  documentosInfo,
  seguimientosInfo,
  currentPage,
  prevPage,
  nextPage,
  handleFormSubmit,
  handleInputChange,
  editableUser,
  setEditableUser,
  handleCheckboxChange,
  razasOptions,
  handleSelectChange,
  isEditing,
  setIsEditing,
  pronombresOptions,
  expresionesOptions,
  orientacionOptions,
  identidadesGeneroOptions,
  documentoOptions,
  estamentoOptions,
  handleDelete,
  factoresOptions,
  fuentesOptions,
  redesOptions,
  actividadesOptions
}) => {

  const titles = [
    'Datos Básicos',
    'Información de Diversidad Sexual',
    'Información General ',
    'Observaciones',
    'Información Académica',
    'Documentos Autorización',
    'Seguimientos'
  ];
  const [isSeguimientoModalOpen, setSeguimientoModalOpen] = useState(false);

  const handleCancel = () => {
    setEditableUser({selectedUser});
    setIsEditing(false);
  };

  const openSeguimientoModal = () => {
    setSeguimientoModalOpen(true);
  };

  const closeSeguimientoModal = () => {
    setSeguimientoModalOpen(false);
  };



  return (
    <>
    <Modal show={isModalOpen} onHide={closeModal} size="lg">
      <Modal.Header className='custom-modal-header' closeButton >
        <Modal.Title >{titles[currentPage]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            
            
              {currentPage === 0 && selectedUser && (
                <div>
                <Row>
                <Col className="form-column" xs={"10"} md={"6"}>
                <div className='div-modal'>
                        <b>Nombre:</b> 
                        {isEditing ? (
                          <input
                            type="text"
                            name="nombre_y_apellido"
                            value={editableUser.nombre_y_apellido || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          selectedUser.nombre_y_apellido
                        )}
                      </div>                  <div className='div-modal'><b>Nombre identitario:</b> {selectedUser.nombre_identitario}</div>
                  <div className='div-modal'><b>Identificación:</b> {selectedUser.numero_documento}</div>
                  <div className='div-modal'><b>Tipo de identificación:</b> 
                  {isEditing ? (
                      <input type="text" name="tipo_documento" value={editableUser.tipo_documento || '' } onChange={handleInputChange}
                      /> ) : ( selectedUser.tipo_documento )} </div>
                  <div className='div-modal'><b>Email:</b> 
                  {isEditing ? (
                      <input type="text" name="email" value={editableUser.email || ''} onChange={handleInputChange}
                      /> ) : ( selectedUser.email )} </div>
                  <div className='div-modal'><b>Estrato:</b> 
                  {isEditing ? (
                      <input type="text" name="estrato_socioeconomico" value={editableUser.estrato_socioeconomico || ''} onChange={handleInputChange}
                      /> ) : ( selectedUser.estrato_socioeconomico )} </div>
                     <div className='div-modal'><b>Teléfono:</b>
            {isEditing ? (
              <input type="text" name="telefono" value={editableUser.telefono || ''} onChange={handleInputChange}
              />) : (selectedUser.telefono)} </div>
          <div className='div-modal'><b>Identidad étnico racial:</b>
            {isEditing ? (
              <input type="text" name="identidad_etnico_racial" value={editableUser.identidad_etnico_racial || ''} onChange={handleInputChange}
              />) : (selectedUser.identidad_etnico_racial)} </div>
          <div className='div-modal'><b>Nombre persona de confianza:</b>
            {isEditing ? (
              <input type="text" name="nombre_persona_de_confianza" value={editableUser.nombre_persona_de_confianza || ''} onChange={handleInputChange}
              />) : (selectedUser.nombre_persona_de_confianza)} </div>
          <div className='div-modal'><b>Teléfono persona de confianza:</b>
            {isEditing ? (
              <input type="text" name="telefono_persona_de_confianza" value={editableUser.telefono_persona_de_confianza || ''} onChange={handleInputChange}
              />) : (selectedUser.telefono_persona_de_confianza)} </div>
          <div className='div-modal'><b>Relación persona de confianza:</b>
            {isEditing ? (
              <input type="text" name="relacion_persona_de_confianza" value={editableUser.relacion_persona_de_confianza || ''} onChange={handleInputChange}
              />) : (selectedUser.relacion_persona_de_confianza)} </div>
          <div className='div-modal'><b>Estado civil: </b>
            {isEditing ? (
              <input type="text" name="estado_civil" value={editableUser.estado_civil || ''} onChange={handleInputChange}
              />) : (selectedUser.estado_civil)} </div>
        </Col>
        <Col className="form-column" xs={"10"} md={"6"}>
          <div className='div-modal'><b>Ciudad de nacimiento:</b>
            {isEditing ? (
              <input type="text" name="ciudad_nacimiento" value={editableUser.ciudad_nacimiento || ''} onChange={handleInputChange}
              />) : (selectedUser.ciudad_nacimiento)} </div>
          <div className='div-modal'><b>Corregimiento de nacimiento:</b>
            {isEditing ? (
              <input type="text" name="corregimiento_nacimiento" value={editableUser.corregimiento_nacimiento || ''} onChange={handleInputChange}
              />) : (selectedUser.corregimiento_nacimiento)} </div>
          <div className='div-modal'><b>Municipío de nacimiento:</b>
            {isEditing ? (
              <input type="text" name="municipio_nacimiento" value={editableUser.municipio_nacimiento || ''} onChange={handleInputChange}
              />) : (selectedUser.municipio_nacimiento)} </div>
          <div className='div-modal'><b>País de nacimiento:</b>
            {isEditing ? (
              <input type="text" name="pais_nacimiento" value={editableUser.pais_nacimiento || ''} onChange={handleInputChange}
              />) : (selectedUser.pais_nacimiento)} </div>
          <div className='div-modal'><b>Departamento de nacimiento:</b>
            {isEditing ? (
              <input type="text" name="departamento_nacimiento" value={editableUser.departamento_nacimiento || ''} onChange={handleInputChange}
              />) : (selectedUser.departamento_nacimiento)} </div>
          <div className='div-modal'><b>Fecha de nacimiento "Año/Mes/Día":</b>
            {isEditing ? (
              <input type="date" name="fecha_nacimiento" value={editableUser.fecha_nacimiento || ''} onChange={handleInputChange}
              />) : (selectedUser.fecha_nacimiento)} </div>
         


 <div className='div-modal'>
  <b>Pertenencia grupo poblacional:</b>
  {isEditing ? (
    <Select
      isMulti
      placeholder='Seleccione grupo poblacional'
      name="pertenencia_grupo_poblacional"
      // Opciones disponibles, excluyendo las ya seleccionadas
      options={razasOptions.filter(option => 
        !( editableUser.pertenencia_grupo_poblacional || selectedUser.pertenencia_grupo_poblacional|| []).includes(option.value && option.label) 
      )}
      // Opciones seleccionadas
      value={(editableUser.pertenencia_grupo_poblacional || selectedUser.pertenencia_grupo_poblacional|| []).map(value => {
        const foundOption = razasOptions.find(o => o.value === value);
        return foundOption || { value, label: value };
      })}
      onChange={handleSelectChange}
    />
  ) : (
    selectedUser.pertenencia_grupo_poblacional.join(', ')
  )}
</div>





          <div className='div-modal'><b>Comuna:</b>
            {isEditing ? (
              <input type="text" name="comuna_barrio" value={editableUser.comuna_barrio || ''} onChange={handleInputChange} autoComplete='off'
              />) : (selectedUser.comuna_barrio)} </div>

          <div className='div-modal'><b>Barrio:</b>
            {isEditing ? (
              <input type="text" name="barrio_residencia" value={editableUser.barrio_residencia || ''} onChange={handleInputChange}
              />) : (selectedUser.barrio_residencia)} </div>

          <div className='div-modal'><b>Ciudad de residencia:</b>
            {isEditing ? (
              <input type="text" name="ciudad_residencia" value={editableUser.ciudad_residencia || ''} onChange={handleInputChange}
              />) : (selectedUser.ciudad_residencia)} </div>
          <div className='div-modal'><b>Dirección de residencia:</b>
            {isEditing ? (
              <input type="text" name="direccion_residencia" value={editableUser.direccion_residencia || ''} onChange={handleInputChange}
              />) : (selectedUser.direccion_residencia)} </div>
                  </Col>
                </Row>
                </div>
              )}
              
              {currentPage === 1 && diversidadInfo && (
                <div>

                  <Row>
                  <Col className="form-column" xs={"10"} md={"6"}>

              <div className='div-modal'>

              <b>Pronombres: </b>
              {isEditing ? (
                <Select
                  isMulti
                  placeholder='Seleccione pronombres'
                  className='form-react-select'
                  name="pronombres"
                  // Opciones disponibles, excluyendo las ya seleccionadas
                  options={pronombresOptions.filter(option => 
                    !( editableUser.pronombres || diversidadInfo.pronombres).includes(option.value && option.label) 
                  )}
                  // Opciones seleccionadas
                  value={(editableUser.pronombres || diversidadInfo.pronombres|| []).map(value => {
                    const foundOption = pronombresOptions.find(o => o.value === value);
                    return foundOption || { value, label: value };
                  })}
                  onChange={handleSelectChange}
                />
              ) : (
                diversidadInfo.pronombres.join(', ')
              )}
            </div>
                      
          <div className='div-modal'>
        <b>Expresiones de genero: </b>
        {isEditing ? (
          <Select
            isMulti
            placeholder='Seleccione expresiones'
            className='form-react-select'
            name="expresiones_de_genero"
            // Opciones disponibles, excluyendo las ya seleccionadas
            options={expresionesOptions.filter(option => 
              !( editableUser.expresiones_de_genero || diversidadInfo.expresiones_de_genero).includes(option.value && option.label) 
            )}
            // Opciones seleccionadas
            value={(editableUser.expresiones_de_genero || diversidadInfo.expresiones_de_genero|| []).map(value => {
              const foundOption = expresionesOptions.find(o => o.value === value);
              return foundOption || { value, label: value };
            })}
            onChange={handleSelectChange}
          />
        ) : (
          diversidadInfo.expresiones_de_genero.join(', ')
        )}
        </div>
                                  
        <div className='div-modal'>
        <b>Orientaciones sexuales: </b>
        {isEditing ? (
          <Select
            isMulti
            placeholder='Seleccione expresiones'
            className='form-react-select'
            name="orientaciones_sexuales"
            // Opciones disponibles, excluyendo las ya seleccionadas
            options={orientacionOptions.filter(option => 
              !( editableUser.orientaciones_sexuales || diversidadInfo.orientaciones_sexuales).includes(option.value && option.label) 
            )}
            // Opciones seleccionadas
            value={(editableUser.orientaciones_sexuales || diversidadInfo.orientaciones_sexuales|| []).map(value => {
              const foundOption = orientacionOptions.find(o => o.value === value);
              return foundOption || { value, label: value };
            })}
            onChange={handleSelectChange}
          />
        ) : (
          diversidadInfo.orientaciones_sexuales.join(', ')
        )}
        </div>              
                  
          <div className='div-modal'><b>Cambio nombre/sexo en el documento:</b>
            {isEditing ? (
              <input type="text" name="cambio_nombre_sexo_documento" value={editableUser.cambio_nombre_sexo_documento || '' } onChange={handleInputChange}
              />) : (diversidadInfo.cambio_nombre_sexo_documento)} </div>
              </Col>
                  <Col className="form-column" xs={"10"} md={"6"}>  

                  <div className='div-modal'>
                    
        <b>Repuestas cambio de documento: </b>
        {isEditing ? (
          <Select
            isMulti
            placeholder='Seleccione expresiones'
            className='form-react-select'
            name="respuestas_cambio_documento"
            // Opciones disponibles, excluyendo las ya seleccionadas
            options={documentoOptions.filter(option => 
              !( editableUser.respuestas_cambio_documento || diversidadInfo.respuestas_cambio_documento).includes(option.value && option.label) 
            )}
            // Opciones seleccionadas
            value={(editableUser.respuestas_cambio_documento || diversidadInfo.respuestas_cambio_documento|| []).map(value => {
              const foundOption = documentoOptions.find(o => o.value === value);
              return foundOption || { value, label: value };
            })}
            onChange={handleSelectChange}
          />
        ) : (
          diversidadInfo.respuestas_cambio_documento.join(', ')
        )}
        </div>      

        <div className='div-modal'>
        <b>Identidades de genero: </b>
        {isEditing ? (
          <Select
            isMulti
            placeholder='Seleccione expresiones'
            className='form-react-select'
            name="identidades_de_genero"
            // Opciones disponibles, excluyendo las ya seleccionadas
            options={identidadesGeneroOptions.filter(option => 
              !( editableUser.identidades_de_genero || diversidadInfo.identidades_de_genero).includes(option.value && option.label) 
            )}
            // Opciones seleccionadas
            value={(editableUser.identidades_de_genero || diversidadInfo.identidades_de_genero|| []).map(value => {
              const foundOption = identidadesGeneroOptions.find(o => o.value === value);
              return foundOption || { value, label: value };
            })}
            onChange={handleSelectChange}
          />
        ) : (
          diversidadInfo.identidades_de_genero.join(', ')
        )}
        </div>   
                    
          <div className='div-modal'><b>Recibir orientacion en cambio de documento: </b>
            {isEditing ? (
              <input type="checkbox" name="recibir_orientacion_cambio_en_documento" checked={editableUser.recibir_orientacion_cambio_en_documento ?? diversidadInfo.recibir_orientacion_cambio_en_documento} onChange={handleCheckboxChange}
              />) : diversidadInfo.recibir_orientacion_cambio_en_documento ? 'Sí' : 'No'}</div>              
                  </Col> 
                  </Row>

                  </div>
             )}
              
              {currentPage === 2 && generalInfo && (
                <div>

                  <Row>
                  <Col className="form-column" xs={"10"} md={"6"}>

                  <div className='div-modal'><b>Dedicación externa:</b> {generalInfo.dedicacion_externa}</div>                

                  <div className='div-modal'><b>¿Tiene EPS?: </b>
            {isEditing ? (
              <input type="text" name="tiene_eps" value={editableUser.tiene_eps || ''} onChange={handleInputChange}
              />) : (generalInfo.tiene_eps)} </div>

        <div className='div-modal'>
          <b>Nombre de la EPS:</b>
          {isEditing ? (
            <input
              type="text"
              name="nombre_eps"
              value={editableUser.nombre_eps || ''}
              onChange={handleInputChange}
            />
          ) : (
            generalInfo.nombre_eps
          )}
        </div>
        <div className='div-modal'>
          <b>Régimen de la EPS:</b>
          {isEditing ? (
            <input
              type="text"
              name="regimen_eps"
              value={editableUser.regimen_eps || ''}
              onChange={handleInputChange}
            />
          ) : (
            generalInfo.regimen_eps
          )}
        </div>
        <div className='div-modal'>
          <b>Tipo de entidad que brinda acompañamiento:</b>
          {isEditing ? (
            <input
              type="text"
              name="tipo_entidad_acompanamiento_recibido"
              value={editableUser.tipo_entidad_acompanamiento_recibido || ''}
              onChange={handleInputChange}
            />
          ) : (
            generalInfo.tipo_entidad_acompanamiento_recibido
          )}
        </div>
        <div className='div-modal'>
          <b>Calificación de acompañamiento recibido:</b>
          {isEditing ? (
            <input
              type="text"
              name="calificacion_acompanamiento_recibido"
              value={editableUser.calificacion_acompanamiento_recibido || ''}
              onChange={handleInputChange}
            />
          ) : (
            generalInfo.calificacion_acompanamiento_recibido
          )}
        </div>
                  

                  
                  <div className='div-modal'><b>Acompañamiento recibido: </b>
            {isEditing ? (
              <input type="text" className="input-updated" name="acompanamiento_que_recibio" value={editableUser.acompanamiento_que_recibio || ''} onChange={handleInputChange}
              />) : (generalInfo.acompanamiento_que_recibio)} </div>

              <div className='div-modal'><b>Profesional que brindaron atención: </b>
            {isEditing ? (
              <input type="text" className="input-updated" name="profesionales_que_brindaron_atencion" value={editableUser.profesionales_que_brindaron_atencion || ''} onChange={handleInputChange}
              />) : (generalInfo.profesionales_que_brindaron_atencion)} </div>


              <div className='div-modal'><b>Ocupaciones actuales: </b>
            {isEditing ? (
              <input type="text" className="input-updated" name="Ocupaciones_actules" value={editableUser.Ocupaciones_actules || ''} onChange={handleInputChange}
              />) : (generalInfo.Ocupaciones_actules)} </div>




                  </Col>
                  <Col className="form-column" xs={"10"} md={"6"}>  
              <div className='div-modal'>
                <b>Calificación relación familiar: </b>
                {isEditing ? (
                  <input
                    type="text"
                    name="calificacion_relacion_familiar"
                    value={editableUser.calificacion_relacion_familiar || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  generalInfo.calificacion_relacion_familiar
                )}
              </div>
              <div className='div-modal'>
                <b>Creencia religiosa:</b>
                {isEditing ? (
                  <input
                    type="text"
                    name="creencia_religiosa"
                    value={editableUser.creencia_religiosa || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  generalInfo.creencia_religiosa
                )}
              </div>
              <div className='div-modal'>
                <b>Decisión encuentro inicial con profesional: </b>
                {isEditing ? (
                  <input
                    type="text"
                    name="decision_encuentro_inicial_con_profesional"
                    value={editableUser.decision_encuentro_inicial_con_profesional || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  generalInfo.decision_encuentro_inicial_con_profesional
                )}
              </div>
              <div className='div-modal'>
                <b>Origen de descubrimiento de campus diverso: </b>
                {isEditing ? (
                  <input
                    type="text"
                    name="origen_descubrimiento_campus_diverso"
                    value={editableUser.origen_descubrimiento_campus_diverso || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  generalInfo.origen_descubrimiento_campus_diverso
                )}
              </div>
              <div className='div-modal'>
                <b>Comentarios o sugerencias: </b>
                {isEditing ? (
                  <input
                    type="text"
                    name="comentarios_o_sugerencias_de_usuario"
                    value={editableUser.comentarios_o_sugerencias_de_usuario || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  generalInfo.comentarios_o_sugerencias_de_usuario
                )}
              </div>
              <div className='div-modal'>
                <b>Actividades específicas en tiempo libre: </b>
                {isEditing ? (
                  <input
                    type="text"
                    name="actividades_especificas_tiempo_libre"
                    value={editableUser.actividades_especificas_tiempo_libre || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  generalInfo.actividades_especificas_tiempo_libre
                )}
              </div>

                  

                <div className='div-modal'>
                  <b>factores de riesgo: </b>
                  {isEditing ? (
                    <Select
                      isMulti
                      placeholder='Seleccione factores de riesgo'
                      className='form-react-select'
                      name="factores_riesgos"
                      // Opciones disponibles, excluyendo las ya seleccionadas
                      options={factoresOptions.filter(option => 
                        !( editableUser.factores_riesgos || generalInfo.factores_riesgos).includes(option.label)
                      )}
                      // Opciones seleccionadas
                      value={(editableUser.factores_riesgos || generalInfo.factores_riesgos|| []).map(value => {
                        const foundOption = factoresOptions.find(o => o.value === value);
                        return foundOption || { value, label: value };
                      })}
                      onChange={handleSelectChange}
                    />
                  ) : (
                    generalInfo.factores_riesgos.join(', ')
                  )}
                </div> 


                  </Col> 

                  </Row>
                  </div>
             )}
                {currentPage === 3 && generalInfo && (
                  <div>
                    <Row>
                    <Col className="form-column" xs={"10"} md={"6"}>

                    <div className='div-modal'>
                      <b>Observación general fuente de ingresos:</b>
                      {isEditing ? (
                        <input
                          type="text"
                          name="observacion_general_fuente_de_ingresos"
                          value={editableUser.observacion_general_fuente_de_ingresos || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        generalInfo.observacion_general_fuente_de_ingresos
                      )}
                    </div>
                    <div className='div-modal'>
                      <b>Observación general redes de apoyo:</b>
                      {isEditing ? (
                        <input
                          type="text"
                          name="observacion_general_redes_de_apoyo"
                          value={editableUser.observacion_general_redes_de_apoyo || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        generalInfo.observacion_general_redes_de_apoyo
                      )}
                    </div>
                    <div className='div-modal'>
                      <b>Observación general factores de riesgo:</b>
                      {isEditing ? (
                        <input
                          type="text"
                          name="observacion_general_factores_de_riesgo"
                          value={editableUser.observacion_general_factores_de_riesgo || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        generalInfo.observacion_general_factores_de_riesgo
                      )}
                    </div>
                    <div className='div-modal'>
                      <b>Observación horario:</b>
                      {isEditing ? (
                        <input
                          type="text"
                          name="observacion_horario"
                          value={editableUser.observacion_horario || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        generalInfo.observacion_horario
                      )}
                    </div>
                    <div className='div-modal'>
                      <b>Observación general actividades específicas en tiempo libre:</b>
                      {isEditing ? (
                        <textarea
                          type="text"
                          name="observacion_general_actividades_especificas_tiempo_libre"
                          value={editableUser.observacion_general_actividades_especificas_tiempo_libre !== undefined ? editableUser.observacion_general_actividades_especificas_tiempo_libre : generalInfo.observacion_general_actividades_especificas_tiempo_libre || ''}
                          onChange={handleInputChange}
                        />
                      ) : (
                        generalInfo.observacion_general_actividades_especificas_tiempo_libre
                      )}
                    </div>



                    </Col>
                  <Col className="form-column" xs={"10"} md={"6"}>
                  
                  <div className='div-modal'>
                  <b>factores de riesgo: </b>
                  {isEditing ? (
                    <Select
                      isMulti
                      placeholder='Seleccione factores de riesgo'
                      name="factores_riesgos"
                      // Opciones disponibles, excluyendo las ya seleccionadas
                      options={factoresOptions.filter(option => 
                        !( editableUser.factores_riesgos || generalInfo.factores_riesgos).includes(option.label)
                      )}
                      // Opciones seleccionadas
                      value={(editableUser.factores_riesgos || generalInfo.factores_riesgos|| []).map(value => {
                        const foundOption = factoresOptions.find(o => o.value === value);
                        return foundOption || { value, label: value };
                      })}
                      onChange={handleSelectChange}
                    />
                  ) : (
                    generalInfo.factores_riesgos.join(', ')
                  )}
                </div> 


                <div className='div-modal'>
                  <b>Fuentes de ingresos: </b>
                  {isEditing ? (
                    <Select
                      isMulti
                      placeholder='Seleccione las fuentes de ingresos'
                      name="fuentes_ingresos"
                      // Opciones disponibles, excluyendo las ya seleccionadas
                      options={fuentesOptions.filter(option => 
                        !( editableUser.fuentes_ingresos || generalInfo.fuentes_ingresos).includes(option.label)
                      )}
                      // Opciones seleccionadas
                      value={(editableUser.fuentes_ingresos || generalInfo.fuentes_ingresos|| []).map(value => {
                        const foundOption = fuentesOptions.find(o => o.value === value);
                        return foundOption || { value, label: value };
                      })}
                      onChange={handleSelectChange}
                    />
                  ) : (
                    generalInfo.fuentes_ingresos.join(', ')
                  )}
                </div> 
                
                <div className='div-modal'>
                  <b>Redes de apoyo: </b>
                  {isEditing ? (
                    <Select
                      isMulti
                      placeholder='Seleccione las redes de apoyo'
                      name="redes_apoyo"
                      // Opciones disponibles, excluyendo las ya seleccionadas
                      options={redesOptions.filter(option => 
                        !( editableUser.redes_apoyo || generalInfo.redes_apoyo).includes(option.label)
                      )}
                      // Opciones seleccionadas
                      value={(editableUser.redes_apoyo || generalInfo.redes_apoyo|| []).map(value => {
                        const foundOption = redesOptions.find(o => o.value === value);
                        return foundOption || { value, label: value };
                      })}
                      onChange={handleSelectChange}
                    />
                  ) : (
                    generalInfo.redes_apoyo.join(', ')
                  )}
                </div> 

                <div className='div-modal'>
                  <b>Actividades en tiempo libre: </b>
                  {isEditing ? (
                    <Select
                      isMulti
                      placeholder='Seleccione las actividades de tiempo libre'
                      name="actividades_tiempo_libre"
                      // Opciones disponibles, excluyendo las ya seleccionadas
                      options={actividadesOptions.filter(option => 
                        !( editableUser.actividades_tiempo_libre || generalInfo.actividades_tiempo_libre).includes(option.label)
                      )}
                      // Opciones seleccionadas
                      value={(editableUser.actividades_tiempo_libre || generalInfo.actividades_tiempo_libre|| []).map(value => {
                        const foundOption = actividadesOptions.find(o => o.value === value);
                        return foundOption || { value, label: value };
                      })}
                      onChange={handleSelectChange}
                    />
                  ) : (
                    generalInfo.actividades_tiempo_libre.join(', ')
                  )}
                </div> 

                  </Col>
                    </Row>
                  </div>
                )}
                {currentPage === 4 && academicoInfo && (
                  <div>
                    <Row>
                      <Col className="form-column" xs={"10"} md={"6"}>
                        <div className='div-modal'>
                          <b>Código de estudiante:</b>
                          {isEditing ? (
                            <input
                              type="text"
                              name="codigo_estudiante"
                              value={editableUser.codigo_estudiante || ''}
                              onChange={handleInputChange}
                            />
                          ) : (
                            academicoInfo.codigo_estudiante
                          )}
                        </div>
                        <div className='div-modal'>
                          <b>Sede de la universidad:</b>
                          {isEditing ? (
                            <input
                              type="text"
                              name="sede_universidad"
                              value={editableUser.sede_universidad || ''}
                              onChange={handleInputChange}
                            />
                          ) : (
                            academicoInfo.sede_universidad
                          )}
                        </div>
                        <div className='div-modal'>
                          <b>Nombre de programa académico:</b>
                          {isEditing ? (
                            <input
                              type="text"
                              name="nombre_programa_academico"
                              value={editableUser.nombre_programa_academico || ''}
                              onChange={handleInputChange}
                            />
                          ) : (
                            academicoInfo.nombre_programa_academico
                          )}
                        </div>
                        <div className='div-modal'>
                          <b>Semestre académico:</b>
                          {isEditing ? (
                            <input
                              type="text"
                              name="semestre_academico"
                              value={editableUser.semestre_academico || ''}
                              onChange={handleInputChange}
                            />
                          ) : (
                            academicoInfo.semestre_academico
                          )}
                        </div>
                      </Col>
                      <Col className="form-column" xs={"10"} md={"6"}>
                      
                        <div className='div-modal'>
                          <b>Pertenencia a univalle:</b>
                          {isEditing ? (
                            <input
                              type="checkbox"
                              name="pertenencia_univalle"
                              checked={editableUser.pertenencia_univalle ?? academicoInfo.pertenencia_univalle}
                              onChange={handleCheckboxChange}
                            />
                          ) : (
                            academicoInfo.pertenencia_univalle ? 'Sí' : 'No'
                          )}
                        </div>


                        <div className='div-modal'>
        <b>Estamentos: </b>
        {isEditing ? (
          <Select
            isMulti
            placeholder='Seleccione expresiones'
            className='form-react-select'
            name="estamentos"
            // Opciones disponibles, excluyendo las ya seleccionadas
            options={estamentoOptions.filter(option => 
              !( editableUser.estamentos || academicoInfo.estamentos).includes(option.label)
            )}
            // Opciones seleccionadas
            value={(editableUser.estamentos || academicoInfo.estamentos|| []).map(value => {
              const foundOption = estamentoOptions.find(o => o.value === value);
              return foundOption || { value, label: value };
            })}
            onChange={handleSelectChange}
          />
        ) : (
          academicoInfo.estamentos.join(', ')
        )}
        </div> 
                      </Col>
                    </Row>
                  </div>
                )}

              
            
        {currentPage === 5 && documentosInfo && (
          <div>
            <Row>
              <Col className="form-column" xs={"10"} md={"6"}>
                <div className='div-modal'>
                  <b>Autorización manejo de datos:</b>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name="autorizacion_manejo_de_datos"
                      checked={editableUser.autorizacion_manejo_de_datos ?? documentosInfo.autorizacion_manejo_de_datos}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    documentosInfo.autorizacion_manejo_de_datos ? 'Sí' : 'No'
                  )}
                </div>
                <div className='div-modal'>
                  <b>Firma consentimiento informado:</b>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name="firma_consentimiento_informado"
                      checked={editableUser.firma_consentimiento_informado ?? documentosInfo.firma_consentimiento_informado}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    documentosInfo.firma_consentimiento_informado ? 'Sí' : 'No'
                  )}
                </div>
                <div className='div-modal'>
                  <b>Firma terapia hormonal:</b>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name="firma_terapia_hormonal"
                      checked={editableUser.firma_terapia_hormonal ?? documentosInfo.firma_terapia_hormonal}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    documentosInfo.firma_terapia_hormonal ? 'Sí' : 'No'
                  )}
                </div>
                <div className='div-modal'>
                  <b>Apgar familiar:</b>
                  {isEditing ? (
                    <input
                      type="text"
                      name="apgar_familiar"
                      value={editableUser.apgar_familiar || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    documentosInfo.apgar_familiar
                  )}
                </div>
                <div className='div-modal'>
                  <b>Documento digital y archivo:</b>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name="documento_digital_y_archivo"
                      checked={editableUser.documento_digital_y_archivo ?? documentosInfo.documento_digital_y_archivo}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    documentosInfo.documento_digital_y_archivo ? 'Sí' : 'No'
                  )}
                </div>
              </Col>
              <Col className="form-column" xs={"10"} md={"6"}>
                <div className='div-modal'>
                  <b>Ecomapa:</b>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name="ecomapa"
                      checked={editableUser.ecomapa ?? documentosInfo.ecomapa}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    documentosInfo.ecomapa ? 'Sí' : 'No'
                  )}
                </div>
                <div className='div-modal'>
                  <b>Árbol familiar:</b>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      name="arbol_familiar"
                      checked={editableUser.arbol_familiar ?? documentosInfo.arbol_familiar}
                      onChange={handleCheckboxChange}
                    />
                  ) : (
                    documentosInfo.arbol_familiar ? 'Sí' : 'No'
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}

              {currentPage === 6   && seguimientosInfo && (
                <div className='div-observacion'>

<Row>
  <ul className='ul-style'>
    {seguimientosInfo && seguimientosInfo.length > 0 ? (
      seguimientosInfo.map((seguimiento, index) => (
        <li className='li-style' key={index}>
          <div ><b>Fecha:</b> {seguimiento.fecha}</div>
          <div ><b>Observación:</b> {seguimiento.observacion}</div>
          <div ><b>Profesionales:</b>
            <ul className='ul-style'>
              {seguimiento.profesional.map((prof, profIndex) => (
                <li key={profIndex}>{prof.nombre_profesional}</li>
              ))}
            </ul>
          </div>
          <div><b>ID Creador Campus:</b> {seguimiento.id_creador_campus || 'N/A'}</div>
        </li>
      ))
    ) : (
      <li className='li-style'>
        <div>No hay seguimientos disponibles para este usuario.</div>
      </li>
    )}
  </ul>
</Row>

                  </div>
             )}


          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
      {isEditing ? (
            <>
              <Button variant="success" onClick={() => {
                handleFormSubmit(editableUser);
                setIsEditing(false);
                setEditableUser({selectedUser});
              }}>
                Guardar
              </Button>
              <Button variant="secondary" onClick={handleCancel}            
                >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <Button variant="primary" className='modal-seguimiento' onClick={openSeguimientoModal}>
                Seguimientos
              </Button>
              {currentPage > 0 && (
                <Button variant="outline-primary" onClick={prevPage}>
                  Atrás
                </Button>
              )}
              {currentPage < 6 && (
                <Button variant="primary" onClick={nextPage}>
                  Adelante
                </Button>
              )}
              <Button variant="outline-danger" onClick={() => handleDelete(selectedUser.numero_documento)}>
                Eliminar
              </Button>
              <Button variant="outline-danger" onClick={closeModal}>
                Cerrar
              </Button>
            </>
          )}
      </Modal.Footer>
    </Modal>
          <ModalSeguimientos
          isSeguimientoModalOpen={isSeguimientoModalOpen}
          closeSeguimientoModal={closeSeguimientoModal}
          selectedUser={selectedUser}
        />
        </>
  );
};

export default ModalEstudiantes;
