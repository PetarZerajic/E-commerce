export interface QueryProductsProps {
  selectSubCatg: number[];
  catId: number;
  minPirce: number;
  maxPrice: number;
  sort: string | null;
}
export interface QueryFeaturedProps {
  type: string;
}
