import React, {useContext} from 'react';
import {Card, CardImg, Col, Image} from "react-bootstrap";
import starIco from '../assets/star.png';
import cartIco from '../assets/shoppingCart24.svg';
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE, REACT_APP_API_URL } from "../utils/consts.js";
import {Context} from "../main.jsx";
import {addProductToCart} from "../http/cartAPI.js";

const ProductItem = ({product}) => {
  const {cartStore, userStore} = useContext(Context);
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`${PRODUCT_ROUTE}/${product.id}`);
  };

  return (
    <Col md={3} className="p-0 mt-3">
      <Card style={{width: "100%", height: "100%", borderRadius: 0}}>
        <div
          style={{display: "flex", justifyContent: "center", alignItems: "center",  cursor: 'pointer', height: '280px'}}
          onClick={handleProductClick}
        >
          <CardImg
            variant="top"
            src={REACT_APP_API_URL + product.img}
            alt={product.name}
            style={{maxWidth: '100%', maxHeight: '100%', padding: '10px 15px'}}
          />
        </div>
        <Card.Body>
          <Card.Title
            style={{
              height: '30px',
              marginBottom: '5px',
              overflow: 'hidden',
              cursor: 'pointer',
              lineHeight: '16px',
            }}
            onClick={handleProductClick}
          >
            {product.name}
          </Card.Title>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <img width={16} height={16} src={starIco} alt="Star Icon" />
            {product.rating}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                color: '#221f1f',
                fontSize: '24px',
                margin: '5px 0'
              }}
            >
              {product.price}
              <span>₴</span>
            </p>
            <svg width={30} height={30} viewBox="0 0 30 30">
              <image
                xlinkHref={cartIco}
                cursor='pointer'
                width="30"
                height="30"
                onClick={() => {
                  console.log(userStore.user, product.id)
                  addProductToCart(userStore.user.id, product.id)
                }
                }
              />
            </svg>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
