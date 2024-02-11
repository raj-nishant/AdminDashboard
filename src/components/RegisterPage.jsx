import React, { useState } from "react";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        throw new Error("Failed to register");
      }

      setSuccessMessage("Registration successful");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg">
      <h2 className="text-xl mb-4">Register</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
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
  );
}

export default RegisterPage;
