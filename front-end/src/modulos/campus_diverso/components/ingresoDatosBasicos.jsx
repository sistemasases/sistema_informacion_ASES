import React from 'react';
import { Container, Col,   } from 'react-bootstrap';
export const preventNegativeValues = (e) => ["e", "E", "+", "-", ".",",",].includes(e.key) && e.preventDefault()
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
          <label className='custom-div'>nombre y apellido</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese nombre y apellido"
              name="nombre_y_apellido"
              value={state.nombre_y_apellido}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Email</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese email"
              name="email"
              value={state.email}
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
              name="tipo_documento"
              value={state.tipo_documento}
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
              name="numero_documento"
              value={state.numero_documento}
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
              name="telefono"
              value={state.telefono}
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
          <label className='custom-div'>Identidad etnico racial</label>
          <div>
            <input
              type="text"
              placeholdr="Ingrese la identidad"
              name="identidad_etnico_racial"
              pattern='[0-9]*'
              value={state.identidad_etnico_racial}
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
          <label className='custom-div'>relación con la persona de confianza</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese la relación"
              name="relacion_persona_de_confianza"
              value={state.relacion_persona_de_confianza}
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
              pattern='[0-9]*'
              onKeyDown={preventNegativeValues}
              min="0"
              value={state.telefono_persona_de_confianza}
              onChange={handleChange}
            />
          </div>
        </div>


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
          <label className='custom-div'>Corregimiento de nacimiento</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese corregimiento de nacimiento"
              name="corregimiento_nacimiento"
              value={state.corregimiento_nacimiento}
              onChange={handleChange}
              pattern='[0-9]*'
            />
          </div>
        </div>

        <div>
          <label className='custom-div'>Municipio de nacimiento</label>
          <div>
            <input
              type="text"
              placeholder="Ingrese municipio de nacimiento"
              name="municipio_nacimiento"
              value={state.municipio_nacimiento}
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
              name="fecha_nacimiento"
              value={state.fecha_nacimiento}
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