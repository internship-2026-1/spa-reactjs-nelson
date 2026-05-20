import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice.js";
import productsReducer from "./slices/productsSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});