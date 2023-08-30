import React from 'react';
import {Button, Form} from "react-bootstrap";

const AddEntityForm = ({createEntityDB, handleError, entityField, setEntityField, setChangesMade, entityType}) => {
// Функция создания/добавления новой сущности
  async function addEntity() {
    try {
      await createEntityDB({name: entityField}); // Добавляем новую сущность с помощью функции-запроса
      setEntityField(""); // Сбрасываем поле ввода
      setChangesMade(true); // Устанавливаем флаг, чтобы обновить данные после успешного запроса
    } catch(e) {
      handleError(e, `adding ${entityType}`); // Возвращаем ошибку
    }
  }
  return (
    <Form>
      <Form.Group className={"d-flex"}>
        <Form.Control
          value={entityField}
          type={"text"}
          onChange={e => setEntityField(e.target.value)}
          size={"lg"}
          placeholder={`Enter here ${entityType} name...`}
        />
        <Button
          variant={"outline-success"}
          onClick={addEntity}
          className={"w-25 ms-2"}
        >
          Add {entityType}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddEntityForm;