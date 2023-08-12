import React, {useContext} from 'react';
import {Route, Routes, Navigate,} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes.js";
import {SHOP_ROUTE} from "../utils/consts.js";
import {Context} from "../main.jsx";

const AppRouter = () => {
  const {userStore} = useContext(Context); // Данные о пользователе из стора

  return (
    <Routes>
      {/*Если пользователь авторизирован выводим дополнительные маршруты*/}
      {userStore.isAuth && authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>}/>
      )}
      {/*Если пользователь не авторизирован он получает только публичные маршруты*/}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>}/>
      )}
      {/*Если пользователь переходит по неопределенному пути редиректим на главную страницу*/}
      <Route path="*" element={<Navigate to={SHOP_ROUTE}/>}/>
    </Routes>
  );
};

export default AppRouter;