import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  getUserDetails,
  getUserProducts,
  deleteUserProduct,
} from "../services/api";
import ProductModal from "./ProductModal";

function Dashboard() {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productId: "",
    description: "",
    images: [],
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

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleProductSubmit = () => {
    // Add or update a product for the user
    fetch(
      `https://floating-shore-52389-ec1ab93f1be3.herokuapp.com/product/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "store-name": "Nishant",
          hashed_password: user.hashed_password,
        },
        body: JSON.stringify(newProduct),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update products list with the new or updated product
        setProducts([...products, data]);
        // Clear the new product form
        setNewProduct({
          productId: "",
          description: "",
          images: [],
        });
        // Close the modal
        setShowModal(false);
      })
      .catch((error) => console.error("Error adding/updating product:", error));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteUserProduct(userId, productId, user.hashed_password);
      // Filter out the deleted product from the products list
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4 mb-8 rounded-lg">
          {userDetails && (
            <div className="text-white text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg">Name: {userDetails.name}</p>
              <p className="text-lg">Email: {userDetails.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleModalOpen}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add Product
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Products</h2>
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

        {/* Modal */}
        <ProductModal
          showModal={showModal}
          handleModalClose={handleModalClose}
          handleProductSubmit={handleProductSubmit}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
      </div>
    </>
  );
}

export default Dashboard;
