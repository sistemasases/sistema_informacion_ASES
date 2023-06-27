import React from 'react';
import {useState } from "react";
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import DataTable, {selectFilter} from'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
const Desplegable_item_academico = ({item}) => {

    const [open, setOpen] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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




  const conditionalRowStyles = [
    {
      when: (row) => row.index % 2 === 0, // Aplica la clase 'row-even' a filas pares
      style: {
        backgroundColor: '#f2f2f2',
      },
    },
    {
      when: (row) => row.index % 2 !== 0, // Aplica la clase 'row-odd' a filas impares
      style: {
        backgroundColor: '#ffffff',
      },
    },
  ];

  const customStyles = {
    cells: {
      style: {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
      },
    },
  };
    
    if(item.nombre){
        return (
            <Row className="periodo_activo_o_no">
                        {item.semestre_actual == true ? 
                        (<Col>sin datos</Col>)
                            :
                        (<Col>sin datos</Col>)}
            </Row>
        )
    } else if (item[1].json_materias)
            {return(
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
                                <DataTable
                                    columns={columnas2}
                                    data={item[1].json_materias}
                                    filter={true}
                                    filterPlaceHolder={2}
                                    filterDigit={1}
                                    exportHeaders={true}
                                    customStyles={customStyles}
                                    conditionalRowStyles={conditionalRowStyles}
                                    >
                                </DataTable>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                )
            }
            else
            {return(
                <Row>
                    Cargando...
                </Row>
                )
            }
}

export default Desplegable_item_academico



