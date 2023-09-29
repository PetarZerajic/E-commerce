import { IProdcuts } from "../../Interfaces/products";
import { Link } from "react-router-dom";
import "./card.scss";

interface CardProps {
  item: IProdcuts;
}
export const Card = ({ item }: CardProps) => {
  const imageUrl = item.attributes?.img?.data?.attributes?.url;
  const image2Url = item.attributes?.img2?.data?.attributes?.url;

  return (
    <div>
      <Link className="link" to={`/product/${item.id}`}>
        <div className="card">
          <div className="images">
            {item?.attributes.isNew && (
              <span className="new-season">New Season</span>
            )}
            <img
              src={process.env.REACT_APP_UPLOAD_URL + imageUrl}
              alt=""
              className="main-image"
            />
            <img
              src={process.env.REACT_APP_UPLOAD_URL + image2Url!}
              alt=""
              className="second-image"
            />
          </div>
          <h2>{item.attributes.title}</h2>
          <div className="prices">
            <h3>{item.attributes.oldPrice || item.attributes.price + 20}€</h3>
            <h3>{item.attributes.price}€</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};
