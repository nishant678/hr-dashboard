import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { HeaderProvider } from "./context/HeaderContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <HeaderProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </HeaderProvider>
    </AuthProvider>
  );
}

export default App;