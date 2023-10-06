import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Products } from "../Pages/Products/Products";
import { About } from "../Pages/About/About";
import { Contact } from "../Pages/Contact/Contact";
import { Stores } from "../Pages/Stores/Stores";
import { Home } from "../Pages/Home/Home";
import { Routes } from "./Routes";
import { Product } from "../Pages/Product/Product";
import { Layout } from "../Layout/Layout";
import { Login } from "../Pages/Login/Login";
import { ToastContainer } from "react-toastify";
import { Protector } from "../Utils/Helper/LoginHelper";
import { Register } from "../Pages/Register/Register";
import { Cart } from "../Pages/Cart/Cart";
import "react-toastify/dist/ReactToastify.css";
import { CartLayout } from "../Layout/CartLayout";

const router = createBrowserRouter([
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
  { path: Routes.REGISTER, element: <Register /> },
  {
    path: Routes.HOME,
    element: <Layout />,
    children: [
      {
        path: Routes.HOME,
        element: <Protector Component={Home} />,
      },
      {
        path: Routes.Products,
        element: <Products />,
      },
      {
        path: Routes.Product,
        element: <Product />,
      },
      {
        path: Routes.About,
        element: <About />,
      },
      {
        path: Routes.Contact,
        element: <Contact />,
      },
      {
        path: Routes.Stores,
        element: <Stores />,
      },
    ],
  },
  {
    path: Routes.Cart,
    element: <CartLayout />,
    children: [
      {
        path: Routes.Cart,
        element: <Cart />,
      },
    ],
  },
]);

export const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};
