import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/productAPI.js";

const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('');
  // Функция создания/добавления нового типа
  const addType = () => {
    createType({name: value}).then(data => {
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
          Add type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Enter here type title..."}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={addType}>Add type</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;