import React, { useEffect, useState } from "react";
import { List } from "../../Components/List/List";
import { useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/useFetch";
import { ImageHelper } from "../../Utils/Helper/ImageHelper";
import { Box, Slider } from "@mui/material";
import { QuerySubCategories } from "../../Utils/queryBilder";
import { ErrorPage } from "../../Error/ErrorPage";
import "./products.scss";

export const Products = () => {
  const min = 1;
  const max = 500;
  const [debouncedValue, setDebouncedValue] = useState<number[]>([min, max]);
  const [rangeValue, setRangeValue] = useState<number[]>([min, max]);
  const [sort, setSort] = useState<string | null>(null);
  const [selectSubCatg, setSelectSubCatg] = useState<number[]>([]);
  const params = useParams();
  const catId = +params.id!;

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(rangeValue);
    }, 600);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [rangeValue]);

  const { subCategories } = QuerySubCategories(catId);
  const { dataCategories, error } = useFetch(subCategories);

  const { handleChangeCatgImg } = ImageHelper(catId);

  const handleChangeCatg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectSubCatg([...selectSubCatg, value]);
    } else {
      setSelectSubCatg(selectSubCatg.filter((id) => id !== value));
    }
  };

  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {dataCategories?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.attributes.title}
                name={item.attributes.title}
                value={item.id}
                onChange={handleChangeCatg}
              />
              <label htmlFor={item.attributes.title}>
                {item.attributes.title}
              </label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <Box sx={{ width: 220 }}>
              <Slider
                min={min}
                max={max}
                value={rangeValue}
                onChange={handleChangeRange}
              />
            </Box>
            <span className="range">
              {rangeValue[0]}€ - {rangeValue[1]}€
            </span>
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
        <img className="img" src={handleChangeCatgImg()} alt="" />
        {error && <ErrorPage />}
        <List
          catId={catId}
          minPirce={debouncedValue[0]}
          maxPrice={debouncedValue[1]}
          sort={sort}
          selectSubCatg={selectSubCatg}
        />
      </div>
    </div>
  );
};
