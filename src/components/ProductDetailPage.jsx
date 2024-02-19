import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserProducts, deleteUserProduct } from "../services/api";
import { useAuth } from "../services/Authcontext";
import right from "../assets/right.svg";
import Header from "./Header";

function ProductDetailPage() {
  const { userId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user, logout } = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productsData = await getUserProducts(
          userId,
          user.hashed_password
        );
        const selectedProduct = productsData.find(
          (product) => product.id == productId
        );
        if (selectedProduct) {
          setProduct(selectedProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [user, productId, userId]);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteUserProduct(userId, productId, user.hashed_password);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isDeleted) {
    return (
      <div className="container mx-auto mt-8">
        <div className="text-center">
          <p className="text-2xl text-green-500 font-semibold mb-4">
            Product deleted successfully!
          </p>
          <Link
            to={`/dashboard/${userId}`}
            className="text-blue-500 hover:underline"
          >
            Go back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return !product ? (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-400 h-2/3 w-1/2 "></div>
      </div>
    </>
  ) : (
    <>
      <Header />

      <div className="bg-gray-200 py-8">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="w-full md:w-1/2 p-8 relative bg-white rounded-lg shadow-xl">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={product.images[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="object-contain w-full h-96 transition duration-500 ease-in-out transform hover:scale-110"
                />
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 w-12 bg-white rounded-full shadow-md focus:outline-none"
                >
                  <img src={right} alt="rightbtn" />
                </button>
              </div>
              <div className="mt-6 p-4 border border-gray-200 rounded-md bg-white shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
