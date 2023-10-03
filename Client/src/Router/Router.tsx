import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Products } from "../Pages/Products/Products";
import { About } from "../Pages/About/About";
import { Contact } from "../Pages/Contact/Contact";
import { Stores } from "../Pages/Stores/Stores";
import { Home } from "../Pages/Home/Home";
import { routes } from "./Routes";
import { Product } from "../Pages/Product/Product";
import { Layout } from "../Layout/Layout";
import { Login } from "../Pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Protector } from "../Helper/LoginHelper";

export const Router = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.HOME} element={<Layout />}>
          <Route path={routes.HOME} element={<Protector Component={Home} />} />
          <Route path={routes.Products} element={<Products />} />
          <Route path={routes.Product} element={<Product />} />
          <Route path={routes.About} element={<About />} />
          <Route path={routes.Contact} element={<Contact />} />
          <Route path={routes.Stores} element={<Stores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
