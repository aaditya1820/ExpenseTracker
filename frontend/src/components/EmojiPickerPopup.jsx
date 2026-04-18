import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Pick Emoji</label>

      <div
        className="flex flex-col items-center cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-200 transition-all">
          {icon ? (
            <img
              src={icon}
              alt="Icon"
              className="w-12 h-12 object-contain rounded-full"
            />
          ) : (
            <LuImage className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1 group-hover:text-black transition">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="absolute top-24 z-[999] w-[340px] bg-white border border-gray-300 rounded-xl shadow-xl">
          <div className="flex justify-end p-2">
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <LuX className="w-5 h-5" />
            </button>
          </div>

          <div className="px-2 pb-3 max-h-[420px] overflow-y-auto">
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || "");
                setIsOpen(false);
              }}
              emojiStyle="native"
              theme="light"
              lazyLoadEmojis
              width="100%"
              height="380px"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
