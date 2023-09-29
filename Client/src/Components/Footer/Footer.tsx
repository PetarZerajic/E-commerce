import { Link, animateScroll } from "react-scroll";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import payment from "../../Assets/payment.png";
import "./footer.scss";

export const Footer = () => {
  const handleScrollToTop = () => {
    animateScroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };
  return (
    <div className="footer">
      <div className="top-section">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Comapare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Quam id leo in vitae turpis. Ornare aenean euismod elementum nisi
            quis eleifend quam adipiscing vitae. Vitae aliquet nec ullamcorper
            sit amet risus nullam eget. Orci dapibus ultrices in iaculis nunc
            sed augue lacus viverra. Ultricies integer quis auctor elit sed.
            Orci ac auctor augue mauris augue neque. Auctor neque vitae tempus
            quam pellentesque. Mauris cursus mattis molestie a iaculis at erat.
            Aliquet nibh praesent tristique magna sit amet purus.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
      </div>
      <div className="bottom-section">
        <div className="left-side">
          <span className="logo">E-commercio</span>
          <span className="copyright">
            © Copyright 2023.All Rights Reserved
          </span>
        </div>
        <div className="center">
          <span className="go-to-top">
            <Link className="icon" to="top" onClick={handleScrollToTop}>
              <ArrowUpwardOutlinedIcon />
            </Link>
          </span>
        </div>
        <div className="right-side">
          <img className="img" src={payment} alt="" />
        </div>
      </div>
    </div>
  );
};
