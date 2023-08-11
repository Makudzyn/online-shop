import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../main.jsx";

const BrandBar = observer(() => { // Используем observer чтобы MobX отслеживал изменения и делал ре-рендер компонентов
  const {product} = useContext(Context); // Данные о товаре(бренде) из стора
  return (
    <ListGroup variant={"flush"}>
      <ListGroup.Item
        className={"mt-3 text-white"}
        bg="dark"
        data-bs-theme="dark"
        variant={"secondary"}
      >
        Brands
      </ListGroup.Item>
      <hr></hr>
      {product.brands.map(brand =>
        <ListGroup.Item
          key={brand.id}
          bg="dark"
          data-bs-theme="dark"
          action
          onClick={() => product.setSelectedBrand(brand)}
          variant={"light"}
        >
          {brand.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default BrandBar;