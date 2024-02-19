import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Function to get query parameters from URL
    const getQueryParam = (name) => {
      const params = new URLSearchParams(location.search);
      return params.get(name);
    };

    // Check if referral code exists in query parameters
    const referralParam = getQueryParam("referral");

    if (referralParam) {
      setReferralCode(referralParam);
    }
  }, [location.search]);

  useEffect(() => {
    let redirectTimer;
    if (successMessage) {
      redirectTimer = setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    return () => clearTimeout(redirectTimer);
  }, [successMessage, navigate]);

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://floating-shore-52389-ec1ab93f1be3.herokuapp.com/register",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "store-name": "Nishant",
          },
          body: JSON.stringify({
            name,
            email,
            hashed_password: password,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Email is already in use");
        } else {
          throw new Error("Failed to register");
        }
      }

      setSuccessMessage("Registration successful, redirecting to login......");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {/* Your existing code for error and success messages */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
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
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Referral Code (Optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
