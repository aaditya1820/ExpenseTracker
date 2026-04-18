import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="relative w-[100px] h-[100px] mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-3xl relative border border-gray-200">
          <LuUser className="text-4xl text-slate-400" />
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center bg-[#8b5cf6] text-white rounded-xl absolute -bottom-2 -right-2 hover:bg-[#7c3aed] transition-all hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-3xl relative border border-gray-200">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-24 h-24 rounded-3xl object-cover"
          />
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center bg-rose-600 text-white rounded-xl absolute -bottom-2 -right-2 hover:bg-rose-700 transition-all hover:shadow-lg hover:shadow-rose-500/30 active:scale-95"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfilePhotoSelector;