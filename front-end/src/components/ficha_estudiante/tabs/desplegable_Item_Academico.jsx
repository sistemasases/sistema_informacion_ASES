import React from 'react';
import {Row, Col} from "react-bootstrap";
import DataTable from'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import {  desencriptar } from '../../../modulos/utilidades_seguridad/utilidades_seguridad';
const Desplegable_item_academico = ({item}) => {


  const columnas2 = [
    {
      name:'codigo materia',
      selector:'codigo_materia',
      sortable: true,
      minWidth: '100',
      maxWidth: '300px'
    },

    
    {
      name:'nombre_materia',
      selector:'nombre_materia',
      sortable:true,
      minWidth: '300px',
      maxWidth: '300px'
    },


    {
      name:'creditos',
      selector:'creditos',
      sortable:true,
      minWidth: '100px',
      maxWidth: '100px'
    },


    {
      name:'nota',
      selector:'nota',
      sortable:true,
      minWidth: '100px',
      maxWidth: '100px'
    },


    {
        name:'fecha_cancelacion_materia',
        selector:'fecha_cancelacion_materia',
        sortable:true,
        minWidth: '200px',
        maxWidth: '200px'
      },
  ]


  const userRole = desencriptar(sessionStorage.getItem('rol'));

    
    if(item.nombre){
        return (
            <>{ userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' || userRole === 'DIRECTOR_ACADEMICO' ? <></> :
            <Row className="periodo_activo_o_no">
                        {item.semestre_actual === true ? 
                        (<Col>sin datos</Col>)
                            :
                        (<Col>sin datos</Col>)}
            </Row>
            }</>
        )
    } else if (item[1].json_materias)
            {return(
                <>{ userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' || userRole === 'DIRECTOR_ACADEMICO' ? <></> :
                <Row>
                    <Col xs={12} className="col_reportes" >
                        <Row>
                            <Col xs={6}>
                                promedio semestral : {item[1].promedio_semestral}
                            </Col>
                            <Col xs={6}>
                                promedio acumulado : {item[1].promedio_acumulado}
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col_reportes" >
                        <Row>
                            <Col xs={12}>
                                {/* <DataTable
                                    columns={columnas2}
                                    data={item[1].json_materias}
                                    filter={true}
                                    filterPlaceHolder={2}
                                    filterDigit={1}
                                    exportHeaders={true}
                                    striped
                                    >
                                </DataTable> */}
                                <DataTableExtensions
                                    columns={columnas2}
                                    data={item[1].json_materias}
                                    filterPlaceHolder={2}
                                    filterDigit={1}
                                    exportHeaders={true}>
                                        
                                    <DataTable
                                    striped
                                    />
                                </DataTableExtensions>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                }</>
                )
            }
            else
            {return(
                <>{ userRole === 'vcd_academico' || userRole === 'DIR_PROGRAMA' || userRole === 'DIRECTOR_ACADEMICO' ? <></> :
                <Row>
                    Cargando...
                </Row>
                }</>
                )
            }
}

export default Desplegable_item_academico



