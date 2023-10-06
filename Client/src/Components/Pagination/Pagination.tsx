import ReactPaginate from "react-paginate";
import "./pagination.scss";

interface PaginationProps {
  pageCount: number;
  handlePageChange(selectedItem: { selected: number }): void;
}

export const Pagination = (props: PaginationProps) => {
  const { pageCount, handlePageChange } = props;

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName={"paginate"}
      previousLinkClassName={"page"}
      breakClassName={"page"}
      nextLinkClassName={"page"}
      pageClassName={"page"}
      disabledClassName={"disabled"}
      activeClassName={"active"}
    />
  );
};
