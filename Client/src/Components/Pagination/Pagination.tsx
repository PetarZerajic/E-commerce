import { Pagination, Stack } from "@mui/material";
import "./pagination.scss";
interface Props {
  count: number;
  handleChangePage(): void;
}

export const PaginationContainer = ({ count, handleChangePage }: Props) => {
  return (
    <>
      <Stack>
        <Pagination
          className="pagination"
          count={count}
          shape="rounded"
          onClick={handleChangePage}
        />
      </Stack>
    </>
  );
};
