import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType.jsx";
import CreateBrand from "../components/modals/CreateBrand.jsx";
import CreateNewProduct from "../components/modals/CreateNewProduct.jsx";

const AdminPanel = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  return (
    <Container className={"d-flex flex-column"}>
      <Button
        className={"mt-2"}
        variant={"outline-dark"}
        onClick={() => setTypeVisible(true)}
      >
        Add product`s type
      </Button>
      <Button
        className={"mt-2"}
        variant={"outline-dark"}
        onClick={() => setBrandVisible(true)}
      >
        Add product`s brand
      </Button>
      <Button
        className={"mt-2"}
        variant={"outline-dark"}
        onClick={() => setProductVisible(true)}
      >
        Add new product
      </Button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateNewProduct show={productVisible} onHide={() => setProductVisible(false)}/>
    </Container>
  );
};

export default AdminPanel;