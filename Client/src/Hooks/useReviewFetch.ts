import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserReview } from "../Interfaces/user";
import { toast } from "react-toastify";

interface IProps {
  productId: number;
  token: string;
  setRating: React.Dispatch<React.SetStateAction<UserReview>>;
}
export const useReviewFetch = ({ productId, token, setRating }: IProps) => {
  const initialValue = {
    stars: 0,
    text: "",
  };
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [review, setReview] = useState<UserReview>(initialValue);
  const [updateReviews, setUpdateReviews] = useState(false);
  const [isReviewAdded, setIsReviewAdded] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const url = `${process.env.REACT_APP_URL}/reviews?productId=${productId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        const {
          data: { data, hasReviewAdded },
        } = response;

        const averageRating =
          data.reduce(
            (acc: number, review: { stars: number }) =>
              acc + Number(review.stars),
            0
          ) / data.length;

        setRating({ stars: averageRating, count: data.length });
        setReviews(data.reverse());
        setIsReviewAdded(hasReviewAdded);
        setUpdateReviews(false);
        setReview(initialValue);
      } catch (error) {
        console.log({ error });
      }
    };

    getReviews();
  }, [productId, setRating, token, updateReviews]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!review?.stars) {
      toast.error("Review stars are required* ");
      return;
    }
    if (review.stars && productId) {
      try {
        axios.post(
          `${process.env.REACT_APP_URL}/reviews`,
          {
            ...review,
            productId,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUpdateReviews(true);
      } catch (error) {
        toast.error("There is an error occured!");
        console.log({ error });
      }
    }
  };
  const handleRating = (newValue: number) => {
    setReview({ ...review, stars: newValue });
  };
  const handleReviewText = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setReview({ ...review, text: value });
  };
  return {
    review,
    reviews,
    isReviewAdded,
    handleRating,
    handleReviewText,
    handleSubmit,
  };
};
