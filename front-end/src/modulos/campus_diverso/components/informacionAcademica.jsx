import React from 'react';
import { Container, Col, Button,} from 'react-bootstrap';
import Select from 'react-select';

export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()



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
    handleSelectChange2
}) => {
  return (
    <>
    <h1 className='title-banner'> Información Académica </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>

        <div>
                <label className='custom-div'>Sede de la universidad</label>
                <div>
                <input
                className='input-updated'
                  type="text"
                  name="sede_universidad"
                  placeholder='Ingrese la sede'
                  value={state.sede_universidad}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
                <label className='custom-div'>Nombre del programa academico</label>
                <div>
                <input
                className='input-updated'
                  type="text"
                  name="nombre_programa_academico"
                  placeholder='Ingrese el programa academico'
                  value={state.nombre_programa_academico}
                  onChange={handleChange}
                />
                </div>
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
                  type="number"
                  name="codigo_estudiante"
                  placeholder='Ingrese el código'
                  value={state.codigo_estudiante}
                  onChange={handleChange}
                />
                </div>
        </div>
    
        <div>
                <label className='custom-div'>Semestre del estudiante</label>
                <div>
                <input
                className='input-updated'
                  type="number"
                  name="semestre_academico"
                  placeholder='Ingrese el semestre'
                  value={state.semestre_academico}
                  onChange={handleChange}
                />
                </div>
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