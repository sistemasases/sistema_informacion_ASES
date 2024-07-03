import React from 'react';
import { Container, Row, Col, Button, Modal,  } from 'react-bootstrap';
import Select from 'react-select';

const DiversidadSexual = ({  state,
    handleChange,
    handleSelectChange,
    isLoading,
    estaActivo,
    estaActivo2,
    pronombresOptions,
    documentoOptions,
    expresionesOptions,
    orientacionOptions,
    identidadesGeneroOptions}) => {



  return (
    <>
    <h1> Diversidad Sexual </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>
          
    
        <div>
                <label className='custom-div'>¿Cambio de nombre/sexo?</label>
                <div>
                <input
                  type="text"
                  name="cambio_nombre_sexo_documento"
                  value={state.cambio_nombre_sexo_documento}
                  onChange={handleChange}
                />
                </div>
        </div>
    
      <div>
              <label className='custom-div'> Pronombres </label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <select
                  className='form-select'
                  name="pronombres"
                  value={state.pronombres}
                  onChange={handleChange}
                  
                  
                >
                  <option value="">Seleccione el pronombre </option>
                  {pronombresOptions.map((pronombres, index) => (
                    <option key={index} value={pronombres}>
                      {pronombres} 
                    </option>
                  ))}
                  
                  </select>
                  )}
              </div>
            </div>
    
            <div>
              <label className='custom-div'>Respuesta cambio de documento</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <select
                  className='form-select'
                  name="respuestas_cambio_documento"
                  value={state.respuestas_cambio_documento}
                  onChange={handleChange}
                  
                  
                >
                  <option value="">Seleccione la situacion </option>
                  {documentoOptions.map((respuestas_cambio_documento, index) => (
                    <option key={index} value={respuestas_cambio_documento}>
                      {respuestas_cambio_documento} 
                    </option>
                  ))}
                  
                  </select>
                  )}
              </div>
            </div>
    
            <div>
              <label className='custom-div'>Expresión de genero </label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <select
                  className='form-select'
                  name="expresiones_de_genero"
                  value={state.expresiones_de_genero}
                  onChange={handleChange}
                  
                  
                >
                  <option value="">Seleccione la expresion </option>
                  {expresionesOptions.map((expresiones_de_genero, index) => (
                    <option key={index} value={expresiones_de_genero}>
                      {expresiones_de_genero} 
                    </option>
                  ))}
                  
                  </select>
                  )}
              </div>
            </div>
      </Col>
    
      <Col>
    
      <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>¿Recibir orientacion de cambio en documento?</div>
                <input
                  type="checkbox"
                  checked={estaActivo2}
                  name="recibir_orientacion_cambio_en_documento"
                  value={state.recibir_orientacion_cambio_en_documento}
                  onChange={handleChange}
                />
              </label>
        </div>

        
      <div>
              <label className='custom-div'>Orientacion sexual</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='form-react-select'
                  name="orientaciones_sexuales"
                  options={orientacionOptions}
                  value={state.orientaciones_sexuales.map(option => ({
                  value: option,
                  label: orientacionOptions.find(o => o.value === option).label
                  }))}
                  
    
                  onChange={handleSelectChange}
    
                  
                  />
                  )}
              </div>
            </div>
            
            <div>
              <label className='custom-div'>Identidades de genero</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='form-react-select'
                  name="identidades_de_genero"
                  options={identidadesGeneroOptions}
                  value={state.identidades_de_genero.map(option => ({
                  value: option,
                  label: identidadesGeneroOptions.find(o => o.value === option).label
                  }))}
                  
    
                  onChange={handleSelectChange}
    
                  
                  />
                  )}
              </div>
            </div> 

            </Col>
            </Container>
            </>
  );
};

export default DiversidadSexual;