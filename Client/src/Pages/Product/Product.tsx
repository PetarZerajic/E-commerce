import { useState } from "react";
import {
  BalanceOutlined,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";

import "./product.scss";
import { useFetch } from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";
import { addToCart } from "../../Redux/Reducer/cartReducer";
import { useDispatch } from "react-redux";

type operation = "inc" | "dec";
type initialImage = "img" | "img2" | "img3";

export const Product = () => {
  const [selectImage, setSelectImage] = useState<initialImage>("img");
  const [quantity, setQuantity] = useState<number>(0);
  const params = useParams();
  const id = +params.id!;
  const prodcut = `${id}?populate=*`;

  const { data, loading } = useFetch(`products/${prodcut}`);

  const handleChangeQuantity = (operation: operation) => {
    if (operation === "inc") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };
  const dispatch = useDispatch();

  const image =
    process.env.REACT_APP_UPLOAD_URL +
    data?.attributes.img.data.attributes.url!;
  const image2 =
    process.env.REACT_APP_UPLOAD_URL +
    data?.attributes.img2.data.attributes.url!;
  const image3 =
    process.env.REACT_APP_UPLOAD_URL +
    (data?.attributes?.img3?.data?.attributes.url || "");
  const dynImage =
    process.env.REACT_APP_UPLOAD_URL +
    data?.attributes[selectImage].data.attributes.url!;

  return (
    <>
      <div className="product">
        <>
          <div className="left">
            <div className="images">
              <img src={image} alt="" onClick={() => setSelectImage("img")} />
              <img src={image2} alt="" onClick={() => setSelectImage("img2")} />
              <img src={image3} alt="" onClick={() => setSelectImage("img3")} />
            </div>
            <div className="main-image">
              <img src={dynImage} alt="" />
            </div>
          </div>
          <div className="right">
            <h1 className="title">{data?.attributes.title}</h1>
            <span className="price">{data?.attributes.price}€</span>
            <p className="desc">{data?.attributes.desc}</p>
            <div className="quantity">
              <button onClick={() => handleChangeQuantity("dec")}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleChangeQuantity("inc")}>+</button>
            </div>

            <button
              className="add"
              onClick={() => dispatch(addToCart({ ...data, quantity }))}
            >
              <ShoppingCartOutlined /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderOutlined /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceOutlined /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Woman, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
