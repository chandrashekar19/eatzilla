import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
