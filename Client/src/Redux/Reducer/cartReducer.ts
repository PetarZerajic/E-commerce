import { createSlice } from "@reduxjs/toolkit";
import { IProdcuts } from "../../Interfaces/products";

interface cartProps {
  products: IProdcuts[];
}
const initialState: cartProps = {
  products: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.products.find((item) => item.id === id);

      if (item) {
        item.quantity += quantity;
      } else {
        state.products = [...state.products, action.payload];
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },

    resetCart: (state) => {
      state.products = [];
    },
  },
});
export const { addToCart, deleteItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
