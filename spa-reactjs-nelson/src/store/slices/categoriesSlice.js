import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/index.js";

const initialState = {
  items: [],
  loading: false,
  error: null,
  message: "",
};

function normalizeCategory(category) {
  return {
    id: category.id,
    name: category.name || "Sin nombre",
    description: category.description || "Sin descripción",
    createdAt: category.created_at || "",
    status: "Activa",
    productsCount: category.products_count || 0,
  };
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/core/api/v1/catalogo-products/");

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudieron obtener las categorías."
        );
      }

      return Array.isArray(response.data)
        ? response.data.map(normalizeCategory)
        : [];
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al obtener categorías."
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/core/api/v1/catalogo-products/", {
        name,
        description,
      });

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudo crear la categoría."
        );
      }

      return normalizeCategory(response.data);
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al crear categoría."
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoriesError: (state) => {
      state.error = null;
    },
    clearCategoriesMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Cargando categorías...";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
        state.message = "Categorías obtenidas correctamente.";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al obtener categorías.";
        state.message = "Error al obtener categorías.";
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Creando categoría...";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.error = null;
        state.message = "Categoría creada correctamente.";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al crear categoría.";
        state.message = "Error al crear categoría.";
      });
  },
});

export const { clearCategoriesError, clearCategoriesMessage } =
  categoriesSlice.actions;

export const selectCategories = (state) => state.categories.items;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;
export const selectCategoriesMessage = (state) => state.categories.message;

export default categoriesSlice.reducer;