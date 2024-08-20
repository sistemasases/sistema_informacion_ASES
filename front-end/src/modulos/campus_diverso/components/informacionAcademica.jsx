import React from 'react';
import { Container, Col, Button,} from 'react-bootstrap';
import Select from 'react-select';
import { preventNonNumericValues } from './ingresoDatosBasicos';




const InformacionAcademica = ({
    state,
    handleChange,
    handleSelectChange,
    handleArrayChange,
    handleAddItem,
    handleDeleteItem,
    handleCheckboxChange,
    estamentoOptions,
    isLoading,
    handleSelectChange2,
    maxLengthBasicInput
}) => {
  return (
    <>
    <h1 className='title-banner'> Información Académica </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>

        <div>
                <label className='custom-div'>Sede de la universidad</label>
                <input
                className='input-updated'
                  type="text"
                  name="sede_universidad"
                  placeholder='Ingrese la sede'
                  value={state.sede_universidad}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.sede_universidad.length}`}</span>
        </div>

        <div>
                <label className='custom-div'>Nombre del programa academico</label>
                <input
                className='input-updated'
                  type="text"
                  name="nombre_programa_academico"
                  placeholder='Ingrese el programa academico'
                  value={state.nombre_programa_academico}
                  onChange={handleChange}
                  maxLength={maxLengthBasicInput}
                />
                <span className="char-count">{`Caracteres restantes: ${maxLengthBasicInput - state.nombre_programa_academico.length}`}</span>
        </div>




        <div className="custom-div-check-documentos ">
  <div className="custom-checkbox-label">
    ¿Pertenece a univalle?
  </div>
  <label className="custom-checkbox">
    <input
      type="checkbox"
      checked={state.pertenencia_univalle}
      name="pertenencia_univalle"
      value={state.pertenencia_univalle}
      onChange={handleCheckboxChange}
    />
    <span className="checkmark"></span>
  </label>
</div>


    </Col>

    <Col className="form-column" xs={"10"} md={"6"}>
    
        <div>
                <label className='custom-div'>Codigo del estudiante</label>
                <div>
                <input
                className='input-updated'
                  type="text"
                  name="codigo_estudiante"
                  placeholder='Ingrese el código'
                  value={state.codigo_estudiante}
                  onChange={handleChange}
                  onKeyDown={preventNonNumericValues}
                  maxLength="15"
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
                  onChange={handleChange}
                  maxLength="2"
                />
             
        </div>

        <div>
              <label className='custom-div'>Estamentos</label>
              <div>
                {isLoading ? (
                  <p>Cargando...</p>
                ):(
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
    
                  />
                  )}
              </div>
            </div>

    </Col>
    </Container>

    
    </>
  );
};

export default InformacionAcademica;