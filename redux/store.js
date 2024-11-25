"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import modalReducer from "./slice/modalSlice";
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";
import currencyReducer from "./slice/currencySlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    modal: modalReducer,
    wishlist: wishlistReducer,
    currency: currencyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
