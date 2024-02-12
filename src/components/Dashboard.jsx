import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  getUserDetails,
  getUserProducts,
  submitProduct,
} from "../services/api"; // assuming you have a submitProduct function in your API service

function Dashboard() {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    description: "",
    image: null,
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", "");
      formData.append("description", newProduct.description);
      formData.append("image", newProduct.image);

      // Assuming you have a submitProduct function in your API service
      await submitProduct(userId, user.hashed_password, formData);

      // Assuming you have a getUserProducts function to refresh the products list
      const updatedProducts = await getUserProducts(
        userId,
        user.hashed_password
      );
      setProducts(updatedProducts);

      // Clear the form after successful submission
      setNewProduct({ id: "", description: "", image: null });
    } catch (error) {
      console.error("Error submitting product:", error);
    }
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

      <h2 className="text-2xl font-bold mt-8">Add New Product</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="border border-gray-400 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-400 rounded-md py-2 px-3 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
