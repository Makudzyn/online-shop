import {useEffect, useState} from 'react';
import {Modal, Table} from "react-bootstrap";
import SaveRestoreEntityForm from "./modalComponents/SaveRestoreEntityForm.jsx";
import EditDeleteEntityForm from "./modalComponents/EditDeleteEntityForm.jsx";
import AddEntityForm from "./modalComponents/AddEntityForm.jsx";

const CreateEntity = (
  {
    show, onHide, storeSetEntity, storeEntityArr, entityType,
    createEntity, updateEntity, deleteEntity, fetchEntities,
  }) => {

  const capitalTypeName = entityType[0].toUpperCase() + entityType.slice(1);

  const [newEntity, setNewEntity] = useState(''); // Инпут добавления новой сущности
  const [editedEntityName, setEditedEntityName] = useState(''); // Состояние хранящее изменение в имени сущности
  const [initialEntityName, setInitialEntityName] = useState(''); // Первоначальное название сущности (для восстановления)
  const [changesMade, setChangesMade] = useState(false); // Состояние отслеживающее какие-либо изменения (добавление, изменение названия, удаление)
  const [selectedField, setSelectedField] = useState(null); // Состояние хранящее выбраное поле
  const [editingState, setEditingState] = useState(false); // Состояние указывающее что поле находится в режиме редактирования

  const inputRefs = {}; // Создаем объект для хранения рефов инпутов
  useEffect(() => { // При переход в режим редактирования делаем фокус на инпуте
    if (editingState && selectedField !== null && inputRefs[selectedField]) {
      inputRefs[selectedField].focus(); // Фокусируем инпут для выбраного поля
    }
  }, [editingState, selectedField]);

  const handleError = (error, action) => { // Функция алерта при ошибках
    alert(`${action}: ${error.message}`);
  };

  useEffect(() => { // Подгружаем сущности из БД
    const fetchData = async () => {
      if (changesMade) { // Если были сделаны какие-то изменения
        try {
          const data = await fetchEntities(); // Подгружаем сущности
          storeSetEntity(data); // Записываем в стор
          setChangesMade(false); // Сбрасываем флаг после успешного обновления данных
        } catch(e) {
          handleError(e, `fetching ${entityType}`); // Возвращаем ошибку
          setChangesMade(false); // В случае ошибки тоже сбрасываем флаг
        }
      }
    };
    fetchData(); // Вызываем функцию
  }, [changesMade])

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
          Add/Edit/Remove {entityType} Panel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped hover bordered variant={"dark"}>
          <thead>
          <tr>
            <th>{capitalTypeName} ID</th>
            <th>{capitalTypeName} name</th>
          </tr>
          </thead>
          <tbody>
          {storeEntityArr.map(entity =>
            <tr key={entity.id}>
              <td>{entity.id}</td>
              {editingState && selectedField === entity.id // В зависимости от режима (редактирования/чтения) отображаем разные кнопки
                ?
                <td className={"d-flex justify-content-between"}>
                  <SaveRestoreEntityForm
                    updateEntityDB={updateEntity}
                    setEditingState={setEditingState}
                    setChangesMade={setChangesMade}
                    handleError={handleError}
                    inputRefs={inputRefs}
                    editedEntityName={editedEntityName}
                    entityType={entityType}
                    setEditedEntityName={setEditedEntityName}
                    initialEntityName={initialEntityName}
                    entityId={entity.id}
                  />
                </td>
                :
                <td className={"d-flex justify-content-between"}>
                  <EditDeleteEntityForm
                    removeEntityDB={deleteEntity}
                    handleError={handleError}
                    setEditingState={setEditingState}
                    setChangesMade={setChangesMade}
                    setSelectedField={setSelectedField}
                    setInitialName={setInitialEntityName}
                    setEditedName={setEditedEntityName}
                    entityId={entity.id}
                    entityName={entity.name}
                    entityType={entityType}
                  />
                </td>
              }
            </tr>
          )}
          </tbody>
        </Table>

        <AddEntityForm
          createEntityDB={createEntity}
          handleError={handleError}
          entityField={newEntity}
          setEntityField={setNewEntity}
          setChangesMade={setChangesMade}
          entityType={entityType}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateEntity;