import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  cart: {};
}
const initialState: IProduct = {
  cart: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartData: (state, action: PayloadAction<any>) => {
      state.cart = action.payload;
    },
  },
});

export const { loadCartData } = cartSlice.actions;

export default cartSlice.reducer;
