import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
  const {typeStore} = useContext(Context);
  return (
    <ListGroup variant={"flush"}>
      <ListGroup.Item
        className={"mt-3 text-white"}
        bg="dark"
        data-bs-theme="dark"
        variant={"secondary"}
      >
        Types
      </ListGroup.Item>
      <hr></hr>
      {typeStore.types.map(type =>
        <ListGroup.Item
          key={type.id}
          bg="dark"
          data-bs-theme="dark"
          action
          onClick={() => typeStore.setSelectedType(type)}
          variant={"light"}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default TypeBar;