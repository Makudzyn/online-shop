import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Modal, Table} from "react-bootstrap";
import {createType, updateType} from "../../http/productAPI.js";
import {Context} from "../../main.jsx";

const CreateType = ({show, onHide}) => {
  const {typeStore} = useContext(Context); // Данные о товаре из стора
  const [value, setValue] = useState('');
  const [editedTypeName, setEditedTypeName] = useState('');
  const [initialTypeName, setInitialTypeName] = useState('');
  const [selectedTypeField, setSelectedTypeField] = useState(null);
  const [editingState, setEditingState] = useState(false);


  const inputRefs = {}; // Создаем объект для хранения рефов инпутов
  useEffect(() => {
    if (editingState && selectedTypeField !== null && inputRefs[selectedTypeField]) {
      inputRefs[selectedTypeField].focus(); // Фокусируем инпут при входе в режим редактирования
    }
  }, [editingState, selectedTypeField]);

  // Функция создания/добавления нового типа
  const addType = () => {
    createType({name: value}).then(data => {
        setValue("")
        onHide()
      }
    );
  }

  // Функция изменения нозвания типа
  const editType = (id, name) => {
    setInitialTypeName(name);
    setSelectedTypeField(id);
    setEditedTypeName(name);
    setEditingState(true)
  }

  const restoreInitialTypeName = () => {
    setEditedTypeName(initialTypeName);
  }

  const saveNameChanges = () => {
    setEditingState(false);
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
          Add/Edit/Remove types Panel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped hover bordered variant={"dark"}>
          <thead>
            <tr>
              <th>Type ID</th>
              <th>Type name</th>
            </tr>
          </thead>
          <tbody>
              {typeStore.types.map(type =>
                <tr key={type.id}>
                  <td>{type.id}</td>
                  {editingState && selectedTypeField === type.id
                    ?
                    <td className={"d-flex justify-content-between"}>
                      <Form.Control
                        ref={input => (inputRefs[type.id] = input)} // Сохраняем реф в объекте по id типа
                        className={"bg-transparent text-white border-0 p-0"}
                        value={editedTypeName}
                        onChange={e => setEditedTypeName(e.target.value)}
                        style={{width: "200px", height: "38px"}}
                      />
                      <div
                        className={"d-flex justify-content-between"}
                        style={{width: "170px", paddingLeft: "10px"}}
                      >
                        <Button
                          variant={"outline-warning"}
                          style={{width: "65px"}}
                          onClick={saveNameChanges}
                        >
                          Save
                        </Button>
                        <Button
                          variant={"outline-danger"}
                          style={{width: "80px"}}
                          onClick={restoreInitialTypeName}
                        >
                          Restore
                        </Button>
                      </div>
                    </td>
                    :
                    <td className={"d-flex justify-content-between"}>
                      <Form.Control
                        disabled
                        className={"bg-transparent text-white border-0 p-0"}
                        value={type.name}
                        style={{width: "200px", height: "38px"}}
                      />
                      <div
                        className={"d-flex justify-content-between"}
                        style={{width: "170px", paddingLeft: "10px"}}
                      >
                      <Button
                        variant={"warning"}
                        onClick={() => editType(type.id, type.name)}
                        style={{width: "65px"}}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={"danger"}
                        style={{width: "80px"}}
                      >
                        Delete
                      </Button>
                      </div>
                    </td>
                  }
                </tr>
              )}
          </tbody>
        </Table>

        <Form className={"d-flex justify-content-between"}>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Enter here type title..."}
            style={{width: "78%"}}
          />
          <Button
            variant={"outline-success"}
            onClick={addType}
            style={{width: "20%"}}
          >
            Add type
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={() => console.log("Changes submitted.")}>Submit changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;