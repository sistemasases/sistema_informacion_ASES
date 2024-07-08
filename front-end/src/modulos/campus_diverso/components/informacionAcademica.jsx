import React from 'react';
import { Container, Row, Col, Button, Modal,  } from 'react-bootstrap';
export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()



const InformacionAcademica = ({
    state,
    handleChange,
    handleArrayChange,
    handleAddItem,
    handleDeleteItem,
    handleCheckboxChange
}) => {
  return (
    <>
    <h1> Información Académica </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
        
        <Col className="form-column" xs={"10"} md={"6"}>

        <div>
                <label className='custom-div'>Sede de la universidad</label>
                <div>
                <input
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
                  type="text"
                  name="nombre_programa_academico"
                  placeholder='Ingrese el programa academico'
                  value={state.nombre_programa_academico}
                  onChange={handleChange}
                />
                </div>
        </div>




        <div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className='custom-div'>¿Pertenece a univalle?</div>
                <input
                  type="checkbox"
                  checked={state.pertenencia_univalle}
                  name="pertenencia_univalle"
                  value={state.pertenencia_univalle}
                  onChange={handleCheckboxChange}
                />
              </label>
        </div>

    </Col>

    <Col>
    
        <div>
                <label className='custom-div'>Codigo del estudiante</label>
                <div>
                <input
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
                  type="number"
                  name="semestre_academico"
                  placeholder='Ingrese el semestre'
                  value={state.semestre_academico}
                  onChange={handleChange}
                />
                </div>
        </div>

        <div>
      <label className="custom-div"> Estamento </label>
      {state.estamentos.map((profesional, index) => (
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


    </Col>
    </Container>

    
    </>
  );
};

export default InformacionAcademica;