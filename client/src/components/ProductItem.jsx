import React from 'react';
import {Card, CardImg, Col} from "react-bootstrap";
import starIco from '../assets/star.png';
import cartIco from '../assets/shoppingCart24.svg';
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE, REACT_APP_API_URL } from "../utils/consts.js";
import {addProductToCart} from "../http/cartAPI.js";
import {handleProductClick} from "../functions/handleProductClick.js";
import {getUserId} from "../functions/getUserIdFromToken.js";

const ProductItem = ({product}) => {
  const navigate = useNavigate();

  return (
    <Col md={3} className="p-0 mt-3">
      <Card style={{width: "100%", height: "100%", borderRadius: 0}}>
        <div
          style={{display: "flex", justifyContent: "center", alignItems: "center",  cursor: 'pointer', height: '280px'}}
          onClick={() => handleProductClick(navigate, PRODUCT_ROUTE, product.id)}
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
              height: '50px',
              marginBottom: '5px',
              overflow: 'hidden',
              cursor: 'pointer',
              lineHeight: 1.12,
            }}
            onClick={() => handleProductClick(navigate, PRODUCT_ROUTE, product.id)}
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
                onClick={() =>
                  addProductToCart({cartId: getUserId(), productId: product.id})
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
