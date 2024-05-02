import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Tab, Tabs, Accordion } from 'react-bootstrap';
import Pestañas from './pestañas';
import Tabla_resumen from './tabla_resumen';
import TablaReportes from './tabla_reportes';
import Bar_chart from './barchart';

const Contenedor_reportes = () => {
    const titulosProfesores = [
        'Total de cursos',
        'Cursos con al menos un item',
        'Cursos con al menos un item calificado',
        'Cursos con al menos un parcial',
        'Cursos con al menos un parcial calificado'
    ];

    const titulosItems = [
        'Total Estudiantes',
        'Estudiantes sin items calificados',
        'Estudiantes con uno o más items perdidos',
        'Estud. con más items perdidos que ganados',
        'Estud. con más items ganados que perdidos'
    ];

    const itemsProfesores = [
        ['100', '50', '25', '12', '6'],
    ];

    const itemsItems = [
        ['200', '50', '30', '20', '6'],
    ]

    const datosProfesores = titulosProfesores.map((titulo, index) => ({
        name: titulo,
        cursos: parseInt(itemsProfesores[0][index])
    }));

    const datosItems = titulosItems.map((titulo, index) => ({
        name: titulo,
        cursos: parseInt(itemsItems[0][index])
    }));

    const columns = [
        { name: 'Curso', selector: 'curso', sortable: true },
        { name: 'Profesor', selector: 'profesor', sortable: true },
        { name: 'Correo Profesor', selector: 'correo-profesor', sortable: true },
        { name: 'Cantidad de items', selector: 'items', sortable: true },
        { name: 'Items calificados', selector: 'calificados', sortable: true },
        { name: 'Est. sin notas', selector: 'sin', sortable: true },
        { name: 'Est. < 50%', selector: '<50', sortable: true },
        { name: 'Est. >= 50%', selector: '>=50', sortable: true },
    ];
    
    const data = [
        { curso: 'Curso 1', profesor: 'Profesor 1', sin: 10, '<50': 5, '>=50': 15, items: 20, calificados: 18 },
        { curso: 'Curso 2', profesor: 'Profesor 2', sin: 5, '<50': 2, '>=50': 8, items: 10, calificados: 9 },
        { curso: 'Curso 3', profesor: 'Profesor 3', sin: 8, '<50': 3, '>=50': 12, items: 15, calificados: 14 },
    ];


    const listaPestañas = [
        {
            title: 'Reporte de Cursos por Docente',
            content: <Container>
                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Resumen</Accordion.Header>
                        <Accordion.Body>
                            <Tabla_resumen titulos={titulosProfesores} items={itemsProfesores} />
                            <Bar_chart data={datosProfesores} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Reporte de Cursos por Docente</Accordion.Header>
                        <Accordion.Body>
                            <TablaReportes columns={columns} data={data} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        },
        {
            title: 'Reporte de Items por Estudiante',
            content:
                <Container>
                    <Accordion defaultActiveKey={['0']}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Resumen</Accordion.Header>
                            <Accordion.Body>
                                <Tabla_resumen titulos={titulosItems} items={itemsItems} />
                                <Bar_chart data={datosItems} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Reporte de Cursos por Items</Accordion.Header>
                            <Accordion.Body>
                                <TablaReportes />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
        },
    ];

    return (
        <div className='contenedor-reportes'>
            <Pestañas lista_Pestañas={listaPestañas} />
        </div>
    );
};

export default Contenedor_reportes