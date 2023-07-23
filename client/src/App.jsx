import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import AppRouter from "./components/AppRouter.jsx";
import React, {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI.js";
import {Context} from "./main.jsx";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(true);
      user.setIsAuth(true);
    }).finally(() => setLoading(false));
  })

  if (loading) {
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
