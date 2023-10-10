import { useState } from "react";
import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";

import "./product.scss";
import { useFetch } from "../../Hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../Redux/Reducer/cartReducer";
import { useDispatch } from "react-redux";
import { Routes } from "../../Router/Routes";

type operation = "inc" | "dec";
type initialImage = "img" | "img2" | "img3";

export const Product = () => {
  const [selectImage, setSelectImage] = useState<initialImage>("img");
  const [quantity, setQuantity] = useState<number>(0);
  const params = useParams();
  const id = +params.id!;

  const { data, dataCategory, loading } = useFetch(`products/${id}?populate=*`);

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
      {loading ? (
        "...loading"
      ) : (
        <div className="product">
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
                {/* To do: Add products to wishlist */}
                <button>
                  <FavoriteBorderOutlined /> ADD TO WISH LIST
                </button>
              </div>
            </div>
            <div className="info">
              <span>Product Type:{data?.attributes.title}</span>
              <span>
                Tag:
                {" " +
                  dataCategory?.attributes.categories.data[0].attributes.desc}
              </span>
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
        </div>
      )}
    </>
  );
};
