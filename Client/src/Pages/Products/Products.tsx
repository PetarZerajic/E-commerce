import React, { useState } from "react";
import { List } from "../../Components/List/List";
import { useParams } from "react-router-dom";
import "./products.scss";
import { useFetch } from "../../Hooks/useFetch";

export const Products = () => {
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sort, setSort] = useState<string | null>(null);
  const [selectSubCatg, setSelectSubCatg] = useState<number[]>([]);
  const params = useParams();
  const catId = +params.id!;

  const { dataCategories, loading } = useFetch(
    `/sub-categories?filters[categories][id][$eq]=${catId}`
  );

  const handleChangeCateg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectSubCatg([...selectSubCatg, value]);
    } else {
      setSelectSubCatg(selectSubCatg.filter((id) => id !== value));
    }
  };

  const handleChangeMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = +event.target.value;
    setMaxPrice(numValue);
  };
  console.log(sort);

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {dataCategories?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                name={item.attributes.title}
                value={item.id}
                onChange={handleChangeCateg}
              />
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={handleChangeMaxPrice}
            />
            <span>{maxPrice}</span>
          </div>
        </div>

        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={() => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={() => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="img"
          src="https://images.pexels.com/photos/17926802/pexels-photo-17926802/free-photo-of-black-and-white-photo-of-man-reading-magazine-on-bench.png?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        {
          <List
            catId={catId}
            maxPrice={maxPrice}
            sort={sort}
            selectSubCatg={selectSubCatg}
          />
        }
      </div>
    </div>
  );
};
