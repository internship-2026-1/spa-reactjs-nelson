import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/index.js";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

function normalizeProduct(product) {
  const price = Number(product.price || 0);
  const stock = Number(product.stock || 0);

  return {
    id: product.id,
    reference: product.reference || "SIN-REF",
    name: product.name || "Producto sin nombre",
    description: product.description || "Sin descripción",
    price,
    stock,
    category: product.catalogo_product?.name || "Sin categoría",
    categoryDescription: product.catalogo_product?.description || "",
    attributes: product.attributes || {},
    tags: product.tags || [],
    createdAt: product.created_at,
    updatedAt: product.updated_at,
    status: stock > 0 ? "Activo" : "Agotado",
  };
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/core/api/v1/products/");

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudieron obtener los productos."
        );
      }

      return Array.isArray(response.data)
        ? response.data.map(normalizeProduct)
        : [];
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al obtener productos."
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al cargar productos.";
      });
  },
});

export const { clearProductsError } = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;