import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../services/Authcontext";
import { getUserProducts, submitProduct } from "../services/api";
import NewProductModal from "./NewProductModal";
import DeleteAccountModal from "./DeleteAccountModal";
import Header from "./Header";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

function Dashboard() {
  const { userId } = useParams();
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentImageIndexes, setCurrentImageIndexes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const productsData = await getUserProducts(
            userId,
            user.hashed_password
          );
          setProducts(productsData);
          setCurrentImageIndexes(Array(productsData.length).fill(0));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [userId, user]);

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
      setCurrentImageIndexes(Array(updatedProducts.length).fill(0));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleNextImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        (newIndexes[index] + 1) % products[index].images.length;
      return newIndexes;
    });
  };

  const handlePreviousImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        (newIndexes[index] - 1 + products[index].images.length) %
        products[index].images.length;
      return newIndexes;
    });
  };

  return (
    <>
      <Header />
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
          {products.map((product, index) => (
            <div
              key={product.id}
              className="border rounded-md text-center shadow-md bg-zinc-100 hover:transform hover:scale-105 transition-transform duration-300 hover:shadow-lg relative"
            >
              {product.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={product.description}
                  className={`w-full h-60 object-cover rounded-t-md ${
                    imgIndex === currentImageIndexes[index] ? "" : "hidden"
                  }`}
                />
              ))}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => handlePreviousImage(index)}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none"
                  >
                    <img src={left} alt="Previous" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleNextImage(index)}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none"
                  >
                    <img src={right} alt="Next" className="w-4 h-4" />
                  </button>
                </>
              )}
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold mb-2 overflow-hidden">
                  {product.description}
                </h3>
                <Link
                  to={`/product/${user.id}/${product.id}`}
                  className="product-link"
                >
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
}

export default Dashboard;
