import { createSlice } from "@reduxjs/toolkit";

const initialShipping = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  method: "standard",
};

const initialPayment = {
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    step: 1,
    shipping: initialShipping,
    payment: initialPayment,
    pendingOrderId: null,
  },
  reducers: {
    nextStep: (state) => {
      if (state.step < 2) {
        state.step += 1;
      }
    },

    prevStep: (state) => {
      if (state.step > 1) {
        state.step -= 1;
      }
    },

    updateShipping: (state, action) => {
      state.shipping = {
        ...state.shipping,
        ...action.payload,
      };
    },

    updatePayment: (state, action) => {
      state.payment = {
        ...state.payment,
        ...action.payload,
      };
    },

    setPendingOrderId: (state, action) => {
      state.pendingOrderId = action.payload;
    },

    resetCheckout: (state) => {
      state.step = 1;
      state.shipping = initialShipping;
      state.payment = initialPayment;
      state.pendingOrderId = null;
    },
  },
});

export const {
  nextStep,
  prevStep,
  updateShipping,
  updatePayment,
  setPendingOrderId,
  resetCheckout,
} = checkoutSlice.actions;

export const selectCheckoutStep = (state) => state.checkout.step;
export const selectShipping = (state) => state.checkout.shipping;
export const selectPayment = (state) => state.checkout.payment;
export const selectPendingOrderId = (state) => state.checkout.pendingOrderId;

export default checkoutSlice.reducer;