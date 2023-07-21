import React from 'react';
import {Card, Form, Container, Row, Button} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts.js";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
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
          />
          <Form.Control
            className={"mt-2"}
            placeholder={"Enter your password here..."}
          />
            <Button
              variant={"dark"}
              className={"mt-3"}
            >
              Sign up
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
};

export default Auth;