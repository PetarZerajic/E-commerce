import { Rating, TextField } from "@mui/material";
import { UserReview } from "../../Interfaces/user";
import no_image from "../../Assets/noImage.jpg";
import { useReviewFetch } from "../../Hooks/useReviewFetch";
import { useUserFetch } from "../../Hooks/useUserFetch";
import "./productReview.scss";

interface IProps {
  token: string;
  productId: number;
  setRating: React.Dispatch<React.SetStateAction<UserReview>>;
}

export const ProductReview = (props: IProps) => {
  const {
    reviews,
    review,
    isReviewAdded,
    handleSubmit,
    handleRating,
    handleReviewText,
  } = useReviewFetch(props);

  const { users } = useUserFetch();

  return (
    <div className="product-rating">
      {isReviewAdded ? null : (
        <div>
          <h2>Create review</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="text">Overall rating</label>
            <div>
              <Rating
                defaultValue={review.stars}
                precision={0.5}
                onChange={(event, newValue) => handleRating(newValue!)}
              />
            </div>
            <TextField
              className="input"
              placeholder="Leave your rating here"
              type="text"
              onChange={(event) => handleReviewText(event)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {reviews.length ? (
        <div className="reviews">
          <h2>Customer review</h2>
          {reviews.map((item) => {
            const user = users.find((u) => u.username === item.username);

            return (
              <div className="review" key={item.id}>
                <div className="customer">
                  <img
                    src={
                      user?.avatarUrl
                        ? process.env.REACT_APP_UPLOAD_URL + user.avatarUrl
                        : no_image
                    }
                    alt=""
                  />
                  <span>{item.username}</span>
                </div>
                <Rating readOnly precision={0.5} value={item.stars} />
                <p>
                  Reviewed at:{" "}
                  {new Date(item.createdAt!).toLocaleDateString("sr")}
                </p>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
