import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  getUserDetails,
  getUserProducts,
  submitProduct,
  deleteUserProduct,
} from "../services/api";
import NewProductModal from "./NewProductModal";

function Dashboard() {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = async (formData) => {
    try {
      await submitProduct(userId, user.hashed_password, formData);
      const updatedProducts = await getUserProducts(
        userId,
        user.hashed_password
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteUserProduct(userId, productId, user.hashed_password);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
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

      <div className="flex justify-between m-5">
        <h2 className="text-2xl font-bold mt-8">Products</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Add New Product
        </button>

        <NewProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddProduct}
        />
      </div>

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
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
