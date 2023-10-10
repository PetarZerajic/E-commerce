import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useState } from "react";
import { carouselImgs } from "../../Constants/carouselImgs";
import "./carousel.scss";

export const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? 4 : currentImage - 1);
  };
  const nextSlide = () => {
    setCurrentImage(currentImage === 4 ? 0 : currentImage + 1);
  };

  return (
    <div className="slider">
      <div
        className="container"
        style={{
          transform: `translateX(-${currentImage * 100}vw)`,
        }}
      >
        {carouselImgs.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>

      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
        <div className="indicators">
          {carouselImgs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={
                currentImage === index
                  ? "indicator"
                  : "indicator indicator-inactive"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
