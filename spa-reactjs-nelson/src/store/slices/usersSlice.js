import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService } from "../../services/index.js";

const initialState = {
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

export const { clearRegisterState, clearPasswordResetState } =
  usersSlice.actions;

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