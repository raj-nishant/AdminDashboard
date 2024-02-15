import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import ProductDetailPage from "./components/ProductDetailPage";
import { AuthProvider } from "./services/Authcontext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route
            path="/product/:userId/:productId"
            element={<ProductDetailPage />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
