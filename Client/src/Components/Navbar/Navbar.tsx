import en from "../../Assets/en.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";
import { Routes } from "../../Router/Routes";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { ProfileDropdown } from "../Dropdown/ProfileDropdown/ProfileDropdown";
import { MenuDropdown } from "../Dropdown/MenuDropdown/MenuDropdown";
import { useState } from "react";
import "./navbar.scss";

export const Navbar = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const [toggleDropDown, setToggleDropDown] = useState({
    profile: false,
    menu: false,
  });
  const handleToggle = (component: keyof typeof toggleDropDown) => {
    setToggleDropDown((prevState) => ({
      ...prevState,
      [component]: !prevState[component],
    }));
  };
  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="left-side">
            <div className="item">
              <img className="img" src={en} alt="" />
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
              <Link to={Routes.Wishlist} className="link">
                <FavoriteBorderOutlinedIcon />
              </Link>

              <div className="cart-icon">
                <Link to={Routes.Cart} className="link">
                  <ShoppingCartOutlinedIcon />
                </Link>
                {products.length > 0 && (
                  <span className="length">{products.length}</span>
                )}
              </div>
              <div>
                <button
                  className="profile-icon"
                  onClick={() => handleToggle("profile")}
                >
                  <AccountCircleOutlinedIcon />
                </button>
                {toggleDropDown.profile && <ProfileDropdown />}
                <button
                  className="menu-icon"
                  onClick={() => handleToggle("menu")}
                >
                  <MenuIcon />
                  {toggleDropDown.menu && <MenuDropdown />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
