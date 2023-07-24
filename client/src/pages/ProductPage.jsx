import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchOneProduct} from "../http/productAPI.js";
import {REACT_APP_API_URL} from "../utils/consts.js";

const ProductPage = () => {
  const [product, setProduct] = useState({info: []});
  const {id} = useParams();
  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, [])

  return (
    <Container className={"mt-2"}>
      <Col md={4}>
        <Image width={300} height={300} src={REACT_APP_API_URL + product.img}/>
      </Col>
      <Col md={4}>
        <Row>
          <h2>{product.name}</h2>
          <div>
            {product.rating}
          </div>
        </Row>
      </Col>
      <Col md={4}>
        <Card
          className={"d-flex flex-column align-items-center justify-content-around"}
          style={{width: 300, height: 300, fontSize: 24, border: "3px solid black"}}
        >
          <h3>{product.price}</h3>
          <Button variant={"outline-dark"}>Add to cart</Button>
        </Card>
      </Col>
      <Row className={"mt-3"}>
        <h2>Parameters</h2>
        {product.info.map((item) => (
          <Row key={item.id}>
            {item.title}: {item.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;