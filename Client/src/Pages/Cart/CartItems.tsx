import { IProdcuts } from "../../Interfaces/products";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface Iprops {
  handleRemoveFromCart(id: number): void;
  handleDecreaseAmount(id: number): void;
  handleIncreaseAmount(id: number): void;
  item: IProdcuts;
}
export const CartItems = (props: Iprops) => {
  const {
    item,
    handleRemoveFromCart,
    handleDecreaseAmount,
    handleIncreaseAmount,
  } = props;
  return (
    <div className="cart-item">
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
          <button
            className="delete-item"
            onClick={() => handleRemoveFromCart(item.id!)}
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "28px" }} />
          </button>
        </div>
      </div>
      <div className="cart-product-price">€{item.attributes.price}</div>
      <div className="cart-product-quantity">
        <button onClick={() => handleDecreaseAmount(item.id!)}>-</button>
        <div className="count">{item.quantity}</div>
        <button onClick={() => handleIncreaseAmount(item.id!)}>+</button>
      </div>
      <div className="cart-product-total-price">
        €{(item.attributes.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};
