import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {ADMIN_PANEL_ROUTE, CART_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from "../utils/consts.js";
import {observer} from "mobx-react-lite";
import {Stack} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import basketIco from "../assets/NavbarBasket.svg"
// Навигационная панель
const NavBar = observer(() => { // Используем observer чтобы MobX отслеживал изменения и делал ре-рендер компонентов
  const {userStore} = useContext(Context); // Данные о пользователе из стора
  const navigate = useNavigate();

  // Функция выхода из аккаунта пользователя
  const logOut = () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href={SHOP_ROUTE}>SHOP4U</Navbar.Brand>
        {/*Если пользователь авторизован он получает дополнительные кнопки(маршруты) в навигационной панели*/}
        {/*Если пользователь не авторизован, то выводим кнопку входа в аккаунт*/}
        {userStore.isAuth ?
          <Nav className="ml-auto">
            <Stack direction="horizontal" gap={2}>
                <svg width={38} height={38} viewBox="0 0 38 38">
                  <image
                    xlinkHref={basketIco}
                    width="38"
                    height="38"
                    onClick={() => navigate(CART_ROUTE)}
                    cursor={"pointer"}
                  />
                </svg>
              <Button
                variant="outline-light"
                onClick={() => navigate(ADMIN_PANEL_ROUTE)}
              >
                Admin panel
              </Button>
              <Button
                variant="outline-light"
                onClick={() => logOut()}
              >
                Log out
              </Button>
            </Stack>
          </Nav>
          :
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Sign in</Button>
          </Nav>
        }

      </Container>
    </Navbar>
  );
});

export default NavBar;