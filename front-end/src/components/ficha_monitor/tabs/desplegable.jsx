import React from 'react';
import {useState } from "react";
import {Row, } from "react-bootstrap";


const Desplegable = ({item}) => {

    const [open, setOpen] = useState(false)
        return (
            <Row className="col_link_text_reporte_seguimientos_nombre">
                {item['nombre']}  {item['apellido']}  {item['cod_univalle']}
            </Row>
        )
    
}

export default Desplegable































