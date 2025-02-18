import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null; // If modal is not open, return null
  // console.log(children);
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 dark:text-white/60 dark:bg-gray-700">
        <h2 className="text-xl font-bold mb-4">Reason for Decline</h2>
        <div>{children}</div>
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          {/* another option */}
          {/* {children?.props?.value && <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>} */}
          <button
            disabled={!children?.props?.value}
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
