import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const AuthRoutes = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={user.role === "companyadmin" ? "/company/dashboard" : "/"} replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="register" element={<AuthLayout><Register /></AuthLayout>} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
