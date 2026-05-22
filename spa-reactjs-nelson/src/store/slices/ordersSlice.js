import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/index.js";

const initialState = {
  items: [],
  currentOrder: null,
  loading: false,
  creating: false,
  paying: false,
  error: null,
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

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/core/api/v1/orders/", payload);

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudo crear la orden."
        );
      }

      return normalizeOrder(response.data);
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al crear orden."
      );
    }
  }
);

export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `/core/api/v1/orders/${orderId}/pay/`,
        {}
      );

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudo simular el pago."
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al simular pago."
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
        { status }
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
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
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

      .addCase(createOrder.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.message = "Creando orden...";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.creating = false;
        state.currentOrder = action.payload;
        state.items.unshift(action.payload);
        state.error = null;
        state.message = "Orden creada correctamente.";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || "Error al crear orden.";
      })

      .addCase(payOrder.pending, (state) => {
        state.paying = true;
        state.error = null;
        state.message = "Procesando pago...";
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.paying = false;
        state.message =
          action.payload?.message || "Pago simulado correctamente.";

        if (state.currentOrder) {
          state.currentOrder.status = "paid";
        }

        const orderId = action.payload?.order_id;

        if (orderId) {
          const order = state.items.find((item) => item.id === orderId);

          if (order) {
            order.status = "paid";
          }
        }
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.paying = false;
        state.error = action.payload || "Error al procesar pago.";
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          (order) => order.id === action.payload.id
        );

        if (index >= 0) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al actualizar pedido.";
      });
  },
});

export const { clearOrdersError, clearCurrentOrder } = ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.items;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersCreating = (state) => state.orders.creating;
export const selectOrdersPaying = (state) => state.orders.paying;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersMessage = (state) => state.orders.message;
export const selectCurrentOrder = (state) => state.orders.currentOrder;

export const selectMyOrders = (email) => (state) =>
  state.orders.items.filter((order) => order.customer_email === email);

export default ordersSlice.reducer;