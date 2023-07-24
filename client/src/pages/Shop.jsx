import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar.jsx";
import BrandBar from "../components/BrandBar.jsx";
import ProductList from "../components/ProductList.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {fetchBrands, fetchProducts, fetchTypes} from "../http/productAPI.js";

const Shop = observer(() => {
  const {product} = useContext(Context);
  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data))
    fetchBrands().then(data => product.setBrands(data))
    fetchProducts().then(data => product.setProducts(data.rows))
  }, [])
  return (
    <Container>
      <Row className={"mt-2"}>
        <Col md={3}>
          <TypeBar/>
          <BrandBar/>
        </Col>
        <Col md={9}>
          <ProductList/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;