import React, {useMemo, useState} from 'react';
import {useTable, Table} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import Columnas from './columnas' ;
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";

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

    return (
        
        <Container >
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) =>
              (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))
                  }
                </tr>
              )
              )}

            </thead>


            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return(
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Container>
    )
}

export default Tabla_sin_Seguimientos 