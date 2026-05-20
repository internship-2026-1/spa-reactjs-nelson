import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiService, sessionStorageService } from "../../services/index.js";

const AUTH_USER_KEY = "auth_user";
const AUTH_ACCESS_TOKEN_KEY = "jwt";
const AUTH_REFRESH_TOKEN_KEY = "refresh_token";

const storedUser = sessionStorageService.get(AUTH_USER_KEY, null);
const storedAccessToken = sessionStorageService.get(AUTH_ACCESS_TOKEN_KEY, null);
const storedRefreshToken = sessionStorageService.get(AUTH_REFRESH_TOKEN_KEY, null);

const initialState = {
  user: storedUser,
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  isAuthenticated: Boolean(storedUser && storedAccessToken),
  isAuthReady: true,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/user/api/v1/auth/login/", {
        email,
        password,
      });

      if (!response?.success) {
        return rejectWithValue(
          response?.message || "No se pudo iniciar sesión."
        );
      }

      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;

      if (!accessToken) {
        return rejectWithValue("El backend no devolvió access token.");
      }

      return {
        accessToken,
        refreshToken,
        user: {
          email,
          name: email === "admin@techspec.com" ? "Admin" : email.split("@")[0],
          role: email === "admin@techspec.com" ? "admin" : "user",
        },
      };
    } catch (error) {
      return rejectWithValue(
        error?.data?.message ||
          error?.message ||
          "Error de conexión con el servidor."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = Boolean(user && accessToken);
      state.error = null;

      sessionStorageService.set(AUTH_ACCESS_TOKEN_KEY, accessToken);
      sessionStorageService.set(AUTH_REFRESH_TOKEN_KEY, refreshToken || null);
      sessionStorageService.set(AUTH_USER_KEY, user);
    },

    logoutSession: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      sessionStorageService.remove(AUTH_ACCESS_TOKEN_KEY);
      sessionStorageService.remove(AUTH_REFRESH_TOKEN_KEY);
      sessionStorageService.remove(AUTH_USER_KEY);
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload;

        state.loading = false;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken || null;
        state.isAuthenticated = true;
        state.error = null;

        sessionStorageService.set(AUTH_ACCESS_TOKEN_KEY, accessToken);
        sessionStorageService.set(AUTH_REFRESH_TOKEN_KEY, refreshToken || null);
        sessionStorageService.set(AUTH_USER_KEY, user);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Credenciales inválidas.";
        state.isAuthenticated = false;
      });
  },
});

export const { setSession, logoutSession, clearAuthError } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;