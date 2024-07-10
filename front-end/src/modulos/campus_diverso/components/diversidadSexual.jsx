import React from 'react';
import { Container, Col,   } from 'react-bootstrap';
import Select from 'react-select';


const DiversidadSexual = ({  
    state,
    handleChange,
    handleSelectChange,
    isLoading,
    pronombresOptions,
    documentoOptions,
    expresionesOptions,
    orientacionOptions,
    identidadesGeneroOptions,
    handleCheckboxChange

  }) => {



  return (
    <>
    <h1 className='title-banner'> Diversidad Sexual </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>
          
    
        <div>
                <label className='custom-div'>¿Cambio de nombre/sexo?</label>
                <div>
                <input
                  type="text"
                  placeholder='Ingrese información'
                  name="cambio_nombre_sexo_documento"
                  value={state.cambio_nombre_sexo_documento}
                  onChange={handleChange}
                />
                </div>
        </div>
    
        <div>
              <label className='custom-div'>Pronombres</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='form-react-select'
                  name="pronombres"
                  placeholder='Seleccione pronombres'
                  options={pronombresOptions}
                  value={state.pronombres.map(option => ({
                  value: option,
                  label: pronombresOptions.find(o => o.value === option).label
                  }))}
                  onChange={handleSelectChange}
    
                  />
                  )}
              </div>
            </div>
    
            <div>
              <label className='custom-div'>Respuesta cambio documento</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='form-react-select'
                  name="respuestas_cambio_documento"
                  placeholder='Seleccione respuestas a cambio de documento'
                  options={documentoOptions}
                  value={state.respuestas_cambio_documento.map(option => ({
                  value: option,
                  label: documentoOptions.find(o => o.value === option).label
                  }))}
                  onChange={handleSelectChange}
    
                  />
                  )}
              </div>
            </div>
    
            <div>
              <label className='custom-div'>Expresión de género</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='form-react-select'
                  name="expresiones_de_genero"
                  placeholder='Seleccione expresiones de género'
                  options={expresionesOptions}
                  value={state.expresiones_de_genero.map(option => ({
                  value: option,
                  label: expresionesOptions.find(o => o.value === option).label
                  }))}
                  onChange={handleSelectChange}
    
                  />
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
                  checked={state.recibir_orientacion_cambio_en_documento}
                  name="recibir_orientacion_cambio_en_documento"
                  value={state.recibir_orientacion_cambio_en_documento}
                  onChange={handleCheckboxChange}
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
                  placeholder='Seleccione orientaciones sexuales'
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
              <label className='custom-div'>Identidades de género</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  placeholder='Seleccione identidades de género'
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