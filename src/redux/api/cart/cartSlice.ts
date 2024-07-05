import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  products: any[];
  subTotal: number;
  total: number;
  shipping: number;
  taxTotal: number;
  totalQuantity: number;
}

const initialState: IProduct = {
  products: [],
  subTotal: 0,
  total: 0,
  shipping: 0,
  taxTotal: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadCartItems: (state, action: PayloadAction<any>) => {
      const products = Array.isArray(action.payload) ? action.payload : [];
      //add default quantity of product as 1
      state.products = products.map((product) => ({
        ...product,
        quantity: product.quantity ?? 1,
      }));
      //sub total
      state.subTotal = products.reduce(
        (total, product) => total + Number(product.Product?.discountPrice || 0),
        0
      );
      //total quantity of all products
      state.totalQuantity = products.reduce(
        (total, product) => total + (product.quantity ?? 1),
        0
      );
      //shipping
      state.shipping = products?.length > 0 ? 100 : 0;
      //tax total
      state.taxTotal = parseFloat((0.015 * state.subTotal).toFixed(2));
      //total
      state.total = state.subTotal + state.shipping + state.taxTotal;
    },
    addToCart: (state, action: PayloadAction<any>) => {
      // add product to cart and update product quantity
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      //sub total
      state.subTotal += Number(action?.payload?.Product?.discountPrice);
      //quantity
      state.totalQuantity += 1;
      //tal total
      state.taxTotal = parseFloat((0.015 * state.subTotal).toFixed(2));
      //total
      state.total = state.subTotal + state.shipping + state.taxTotal;
    },
    decrementOnCart: (state, action: PayloadAction<any>) => {
      //reduce quantity
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      //reduce total quantity of products
      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
        state.totalQuantity -= 1;
      }
      //sub total
      state.subTotal -= action.payload.Product.discountPrice;
      //tax total
      state.taxTotal = parseFloat((0.015 * state.subTotal).toFixed(2));
      //total
      state.total = state.subTotal + state.shipping + state.taxTotal;
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      //sub total
      state.subTotal -=
        action.payload.Product.discountPrice * action.payload.quantity!;
      //tax total
      state.taxTotal = parseFloat((0.015 * state.subTotal).toFixed(2));
      //total
      state.total = state.subTotal + state.shipping + state.taxTotal;

      // state.totalQuantity -= action.payload.
    },
  },
});

export const { loadCartItems, addToCart, decrementOnCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
