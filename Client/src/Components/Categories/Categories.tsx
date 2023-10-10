import {
  sale,
  women,
  new_seasson,
  men,
  children,
  shoes,
} from "../../Constants/cetegoriesimgs";
import { Link } from "react-router-dom";
import "./categories.scss";

export const Categories = () => {
  return (
    <div className="categories">
      <div className="column">
        <div className="row">
          <img src={sale} alt="" />
          <Link className="link" to="/products/4">
            <button>Sale</button>
          </Link>
        </div>
        <div className="row">
          <img src={women} alt="" />
          <Link className="link" to="/products/1">
            <button>Women</button>
          </Link>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <img src={new_seasson} alt="" />

          <Link className="link" to="/products/5">
            <button>New Season</button>
          </Link>
        </div>
      </div>
      <div className="column column-large">
        <div className="row">
          <div className="column">
            <div className="row">
              <img src={men} alt="" />
              <Link to="/products/2" className="link">
                <button>Men</button>
              </Link>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <img src={children} alt="" />
              <Link to="/products/3">
                <button>Children</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <img src={shoes} alt="" />

          <Link to="/products/6" className="link">
            <button>Shoes </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
