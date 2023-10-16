import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  resetCart,
  increaseItem,
  decreaseItem,
} from "../../Redux/Reducer/cartReducer";
import { RootState } from "../../Redux/Store/Store";

export const CartHelper = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const handleRemoveFromCart = (id: number) => {
    dispatch(deleteItem({ id }));
  };
  const handleClearCart = () => {
    dispatch(resetCart());
  };
  const handleIncreaseAmount = (id: number) => {
    dispatch(increaseItem({ id }));
  };
  const handleDecreaseAmount = (id: number) => {
    const index = cart.products.find((i) => i.id === id)?.quantity!;

    if (index > 0) {
      dispatch(decreaseItem({ id }));
    }
    return;
  };

  return {
    handleRemoveFromCart,
    handleClearCart,
    handleIncreaseAmount,
    handleDecreaseAmount,
  };
};
