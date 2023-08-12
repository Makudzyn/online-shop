import React, {useContext, useState} from 'react';
import {Card, Form, Container, Row, Button} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts.js";
import {login, registration} from "../http/userAPI.js";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";

const Auth = observer(() => { // Используем observer чтобы MobX отслеживал изменения и делал ре-рендер компонентов
  const {userStore} = useContext(Context); // Данные о пользователе из стора
  const location = useLocation(); // Хук возвращает объект текущей локации (URL)
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE; // Узнаем на какой странице пользователь - регистрации или входа
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Функция авторизации или регистрации в зависимости от страницы на которой находится пользователь
  const authOrLogin = async () => {
    try {
      let data;
      if (isLogin) { // В зависимости от маршрута отображаем форму регистрации или авторизации
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      userStore.setUser(userStore);
      userStore.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
    
  return (
    // В зависимости от того авторизирован пользователь или нет выводим разный текст в полях
    <Container
      className={"d-flex justify-content-center align-items-center"}
      style={{height: window.innerHeight - 54}}
    >
      <Card
        className={"p-5"}
        style={{width: 600}}
      >
        <h2 className={"m-auto"}>{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className={"d-flex flex-column"}>
          <Form.Control
            className={"mt-4"}
            placeholder={"Enter your e-mail here..."}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className={"mt-2"}
            placeholder={"Enter your password here..."}
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={"password"}
          />
            <Button
              variant={"dark"}
              className={"mt-3"}
              onClick={authOrLogin}
            >
              {isLogin ? "Sign in" : "Sign up"}
            </Button>

            {isLogin ?
              <div
              className={"mt-3"}
              style={{fontSize: 14, color: "gray"}}
            >
              Don't have an account? &nbsp;
              <NavLink
                to={REGISTRATION_ROUTE}
                style={{textDecoration: "none"}}
              >
                Sign up
              </NavLink>
            </div>
              :
              <div
                className={"mt-3"}
                style={{fontSize: 14, color: "gray"}}
              >
                Already have an account? &nbsp;
                <NavLink
                  to={LOGIN_ROUTE}
                  style={{textDecoration: "none"}}
                >
                  Sign in
                </NavLink>
              </div>
            }
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;