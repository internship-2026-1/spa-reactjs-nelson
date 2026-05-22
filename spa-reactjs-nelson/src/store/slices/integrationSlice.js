import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/index.js";

const initialState = {
  status: "idle",
  loading: false,
  error: null,
  message: "",
  result: null,
};

export const syncProductsIntegration = createAsyncThunk(
  "integration/syncProductsIntegration",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/core/api/v1/integracion/products/");

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudo ejecutar la integración."
        );
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al ejecutar integración."
      );
    }
  }
);

const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {
    resetIntegrationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncProductsIntegration.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
        state.message = "Conectando con el servidor...";
      })
      .addCase(syncProductsIntegration.fulfilled, (state, action) => {
        state.status = "success";
        state.loading = false;
        state.error = null;
        state.message =
          action.payload?.message || "Integración completada correctamente.";
        state.result = action.payload?.data || null;
      })
      .addCase(syncProductsIntegration.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.payload || "No se pudo ejecutar la integración.";
        state.message = action.payload || "No se pudo ejecutar la integración.";
      });
  },
});

export const { resetIntegrationState } = integrationSlice.actions;

export const selectIntegrationStatus = (state) => state.integration.status;
export const selectIntegrationLoading = (state) => state.integration.loading;
export const selectIntegrationError = (state) => state.integration.error;
export const selectIntegrationMessage = (state) => state.integration.message;
export const selectIntegrationResult = (state) => state.integration.result;

export default integrationSlice.reducer;