import React, {useState, useEffect} from 'react';
import {Container, Row, Table} from "react-bootstrap";
import All_Rols from '../../service/all_rols';
import All_Users_Rols from '../../service/all_users_rol';

const semestre_sistemas_component = () =>{

    const [state,set_state] = useState({
        data: [],
    })

    useEffect(()=>{
        All_Users_Rols.all_users_rols().then((res) => {
            set_state({
                ...state,
                data: res
            })
        })
    },[]);

    return (
        <Container>
            <Row className="rowJustFlex" align='left'>
                <Table responsive hover size="sm" class="table">
                    <thead>
                        <tr class="table-info">
                            <th align='center'>Username</th>
                            <th align='center'>Nombre</th>
                            <th align='center'>Apellido</th>
                            <th align='center'>Correo</th>
                            <th align='center'>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.data.map((e)=>(
                            <tr>
                                <td>{e.username}</td>
                                <td>{e.first_name}</td>
                                <td>{e.last_name}</td>
                                <td>{e.email}</td>
                                <td>{e.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default semestre_sistemas_component