import React, {useContext} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../main.jsx";

const CreateNewProduct = ({show, onHide}) => {
  const {product} = useContext(Context);
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
        <Dropdown data-bs-theme="dark" className={"mt-2"}>
          <Dropdown.Toggle variant={"outline-dark"} >
            Select type of new product...
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
        <Dropdown data-bs-theme="dark" className={"mt-2"}>
          <Dropdown.Toggle variant={"outline-dark"} >
            Select brand of new product...
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={onHide}>Add new product</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewProduct;