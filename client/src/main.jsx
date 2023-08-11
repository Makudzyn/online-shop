import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore.js";
import ProductStore from "./store/ProductStore.js";
import App from "./App.jsx";

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore()
      }}>
        <App/>
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
