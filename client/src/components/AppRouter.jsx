import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes, Navigate,} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes.js";
import {SHOP_ROUTE} from "../utils/consts.js";
import {Context} from "../main.jsx";


const AppRouter = () => {
  const {user} = useContext(Context);

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>}/>
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>}/>
      )}
      <Route path="*" element={<Navigate to={SHOP_ROUTE}/>}/> //Изменить
    </Routes>
  );
};

export default AppRouter;