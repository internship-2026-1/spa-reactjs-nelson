import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/index.js";

const initialState = {
  items: [],
  loading: false,
  updating: false,
  error: null,
  updateError: null,
  message: "",
};

function normalizeOrder(order) {
  const items = Array.isArray(order.items) ? order.items : [];

  return {
    id: order.id,
    customer: order.customer_email || "Cliente sin correo",
    customer_email: order.customer_email || "",
    date: order.created_at
      ? new Date(order.created_at).toISOString().slice(0, 10)
      : "",
    itemsCount: items.reduce(
      (total, item) =>
        total + Number(item.quantity || item.cantidad_products || 0),
      0
    ),
    items,
    total: Number(order.total_amount || 0),
    status: order.status || "pending",
    shippingAddress: order.shipping_address || {},
    metadata: order.metadata || {},
    createdAt: order.created_at,
  };
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/core/api/v1/orders/");

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudieron obtener los pedidos."
        );
      }

      return Array.isArray(response.data)
        ? response.data.map(normalizeOrder)
        : [];
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al obtener pedidos."
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(
        `/core/api/v1/orders/${id}/status/`,
        {
          status,
        }
      );

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudo actualizar el pedido."
        );
      }

      return normalizeOrder(response.data);
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al actualizar pedido."
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrdersError: (state) => {
      state.error = null;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Cargando pedidos...";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
        state.message = "Pedidos obtenidos correctamente.";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al obtener pedidos.";
        state.message = "Error al obtener pedidos.";
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updating = false;
        state.updateError = null;
        state.message = "Pedido actualizado correctamente.";

        const index = state.items.findIndex(
          (item) => String(item.id) === String(action.payload.id)
        );

        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload || "Error al actualizar pedido.";
      });
  },
});

export const { clearOrdersError } = ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.items;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersUpdating = (state) => state.orders.updating;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersUpdateError = (state) => state.orders.updateError;
export const selectOrdersMessage = (state) => state.orders.message;

export const selectMyOrders = (email) => (state) =>
  state.orders.items.filter((order) => order.customer_email === email);

export default ordersSlice.reducer;