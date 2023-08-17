import React, {useContext, useEffect, useState} from 'react';
import {Button, FloatingLabel, Form, Modal, Table} from "react-bootstrap";
import {createType, deleteType, fetchBrands, fetchProducts, fetchTypes, updateType} from "../../http/productAPI.js";
import {Context} from "../../main.jsx";
import {observer} from "mobx-react-lite";

const CreateType = observer(({show, onHide}) => {
  const {typeStore} = useContext(Context); // Данные о товаре из стора
  const [newTypeField, setNewTypeField] = useState('');
  const [editedTypeName, setEditedTypeName] = useState('');
  const [initialTypeName, setInitialTypeName] = useState('');
  const [changesMade, setChangesMade] = useState(false);
  const [selectedTypeField, setSelectedTypeField] = useState(null);
  const [editingState, setEditingState] = useState(false);


  const inputRefs = {}; // Создаем объект для хранения рефов инпутов
  useEffect(() => {
    if (editingState && selectedTypeField !== null && inputRefs[selectedTypeField]) {
      inputRefs[selectedTypeField].focus(); // Фокусируем инпут при входе в режим редактирования
    }
  }, [editingState, selectedTypeField]);

  useEffect(() => { // Получаем типы из БД
    const fetchData = async () => {
      if (changesMade) {
        try {
          const data = await fetchTypes();
          typeStore.setTypes(data);
          setChangesMade(false); // Сбрасываем флаг после успешного обновления данных
        } catch(e) {
          alert("Error fetching types: " + e.message);
          setChangesMade(false); // В случае ошибки тоже сбрасываем флаг
        }
      }
    };
    fetchData();
}, [changesMade])

  // Функция создания/добавления нового типа
  async function addType() {
    try {
      await createType({name: newTypeField});
      setNewTypeField(""); // Сбрасываем поле ввода
      setChangesMade(true); // Устанавливаем флаг, чтобы обновить данные после успешного запроса
    } catch(e) {
      alert("Error adding type: " + e.message);
    }
  }

  // Функция изменения нозвания типа
  const editType = (id, name) => {
    setEditingState(true)
    setInitialTypeName(name);
    setSelectedTypeField(id);
    setEditedTypeName(name);
  }

  async function removeType(id) {
    try {
      await deleteType(id);
      setEditingState(false);
      setChangesMade(true); // Устанавливаем флаг после успешного запроса
    } catch (e) {
      alert("Error removing type: " + e.message);
    }
  }

  const restoreInitialTypeName = () => {
    setEditingState(false);
    setEditedTypeName(initialTypeName);
  }

  async function saveNameChanges(id, newName) {
    try {
      await updateType(id, {name: newName});
      setEditingState(false);
      setChangesMade(true); // Устанавливаем флаг после успешного запроса
    } catch (e) {
      alert("Error updating type: " + e.message);
    }
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
                          onClick={() => saveNameChanges(type.id, editedTypeName)}
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
                        plaintext
                        readOnly
                        className={"text-white"}
                        value={type.name}
                        style={{width: "200px"}}
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
                          onClick={() => removeType(type.id)}
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

        <Form>
          <Form.Group className={"d-flex"}>
            <Form.Control
              value={newTypeField}
              type={"text"}
              onChange={e => setNewTypeField(e.target.value)}
              size={"lg"}
              placeholder={"Enter here type name..."}
            />
            <Button
              variant={"outline-success"}
              onClick={addType}
              className={"w-25 ms-2"}
            >
              Add type
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default CreateType;