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
  const {productStore, typeStore, brandStore, paginationStore} = useContext(Context); // Данные о товаре из стора

  useEffect(() => { // Получаем типы, бренды и продукты из БД
    fetchTypes().then(data => typeStore.setTypes(data))
    fetchBrands().then(data => brandStore.setBrands(data))
    fetchProducts(null, null, 1, 1).then(data => {
      productStore.setProducts(data.rows)
      productStore.setTotalCount(data.count)
      }
    )
  }, [])

  useEffect(() => { // Изменяем отображаемые продукты в зависимости от выбраных параметров сортировки и страницы
    fetchProducts(typeStore.selectedType.id, brandStore.selectedBrand.id, paginationStore.page, paginationStore.limit).then(data => {
      productStore.setProducts(data.rows)
      productStore.setTotalCount(data.count)
      }
    )
    paginationStore.setPage(1);
  }, [paginationStore.page, typeStore.selectedType, brandStore.selectedBrand])

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