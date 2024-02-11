import React, { useState } from "react";

function AddProductModal({ isOpen, onClose, onSubmit }) {
  const [newProduct, setNewProduct] = useState({
    productId: "",
    description: "",
    images: [],
  });

  const handleSubmit = () => {
    onSubmit(newProduct);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-content">
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={newProduct.productId}
          onChange={(e) =>
            setNewProduct({ ...newProduct, productId: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
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
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddProductModal;
