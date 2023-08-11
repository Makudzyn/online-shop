import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar.jsx";
import BrandBar from "../components/BrandBar.jsx";
import ProductList from "../components/ProductList.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {fetchBrands, fetchProducts, fetchTypes} from "../http/productAPI.js";
import Pages from "../components/Pages.jsx";

const Shop = observer(() => { // Используем observer чтобы MobX отслеживал изменения и делал ре-рендер компонентов
  const {product} = useContext(Context); // Данные о товаре из стора

  useEffect(() => { // Получаем типы, бренды и продукты из БД
    fetchTypes().then(data => product.setTypes(data))
    fetchBrands().then(data => product.setBrands(data))
    fetchProducts(null, null, 1, 1).then(data => {
        product.setProducts(data.rows)
        product.setTotalCount(data.count)
      }
    )
  }, [])

  useEffect(() => { // Изменяем отображаемые продукты в зависимости от выбраных параметров сортировки и страницы
    fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, product.limit).then(data => {
        product.setProducts(data.rows)
        product.setTotalCount(data.count)
      }
    )
  }, [product.page, product.selectedType, product.selectedBrand])

  return (
    <Container>
      <Row className={"mt-2"}>
        <Col md={3}>
          <TypeBar/>
          <BrandBar/>
        </Col>
        <Col md={9}>
          <ProductList/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;