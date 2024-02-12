import React, { useState } from "react";

function EditProductModal({ isOpen, onClose, product, onSubmit }) {
  const [formData, setFormData] = useState({
    description: product ? product.description : "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product.id, formData);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="z-10 bg-white p-8 max-w-md mx-auto rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-md mt-1"
            />
          </div>
          {/* Add more fields as needed */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
