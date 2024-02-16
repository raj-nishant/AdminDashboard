import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link
import { useAuth } from "../services/Authcontext";
import dropdown from "../assets/dropdown.svg";
import {
  getUserDetails,
  getUserProducts,
  submitProduct,
} from "../services/api";
import NewProductModal from "./NewProductModal";

function Dashboard() {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="top-0 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white ml-4 focus:outline-none"
          >
            {userDetails && (
              <span className="font-bold">{userDetails.name}</span>
            )}
            <img className="h-7" src={dropdown} alt="" />
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="right-0 mt-2 bg-white rounded-md shadow-lg z-10"
            >
              <div className="py-1">
                {userDetails && (
                  <div className="px-4 py-2">
                    <p className="text-gray-700">{userDetails.name}</p>
                    <p className="text-gray-700">{userDetails.email}</p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full bg-red-600 text-left px-4 py-2 text-sm text-white hover:bg-gray-500 hover:text-black"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold mt-8 md:mt-0">Products</h2>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8 md:mt-0"
          >
            Add New Product
          </button>

          <NewProductModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddProduct}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {console.log(products)}
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${user.id}/${product.id}`} // Link to the product detail page
              className="product-link"
            >
              <div className="border rounded-md text-center shadow-md bg-zinc-100 hover:transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                <img
                  src={product.images[0]}
                  alt={product.description} // Use product.description here
                  className="w-full h-60 object-cover rounded-t-md"
                />
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mb-2 overflow-hidden">
                    {product.description}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
