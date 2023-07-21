import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {ADMIN_PANEL_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from "../utils/consts.js";
import {observer} from "mobx-react-lite";
import {Stack} from "react-bootstrap";

const NavBar = observer(() => {
  const {user} = useContext(Context);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href={SHOP_ROUTE}>SHOP4U</Navbar.Brand>
        {user.isAuth ?
          <Nav className="ml-auto">
            <Stack direction="horizontal" gap={2}>
              <Button variant="outline-light" href={ADMIN_PANEL_ROUTE}>Admin panel</Button>
              <Button variant="outline-light" href={SHOP_ROUTE}>Log out</Button>
            </Stack>
          </Nav>
          :
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={() => user.setIsAuth(true)}>Sign in</Button>
          </Nav>
        }

      </Container>
    </Navbar>
  );
});

export default NavBar;