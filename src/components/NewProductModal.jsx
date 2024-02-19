import React, { useState } from "react";

function NewProductModal({ isOpen, onClose, onSubmit }) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);

    // Append each image to the FormData object
    images.forEach((image) => {
      formData.append("images", image);
    });

    onSubmit(formData);
    setDescription("");
    setImages([]);
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
    >
      <div className="modal-content bg-white w-96 p-6 rounded-lg">
        <button
          onClick={onClose}
          className="float-right font-bold text-red-700 hover:text-gray-800"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
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
              value={description}
              onChange={handleChange}
              className="border border-gray-400 rounded-md py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 font-bold mb-2"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple // Allow multiple file selection
              onChange={handleChange}
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
    </div>
  );
}

export default NewProductModal;
