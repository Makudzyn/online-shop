import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Cart from "../components/Cart.jsx";



const CartPage = () => {
  return (
    <Container>
      <Row className={"mt-2"}>
        <Col md={3}>

        </Col>
        <Col md={9}>
          <Cart/>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;