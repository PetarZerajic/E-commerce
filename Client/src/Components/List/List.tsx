import { QueryProducts } from "../../Utils/queryBilder";
import { useFetch } from "../../Hooks/useFetch";
import { Card } from "../Card/Card";
import { ProductsSkeleton } from "../Skeletons/productsSkeleton";
import "./list.scss";

interface ListProps {
  selectSubCatg: number[];
  catId: number;
  minPirce: number;
  maxPrice: number;
  sort: string | null;
}

export const List = (props: ListProps) => {
  const { filterCatg, filterByTitle, filterByPrice, sortByPrice } =
    QueryProducts(props);

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
