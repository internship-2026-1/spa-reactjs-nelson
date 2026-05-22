import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice.js";
import productsReducer from "./slices/productsSlice.js";
import usersReducer from "./slices/usersSlice.js";
import ordersReducer from "./slices/ordersSlice.js";
import categoriesReducer from "./slices/categoriesSlice.js";
import integrationReducer from "./slices/integrationSlice.js";
import cartReducer from "./slices/cartSlice.js";
import checkoutReducer from "./slices/checkoutSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
    integration: integrationReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});