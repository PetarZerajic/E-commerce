import { QueryProducts } from "../../Utils/queryBilder";
import { useFetch } from "../../Hooks/useFetch";
import { Card } from "../Card/Card";
import { useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import { ProductsSkeleton } from "../Skeletons/Products/ProductsSkeleton";
import { useLoadingTimer } from "../../Hooks/useLoadingTimer";
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
  const { dataProducts } = useFetch(
    `/products?${filterCatg}${filterByTitle}${filterByPrice}${sortByPrice}`
  );

  const { loading } = useLoadingTimer();
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 12;
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = dataProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dataProducts.length / productsPerPage);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      <div className="list">
        {loading
          ? currentProducts.map((item) => <ProductsSkeleton key={item.id} />)
          : currentProducts.map((item) => <Card item={item} key={item.id} />)}
      </div>
      <Pagination pageCount={totalPages} handlePageChange={handlePageChange} />
    </>
  );
};
