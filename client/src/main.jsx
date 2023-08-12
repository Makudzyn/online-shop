import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore.js";
import ProductStore from "./store/ProductStore.js";
import App from "./App.jsx";
import TypeStore from "./store/TypeStore.js";
import BrandStore from "./store/BrandStore.js";
import PaginationStore from "./store/PaginationStore.js";

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{
        userStore: new UserStore(),
        productStore: new ProductStore(),
        typeStore: new TypeStore(),
        brandStore: new BrandStore(),
        paginationStore: new PaginationStore()
      }}>
        <App/>
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
