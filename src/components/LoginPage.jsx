import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../services/Authcontext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://floating-shore-52389-ec1ab93f1be3.herokuapp.com/users",
        {
          headers: {
            "Content-Type": "application/json",
            "store-name": "Nishant",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      const user = users.find(
        (u) => u.email === email && u.hashed_password === password
      );
      if (!user) {
        throw new Error("Invalid email or password");
      }
      // Login successful, store user data in context
      login(user);

      // Redirect to dashboard
      navigate(`/dashboard/${user.id}`, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="mb-2">Don't have an account?</p>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
