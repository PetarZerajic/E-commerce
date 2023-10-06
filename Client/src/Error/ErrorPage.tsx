import PageNotFound from "../Assets/pageNotFound.jpg";
import "./errorPage.scss";
export const ErrorPage = () => {
  return (
    <div className="container">
      <img src={PageNotFound} alt="" />
    </div>
  );
};
