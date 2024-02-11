// components/dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getUserDetails, getUserProducts } from "../services/api";

function Dashboard() {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const userData = await getUserDetails(userId, user.hashed_password);
          const productsData = await getUserProducts(
            userId,
            user.hashed_password
          );

          setUserDetails(userData);
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [userId, user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
        <div className="absolute inset-x-0 top-0 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
          {userDetails && (
            <div className="text-white text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg">Name: {userDetails.name}</p>
              <p className="text-lg">Email: {userDetails.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="ml-0 md:ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.images[0]}
              alt={product.description}
              className="w-full h-64 object-cover object-center"
            />
            <div className="px-6 py-4">
              <h3 className="text-xl font-semibold mb-2">
                {product.description}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
