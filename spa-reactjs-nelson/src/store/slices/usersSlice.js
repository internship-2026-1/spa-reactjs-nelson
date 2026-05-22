import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/index.js";

const initialState = {
  items: [],
  listLoading: false,
  listError: null,

  registerLoading: false,
  registerError: null,
  registerSuccess: null,

  passwordResetLoading: false,
  passwordResetError: null,
  passwordResetSuccess: null,

  newPasswordLoading: false,
  newPasswordError: null,
  newPasswordSuccess: null,
};

function getErrorMessage(error, fallback) {
  if (typeof error?.data?.message === "string") {
    return error.data.message;
  }

  if (typeof error?.message === "string") {
    return error.message;
  }

  return fallback;
}

function getErrorData(error) {
  return error?.data?.data || null;
}

function normalizeUser(user) {
  return {
    id: user.id,
    username: user.username || "",
    name:
      user.name ||
      `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
      user.username ||
      user.email,
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "b2c",
    status: user.status || (user.is_active ? "Activo" : "Inactivo"),
    createdAt: user.created_at
      ? new Date(user.created_at).toISOString().slice(0, 10)
      : "",
  };
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/user/api/v1/users/");

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudieron obtener los usuarios."
        );
      }

      return Array.isArray(response.data)
        ? response.data.map(normalizeUser)
        : [];
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión al obtener usuarios."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/user/api/v1/register/", payload);

      if (!response?.success) {
        return rejectWithValue({
          message: response?.message || "No se pudo registrar el usuario.",
          data: response?.data || null,
        });
      }

      return response;
    } catch (error) {
      return rejectWithValue({
        message: getErrorMessage(error, "Error de conexión al registrar usuario."),
        data: getErrorData(error),
      });
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "users/requestPasswordReset",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/user/api/v1/auth/password-reset/", {
        email,
      });

      if (!response?.success) {
        return rejectWithValue({
          message:
            response?.message || "No se pudo solicitar el restablecimiento.",
          data: response?.data || null,
        });
      }

      return response;
    } catch (error) {
      return rejectWithValue({
        message: getErrorMessage(
          error,
          "Error de conexión al solicitar restablecimiento."
        ),
        data: getErrorData(error),
      });
    }
  }
);

export const confirmPasswordReset = createAsyncThunk(
  "users/confirmPasswordReset",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        "/user/api/v1/auth/password-reset/confirm/",
        {
          token,
          new_password: newPassword,
        }
      );

      if (!response?.success) {
        return rejectWithValue({
          message:
            response?.message || "No se pudo actualizar la contraseña.",
          data: response?.data || null,
        });
      }

      return response;
    } catch (error) {
      return rejectWithValue({
        message: getErrorMessage(
          error,
          "Error de conexión al actualizar contraseña."
        ),
        data: getErrorData(error),
      });
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.listError = null;
    },

    clearRegisterState: (state) => {
      state.registerError = null;
      state.registerSuccess = null;
    },

    clearPasswordResetState: (state) => {
      state.passwordResetError = null;
      state.passwordResetSuccess = null;
      state.newPasswordError = null;
      state.newPasswordSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.listLoading = false;
        state.items = action.payload;
        state.listError = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload || "Error al obtener usuarios.";
      })

      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerSuccess = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess =
          action.payload?.message || "Usuario registrado correctamente.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload || {
          message: "No se pudo registrar el usuario.",
          data: null,
        };
      })

      .addCase(requestPasswordReset.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
        state.passwordResetSuccess = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess =
          action.payload?.message ||
          "Se ha enviado un correo con las instrucciones.";
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload || {
          message: "No se pudo solicitar el restablecimiento.",
          data: null,
        };
      })

      .addCase(confirmPasswordReset.pending, (state) => {
        state.newPasswordLoading = true;
        state.newPasswordError = null;
        state.newPasswordSuccess = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state, action) => {
        state.newPasswordLoading = false;
        state.newPasswordSuccess =
          action.payload?.message ||
          "La contraseña ha sido actualizada exitosamente.";
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.newPasswordLoading = false;
        state.newPasswordError = action.payload || {
          message: "No se pudo actualizar la contraseña.",
          data: null,
        };
      });
  },
});

export const {
  clearUsersError,
  clearRegisterState,
  clearPasswordResetState,
} = usersSlice.actions;

export const selectUsers = (state) => state.users.items;
export const selectUsersLoading = (state) => state.users.listLoading;
export const selectUsersError = (state) => state.users.listError;

export const selectRegisterLoading = (state) => state.users.registerLoading;
export const selectRegisterError = (state) => state.users.registerError;
export const selectRegisterSuccess = (state) => state.users.registerSuccess;

export const selectPasswordResetLoading = (state) =>
  state.users.passwordResetLoading;
export const selectPasswordResetError = (state) =>
  state.users.passwordResetError;
export const selectPasswordResetSuccess = (state) =>
  state.users.passwordResetSuccess;

export const selectNewPasswordLoading = (state) =>
  state.users.newPasswordLoading;
export const selectNewPasswordError = (state) => state.users.newPasswordError;
export const selectNewPasswordSuccess = (state) =>
  state.users.newPasswordSuccess;

export default usersSlice.reducer;