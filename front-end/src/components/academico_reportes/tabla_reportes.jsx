import React, { useState, useEffect } from 'react';
import { Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import DataTable from 'react-data-table-component';

const TablaReportes = ({ columns, data }) => {
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const newFilteredData = data.filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(newFilteredData);
    };

    return (
        <Container>
            <Form className='search-bar'>
                <InputGroup className="mb-3">
                    <BsSearch />
                    <FormControl
                        className='search-bar-academico'
                        placeholder="Buscar"
                        aria-label="Buscar"
                        aria-describedby="basic-addon2"
                        onChange={handleSearch}
                    />
                </InputGroup>
            </Form>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
            />
        </Container>
    );
};

export default TablaReportes;
