import React from 'react';
import {Card, CardImg, Col, Image} from "react-bootstrap";
import starIco from '../assets/star.png';
import cartIco from '../assets/shoppingCart24.svg';
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE, REACT_APP_API_URL } from "../utils/consts.js";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`${PRODUCT_ROUTE}/${product.id}`);
  };

  return (
    <Col md={3} className="p-0 mt-3" onClick={handleProductClick}>
      <Card style={{cursor: 'pointer', width: "100%", height: "100%", borderRadius: 0}}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: '280px'}}>
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
              lineHeight: '16px',
            }}
          >
            {product.name}
          </Card.Title>
          <div className="d-flex justify-content-start align-items-center mt-1">
            {product.rating}
            <img width={16} height={16} src={starIco} alt="Star Icon" />
          </div>
          <div className="d-flex justify-content-between">
            <p
              style={{
                color: '#221f1f',
              }}
            >
              {product.price}
              <span>₴</span>
            </p>
            <svg width={24} height={24} viewBox="0 0 24 24">
              <image
                xlinkHref={cartIco}
                width="24"
                height="24"
              />
            </svg>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
