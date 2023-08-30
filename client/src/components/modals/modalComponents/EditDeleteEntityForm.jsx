import React from 'react';
import {Button, Form} from "react-bootstrap";

const EditDeleteEntityForm = (
  {
    removeEntityDB, handleError, setEditingState,
    setChangesMade, setSelectedField, setInitialName,
    setEditedName, entityId, entityName, entityType
  }) => {
  // Функция удаления сущности
  async function removeEntity(id) {
    try {
      await removeEntityDB(id); // Удаляем сущность с помощью функции-запроса
      setEditingState(false); // Выходим из режима редактирования
      setChangesMade(true); // Устанавливаем флаг после успешного запроса
    } catch (e) {
      handleError(e, `removing ${entityType}`); // Возвращаем ошибку
    }
  }
  // Функция перехода в режим редактирования поля
  const editEntity = (id, name) => {
    setEditingState(true)
    setInitialName(name);
    setSelectedField(id);
    setEditedName(name);
  }
  return (
    <>
      <Form.Control
        plaintext
        readOnly
        className={"text-white"}
        value={entityName}
        style={{width: "200px"}}
      />
      <div
        className={"d-flex justify-content-between"}
        style={{width: "170px", paddingLeft: "10px"}}
      >
        <Button
          variant={"warning"}
          onClick={() => editEntity(entityId, entityName)}
          style={{width: "65px"}}
        >
          Edit
        </Button>
        <Button
          variant={"danger"}
          onClick={() => removeEntity(entityId)}
          style={{width: "80px"}}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default EditDeleteEntityForm;