import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./cart.scss";
export const Cart = () => {
  const data = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/6702633/pexels-photo-6702633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      img2: "https://images.pexels.com/photos/6702635/pexels-photo-6702635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Long SLeave T-shirt",
      desc: "lorem ipsum doleres",
      isNew: true,
      oldPrice: 120,
      price: 80,
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/10419129/pexels-photo-10419129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      img2: "https://images.pexels.com/photos/10419116/pexels-photo-10419116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Blazer",
      desc: "lorem ipsum doleres",
      isNew: true,
      oldPrice: 100,
      price: 70,
    },
  ];
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {data?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p className="desc">{item.desc?.substring(0, 100)}</p>
            <p className="price">1 x {item.price}€</p>
          </div>
          <DeleteOutlineOutlinedIcon className="delete" />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>$123</span>
      </div>
      <button>PROCEED TO CHECKOUT</button>
      <span className="reset">Reset cart</span>
    </div>
  );
};
