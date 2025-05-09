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
        
        <Col className="form-column" xs={"6"} md={"6"}>



    <div className="custom-div-check-documentos">
        <div className="custom-checkbox-label">
          ¿Pertenece a univalle?<span className='simbolo-obligatorio'> *</span>
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
        <label className='custom-div'>Estamentos<span className='simbolo-obligatorio'> *</span></label>
        <Select
          className='create-select'
          name="estamentos"
          placeholder='Seleccione estamentos'
          options={estamentoOptions}
          value={estamentoOptions.find(option => option.label === state.estamentos?.[0]) || null}
          onChange={handleSelectNoMultiChange}
          isDisabled={state.pertenencia_univalle === false}
        />
      </div>

          <div>
          <label className='custom-div'>Sede de universidad del valle{state.estamentos?.includes("Estudiante de posgrado") && (
          <span className='simbolo-obligatorio'> *</span>
        )}</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Select
                className='create-select'
                name="sedes"
                placeholder='Seleccione sede'
                options={sedeOptions}
                value={sedeOptions.find(option => option.label === state.sedes?.[0]) || null}
                onChange={handleSelectNoMultiChange}
                isDisabled={state.pertenencia_univalle === false}

              />
            )}
          </div>
        </div>


    </Col>

    <Col className="form-column" xs={"6"} md={"6"}>

    <div>
      <label className='custom-div'>Nombre del programa académico{state.estamentos?.includes("Estudiante de posgrado") && (
          <span className='simbolo-obligatorio'> *</span>
        )}</label>
      <div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <Select
            className='create-select'
            name="programas"
            placeholder='Seleccione programa'
            options={programaOptions}
            value={programaOptions.find(option => option.label === state.programas?.[0]) || null}
            onChange={handleSelectNoMultiChange}
            isDisabled={state.pertenencia_univalle === false}

          />
        )}
      </div>
    </div>
    
        <div>
                <label className='custom-div'>Codigo de estudiante (escribir sin los dos primeros dígitos EJ: 1424550){state.estamentos?.includes("Estudiante de posgrado") && (
                  <span className='simbolo-obligatorio'> *</span>
                )}
              </label>
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
                <label className='custom-div'>Semestre del estudiante{state.estamentos?.includes("Estudiante de posgrado") && (
                  <span className='simbolo-obligatorio'> *</span>
                )}</label>      
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

    </Col>
    </Container>
    </div>

    
    </>
  );
};

export default InformacionAcademica;