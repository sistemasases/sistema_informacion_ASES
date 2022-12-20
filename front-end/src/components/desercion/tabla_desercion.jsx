import React, {useMemo, useState} from 'react';
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Cabecera from "./cabecera.jsx";
import DataTable, {selectFilter} from'react-data-table-component';
import Select from 'react-select'  ;

const Tabla_desercion = () =>{

  const data = useMemo(()=> MOCK_DATA, []);



  const tablaCampeones =[
    {id:1, año:"222", campeon:"siiiii", subcampeon:"siiiiiiiii"},
    {id:2, año:"233", campeon:"siiiii", subcampeon:"siiiiiiiii"},
    {id:3, año:"244", campeon:"siiiii", subcampeon:"siiiiiiiii"},
    {id:4, año:"255", campeon:"siiiii", subcampeon:"siiiiiiiii"},
  ]



  const columnas2 = [
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Codigo</h4></Row>
            </div>),
      selector:'id',
      sortable:true
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Cedula</h4></Row>
</div>),
      selector:'phone',
      sortable:true
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Nombres</h4></Row>
</div>),
      selector:'first_name',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Número de documento</h4></Row>
</div>),
      selector:'last_name',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Número de carreras</h4></Row>
</div>),
      selector:'phone',
      sortable:true
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">2020A</h4></Row>
</div>),
      selector:'age',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">2020B</h4></Row>
</div>),
      selector:'age',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">2021A</h4></Row>
  </div>),
      selector:'phone',
      sortable:true
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">2021B</h4></Row>
  </div>),
      selector:'age',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">2022A</h4></Row>
  </div>),
      selector:'age',
      sortable:true,
    },

  ]
    

  const paginacionOpciones={
    rowsPerPageText:'textooooo',
    rangeSeparratorText:'de',
    selectAllRowsItem:true,
    selectAllRowsItemtEXT:'TODO',

  }

    return (
        
        <Container >
          <Row>
            <Cabecera/>
          </Row>
          <Row>
            <DataTable
            paginationComponentOptions={paginacionOpciones}
            columns={columnas2}
            data={MOCK_DATA}
            pagination
            />
          </Row>
          
        </Container>
    )
}

export default Tabla_desercion 