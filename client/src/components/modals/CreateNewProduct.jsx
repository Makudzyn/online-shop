import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../main.jsx";

const CreateNewProduct = ({show, onHide}) => {
  const {product} = useContext(Context);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, {title: "", description: "", number: Date.now()}]);
  }
  const removeInfo = (number) => {
    setInfo(info.filter(item => item.number !== number));
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown data-bs-theme="dark" className={"mt-2"} >
          <Dropdown.Toggle variant={"outline-dark"}>
            Select type of new product
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {product.types.map(type =>
              <Dropdown.Item
                key={type.id}
              >
                {type.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown data-bs-theme="dark" className={"mt-2"} >
          <Dropdown.Toggle variant={"outline-dark"}>
            Select brand of new product
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {product.brands.map(brand =>
              <Dropdown.Item
                key={brand.id}
              >
                {brand.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          placeholder={"Enter product name..."}
          className={"mt-2"}
        />
        <Form.Control
          placeholder={"Enter product price..."}
          className={"mt-2"}
          type={"number"}
        />
        <Form.Control
          className={"mt-2"}
          type={"file"}
        />
        <hr/>
        <Button
          variant={"outline-dark"}
          onClick={addInfo}
        >
          Add new product info
        </Button>
        {info.map(item =>
          <Row key={item.number} className={"mt-3"}>
            <Col md={4}>
              <Form.Control
                placeholder={"Enter title..."}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder={"Enter description..."}
              />
            </Col>
            <Col md={4}>
              <Button
                variant={"outline-danger"}
                onClick={() => removeInfo(item.number)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={onHide}>Add new product</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewProduct;