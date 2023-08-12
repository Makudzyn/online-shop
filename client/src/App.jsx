import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import AppRouter from "./components/AppRouter.jsx";
import React, {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI.js";
import {Context} from "./main.jsx";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";

const App = observer(() => { // Используем observer чтобы MobX отслеживал изменения и делал ре-рендер компонентов
  const {userStore} = useContext(Context); // Данные о пользователе из стора
  const [loading, setLoading] = useState(true);

  useEffect(() => { // С помощью функции check проверяем валидность токена, пока проверяем отображается спинер
    check().then(data => {
      userStore.setUser(true);
      userStore.setIsAuth(true);
    }).finally(() => setLoading(false)); // После получения ответа, вне зависимости от него убираем спинер
  }, [])

  if (loading) { // Если loading === true, то есть идет загрузка - отображаем спинер
    return <Spinner animation={"border"} variant="dark"/>
  }

  return (
    <>
      <NavBar/>
      <AppRouter/>
    </>
  )
})

export default App
