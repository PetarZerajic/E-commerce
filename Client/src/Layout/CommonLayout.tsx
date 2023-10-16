import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";

export const CommonLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
};
