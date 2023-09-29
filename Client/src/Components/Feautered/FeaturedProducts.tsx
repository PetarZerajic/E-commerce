import { Card } from "../Card/Card";
import "./featuredProducts.scss";
import { useFetch } from "../../Hooks/useFetch";
interface Props {
  type: string;
}
export const FeaturedProducts = ({ type }: Props) => {
  const { dataProducts, loading, error } = useFetch(
    `/products?populate=*&filters[type][$eq]=${type}`
  );
  return (
    <div className="feature-products">
      <div className="top-side">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          eligendi similique voluptate dolore qui provident, distinctio tempora.
          Non modi quaerat facere, dignissimos accusamus culpa minus officiis
          suscipit quod laborum exercitationem?
        </p>
      </div>
      <div className="bottom-side">
        <>
          {error && "Something went wrong!"}
          {loading
            ? "loading..."
            : dataProducts.map((item) => <Card key={item.id} item={item} />)}
        </>
      </div>
    </div>
  );
};
