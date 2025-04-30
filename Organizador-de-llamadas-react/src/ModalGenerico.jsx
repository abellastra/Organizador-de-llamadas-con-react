import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
console.log(isOpen)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

