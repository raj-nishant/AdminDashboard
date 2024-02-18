import React from "react";

const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccountModal;
