import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { RootState } from "../../Redux/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  resetCart,
  calculateTotals,
  increaseItem,
  decreaseItem,
} from "../../Redux/Reducer/cartReducer";
import { Link, useSearchParams } from "react-router-dom";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import emptyCart from "../../Assets/emptyCart.jpg";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../Hooks/useFetch";
import { Routes } from "../../Router/Routes";
import { toast } from "react-toastify";
import { Spinner } from "../../Components/Spinner/Spinner";
import "./cart.scss";
import { CartHelper } from "../../Utils/Helper/CartHelper";
import { CartItems } from "./CartItems";

export const Cart = () => {
  const [loading, setIsLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector((state: RootState) => state.cart.products);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart.products]);
  useEffect(() => {
    if (searchParams.get("success")) {
      dispatch(resetCart());
    }
  }, []);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await makeRequest.post("/orders", {
        products,
      });
      await stripe?.redirectToCheckout({
        sessionId: response.data.stripeSession.id,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleRemoveFromCart,
    handleClearCart,
    handleIncreaseAmount,
    handleDecreaseAmount,
  } = CartHelper();

  return (
    <div className="cart-container">
      {products.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <img src={emptyCart} alt="" />
          <div className="start-shopping">
            <Link to={Routes.HOME}>
              <ArrowBackOutlinedIcon />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h2 className="product-title">Product</h2>
            <h2 className="price">Price</h2>
            <h2 className="quantity">Quantity</h2>
            <h2 className="total">Total</h2>
          </div>
          <div className="cart-items">
            {products &&
              products.map((item) => (
                <CartItems
                  key={item.id}
                  item={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleDecreaseAmount={handleDecreaseAmount}
                  handleIncreaseAmount={handleIncreaseAmount}
                />
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.totalAmount.toFixed(2)}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button
                onClick={handlePayment}
                className={loading ? "disabled-button" : ""}
              >
                {loading ? <Spinner /> : "PROCEED TO CHECKOUT"}
              </button>
              <div className="continue-shopping">
                <Link to={Routes.HOME}>
                  <ArrowRightAltOutlinedIcon />

                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
