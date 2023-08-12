import {
  ADMIN_PANEL_ROUTE,
  CART_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE
} from "./utils/consts.js";
import AdminPanel from "./pages/AdminPanel.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Auth from "./pages/Auth.jsx";

// Маршруты только для авторизированных пользователей
export const authRoutes = [
  {
    path: ADMIN_PANEL_ROUTE,
    Component: AdminPanel,
  },
  {
    path: CART_ROUTE,
    Component: Cart,
  },
];

// Маршруты для всех пользователей
export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];