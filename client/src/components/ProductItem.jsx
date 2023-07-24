import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import starIco from '../assets/star.png';
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE, REACT_APP_API_URL} from "../utils/consts.js";
const ProductItem = ({product}) => {
  const navigate = useNavigate();
  return (
    <Col md={3} className={"mt-3"} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>
      <Card
        style={{cursor: "pointer"}}
        className={"w-150"}
      >
        <Image
          width={150}
          height={150}
          src={REACT_APP_API_URL + product.img}
        />
        <div className={"d-flex justify-content-between align-items-center mt-1"}>
          <div>{product.name}</div>
          <div className={"d-flex align-items-center"}>
            <div>{product.rating}</div>
            <Image width={16} height={16} src={starIco}/>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;