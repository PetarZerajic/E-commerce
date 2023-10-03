import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { RootState } from "../../Redux/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import { deleteItem, resetCart } from "../../Redux/Reducer/cartReducer";

export const Cart = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.map((item) => (total += item.attributes.price * item.quantity));
    return total.toFixed(2);
  };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products.map((item) => (
        <div className="item" key={item.id}>
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item.attributes.img?.data.attributes.url
            }
            alt=""
          />
          <div className="details">
            <h1>{item.attributes.title}</h1>
            <p className="price">
              {item.quantity} x {item.attributes.price}€
            </p>
            <span className="delete" onClick={() => dispatch(deleteItem(item))}>
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "28px" }} />
            </span>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total</span>
        <span>${totalPrice()}</span>
      </div>
      <button>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset cart
      </span>
    </div>
  );
};
