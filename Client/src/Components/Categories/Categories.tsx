import "./categories.scss";
import { Link } from "react-router-dom";

export const Categories = () => {
  return (
    <div className="categories">
      <div className="column">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/5650020/pexels-photo-5650020.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link className="link" to="/products/4">
              Sale
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/17153254/pexels-photo-17153254/free-photo-of-black-and-white-photo-of-a-young-woman-in-elegant-silk-blazer.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Women
            </Link>
          </button>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/6207069/pexels-photo-6207069.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link className="link" to="/products/3">
              New Season
            </Link>
          </button>
        </div>
      </div>
      <div className="column column-large">
        <div className="row">
          <div className="column">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/735551/pexels-photo-735551.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to="/products/2" className="link">
                  Men
                </Link>
              </button>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/4493694/pexels-photo-4493694.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to="/products/5" className="link">
                  Accessories
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/2857040/pexels-photo-2857040.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to="/products/6" className="link">
              Shoes
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
