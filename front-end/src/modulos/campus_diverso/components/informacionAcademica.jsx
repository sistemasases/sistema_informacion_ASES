import React from 'react';
import { Container, Col, Button,} from 'react-bootstrap';
import Select from 'react-select';
import { preventNonNumericValues } from './ingresoDatosBasicos';




const InformacionAcademica = ({
    state,
    handleChange,
    handleCheckboxChange,
    estamentoOptions,
    isLoading,
    handleSelectChange2,
    maxLengthBasicInput,
    sedeOptions,
    programaOptions,
    handleSelectNoMultiChange,
    handleChangeNumber
}) => {
  return (
    <>
    <h1 className='title-banner'> Información Académica </h1>
    <div className='div-scroll-registro'>

    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"11"} md={"6"}>



              <div className="custom-div-check-documentos">
        <div className="custom-checkbox-label">
          ¿Pertenece a univalle?
        </div>
        <label className="custom-radio">
          <input
            type="radio"
            name="pertenencia_univalle"
            value={true}
            checked={state.pertenencia_univalle === true}
            onChange={handleCheckboxChange}
          />
          Sí
        </label>
        <label className="custom-radio">
          <input
            type="radio"
            name="pertenencia_univalle"
            value={false}
            checked={state.pertenencia_univalle === false}
            onChange={handleCheckboxChange}

          />
          No
        </label>
      </div>


          <div>
          <label className='custom-div'>Sede de universidad del valle</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="sedes"
                placeholder='Seleccione sede'
                options={sedeOptions}
                value={sedeOptions.find(option => option.value === state.sedes)}
                onChange={handleSelectNoMultiChange}
              />
            )}
          </div>
        </div>


            <div>
      <label className='custom-div'>Nombre del programa académico</label>
      <div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <Select
            className='create-select'
            name="programas"
            placeholder='Seleccione programa'
            options={programaOptions}
            value={programaOptions.find(option => option.value === state.programas)}
            onChange={handleSelectNoMultiChange}
          />
        )}
      </div>
    </div>




 


    </Col>

    <Col className="form-column" xs={"9"} md={"6"}>
    
        <div>
                <label className='custom-div'>Codigo del estudiante</label>
                <div>
                <input
                className='input-updated'
                  type="text"
                  name="codigo_estudiante"
                  placeholder='Ingrese el código'
                  value={state.codigo_estudiante}
                  onChange={handleChangeNumber}
                  onKeyDown={preventNonNumericValues}
                  maxLength="9"
                  disabled={state.pertenencia_univalle === false}
                />
                </div>
        </div>
    
        <div>
                <label className='custom-div'>Semestre del estudiante</label>
                
                <input
                className='input-updated'
                  type="text"
                  name="semestre_academico"
                  placeholder='Ingrese el número de su semestre'
                  onKeyDown={preventNonNumericValues}
                  value={state.semestre_academico}
                  onChange={handleChangeNumber}
                  maxLength="2"
                  disabled={state.pertenencia_univalle === false}

                />
             
        </div>

              <div>
        <label className='custom-div'>Estamentos</label>
        <Select
          isMulti
          className='create-select'
          name="estamentos"
          placeholder='Seleccione estamentos'
          options={estamentoOptions}
          value={state.estamentos.map(option => ({
            label: option,
            value: estamentoOptions.find(o => o.label === option).value
          }))}
          onChange={handleSelectChange2}
          isDisabled={state.pertenencia_univalle === false}
        />
      </div>
    </Col>
    </Container>
    </div>

    
    </>
  );
};

export default InformacionAcademica;