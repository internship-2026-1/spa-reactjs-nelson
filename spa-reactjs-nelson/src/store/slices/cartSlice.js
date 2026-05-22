import { createSlice } from "@reduxjs/toolkit";
import { sessionStorageService } from "../../services/index.js";

const CART_KEY = "cart_items";

const storedCart = sessionStorageService.get(CART_KEY, []);

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: Array.isArray(storedCart) ? storedCart : [],
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          reference: product.reference,
          name: product.name,
          description: product.description,
          category: product.category,
          price: toNumber(product.price),
          stock: toNumber(product.stock),
          image: product.image || null,
          quantity: 1,
        });
      }

      sessionStorageService.set(CART_KEY, state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find((cartItem) => cartItem.id === id);

      if (item) {
        const safeQuantity = Math.max(1, Number(quantity || 1));
        const maxQuantity = item.stock > 0 ? item.stock : safeQuantity;

        item.quantity = Math.min(safeQuantity, maxQuantity);
      }

      sessionStorageService.set(CART_KEY, state.items);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      sessionStorageService.set(CART_KEY, state.items);
    },

    clearCart: (state) => {
      state.items = [];
      sessionStorageService.remove(CART_KEY);
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + Number(item.quantity || 0), 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

export default cartSlice.reducer;