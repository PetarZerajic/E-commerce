import ReactPaginate from "react-paginate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./pagination.scss";

interface PaginationProps {
  pageCount: number;
  handlePageChange(selectedItem: { selected: number }): void;
}

export const Pagination = (props: PaginationProps) => {
  const { pageCount, handlePageChange } = props;

  return (
    <ReactPaginate
      previousLabel={<ArrowBackIcon />}
      nextLabel={<ArrowForwardIcon />}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName={"paginate"}
      previousLinkClassName={"page"}
      nextLinkClassName={"page"}
      breakClassName={"page"}
      pageClassName={"page"}
      disabledClassName={"disabled"}
      activeClassName={"active"}
    />
  );
};
