import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import {Card, CardImg, Col, Container, Row} from "react-bootstrap";
import {REACT_APP_API_URL} from "../utils/consts.js";

const Cart = () => {
  const {cartStore} = useContext(Context); // Данные о товарах в корзине из стора
  return (
    <Container fluid>
      {cartStore.cartProducts.map(prod => console.log(prod))}
      {cartStore.cartProducts.map(cartProduct =>
        <Row>
          <Col>
            <Card className={"d-flex justify-content-between flex-row border-0 border-bottom"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: 'pointer',
                  height: '250px',
                  width: '250px',
                  marginRight: '15px'
              }}
                // onClick={handleProductClick}
              >
                <CardImg
                  variant="top"
                  src={REACT_APP_API_URL + cartProduct.img}
                  alt={cartProduct.name}
                  style={{maxWidth: '85%', maxHeight: '85%'}}
                />
              </div>
              <div
                style={{
                  height: '24px',
                  width: '100%',
                  margin: '5px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  lineHeight: '16px',
                }}
                // onClick={handleProductClick}
              >
                <Card.Title className={"d-flex justify-content-start"}>
                  {cartProduct.name}
                </Card.Title>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    color: '#221f1f',
                    fontSize: '24px',
                    margin: '5px 0'
                  }}
                >
                  {cartProduct.price}
                  <span>₴</span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;