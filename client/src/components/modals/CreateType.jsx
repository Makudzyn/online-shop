import React, {useContext, useState} from 'react';
import {Button, Form, Modal, Table} from "react-bootstrap";
import {createType} from "../../http/productAPI.js";
import {Context} from "../../main.jsx";

const CreateType = ({show, onHide}) => {
  const {typeStore} = useContext(Context); // Данные о товаре из стора
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
          Edit/Remove Types Panel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped hover bordered variant={"dark"}>
          <thead>
            <tr>
              <th >Type ID</th>
              <th>Type name</th>
              <th colSpan={2}>Control buttons</th>
            </tr>
          </thead>
          <tbody>
              {typeStore.types.map(type =>
                <tr>
                  <td>{type.id}</td>
                  <td>{type.name}</td>
                  <td>
                    <Button variant={"warning"}
                            className={"w-100"}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant={"danger"}
                            className={"w-100"}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )}

          </tbody>

        </Table>


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