import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType.jsx";
import CreateBrand from "../components/modals/CreateBrand.jsx";
import CreateNewProduct from "../components/modals/CreateNewProduct.jsx";
import {AdminPanelButton} from "../components/AdminPanelButton.jsx";

const AdminPanel = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  return (
    <Container className={"d-flex flex-column"}>
      <AdminPanelButton modalFunction={setTypeVisible} buttonTitle={"Edit/Remove types"}/>
      <AdminPanelButton modalFunction={setBrandVisible} buttonTitle={"Edit/Remove brands"}/>
      <AdminPanelButton modalFunction={setProductVisible} buttonTitle={"Edit/Remove products"}/>

      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateNewProduct show={productVisible} onHide={() => setProductVisible(false)}/>
    </Container>
  );
};

export default AdminPanel;