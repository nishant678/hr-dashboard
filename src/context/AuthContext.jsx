// @refresh reset
import React, { createContext, useContext, useEffect, useState } from "react";
import { AUTH_LOGIN } from "../config/endpoints";

const AuthContext = createContext();

const USER_STORAGE_KEY = "hr_dashboard_user";
const TOKEN_STORAGE_KEY = "hr_dashboard_token";

const normalizeRole = (role) => {
  if (!role) return "user";
  const normalized = String(role).trim().toLowerCase();
  if (normalized === "master_admin" || normalized === "master admin" || normalized === "superadmin") {
    return "superadmin";
  }
  if (normalized === "companyadmin" || normalized === "company admin") {
    return "companyadmin";
  }
  return normalized;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser({
        ...parsed,
        role: normalizeRole(parsed.role)
      });
    }
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Please enter both email and password." };
    }

    try {
      const response = await fetch(AUTH_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = data?.message || "Login failed. Check your credentials and try again.";
        return { success: false, message };
      }

      const userData = {
        id: data.id,
        email: data.email || email,
        role: normalizeRole(data.role),
        name: data.name || data.email || "User",
        token: data.token || null
      };

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      if (userData.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, userData.token);
      }
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        message: "Unable to connect to the login service. Please try again later."
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  };

  const register = ({ name, email, role }) => {
    const userData = {
      id: email,
      email,
      role: normalizeRole(role),
      name,
      token: null
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    return { success: true, user: userData };
  };

  return (
    <AuthContext.Provider value={{ user, token: user?.token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
