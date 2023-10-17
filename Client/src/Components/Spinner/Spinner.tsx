import { CircularProgress } from "@mui/material";
import "./spinner.scss";

export const Spinner = () => {
  return (
    <div className="spinner">
      <CircularProgress size="45px" />
    </div>
  );
};
