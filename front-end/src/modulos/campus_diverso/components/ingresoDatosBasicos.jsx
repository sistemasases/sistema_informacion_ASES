import React from 'react';
import { Container, Row, Col, Button, Modal,  } from 'react-bootstrap';

const IngresoDatosBasicos = ({state,
    handleChange,
    isLoading,
    razasOptions

}) => {
  return (
    <>
        <h1> Ingreso de datos básicos </h1>
    <Container className="container_informacion_general" xs={"10"} sm={"6"}>
    
      <Col className="form-column" xs={"10"} md={"6"}>
      
       
      
        <div>
          <label className='custom-div' >nombre identitario</label>
          <div >
            <input
              type="text"
              placeholder="Enter username"
              name="nombre_identitario"
              value={state.nombre_identitario}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>nombre</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese nombre"
              name="nombre"
              value={state.nombre}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Apellido</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese apellido"
              name="apellido"
              value={state.apellido}
              onChange={handleChange}
            />
          </div>
        </div>
       

   
        <div>
          <label className='custom-div'>Tipo de documento</label>
          <div>
            <input
              className='input'
              type="text"
              placeholder="CC, TI , CE , ETC.."
              name="tipo_doc"
              value={state.tipo_doc}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Numero de documento</label>
          <div>
            <input
              className='input'
              type="text"
              placeholder="123456"
              name="num_doc"
              value={state.num_doc}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <label className='custom-div'>Estrato socioeconomico</label>
          <div>
            <input
              type="number"
              placeholder="Estrato"
              name="estrato_socioeconomico"
              value={state.estrato_socioeconomico}
              onChange={handleChange}
              pattern='[0-9]*'
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Teléfono residencia</label>
          <div>
            <input
              type="number"
              placeholder="Ingrese número telefonico"
              name="telefono_res"
              value={state.telefono_res}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Estado civil</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese estado civil"
              name="estado_civil"
              value={state.estado_civil}
              onChange={handleChange}
            />
          </div>
        </div>
       
        

        <div>
          <label className='custom-div'>Nombre de persona de confianza</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              name="nombre_persona_de_confianza"
              value={state.nombre_persona_de_confianza}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Número de persona de confianza</label>
          <div>
            <input
              type="number"
              placeholder="Ingrese numero"
              name="telefono_persona_de_confianza"
              value={state.telefono_persona_de_confianza}
              onChange={handleChange}
            />
          </div>
        </div>
    {/*  
        <div>
          <label>Relacion persona confianza</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select
              name="nombre_persona_confianza"
              value={state.nombre_persona_confianza}
              onChange={handleChange}          
            >
              <option value="">Seleccione la relacion </option>
              {relacionOptions.map((nombre_persona_confianza, index) => (
                <option key={index} value={nombre_persona_confianza}>
                  {nombre_persona_confianza} 
                </option>
              ))}
              
              </select>
              )}
          </div>
        </div>
*/}
      </Col>

      
      
      <Col className="form-column" xs={"10"} md={"6"}>
    
      <div>
          <label className='custom-div'>Ciudad de nacimiento</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese ciudad de nacimiento"
              name="ciudad_nacimiento"
              value={state.ciudad_nacimiento}
              onChange={handleChange}
              pattern='[0-9]*'
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Fecha de nacimiento</label>
          <div>
            <input
              type="date"
              name="fecha_nac"
              value={state.fecha_nac}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Grupo poblacional</label>
          <div>
            {isLoading ? (
              <p>Cargando...</p>
            ):(
            <select 
              className='form-select'
              name="pertenencia_grupo_poblacional"
              value={state.pertenencia_grupo_poblacional}
              onChange={handleChange}
            >
              <option value="">Seleccione un grupo poblacional </option>
              {razasOptions.map((pertenencia_grupo_poblacional, index) => (
                <option key={index} value={pertenencia_grupo_poblacional}>
                  {pertenencia_grupo_poblacional} 
                </option>
              ))} 
              
              </select>
              )}
          </div>
        </div>


        <div>
          <label className='custom-div'>Departamento de nacimiento</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="departamento_nacimiento"
              value={state.departamento_nacimiento}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label className='custom-div'>País de nacimiento</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="pais_nacimiento"
              value={state.pais_nacimiento}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Ciudad de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="ciudad_residencia"
              value={state.ciudad_residencia}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Zona de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese el departamento"
              name="zona_residencial"
              value={state.zona_residencial}
              onChange={handleChange}

            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Direccion de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese su direccion"
              name="direccion_residencia"
              value={state.direccion_residencia}
              onChange={handleChange}

            />
          </div>
        </div>
        
        <div>
          <label className='custom-div'>Barrio de residencia</label>
          <div>
            <input
              type="text" 
              placeholder="Ingrese su barrio"
              name="barrio_residencia"
              value={state.barrio_residencia}
              onChange={handleChange}

            />
          </div>
        </div>

                
        <div>
          <label className='custom-div'>Número de la comuna</label>
          <div>
            <input
              type="number" 
              placeholder="Ingrese la comuna"
              name="comuna_barrio"
              value={state.comuna_barrio}
              onChange={handleChange}

            />
          </div>
        </div>
        
      </Col>
      

    </Container>
    </>
  );
};

export default IngresoDatosBasicos;