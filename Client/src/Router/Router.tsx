import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Products } from "../Pages/Products/Products";
import { About } from "../Pages/About/About";
import { Contact } from "../Pages/Contact/Contact";
import { Stores } from "../Pages/Stores/Stores";
import { Home } from "../Pages/Home/Home";
import { Routes } from "./Routes";
import { Product } from "../Pages/Product/Product";
import { Layout } from "../Layout/Layout";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Layout />,
    children: [
      { path: Routes.HOME, element: <Home /> },
      {
        path: Routes.Products,
        element: <Products />,
      },
      {
        path: Routes.Product,
        element: <Product />,
      },
      { path: Routes.About, element: <About /> },
      { path: Routes.Contact, element: <Contact /> },
      { path: Routes.Stores, element: <Stores /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
