import {useContext} from 'react';
import {createType, deleteType, fetchTypes, updateType} from "../../http/productAPI.js";
import {Context} from "../../main.jsx";
import {observer} from "mobx-react-lite";
import CreateEntity from "./CreateEntity.jsx";

const CreateType = observer(({show, onHide}) => {
  const {typeStore} = useContext(Context); // Данные о типе из стора
  return (
    <CreateEntity
      onHide={onHide}
      show={show}
      entityType={"type"}
      storeSetEntity={typeStore.setTypes.bind(typeStore)} // Передаем метод с привязкой к хранилищу типов
      storeEntityArr={typeStore.types}
      createEntity={createType}
      updateEntity={updateType}
      deleteEntity={deleteType}
      fetchEntities={fetchTypes}
    />
  );
});

export default CreateType;