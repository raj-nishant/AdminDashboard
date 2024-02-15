import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProducts, deleteUserProduct } from "../services/api";
import { useAuth } from "../services/Authcontext";
import right from "../assets/right.svg";

function ProductDetailPage() {
  const { userId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);

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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isDeleted) {
    // Render a message indicating the deletion was successful and provide a link to the dashboard
    return (
      <div className="container mx-auto mt-8">
        <div className="text-center">
          <p>Product deleted successfully!</p>
          <Link to={`/dashboard/${userId}`} className="text-blue-500">
            Go back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center items-center">
        <div className="w-full md:w-1/2 p-8 relative">
          <div className="relative overflow-hidden rounded-md">
            <img
              src={product.images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="object-contain w-full h-96 transition duration-500 ease-in-out transform hover:scale-110"
            />
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 w-12"
            >
              <img src={right} alt="rightbtn" />
            </button>
          </div>
          <div className="mt-4 bg-gradient-to-b from-transparent to-gray-800 rounded-md p-4">
            <h2 className="text-2xl font-bold text-white mb-2">
              {product.description}
            </h2>
            <p className="text-gray-300 mb-4">{product.details}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteProduct(product.id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
