import React, { useEffect, useState } from 'react';
import axios from 'axios';
import writeXlsxFile from "write-excel-file";
import { saveAs } from 'file-saver';
import { Chart } from 'react-google-charts';
import { Button, Container, Col, Row } from 'react-bootstrap';

import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../utilidades_seguridad/utilidades_seguridad";
const Descarga_campus = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [paginaActual, setPaginaActual] = useState(0);
  /*Diversidad sexual */
  const [genderData, setGenderData] = useState([['Identidad de Género', 'Cantidad']]);
  const [pronombreData, setPronombreData] = useState([['Pronombres','Cantidad']]);
  const [expresionesData, setExpresionesData] = useState([['Expresiones', 'Cantidad']]);
  const [orientacionesData, setOrientacionesData] = useState([['Orientaciones', 'Cantidad']]);
  /*Información general */
  const [redesData, seteRedesData] = useState([['Redes', 'Cantidad']]);
  const [factoresRiesgoData, setFactoresRiesgoData] = useState((['Factores', 'Cantidad']))
  const [actividadesData, setActividadesData] = useState((['Actividades', 'Cantidad']))
  const [fuentesData, setFuentesData] = useState((['Fuentes', 'Cantidad']))
  /*Información académico */
  const [programaData, setProgramaData] = useState((['Programa', 'Cantidad']))
  const [sedeData, setSedeData] = useState((['Sede', 'Cantidad']))
  const [EstamentosData, setEstamentosData] = useState((['Estamento', 'Cantidad']))

  const headers = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),  
  };
  

  const irAdelante = () => {
    if (paginaActual <= 2) { // Cambia el límite a 1 para dos páginas (0 y 1)
      setPaginaActual(paginaActual + 1);
    }
  };

  // Función para ir a la página anterior
  const irAtras = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Fetch data from the API
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/persona/persona/`, { headers })
      .then(response => {

        const sortedUsers = response.data.sort((a, b) => new Date(a.fecha_creacion_usuario) - new Date(b.fecha_creacion_usuario));

        setUsers(sortedUsers);
       
        const genderCount = { "No registrado": 0 }; // Inicializa el contador de identidades
        const pronounCount = { "No registrado": 0 }; // Inicializa el contador de pronombres vacíos
        const expresionesCount = { "No registrado": 0 }; // Inicializa el contador de pronombres vacíos
        const orientacionesCount = {"No registrado": 0}; // Inicializa el contador de orientaciones vacíos
        const redesCount = {"No registrado": 0}; // Inicializa el contador de redes vacíos
        const factoresCount = {"No registrado": 0}; // Inicializa el contador de redes vacíos
        const actividadesCount = {"No registrado": 0}; // Inicializa el contador de actividades vacíos
        const fuentesCount = {"No registrado": 0}; // Inicializa el contador de fuentes vacíos
        const programasCount = {"No registrado": 0}; // Inicializa el contador de fuentes vacíos
        const sedesCount = {"No registrado": 0}; // Inicializa el contador de sedes vacíos
        const estamentosCount = {"No registrado": 0};

        sortedUsers.forEach(user => {
          // Procesar identidades de género
          if (user.diversidad_sexual && user.diversidad_sexual.identidades_de_genero) {
            const identidades = user.diversidad_sexual.identidades_de_genero;

            if (identidades.length === 0) {
              genderCount["No registrado"]++;
            } else {
              identidades.forEach(gender => {
                genderCount[gender] = (genderCount[gender] || 0) + 1;
              });
            }
          } else {
            genderCount["No registrado"]++;
          }

          // Procesar pronombres
          if (user.diversidad_sexual && user.diversidad_sexual.pronombres) {
            const pronombres = user.diversidad_sexual.pronombres;

            if (pronombres.length === 0) {
              pronounCount["No registrado"]++;
            } else {
              pronombres.forEach(pronoun => {
                pronounCount[pronoun] = (pronounCount[pronoun] || 0) + 1;
              });
            }
          } else {
            pronounCount["No registrado"]++;
          }

           // Procesar expresiones de genero
           if (user.diversidad_sexual && user.diversidad_sexual.expresiones_de_genero) {
            const expresiones = user.diversidad_sexual.expresiones_de_genero;

            if (expresiones.length === 0) {
              expresionesCount["No registrado"]++;
            } else {
              expresiones.forEach(expression => {
                expresionesCount[expression] = (expresionesCount[expression] || 0) + 1;
              });
            }
          } else {
            expresionesCount["No registrado"]++;
          }

           // Procesar orientaciones sexuales
           if (user.diversidad_sexual && user.diversidad_sexual.orientaciones_sexuales) {
            const orientaciones = user.diversidad_sexual.orientaciones_sexuales;

            if (orientaciones.length === 0) {
              orientacionesCount["No registrado"]++;
            } else {
              orientaciones.forEach(index => {
                orientacionesCount[index] = (orientacionesCount[index] || 0) + 1;
              });
            }
          } else {
            orientacionesCount["No registrado"]++;
          }          

        // Procesar redes de apoyo
        if (user.informacion_general && user.informacion_general.redes_apoyo) {
          const redes = user.informacion_general.redes_apoyo;

          if (redes.length === 0) {
            redesCount["No registrado"]++;
          } else {
            redes.forEach(index => {
              redesCount[index] = (redesCount[index] || 0) + 1;
            });
          }
        } else {
          redesCount["No registrado"]++;
        }
        
        // Procesar factores de riesgo
        if (user.informacion_general && user.informacion_general.factores_riesgos) {
          const factores = user.informacion_general.factores_riesgos;

          if (factores.length === 0) {
            factoresCount["No registrado"]++;
          } else {
            factores.forEach(index => {
              factoresCount[index] = (factoresCount[index] || 0) + 1;
            });
          }
        } else {
          factoresCount["No registrado"]++;
        }

        // Procesar factores de riesgo
        if (user.informacion_general && user.informacion_general.actividades_tiempo_libre) {
          const actividades = user.informacion_general.actividades_tiempo_libre;

          if (actividades.length === 0) {
            actividadesCount["No registrado"]++;
          } else {
            actividades.forEach(index => {
              actividadesCount[index] = (actividadesCount[index] || 0) + 1;
            });
          }
        } else {
          actividadesCount["No registrado"]++;
        } 
        // Procesar fuentes de ingreso
        if (user.informacion_general && user.informacion_general.fuentes_ingresos) {
          const fuentes = user.informacion_general.fuentes_ingresos;

          if (fuentes.length === 0) {
            fuentesCount["No registrado"]++;
          } else {
            fuentes.forEach(index => {
              fuentesCount[index] = (fuentesCount[index] || 0) + 1;
            });
          }
        } else {
          fuentesCount["No registrado"]++;
        } 
        
        // Procesar programas academicos
        if (user.informacion_academica && user.informacion_academica.programas) {
          let programs = user.informacion_academica.programas;

          // Convierte "programs" en un array si no lo es
          if (!Array.isArray(programs)) {
            programs = typeof programs === 'string' ? [programs] : [];
          }

          // Si el array está vacío, contar como "No registrado"
          if (programs.length === 0) {
            programasCount["No registrado"]++;
          } else {
            // Si es un array, procesar cada programa
            programs.forEach(index => {
              programasCount[index] = (programasCount[index] || 0) + 1;
            });
          }
        } else {
          programasCount["No registrado"]++;
        }

        // Procesar sedes academicos
        if (user.informacion_academica && user.informacion_academica.sedes) {
          let headquarters = user.informacion_academica.sedes;

          if (!Array.isArray(headquarters)) {
            headquarters = typeof headquarters === 'string' ? [headquarters] : [];
          }

          if (headquarters.length === 0) {
            sedesCount["No registrado"]++;
          } else {
  
            headquarters.forEach(index => {
              sedesCount[index] = (sedesCount[index] || 0) + 1;
            });
          }
        } else {
          sedesCount["No registrado"]++;
        }
        // Procesar estamentos
        if (user.informacion_academica && user.informacion_academica.estamentos) {
          const estates = user.informacion_academica.estamentos;

          if (estates.length === 0) {
            estamentosCount["No registrado"]++;
          } else {
            estates.forEach(index => {
              estamentosCount[index] = (estamentosCount[index] || 0) + 1;
            });
          }
        } else {
          estamentosCount["No registrado"]++;
        }
      });
     
             // Formatear datos para el gráfico de pastel
             const genderChartData = Object.entries(genderCount).map(([gender, count]) => {
              return genderCount === 'Genero'
              ? [gender, count]
              : [`${gender} (${count})`, count];
              });

              const pronounChartData = Object.entries(pronounCount).map(([pronoun, count])  => {
              return genderCount === 'pronombre'
              ? [pronoun, count]
              : [`${pronoun} (${count})`, count];
              });

              const orientationChartData = Object.entries(orientacionesCount).map(([index, count])  => {
                return orientacionesCount === 'orientacion'
                ? [index, count]
                : [`${index} (${count})`, count];
                });

              const redesChartData = Object.entries(redesCount).map(([index, count])  => {
                  return redesCount === 'redes'
                  ? [index, count]
                  : [`${index} (${count})`, count];
                  });
              const factoreschartData = Object.entries(factoresCount).map(([index, count])   => {
                  return factoresCount === 'factores'
                  ? [index, count]
                  : [`${index} (${count})`, count];
                  });
                const actividadesChartData = Object.entries(actividadesCount).map(([index, count])   => {
                  return actividadesCount === 'Actividades'
                  ? [index, count]
                  : [`${index} (${count})`, count];
                  });
                const fuentesChartData = Object.entries(fuentesCount).map(([index, count])   => {
                  return fuentesCount === 'Fuentes'
                  ? [index, count]
                  : [`${index} (${count})`, count];
                  }); 

                const programaChartData = Object.entries(programasCount).map(([index, count])   => {
                return programasCount === 'Programas'
                ? [index, count]
                : [`${index} (${count})`, count];
                });
                const sedesChartData = Object.entries(sedesCount).map(([index, count])   => {
                return sedesCount === 'Sedes'
                ? [index, count]
                : [`${index} (${count})`, count];
                });  

                const estamentosChartData = Object.entries(estamentosCount).map(([index, count]) => {
                return estamentosCount === 'Estamentos'
                ? [index, count]
                : [`${index} (${count})`, count];
                });

              setGenderData([['Identidad de Género', 'Cantidad'], ...genderChartData]);
              setPronombreData([['Pronombres', 'Cantidad'], ...pronounChartData]);
              setOrientacionesData([['Orientaciones', 'Cantidad'], ...orientationChartData]);    
              setExpresionesData([['Expresion', 'Cantidad'], ...Object.entries(expresionesCount)]);
              seteRedesData([['Redes','Cantidad'], ...redesChartData]);
              setFactoresRiesgoData([['Factores','Cantidad'], ...factoreschartData]);
              setActividadesData([['Actividades','Cantidad'], ...actividadesChartData]);
              setFuentesData([['Fuentes','Cantidad'], ...fuentesChartData]);
              setProgramaData([['Programas','Cantidad'], ...programaChartData]);
              setSedeData([['Sedes','Cantidad'], ...sedesChartData]);
              setEstamentosData([['Estamentos','Cantidad'], ...estamentosChartData]);

              

     
             setLoading(false);
           })
           
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
        setLoading(false); // muestra los datos aunque haya un error
      });
  }, []);

  // Prepare data and download as Excel
  const handleDownload = async () => {
    // Define the schema for the Excel file (optional but useful for formatting)
    const schema = [
      {
        column: 'Nombre',
        type: String,
        value: user => user.nombre_y_apellido // Adjust according to your data structure
      },
      {
        column: 'nombre identitario',
        type: String,
        value: user => user.nombre_identitario
      },
      {
        column: 'No. documento',
        type: String,
        value: user => user.numero_documento
      },
      { column: 'Fecha de Creación', 
        type: String,
        value: user => user.fecha_creacion_usuario
      }, 
      {
        column: 'Email',
        type: String,
        value: user => user.email
      },
     
      {
        column: 'Estrato Socioeconómico',
        type: Number,
        value: users => users.estrato_socioeconomico
      },
       


      {
        column: 'Teléfono',
        type: String,  // Usamos String para permitir texto y números
        value: user => user.telefono ? user.telefono : 'No disponible'
      },
      
      {
        column: 'Identidad Étnico-Racial',
        type: String,
        value: users => users.identidad_etnico_racial
      }, 
      
      {
        column: 'Persona de Confianza',
        type: String,
        value: user => user.nombre_persona_de_confianza
      },
      {
        column: 'Teléfono Persona de Confianza',
        type: String,  // Dejamos como Number ya que queremos valores numéricos
        value: user => user.telefono_persona_de_confianza ? user.telefono_persona_de_confianza : 'No disponible'
      },
      {
        column: 'Relación Persona de Confianza',
        type: String,
        value: user => user.relacion_persona_de_confianza
      },
      
      {
        column: 'Estado Civil',
        type: String,
        value: user => user.estado_civil
      },
      {
        column: 'Ciudad de Nacimiento',
        type: String,
        value: user => user.ciudad_nacimiento
      },
      {
        column: 'Corregimiento de Nacimiento',
        type: String,
        value: user => user.corregimiento_nacimiento
      },
      {
        column: 'Municipio de Nacimiento',
        type: String,
        value: user => user.municipio_nacimiento
      },
      {
        column: 'País de Nacimiento',
        type: String,
        value: user => user.pais_nacimiento
      },
      {
        column: 'Departamento de Nacimiento',
        type: String,
        value: user => user.departamento_nacimiento
      },
      {
        column: 'Fecha de Nacimiento',
        type: String,
        value: user => user.fecha_nacimiento
      },
      {
        column: 'Grupo Poblacional',
        type: String,
        value: user => user.pertenencia_grupo_poblacional.join(', ')
      },
      {
        column: 'Comuna/Barrio',
        type: String,
        value: user => user.comuna_barrio ? user.comuna_barrio : 'No disponible'
      },
      {
        column: 'Barrio de Residencia',
        type: String,
        value: user => user.barrio_residencia
      },
      {
        column: 'Ciudad de Residencia',
        type: String,
        value: user => user.ciudad_residencia
      },
      {
        column: 'Dirección de Residencia',
        type: String,
        value: user => user.direccion_residencia
      },

      /* Diversidad sexual */
      {
        column: 'Cambio Nombre/Sexo en Documento',
        type: String,
        value: user => user.diversidad_sexual?.cambio_nombre_sexo_documento 
      },
      {
        column: 'Pronombres',
        type: String,
        value: user => user.diversidad_sexual.pronombres.join(', ')
    },
    {
        column: 'Identidades de Género',
        type: String,
        value: user => user.diversidad_sexual.identidades_de_genero.join(', ')
    },
    {
        column: 'Expresiones de Género',
        type: String,
        value: user => user.diversidad_sexual.expresiones_de_genero.join(', ')
    },
    {
        column: 'Orientaciones Sexuales',
        type: String,
        value: user => user.diversidad_sexual.orientaciones_sexuales.join(', ')
    },
    {
        column: 'Respuestas Cambio Documento',
        type: String,
        value: user => user.diversidad_sexual.respuestas_cambio_documento.join(', ')
    },
    {
      column: 'Recibir orientacion cambio de documento',
      type: String,
      value: user => user.diversidad_sexual.recibir_orientacion_cambio_en_documento ? 'Sí' : 'No'
  },
  /* Información general */

  {
    column: 'Ocupaciones Actuales',
    type: String,
    value: user => user.informacion_general.Ocupaciones_actules
},
{
    column: 'Profesionales que Brindaron Atención',
    type: String,
    value: user => user.informacion_general.profesionales_que_brindaron_atencion
},
{
    column: 'Acompañamiento que Recibió',
    type: String,
    value: user => user.informacion_general.acompanamiento_que_recibio
},
{
    column: 'Dedicación Externa',
    type: String,
    value: user => user.informacion_general.dedicacion_externa
},
{
    column: 'Tiene EPS',
    type: String,
    value: user => user.informacion_general.tiene_eps
},
{
    column: 'Nombre EPS',
    type: String,
    value: user => user.informacion_general.nombre_eps
},
{
    column: 'Régimen EPS',
    type: String,
    value: user => user.informacion_general.regimen_eps
},
{
    column: 'Tipo de Entidad de Acompañamiento Recibido',
    type: String,
    value: user => user.informacion_general.tipo_entidad_acompanamiento_recibido
},
{
    column: 'Calificación del Acompañamiento Recibido',
    type: Number,
    value: user => user.informacion_general.calificacion_acompanamiento_recibido
},
{
    column: 'Motivo de la Calificación del Acompañamiento',
    type: String,
    value: user => user.informacion_general.motivo_calificacion_acompanamiento
},
{
    column: 'Actividades Específicas en Tiempo Libre',
    type: String,
    value: user => user.informacion_general.actividades_especificas_tiempo_libre
},
{
    column: 'Observación Actividades Específicas Tiempo Libre',
    type: String,
    value: user => user.informacion_general.observacion_general_actividades_especificas_tiempo_libre
},
{
    column: 'Observación Fuentes de Ingresos',
    type: String,
    value: user => user.informacion_general.observacion_general_fuente_de_ingresos
},
{
    column: 'Observación Relación Convivencia/Vivienda',
    type: String,
    value: user => user.informacion_general.observacion_general_relacion_convivencia_vivienda
},
{
    column: 'Calificación Relación Familiar',
    type: Number,
    value: user => user.informacion_general.calificacion_relacion_familiar
},
{
    column: 'Observación Redes de Apoyo',
    type: String,
    value: user => user.informacion_general.observacion_general_redes_de_apoyo
},
{
    column: 'Observación Factores de Riesgo',
    type: String,
    value: user => user.informacion_general.observacion_general_factores_de_riesgo
},
{
    column: 'Creencia Religiosa',
    type: String,
    value: user => user.informacion_general.creencia_religiosa
},
{
    column: 'Decisión en Encuentro Inicial con Profesional',
    type: String,
    value: user => user.informacion_general.decision_encuentro_inicial_con_profesional
},
{
    column: 'Observación del Horario',
    type: String,
    value: user => user.informacion_general.observacion_horario
},
{
    column: 'Origen del Descubrimiento de Campus Diverso',
    type: String,
    value: user => user.informacion_general.origen_descubrimiento_campus_diverso
},
{
    column: 'Comentarios o Sugerencias del Usuario',
    type: String,
    value: user => user.informacion_general.comentarios_o_sugerencias_de_usuario
}, {
  column: 'Seguimientos',
  type: String,
  value: user => user.seguimientos
    // Ordena los seguimientos por fecha en orden descendente (más nuevos primero)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .map(seguimiento => {
      // Accede al nombre y cargo de cada profesional dentro del seguimiento
      const profesionales = seguimiento.profesional.length > 0 
        ? seguimiento.profesional.map(prof => `${prof.nombre_profesional} (${prof.cargo_profesional})`).join(', ') 
        : 'N/A'; // Si no hay profesionales asociados, retornar 'N/A'
      
      // Retorna la información del seguimiento con un guion "-" o bullet "•" para cada uno
      return `• Fecha: ${seguimiento.fecha}\n  - Observación: ${seguimiento.observacion}\n  - Profesionales: ${profesionales}.`;
    })
    .join('\n\n') // Doble salto de línea para separar los seguimientos
},





    ];

    // Write the data to an Excel file
    await writeXlsxFile(users, {
      schema,
      fileName: 'usuarios.xlsx'
    });

    //espera a que se cree el gráfico
  };
  

  

  return (
    
    <div>
      <h1 className='title-agradecimiento'>Datos históricos</h1>
 {/* Placeholder para el dashboard */}
 <div className="custom-div">

        <Container>
        <Row>
        {paginaActual === 0 && (
          <>
        <h2>Gráfico enfocado a Diversidad Sexual</h2>

        <Col className="form-column" xs={"6"} md={"6"}>
        
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={genderData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Identidades de Género',
              is3D: true,
              colors: [
                '#5E2B91', // Morado fuerte
                '#7A4BCA', // Morado oscuro
                '#9A6DC4', // Morado medio oscuro
                '#B689D2', // Morado medio
                '#D1A6E0', // Morado claro
                '#E8C6E9', // Morado suave
                '#F1D6F0', // Morado muy suave
                '#F6E0F2', // Lavanda
                '#FAE6F5', // Lavanda suave
                '#FDF3F8', // Lavanda muy suave
                '#FFFFFF'  // Blanco (opcional, para un contraste final)
              ],
              
            }}
          />
        )}
        </div>
        {/* Grafia de pronombres*/}
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={pronombreData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Pronombres',
              is3D: true,
              colors: [
                '#FF8387', // Morado fuerte
                '#FFBA86', // Morado oscuro
                '#F7EA82', // Morado medio oscuro
                '#65E682', // Morado medio
                '#69B0E8', // Morado claro
                '#B381E4', // Morado suave
                '#FF9AEA', // Morado muy suave
                '#3A3A3A', // Lavanda
                '#C87F56', // Lavanda suave
                '#FDF3F8', // Lavanda muy suave
                '#FFFFFF'  // Blanco (opcional, para un contraste final)
              ],
              
            }}
          />
        )}
        </div>
        
        </Col>
        
      
        {/* Grafia de expresiones*/}
        <Col className="form-column" xs={"6"} md={"6"}>
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={expresionesData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Expresiones de género',
              is3D: true,
            }}
          />
        )}
        </div>

        {/* Grafia de orientaciones*/}
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={orientacionesData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Orientaciones Sexuales',
              is3D: true,
            }}
          />
        )}
        </div>
        
        </Col>
        </>
        )}
        {/* Información general*/}

        
        </Row>

        
        <Row>
        {paginaActual === 1 && (
          <>
          <h2>Gráfico enfocado a Información General</h2>
        <Col className="form-column" xs={"6"} md={"6"}>
        
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={factoresRiesgoData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Factores de Riesgo',
              is3D: true,
              colors: [
                '#5E2B91', // Morado fuerte
                '#7A4BCA', // Morado oscuro
                '#9A6DC4', // Morado medio oscuro
                '#B689D2', // Morado medio
                '#D1A6E0', // Morado claro
                '#E8C6E9', // Morado suave
                '#F1D6F0', // Morado muy suave
                '#F6E0F2', // Lavanda
                '#FAE6F5', // Lavanda suave
                '#FDF3F8', // Lavanda muy suave
                '#FFFFFF'  // Blanco (opcional, para un contraste final)
              ],
              
            }}
          />
        )}
        </div>
        {/* Grafia de pronombres*/}
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={actividadesData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Actividades en Tiempo Libre',
              is3D: true,
              colors: [
                '#FF8387', // Morado fuerte
                '#FFBA86', // Morado oscuro
                '#F7EA82', // Morado medio oscuro
                '#65E682', // Morado medio
                '#69B0E8', // Morado claro
                '#B381E4', // Morado suave
                '#FF9AEA', // Morado muy suave
                '#3A3A3A', // Lavanda
                '#C87F56', // Lavanda suave
                '#FDF3F8', // Lavanda muy suave
                '#FFFFFF'  // Blanco (opcional, para un contraste final)
              ],
              
            }}
          />
        )}
        </div>
        
        </Col>
        
      
        {/* Grafia de expresiones*/}
        <Col className="form-column" xs={"6"} md={"6"}>
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={redesData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de redes de apoyo',
              is3D: true,
            }}
          />
        )}
        </div>

        {/* Grafia de orientaciones*/}
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={fuentesData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Fuentes de Ingresos',
              is3D: true,
            }}
          />
        )}
        </div>
        
        </Col>
        </>
        )}
        </Row>

<Row>
        {paginaActual === 2 && (
          <>
          <h2>Gráfico enfocado a Información Académica</h2>
        <Col className="form-column" xs={"6"} md={"6"}>
        
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={programaData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de programas de universidad',
              is3D: true,
              colors: [
                '#5E2B91', // Morado fuerte
                '#7A4BCA', // Morado oscuro
                '#9A6DC4', // Morado medio oscuro
                '#B689D2', // Morado medio
                '#D1A6E0', // Morado claro
                '#E8C6E9', // Morado suave
                '#F1D6F0', // Morado muy suave
                '#F6E0F2', // Lavanda
                '#FAE6F5', // Lavanda suave
                '#FDF3F8', // Lavanda muy suave
                '#FFFFFF'  // Blanco (opcional, para un contraste final)
              ],
              
            }}
            
          />
        )}
        </div>


        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={EstamentosData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Estamentos',
              is3D: true,
              colors: [
                '#5E2B91', // Morado fuerte
                '#7A4BCA', // Morado oscuro
                '#9A6DC4', // Morado medio oscuro
                '#B689D2', // Morado medio
                '#D1A6E0', // Morado claro
                '#E8C6E9', // Morado suave
                '#F1D6F0', // Morado muy suave
                '#F6E0F2', // Lavanda
                '#FAE6F5', // Lavanda suave
                '#FDF3F8', // Lavanda muy suave
                '#FFFFFF'  // Blanco (opcional, para un contraste final)
              ],
              
            }}
            
          />
        )}
        </div>
      </Col>

      <Col className="form-column" xs={"6"} md={"6"}>
        
        <div>
        {loading ? <p>Cargando datos...</p> : (
          <Chart
            chartType="PieChart"
            data={sedeData}
            width="100%"
            height="300px"
            options={{
              title: 'Distribución de Sedes de universidad',
              is3D: true,
              colors: [
                '#5E2B91', // Morado fuerte
                '#7A4BCA', // Morado oscuro
                '#9A6DC4', // Morado medio oscuro
                '#B689D2', // Morado medio
                '#D1A6E0', // Morado claro
                '#E8C6E9', // Morado suave
                '#F1D6F0', // Morado muy suave
                '#F6E0F2', // Lavanda
                '#FAE6F5', // Lavanda suave
                '#FDF3F8', // Lavanda muy suave
                '#FFFFFF'  // Blanco (opcional, para un contraste final)
              ],
              
            }}
            
          />
        )}
        </div>
      </Col>

        


        </>
        )}
        </Row>

        </Container>


      </div>
      

      <Container>
      <Button className='button-inicial' onClick={irAtras} disabled={paginaActual === 0}>
          Anterior
        </Button>
        <Button className='button-inicial' onClick={irAdelante} disabled={paginaActual === 2}>
          Siguiente
        </Button>
        <Button className='button-inicial' 
        onClick={handleDownload}
        disabled={loading}> 
        {loading ? 'Cargando...' : 'Descargar'}
        </Button>  
      </Container>
    </div>
  );
};
export default Descarga_campus;
