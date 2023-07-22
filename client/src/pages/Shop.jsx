import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar.jsx";
import BrandBar from "../components/BrandBar.jsx";
import ProductList from "../components/ProductList.jsx";

const Shop = () => {
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
};

export default Shop;