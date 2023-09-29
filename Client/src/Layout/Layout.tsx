import { Navbar } from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../Components/Footer/Footer";
import "./layout.scss";

export const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
