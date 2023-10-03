import {
  women,
  men,
  children,
  sale,
  newSeason,
  shoes,
} from "../Constants/productsImg";

export const ImageHelper = (catId: number) => {
  const handleChangeCatgImg = () => {
    switch (catId) {
      case 1:
        return women;
      case 2:
        return men;
      case 3:
        return children;
      case 4:
        return sale;
      case 5:
        return newSeason;
      case 6:
        return shoes;
      default:
    }
  };
  return { handleChangeCatgImg };
};
