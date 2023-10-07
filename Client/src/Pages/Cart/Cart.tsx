import { useEffect } from "react";
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
import { Link } from "react-router-dom";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import emptyCart from "../../Assets/emptyCart.jpg";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../Hooks/useFetch";
import "./cart.scss";
export const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart.products]);

  const handleRemoveFromCart = (id: number) => {
    dispatch(deleteItem({ id }));
  };
  const handleClearCart = () => {
    dispatch(resetCart());
  };
  const handleIncreaseAmount = (id: number) => {
    dispatch(increaseItem({ id }));
  };
  const handleDecreaseAmount = (id: number) => {
    dispatch(decreaseItem({ id }));
  };
  const stripePromise = loadStripe(
    "pk_test_51NyYzFL2GClIm5Y5166ptaF8b2ZHyFmKqw5RokAs2kmyJiH58MQNOJqX7JLtISLVhjgG2WJA6mANkEGe2zxTWSep00CoV8oeFH"
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const response = await makeRequest.post("/orders", {
        products,
      });
      await stripe?.redirectToCheckout({
        sessionId: response.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cart-container">
      {products.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <img src={emptyCart} alt="" />
          <div className="start-shopping">
            <Link to="/">
              <ArrowBackOutlinedIcon />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {products &&
              products.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-product">
                    <img
                      src={
                        process.env.REACT_APP_UPLOAD_URL +
                        item.attributes.img.data.attributes.url
                      }
                      alt=""
                    />
                    <div>
                      <h3>{item.attributes.title}</h3>
                      <p>{item.attributes.desc}</p>
                      <button onClick={() => handleRemoveFromCart(item.id!)}>
                        <DeleteOutlineOutlinedIcon
                          sx={{ fontSize: "28px", color: "crimson" }}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">
                    ${item.attributes.price}
                  </div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseAmount(item.id!)}>
                      -
                    </button>
                    <div className="count">{item.quantity}</div>
                    <button onClick={() => handleIncreaseAmount(item.id!)}>
                      +
                    </button>
                  </div>
                  <div className="cart-product-total-price">
                    ${item.attributes.price * item.quantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.totalAmount.toFixed(2)}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
              <div className="continue-shopping">
                <Link to="/">
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
