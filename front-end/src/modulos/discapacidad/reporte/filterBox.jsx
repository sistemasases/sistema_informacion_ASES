import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

const FilterBox = () => {
  const [search, set_Search] = useState({
    busqueda: "",
  });

  const onSearch = (e) => {
    set_Search({ ...search, busqueda: e.target.value });
    // console.log(search);
  };

  return (
    <>
      {/* Buscador */}
      <Row>
        <Col
          sm={1}
          xs={1}
          style={{ paddingRight: "0.1em", marginRight: "0.1em" }}
        >
          <Form.Control
            type="text"
            placeholder="Buscar "
            // value={}
            onChange={(e) => onSearch(e)}
            style={{ width: "6em" }}
          />
        </Col>

        <Col
          sm={1}
          xs={1}
          style={{
            textAlign: "left",
            paddingLeft: "0.1em",
            marginleft: "0.1em",
          }}
        >
          <Button>X</Button>
        </Col>
      </Row>
    </>
  );
}

export default FilterBox;
