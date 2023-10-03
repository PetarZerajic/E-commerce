import "./navbar.scss";
import en from "../../Assets/en.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Cart } from "../Cart/Cart";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";

export const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const products = useSelector((state: RootState) => state.cart.products);
  const handleOpenCart = () => {
    setOpen(!open);
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
            <Link className="link" to="/">
              E-commercio
            </Link>
          </div>
          <div className="right-side">
            <div className="item">
              <Link className="link" to="/">
                Homepage
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/about">
                About
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/contact">
                Contact
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/stores">
                Stores
              </Link>
            </div>
            <div className="icons">
              <SearchIcon />
              <PersonOutlinedIcon />
              <FavoriteBorderOutlinedIcon />
              <div className="cart-icon" onClick={handleOpenCart}>
                <ShoppingCartOutlinedIcon />
                <span>{products.length}</span>
              </div>
            </div>
          </div>
        </div>
        {open && <Cart />}
      </div>
    </>
  );
};
