import en from "../../Assets/en.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";
import { Routes } from "../../Router/Routes";
import "./navbar.scss";

export const Navbar = () => {
  const products = useSelector((state: RootState) => state.cart.products);

  const handleLogout = () => {
    localStorage.removeItem("user");
  };
  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="left-side">
            <div className="item">
              <img className="img" src={en} alt="" />
              <KeyboardArrowDownIcon className="icon" />
            </div>
            <div className="item">
              <span>USD</span>
              <KeyboardArrowDownIcon className="icon" />
            </div>

            <div className="item">
              <Link className="link" to="/products/1">
                Women
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/2">
                Men
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/3">
                Children
              </Link>
            </div>
          </div>
          <div className="center">
            <Link className="link" to={Routes.HOME}>
              E-commercio
            </Link>
          </div>
          <div className="right-side">
            <div className="item">
              <Link className="link" to={Routes.HOME}>
                Homepage
              </Link>
            </div>
            <div className="item">
              <Link className="link" to={Routes.Stores}>
                Stores
              </Link>
            </div>
            <div className="icons">
              <FavoriteBorderOutlinedIcon />
              <div className="cart-icon">
                <Link to={Routes.Cart} className="link">
                  <ShoppingCartOutlinedIcon />
                </Link>
                <span>{products.length}</span>
              </div>
            </div>
            <div className="item">
              <Link className="link" to={Routes.LOGIN}>
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
