import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../main.jsx";
import {createProduct, fetchBrands, fetchProducts, fetchTypes} from "../../http/productAPI.js";

const CreateNewProduct = ({show, onHide}) => {
  const {productStore, brandStore, typeStore} = useContext(Context); // Данные о товаре из стора

  const [name, setName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState({id: null, name: ""});
  const [selectedType, setSelectedType] = useState({id: null, name: ""});
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => { // Получаем типы и бренды из БД
    fetchTypes().then(data => typeStore.setTypes(data))
    fetchBrands().then(data => brandStore.setBrands(data))
  }, [])

  // Функция для получения выбранного пользователем изображения
  const selectFile = e => {
      setFile(e.target.files[0]);
  }
  // Функция добавления новой характеристики товара в массив характеристик
  const addInfo = () => {
    setInfo([...info, {title: "", description: "", number: Date.now()}]);
  }
  // Функция удаления характеристики товара из массива характеристик
  const removeInfo = (number) => {
    setInfo(info.filter(item => item.number !== number));
  }
  // Функция которая по ключу (title или description) для этих полей добавляет новую характеристику товара
  const changeInfo = (key, value, number) => {
    setInfo(info.map(item =>
      item.number === number ? {...item, [key]: value} : item
    ))
  }
  // Функция которая создает/добавляет новый товар через FormData
  const addNewProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`); // Так как FormData может обрабатывать только строку или blob
    formData.append("img", file);
    formData.append("brandId", selectedBrand.id);
    formData.append("typeId", selectedType.id);
    formData.append("info", JSON.stringify(info)); // По той же причине парсим массив в строку
    createProduct(formData).then(data => alert("New product successfully added"))
  }


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={"Enter product name..."}
          className={"mt-2"}
        />
        <Dropdown data-bs-theme="dark" className={"mt-2"} >
          <Dropdown.Toggle variant={"outline-dark"}>
            {selectedType.name || "Select type of new product"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {typeStore.types.map(type =>
              <Dropdown.Item
                onClick={() => setSelectedType(type)}
                key={type.id}
              >
                {type.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown data-bs-theme="dark" className={"mt-2"} >
          <Dropdown.Toggle variant={"outline-dark"}>
            {selectedBrand.name || "Select brand of new product"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {brandStore.brands.map(brand =>
              <Dropdown.Item
                onClick={() => setSelectedBrand(brand)}
                key={brand.id}
              >
                {brand.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Control
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder={"Enter product price..."}
          className={"mt-2"}
          type={"number"}
        />
        <Form.Control
          className={"mt-2"}
          type={"file"}
          onChange={selectFile}
        />
        <hr/>
        <Button
          variant={"outline-dark"}
          onClick={addInfo}
        >
          Add new product info
        </Button>
        {info.map(item =>
          <Row key={item.number} className={"mt-3"}>
            <Col md={4}>
              <Form.Control
                value={item.title}
                onChange={e => changeInfo('title', e.target.value, item.number)}
                placeholder={"Enter title..."}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                value={item.description}
                onChange={e => changeInfo('description', e.target.value, item.number)}
                placeholder={"Enter description..."}
              />
            </Col>
            <Col md={4}>
              <Button
                variant={"outline-danger"}
                onClick={() => removeInfo(item.number)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={addNewProduct}>Add new product</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewProduct;