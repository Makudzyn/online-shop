import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
  const {product} = useContext(Context);
  return (
    <ListGroup variant={"flush"}>
      {product.types.map(type =>
        <ListGroup.Item
          key={type.id}
          bg="dark"
          data-bs-theme="dark"
          action variant={"light"}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default TypeBar;