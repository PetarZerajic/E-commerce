import { createSlice } from "@reduxjs/toolkit";
import { IProdcuts } from "../../Interfaces/products";

interface cartProps {
  products: IProdcuts[];
  totalQuantity: number;
  totalAmount: number;
}
const initialState: cartProps = {
  products: [],
  totalQuantity: 0,
  totalAmount: 0,
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
    increaseItem: (state, action) => {
      const { id } = action.payload;
      const item = state.products.find((item) => item.id === id)!;
      if (item) {
        item.quantity = item.quantity + 1;
      }
    },
    decreaseItem: (state, action) => {
      const { id } = action.payload;
      const item = state.products.find((item) => item.id === id)!;
      if (item) {
        item.quantity = item.quantity - 1;
      }
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalQuantity = 0;
      state.products.forEach((product) => {
        const { price } = product.attributes;
        const { quantity } = product;

        totalQuantity += quantity;
        totalAmount += quantity * price;
      });

      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
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
export const {
  addToCart,
  deleteItem,
  increaseItem,
  decreaseItem,
  calculateTotals,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
