import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand, createType} from "../../http/productAPI.js";

const CreateBrand = ({show, onHide}) => {
  const [value, setValue] = useState('');
  const addBrand = () => {
    createBrand({name: value}).then(data => {
        setValue("")
        onHide()
      }
    );
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
          Add brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Enter here brand title..."}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={addBrand}>Add brand</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;