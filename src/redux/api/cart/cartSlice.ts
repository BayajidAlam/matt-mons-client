import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  products: any[];
  total: number;
}

const initialState: IProduct = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadCartItems: (state, action: PayloadAction<any>) => {
      const products = Array.isArray(action.payload) ? action.payload : [];
      state.products = products.map((product) => ({
        ...product,
        quantity: 1,
      }));
      state.total = products.reduce(
        (total, product) => total + Number(product.Product.discountPrice || 0),
        0
      );
    },
    addToCart: (state, action: PayloadAction<any>) => {
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += Number(action.payload.Product.discountPrice);
    },
    decrementOnCart: (state, action: PayloadAction<any>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      }

      state.total -= action.payload.Product.discountPrice;
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      state.total -= action.payload.Product.discountPrice * action.payload.quantity!;
    },
  },
});

export const { loadCartItems, addToCart, decrementOnCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
