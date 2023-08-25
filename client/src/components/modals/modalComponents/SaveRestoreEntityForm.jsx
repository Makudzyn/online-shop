import React from 'react';
import {Button, Form} from "react-bootstrap";

const SaveRestoreEntityForm = (
  {
    updateEntityDB, setEditingState, setChangesMade,
    handleError, inputRefs, editedEntityName, entityType,
    setEditedEntityName, initialEntityName, entityId
  }) => {
  // Функция изменения названия типа
  async function updateEntity(id, newName) {
    try {
      await updateEntityDB(id, {name: newName}); // Изменяем название типа с помощью функции-запроса
      setEditingState(false); // Выходим из режима редактирования
      setChangesMade(true); // Устанавливаем флаг после успешного запроса
    } catch (e) {
      handleError(e, `updating${entityType}`); // Возвращаем ошибку
    }
  }
  // Функция восстановления начального названия типа, такого которое имел тип в начале редактирования
  const restoreInitialName = () => {
    setEditingState(false); // Выходим из режима редактирования
    setEditedEntityName(initialEntityName); // Записываем первоначальное имя
  }
  return (
    <>
      <Form.Control
        ref={input => (inputRefs[entityId] = input)} // Сохраняем реф в объекте по id типа
        className={"bg-transparent text-white border-0 p-0"}
        value={editedEntityName}
        onChange={e => setEditedEntityName(e.target.value)}
        style={{width: "200px", height: "38px"}}
      />
      <div
        className={"d-flex justify-content-between"}
        style={{width: "170px", paddingLeft: "10px"}}
      >
        <Button
          variant={"outline-warning"}
          style={{width: "65px"}}
          onClick={() => updateEntity(entityId, editedEntityName)}
        >
          Save
        </Button>
        <Button
          variant={"outline-danger"}
          style={{width: "80px"}}
          onClick={restoreInitialName}
        >
          Restore
        </Button>
      </div>
    </>
  );
};

export default SaveRestoreEntityForm;