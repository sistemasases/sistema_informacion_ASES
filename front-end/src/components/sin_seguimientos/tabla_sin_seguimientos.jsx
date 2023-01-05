import React, {useMemo, useState} from 'react';
import ReactDOM from "react-dom";
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import Columnas from './columnas' ;
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Cabecera from "./cabecera.jsx";
import DataTable, {selectFilter} from'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Select from 'react-select'  ;

const Tabla_sin_Seguimientos = () =>{

  const columns = useMemo(()=> Columnas,[]);
  const data = useMemo(()=> MOCK_DATA, []);

  const instancias = useTable({
    columns,
    data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  }=instancias



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
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Apellidos</h4></Row>
</div>),
      selector:'last_name',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Cantidad de fichas</h4></Row>
</div>),
      selector:'phone',
      sortable:true
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Cantidad de inasistencias</h4></Row>
</div>),
      selector:'age',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Total de fichas</h4></Row>
</div>),
      selector:'age',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Monitor</h4></Row>
        <Row><select /></Row>
  </div>),
      selector:'phone',
      sortable:true
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Practicante</h4></Row>
        <Row className="center_tabla_sin_seguimientos"><select /></Row>
  </div>),
      selector:'age',
      sortable:true,
    },
    {
      name:(<div><Row className="center_tabla_sin_seguimientos"><h4 className="texto_mas_pequeño">Profecional</h4></Row>
        <Row><select /></Row>
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

  const tableData = {
    columnas2,
    data,
  }; 




























    return (
        
        <Container >
          <Row>
            <Cabecera/>
          </Row>
          <Row>
            <DataTableExtensions
            columns={columnas2}
            data={MOCK_DATA}
            filter={false}
            exportHeaders={true}
            >
              
            <DataTable
            columns={columnas2}
            data={MOCK_DATA}
            pagination 
            paginationRowsPerPageOptions={[10,20,30,40,50,100]}
            paginationComponentOptions={paginacionOpciones}            
            />
            </DataTableExtensions>
            
          </Row>
        </Container>
    )
}

export default Tabla_sin_Seguimientos 