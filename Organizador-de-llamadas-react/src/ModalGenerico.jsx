import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
console.log(isOpen)
  return (
      <div className="inset-0 backdrop-blur-md bg-black/50  rounded-xl absolute flex flex-col justify-center items-center p-5">
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

