import { QueryProducts } from "../../Utils/queryBilder";
import { useFetch } from "../../Hooks/useFetch";
import { Card } from "../Card/Card";
import { useState } from "react";
import { Pagination } from "../Pagination/Pagination";
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

  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 12;
  const totalPages = Math.ceil(dataProducts.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = dataProducts.slice(startIndex, endIndex);
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      <div className="list">
        {currentProducts.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <Pagination pageCount={totalPages} handlePageChange={handlePageChange} />
    </>
  );
};
