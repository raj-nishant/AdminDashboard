// ProductModal.js
import React from "react";

function ProductModal({
  showModal,
  handleModalClose,
  handleProductSubmit,
  newProduct,
  setNewProduct,
}) {
  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <input
            type="text"
            placeholder="Product ID"
            value={newProduct.productId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productId: e.target.value })
            }
            className="mb-2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mb-2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            multiple
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                images: Array.from(e.target.files),
              })
            }
            className="mb-2 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleProductSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            onClick={handleModalClose}
            className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
}

export default ProductModal;
