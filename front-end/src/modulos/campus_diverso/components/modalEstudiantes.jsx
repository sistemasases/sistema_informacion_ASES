import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ModalSeguimientos from './modalSeguimientos';
import Select from 'react-select';


const ModalEstudiantes = ({
  isModalOpen,
  closeModal,
  selectedUser,
  diversidadInfo,
  academicoInfo,
  generalInfo = { factores_de_riesgo: [], profesionales_que_brindo_atencion:[] },
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
  handleArrayFieldChange,
  handleAddItem,
  handleDeleteItem,
  handleArrayChange,
}) => {

  const titles = [
    'Datos Básicos',
    'Información de Diversidad Sexual',
    'Información General ',
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

 /* const [editableRiskFactors, setEditableRiskFactors] = useState(generalInfo.factores_de_riesgo);



  const handleObservationChange = (index, event) => {
    const newRiskFactors = [...editableRiskFactors];
    newRiskFactors[index].observacion_factor_riesgo = event.target.value;
    setEditableRiskFactors(newRiskFactors);
  };

  const handleAddRiskFactor = () => {
    setEditableRiskFactors([...editableRiskFactors, { nombre_factor_riesgo: '', observacion_factor_riesgo: '' }]);
  }; */

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
      className='form-react-select'
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
                  <div className='div-modal'><b>¿Tiene EPS?:</b> {generalInfo.tiene_eps}</div>
                  <div className='div-modal'><b>¿Tiene EPS?: </b>
            {isEditing ? (
              <input type="text" name="tiene_eps" value={editableUser.tiene_eps || ''} onChange={handleInputChange}
              />) : (generalInfo.tiene_eps)} </div>                
                  <div className='div-modal'><b>Nombre de la EPS:</b> {generalInfo.nombre_eps}</div>                
                  <div className='div-modal'><b>Regimen de la EPS:</b> {generalInfo.regimen_eps}</div>
                  <div className='div-modal'><b>Tipo de entidad que brinda acompañamiento:</b> {generalInfo.tipo_entidad_acompanamiento_recibido}</div>
                  <div className='div-modal'><b>Calificación de acompañamiento recibido:</b> {generalInfo.calificacion_acompanamiento_recibido}</div>
                  <div className='div-modal'><b>Profesionales que brindaron atención:</b> {generalInfo.profesionales_que_brindo_atencion.join(', ')}</div>





                  </Col>
                  <Col className="form-column" xs={"10"} md={"6"}>  
                  <div className='div-modal'><b>Calificación relacion familiar:</b> {generalInfo.calificacion_relacion_familiar}</div>
                  <div className='div-modal'><b>Creencia religiosa:</b> {generalInfo.creencia_religiosa}</div>
                  <div className='div-modal'><b>Decisión encuentro inicial con profesional:</b> {generalInfo.decision_encuentro_inicial_con_profesional}</div>
                  <div className='div-modal'><b>Origen de descubrimiento de campus diverso:</b> {generalInfo.origen_descubrimiento_campus_diverso}</div>
                  <div className='div-modal'><b>Comentarios o sugerencias:</b> {generalInfo.comentarios_o_sugerencias_de_usuario}</div>
                  <div className='div-modal'><b>Creencia religiosa:</b> {generalInfo.creencia_religiosa}</div>             
                  <div className='div-modal'><b>Actividades específicas en tiempo libre:</b> {generalInfo.actividades_especificas_tiempo_libre}</div>
                  <div className='div-modal'><b>Ocupaciones actuales:</b> {generalInfo.ocupaciones_actuales.join(', ')}</div>


                  </Col> 

                  </Row>
                  <Row>

                  <div className='div-modal'><b>Observación general fuente de ingresos:</b> {generalInfo.observacion_general_fuente_de_ingresos}</div>
                  <div className='div-modal'><b>Observación general redes de apoyo:</b> {generalInfo.observacion_general_redes_de_apoyo}</div>
                  <div className='div-modal'><b>Observación general factores de riesgo:</b> {generalInfo.observacion_general_factores_de_riesgo}</div>
                  <div className='div-modal'><b>Observación horario:</b> {generalInfo.observacion_horario}</div>
                  <div className='div-modal'><b>Observación general actividades específicas en tiempo libre:</b> {generalInfo.observacion_general_actividades_especificas_tiempo_libre}</div>
                  <div className='div-modal'><b>Observación general relacion convivencia vivienda:</b> {generalInfo.observacion_general_relacion_convivencia_vivienda}</div>

                  <div className='div-modal'><b>Redes de apoyo:</b>
                    <ul>
                      {generalInfo.redes_de_apoyo.map((redes, index) => (
                        <li key={index}>
                          <div><b>Nombre:</b> {redes.nombre_red_apoyo}</div>
                          <div className='div-observacion'><b>Observación:</b> {redes.observacion_red_apoyo}</div>
                        </li>
                      ))}
                    </ul>
                  </div>                  
    {/*              
   <div className='div-modal'>
      <b>Factores de riesgo:</b>
      <ul className='ul-style'>
        {editableRiskFactors.map((factor, index) => (
          <li className='li-style' key={index}>
            <div>
              <b>Nombre:</b> {factor.nombre_factor_riesgo}
            </div>
            <div className='div-observacion'>
              <b>Observación:</b>
              {isEditing ? (
                <input
                  type="text"
                  value={factor.observacion_factor_riesgo}
                  onChange={(e) => handleObservationChange(index, e)}
                />
              ) : (
                factor.observacion_factor_riesgo
              )}
            </div>
          </li>
        ))}
      </ul>
      {isEditing && (
        <button type="button" onClick={handleAddRiskFactor}>
          Añadir observación
        </button>
      )}
    </div>
     */}
                  <div className='div-modal'><b>Convivencias en vivienda:</b>
                    <ul className='ul-style'>
                      {generalInfo.convivencias_en_vivienda.map((convivencia, index) => (
                        <li className='li-style' key={index}>
                          <div><b>Nombre:</b> {convivencia.nombre_convivencia_vivienda}</div>
                          <div className='div-observacion'><b>Observación:</b> {convivencia.observacion_convivencia_vivienda}</div>
                        </li>
                      ))}
                    </ul>
                  </div>  

                  <div className='div-modal'><b>Fuentes de ingresos:</b>
                    <ul className='ul-style'>
                      {generalInfo.fuentes_de_ingresos.map((fuentes, index) => (
                        <li className='li-style' key={index}>
                          <div><b>Nombre:</b> {fuentes.nombre_fuente_ingreso}</div>
                          <div className='div-observacion'><b>Observación:</b> {fuentes.observacion_fuente_ingresos}</div>
                        </li>
                      ))}
                    </ul>
                  </div> 

                  <div className='div-modal'><b>Actividades en tiempo libre:</b>
                    <ul className='ul-style'>
                      {generalInfo.actividades_tiempo_libre.map((actividades, index) => (
                        <li className='li-style' key={index}>
                          <div><b>Nombre:</b> {actividades.nombre_actividad_tiempo_libre}</div>
                          <div className='div-observacion'><b>Observación:</b> {actividades.observacion_actividad_tiempo_libre}</div>
                        </li>
                      ))}
                    </ul>
                  </div> 

                  <div className='div-modal'><b>Acompañamiento recibido:</b>
                    <ul className='ul-style'>
                      {generalInfo.acompanamientos_recibido.map((acompañamiento, index) => (
                        <li className='li-style' key={index}>
                          <div><b>Nombre:</b> {acompañamiento.nombre_acompanamiento_recibido}</div>
                          <div className='div-observacion'><b>Observación:</b> {acompañamiento.observacion_acompanamiento_recibido}</div>
                        </li>
                      ))}
                    </ul>
                  </div> 
                  </Row>

                  </div>
             )}

                {currentPage === 3 && academicoInfo && (
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
          <b>Estamentos:</b>
          {isEditing ? (
            <div>
              {(editableUser.estamentos || []).map((profesional, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder='Ingrese estamento'
                    value={profesional}
                    onChange={(e) => handleArrayChange('estamentos', index, e.target.value)}
                  />
                  <Button className='boton-container' onClick={() => handleDeleteItem('estamentos', index)}>Eliminar</Button>
                </div>
              ))}
              <Button className='boton-container' onClick={() => handleAddItem('estamentos')}>Agregar estamento</Button>
            </div>
          ) : (
            academicoInfo.estamentos.join(', ')
          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}

              
            
              {currentPage === 4 && documentosInfo && (
                <div>

                  <Row>
                  <Col className="form-column" xs={"10"} md={"6"}>

                  <div className='div-modal'><b>Autorización manejo de datos:</b> {documentosInfo.autorizacion_manejo_de_datos ? 'Sí' : 'No'}</div>                
                  <div className='div-modal'><b>Firma consentimiento informado:</b> {documentosInfo.firma_consentimiento_informado ? 'Sí' : 'No'}</div>                
                  <div className='div-modal'><b>Firma terapia hormonal:</b> {documentosInfo.firma_terapia_hormonal ? 'Sí' : 'No'}</div>   
                  <div className='div-modal'><b>Apgar familiar:</b> {documentosInfo.apgar_familiar}</div>                             
                  <div className='div-modal'><b>Documento digital y archivo:</b> {documentosInfo.documento_digital_y_archivo ? 'Sí' : 'No'}</div>                

                  </Col>
                  <Col className="form-column" xs={"10"} md={"6"}>               
                  <div className='div-modal'><b>Ecomapa:</b> {documentosInfo.ecomapa ? 'Sí' : 'No'}</div>                
                  <div className='div-modal'><b>Arbol familiar:</b> {documentosInfo.arbol_familiar ? 'Sí' : 'No'}</div>                

                  </Col> 
                  </Row>

                  </div>
             )}
              {currentPage === 5   && seguimientosInfo && (
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
              {currentPage < 5 && (
                <Button variant="primary" onClick={nextPage}>
                  Adelante
                </Button>
              )}
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
