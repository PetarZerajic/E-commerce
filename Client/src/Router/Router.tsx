import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Products } from "../Pages/Products/Products";
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
import { CommonLayout } from "../Layout/CommonLayout";
import { Profile } from "../Pages/Profile/Profile";
import "react-toastify/dist/ReactToastify.css";

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
        element: <Protector Component={Products} />,
      },
      {
        path: Routes.Product,
        element: <Protector Component={Product} />,
      },

      {
        path: Routes.Stores,
        element: <Protector Component={Stores} />,
      },
    ],
  },
  {
    path: Routes.HOME,
    element: <CommonLayout />,
    children: [
      {
        path: Routes.Cart,
        element: <Protector Component={Cart} />,
      },

      { path: Routes.Profile, element: <Protector Component={Profile} /> },
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
