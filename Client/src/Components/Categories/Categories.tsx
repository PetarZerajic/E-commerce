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

          <Link className="link" to="/products/4">
            <button>Sale</button>
          </Link>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />

          <Link className="link" to="/products/1">
            <button>Women</button>
          </Link>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/6207069/pexels-photo-6207069.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />

          <Link className="link" to="/products/5">
            <button>New Season</button>
          </Link>
        </div>
      </div>
      <div className="column column-large">
        <div className="row">
          <div className="column">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <Link to="/products/2" className="link">
                <button>Men</button>
              </Link>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/786220/pexels-photo-786220.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <Link to="/products/3">
                <button>Children</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <img
            src="https://images.pexels.com/photos/9930070/pexels-photo-9930070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />

          <Link to="/products/6" className="link">
            <button>Shoes </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
