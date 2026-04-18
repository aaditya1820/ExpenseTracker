import React from "react";
const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="space-y-6">
      <p className="text-slate-600 leading-relaxed">{content}</p>
      <div className="flex justify-end pt-2">
        <button
          type="button"
          className="danger-btn w-full md:w-auto justify-center"
          onClick={onDelete}
        >
          Delete Permanently
        </button>
      </div>
    </div>
  );
};
export default DeleteAlert;