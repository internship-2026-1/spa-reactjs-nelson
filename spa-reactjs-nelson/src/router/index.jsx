import { Routes, Route, Navigate } from "react-router-dom";

import { SimpleLayout, MainLayout } from "../layouts";

import Home from "../modules/public/home";
import Login from "../modules/public/login";
import Register from "../modules/public/register";
import NotFound from "../modules/public/not-found";
import PasswordResetRequest from "../modules/public/password-reset/request";
import PasswordResetConfirm from "../modules/public/password-reset/confirm";
import Cart from "../modules/public/cart";
import Checkout from "../modules/public/checkout";
import CheckoutSuccess from "../modules/public/checkout/success";

import Dashboard from "../modules/private/dashboard";
import Products from "../modules/private/products";
import Orders from "../modules/private/orders";
import Categories from "../modules/private/categories";
import Users from "../modules/private/users";
import Integration from "../modules/private/integration";
import Perfil from "../modules/private/perfil";

import { PrivateRoute } from "./PrivateRoute.jsx";
import { RoleRoute } from "./RoleRoute.jsx";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<SimpleLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<PasswordResetRequest />} />
        <Route path="/new-password" element={<PasswordResetConfirm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Products />
            </RoleRoute>
          }
        />

        <Route
          path="/categorias"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Categories />
            </RoleRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Orders />
            </RoleRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Users />
            </RoleRoute>
          }
        />

        <Route
          path="/integracion"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Integration />
            </RoleRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <RoleRoute allowedRoles={["b2c", "b2b"]}>
              <Orders />
            </RoleRoute>
          }
        />

        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
