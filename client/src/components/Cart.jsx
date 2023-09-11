import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../main.jsx";
import {Card, CardImg, Col, Container, Row} from "react-bootstrap";
import {PRODUCT_ROUTE, REACT_APP_API_URL} from "../utils/consts.js";
import {observer} from "mobx-react-lite";
import {fetchCartProducts} from "../http/cartAPI.js";
import {fetchProducts} from "../http/productAPI.js";
import {handleProductClick} from "../functions/handleProductClick.js";
import {useNavigate} from "react-router-dom";
import closeIco from "../assets/close.svg";
import minusIco from "../assets/plus.svg";
import plusIco from "../assets/minus.svg";


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
        const cartProductsArr = cartStore.cartProductPair; // Получаем пары товаров из корзины

        const allProducts = productStore.products; // Получаем все товары

        const cartProducts = cartProductsArr.map(pair => { // Формируем новый массив товаров в корзине с учетом количества
          const product = allProducts.find(product => product.id === pair.productId);
          if (product) {
            return {
              ...product,
              quantity: pair.quantity
            };
          }
          return null;
        }).filter(Boolean);

        setProductsSum(cartProducts.reduce((sum, product) => sum + product.price, 0)) // Считаем сумму товаров в корзине

        setCartProducts(cartProducts);

      } catch(e) {
        // handleError(e, `fetching ${entityType}`); // Возвращаем ошибку
        throw new Error('Unable to add product to cart');
      }
    };
    fetchData(); // Вызываем функцию
  }, [])

  const addQuantity = () => {

  }

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
                <div className={"d-flex justify-content-between flex-column w-100"}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
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
                    <svg
                      width={34}
                      height={34}
                      viewBox="0 0 34 34"
                      style={{margin: "5px"}}
                    >
                      <image
                        xlinkHref={closeIco}
                        cursor='pointer'
                        width="34"
                        height="34"
                        // onClick={() =>
                        //
                        // }
                      />
                    </svg>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className={"d-flex justify-content-center flex-row w-100"}>
                      <svg
                        width={42}
                        height={42}
                        viewBox="0 0 42 42"
                        style={{margin: "5px"}}
                      >
                        <image
                          xlinkHref={minusIco}
                          cursor='pointer'
                          width="42"
                          height="42"
                        />
                      </svg>
                      <p
                        style={{
                          color: '#221f1f',
                          fontSize: '24px',
                          margin: '5px',
                          fontWeight: '600',
                        }}
                      >
                        {cartProduct.quantity}
                      </p>
                      <svg
                        width={42}
                        height={42}
                        viewBox="0 0 42 42"
                        style={{margin: "5px"}}
                      >
                        <image
                          xlinkHref={plusIco}
                          cursor='pointer'
                          width="42"
                          height="42"
                        />
                      </svg>
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
              </div>
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