import { QueryFeaturedProps, QueryProductsProps } from "../Interfaces/query";

export const QueryFeaturedProducts = (props: QueryFeaturedProps) => {
  const { type } = props;

  const featuredProducts = `products?populate=*&filters[type][$eq]=${type}`;
  return { featuredProducts };
};

export const QuerySubCategories = (catId: number) => {
  const subCategories = `sub-categories?filters[categories][id][$eq]=${catId}`;

  return { subCategories };
};

export const QueryProducts = (props: QueryProductsProps) => {
  const { selectSubCatg, catId, minPirce, maxPrice, sort } = props;

  const filterCatg = `populate=*&[filters][categories]=${catId}`;

  const filterByTitle = `${selectSubCatg
    .map((item) => `&[filters][sub_categories][id][$eq]=${item}`)
    .join("")}`;

  const filterByPrice = `&[filters][price][$gte]=${minPirce}&[filters][price][$lte]=${maxPrice}`;

  const sortByPrice = sort !== null ? `&sort=price:${sort}` : "";

  return {
    filterCatg,
    filterByTitle,
    filterByPrice,
    sortByPrice,
  };
};
