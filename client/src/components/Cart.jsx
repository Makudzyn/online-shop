import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../main.jsx";
import {Button, Card, CardImg, Col, Container, Row} from "react-bootstrap";
import {PRODUCT_ROUTE, REACT_APP_API_URL} from "../utils/consts.js";
import {observer} from "mobx-react-lite";
import {addProductToCart, fetchCartProducts} from "../http/cartAPI.js";
import {fetchProducts} from "../http/productAPI.js";
import {handleProductClick} from "../functions/handleProductClick.js";
import {useNavigate} from "react-router-dom";
import closeIco from "../assets/close.svg";
import {getUserId} from "../functions/getUserIdFromToken.js";

const Cart = observer(() => {
  const navigate = useNavigate();
  const {cartStore, productStore} = useContext(Context); // Данные о товарах в корзине из стора
  const [cartProducts, setCartProducts] = useState([]);
  const [productsSum, setProductsSum] = useState(0);

  useEffect(() => { // Подгружаем сущности из БД
    const fetchData = async () => {
      try {
        const dataCart = await fetchCartProducts(); // Подгружаем товары из корзины
        const dataProduct = await fetchProducts(); // Подгружаем товары
        cartStore.setCartProductPair(dataCart); // Записываем в стор
        productStore.setProducts(dataProduct.rows); // Записываем в стор
        const productIds = cartStore.cartProductPair.map(pair => pair.productId); // Получение списка ID товаров из cartStore
        const filteredProducts = productStore.products.filter(product => productIds.includes(product.id)); // Фильтрация товаров из productStore на основе productIds
        setCartProducts(filteredProducts); // Записываем продукты которые находяться в корзине
      } catch(e) {
        // handleError(e, `fetching ${entityType}`); // Возвращаем ошибку
        throw new Error('Unable to add product to cart');
      }
    };
    fetchData(); // Вызываем функцию
  }, [])


  return (
    <Container fluid>
      {cartProducts.map(cartProduct =>
        <Row key={cartProduct.id}>
          <Col>
            <Card className={"d-flex justify-content-between border-0 border-bottom"}>
              <div
                style={{
                  display: "flex",
                }}>
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
                  onClick={() => handleProductClick(navigate, PRODUCT_ROUTE, cartProduct.id)}
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
                    display: "flex",
                    alignItems: "center",
                    height: '50px',
                    width: '100%',
                    margin: '5px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    lineHeight: 1.12,
                  }}
                  onClick={() => handleProductClick(navigate, PRODUCT_ROUTE, cartProduct.id)}
                >
                  <Card.Title className={"d-flex justify-content-start"}>
                    {cartProduct.name}
                  </Card.Title>
                </div>
                <svg
                  width={50}
                  height={50}
                  viewBox="0 0 50 50"
                  style={{margin: "5px"}}
                >
                  <image
                    xlinkHref={closeIco}
                    cursor='pointer'
                    width="50"
                    height="50"
                    // onClick={() =>
                    //
                    // }
                  />
                </svg>
            </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <svg><image></image></svg>
                  <p>{cartProduct.quantity}</p>
                  <svg><image></image></svg>
                </div>
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
      <Row className={"border-top border-2 border-black"}>
        <Col style={{
          display: "flex",
          justifyContent: "flex-end",
          color: '#221f1f',
          fontSize: '36px',
          margin: '5px 0'
        }}>
          {productsSum}
          <span>₴</span>
        </Col>
      </Row>
    </Container>
  );
});

export default Cart;