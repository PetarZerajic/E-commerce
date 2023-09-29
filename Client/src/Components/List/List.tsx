import { useFetch } from "../../Hooks/useFetch";
import { Card } from "../Card/Card";
import { ProductsSkeleton } from "../Skeletons/productsSkeleton";

import "./list.scss";

interface ListProps {
  selectSubCatg: number[];
  catId: number;
  maxPrice: number;
  sort: string | null;
}

export const List = (props: ListProps) => {
  const { selectSubCatg, catId, maxPrice, sort } = props;

  const filterCatg = `populate=*&[filters][categories]=${catId}`;
  const filterByTitle = `${selectSubCatg.map(
    (item) => `&[filters][sub_categories][id][$eq]=${item}`
  )}`;
  const filterByPrice = `&[filters][price][$lte]=${maxPrice}`;
  const sortByPrice = sort !== null ? `&sort=price:${sort}` : "";

  const { dataProducts, loading } = useFetch(
    `/products?${filterCatg}${filterByTitle}${filterByPrice}${sortByPrice}`
  );
  const filterSkeleton = dataProducts.map((item) => (
    <ProductsSkeleton key={item.id} />
  ));

  return (
    <div className="list">
      {loading
        ? filterSkeleton
        : dataProducts?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};
