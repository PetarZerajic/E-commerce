import { Carousel } from "../../Components/Carousel/Carousel";
import { FeaturedProducts } from "../../Components/Feautered/FeaturedProducts";
import { Categories } from "../../Components/Categories/Categories";

export const Home = () => {
  return (
    <div className="home" id="/">
      <Carousel />
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="trending" />
    </div>
  );
};
