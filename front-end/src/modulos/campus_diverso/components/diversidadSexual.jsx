import React from 'react';
import { Container, Col,   } from 'react-bootstrap';
import Select from 'react-select';


const DiversidadSexual = ({  
    state,
    handleChange,
    handleSelectChange,
    isLoading,
    razasOptions,
    pronombresOptions,
    documentoOptions,
    expresionesOptions,
    orientacionOptions,
    identidadesGeneroOptions,
    handleCheckboxChange,
    maxLengthBasicInput,
    sexoAsignadoOptions,
    handleSelectNoMultiChange,

  }) => {



  return (
    <>
    <h1 className='title-banner'> Diversidad Sexual </h1>
    <div className='div-scroll-registro'>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"7"} md={"6"}>

        <div>
              <label className='custom-div'>Sexo asignado al nacer</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                
                  className='create-select'
                  name="sexo_asignado"
                  placeholder='Selecciona el sexo asignado al nacer'
                  options={sexoAsignadoOptions}
                  value={sexoAsignadoOptions.find(option => option.value === state.sexo_asignado)}
                  onChange={handleSelectNoMultiChange}
    
                  />
                  )}
              </div>
          </div>
      

        <div>
            <label className='custom-div'>Identidad de género</label>
            <div>
              {isLoading ? (
                <p>Cargando...</p>
              ) : (
                <Select
                  className='create-select'
                  name="identidades_de_genero"
                  placeholder='Seleccione su orientación sexual'
                  options={identidadesGeneroOptions}
                  value={identidadesGeneroOptions.find(option => option.value === state.identidades_de_genero)}
                  onChange={handleSelectNoMultiChange}
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
                
                  className='create-select'
                  name="expresiones_de_genero"
                  placeholder='Seleccione expresiones de género'
                  options={expresionesOptions}
                  value={expresionesOptions.find(option => option.value === state.expresiones_de_genero)}
                  onChange={handleSelectNoMultiChange}
    
                  />
                  )}
              </div>
          </div>

          <div>
            <label className='custom-div'>Orientación sexual</label>
            <div>
              {isLoading ? (
                <p>Cargando...</p>
              ) : (
                <Select
                  className='create-select'
                  name="orientaciones_sexuales"
                  placeholder='Seleccione su orientación sexual'
                  options={orientacionOptions}
                  value={orientacionOptions.find(option => option.value === state.orientaciones_sexuales)}
                  onChange={handleSelectNoMultiChange}
                />
              )}
            </div>
          </div>

      </Col>
    
      <Col className="form-column" xs={"7"} md={"6"}>
    
      <div>
          <label className='custom-div'>¿Has realizado algún cambio en el componente nombre y/o sexo en el documento de identidad  </label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="respuestas_cambio_documento"
                placeholder='Seleccione su respuesta de cambio de documento'
                options={documentoOptions}
                value={documentoOptions.find(option => option.value === state.respuestas_cambio_documento)}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>
            
  
        <div >
              <label className='custom-div'>Pertenencia grupo poblacional</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
                <Select
                  isMulti
                  className='create-select'
                  placeholder='Seleccione grupo poblacional'
                  name="pertenencia_grupo_poblacional"
                  options={razasOptions}
                  value={state.pertenencia_grupo_poblacional.map(option => ({
                  value: option,
                  label: razasOptions.find(o => o.value === option).label
                  }))}
                  onChange={handleSelectChange}
    
                  />
                  )}
              </div>
            </div>

            <div className="custom-div-check">
          <label className='custom-label'>
            ¿Deseas recibir orientación para el cambio en el componente nombre y/o sexo en el documento?
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={state.recibir_orientacion_cambio_en_documento}
              name="recibir_orientacion_cambio_en_documento"
              value={state.recibir_orientacion_cambio_en_documento}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>


            </Col>
            </Container>
            </div>
            </>
  );
};

export default DiversidadSexual;