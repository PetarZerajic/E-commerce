import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";

export const CartLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
};
