import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";

const ProductPage = () => {
  const product =
      {id: 1, name: "Iphone 13 pro", price: 24999, rating: 5, img: "https://place-hold.it/500x500/fab800/000.jpg&text=Iphone%2013%20pic&fontsize=16"};
  const description = [
    {id:1, title: "Memory", description: "5 Gigabit"},
    {id:2, title: "Camera", description: "12 mpx"},
    {id:3, title: "Processor", description: "Snapdragon 44"},
    {id:4, title: "Core amount", description: "3"},
    {id:5, title: "Accum", description: "4300"},
  ];
  return (
    <Container className={"mt-2"}>
      <Col md={4}>
        <Image width={300} height={300} src={product.img}/>
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
        {description.map((item) => (
          <Row key={item.id}>
            {item.title}: {item.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;