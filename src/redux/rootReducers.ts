import { baseApi } from "./api/baseApi";
import cartSlice from "./api/cart/cartSlice";

export const reducer = {
  cart: cartSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
