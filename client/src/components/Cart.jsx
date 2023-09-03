import React, {useContext, useEffect} from 'react';
import {Context} from "../main.jsx";
import {Card, CardImg, Col, Container, Row} from "react-bootstrap";
import {REACT_APP_API_URL} from "../utils/consts.js";
import {observer} from "mobx-react-lite";
import {fetchCartProducts} from "../http/cartAPI.js";

const Cart = observer(() => {
  const {cartStore} = useContext(Context); // Данные о товарах в корзине из стора
  useEffect(() => { // Подгружаем сущности из БД
    const fetchData = async () => {
      try {
        const data = await fetchCartProducts(); // Подгружаем сущности
        console.log(data);
        cartStore.setCartProducts(data); // Записываем в стор
      } catch(e) {
        // handleError(e, `fetching ${entityType}`); // Возвращаем ошибку
        throw new e.status(404).message("Error fetching data");
      }
    };
    fetchData(); // Вызываем функцию
  }, [])
  return (
    <Container fluid>
      {cartStore.cartProducts.map(cartProduct =>
        <Row key={cartProduct.id}>
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
});

export default Cart;