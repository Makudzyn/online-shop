import {useContext} from 'react';
import {createBrand, updateBrand, deleteBrand, fetchBrands} from "../../http/productAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.jsx";
import CreateEntity from "./CreateEntity.jsx";

const CreateBrand = observer(({show, onHide}) => {
  const {brandStore} = useContext(Context); // Данные о бренде из стора
  return (
    <CreateEntity
      onHide={onHide}
      show={show}
      entityType={"brand"}
      storeSetEntity={brandStore.setBrands.bind(brandStore)} // Передаем метод с привязкой к хранилищу типов
      storeEntityArr={brandStore.brands}
      createEntity={createBrand}
      updateEntity={updateBrand}
      deleteEntity={deleteBrand}
      fetchEntities={fetchBrands}
    />
  );
});

export default CreateBrand;