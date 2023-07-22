import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const CreateType = ({show, onHide}) => {
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
              placeholder={"Enter here type title..."}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={onHide}>Add type</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;