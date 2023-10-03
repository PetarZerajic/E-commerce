import { IProdcuts } from "../../Interfaces/products";
import { Link } from "react-router-dom";
import "./card.scss";

interface CardProps {
  item: IProdcuts;
}
export const Card = ({ item }: CardProps) => {
  const image =
    process.env.REACT_APP_UPLOAD_URL +
    item.attributes?.img?.data?.attributes?.url;
  const image2 =
    process.env.REACT_APP_UPLOAD_URL +
    item.attributes?.img2?.data?.attributes?.url;

  return (
    <div>
      <Link className="link" to={`/product/${item.id}`}>
        <div className="card">
          <div className="images">
            {item?.attributes.isNew && (
              <span className="new-season">New Season</span>
            )}
            <img src={image} alt="" className="main-image" />
            <img src={image2} alt="" className="second-image" />
          </div>
          <h2>{item.attributes.title}</h2>
          <div className="prices">
            <h3>{item.attributes.oldPrice}€</h3>
            <h3>{item.attributes.price}€</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};
