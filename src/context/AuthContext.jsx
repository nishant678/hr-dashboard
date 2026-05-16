import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const staticUsers = [
  {
    id: "superadmin@workbook.com",
    password: "SuperAdmin123",
    role: "superadmin",
    name: "Super Admin"
  },
  {
    id: "companyadmin@acme.com",
    password: "CompanyAdmin123",
    role: "companyadmin",
    name: "Company Admin"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (id, password) => {
    const matched = staticUsers.find(
      (item) => item.id === id && item.password === password
    );

    if (!matched) {
      return { success: false, message: "Invalid credentials. Use the sample Super Admin / Company Admin ID." };
    }

    const userData = {
      id: matched.id,
      role: matched.role,
      name: matched.name
    };

    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  const register = ({ name, email, role }) => {
    const userData = {
      id: email,
      role,
      name
    };

    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
    return { success: true, user: userData };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
