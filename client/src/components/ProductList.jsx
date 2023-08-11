import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {Row} from "react-bootstrap";
import ProductItem from "./ProductItem.jsx";

const ProductList = observer(() => { // Используем observer чтобы MobX отслеживал изменения и делал ре-рендер компонентов
  const {product} = useContext(Context); // Данные о товаре из стора
  return (
    <Row className={"d-flex"}>
      {product.products.map(product =>
        <ProductItem key={product.id} product={product}/>
      )}
    </Row>
  );
});

export default ProductList;