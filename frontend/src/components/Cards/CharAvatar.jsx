import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullname, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || ""
      } flex items-center justify-center rounded-full text-white font-bold bg-gradient-to-br from-primary to-primary-light shadow-inner shadow-white/20`}
    >
      {getInitials(fullname || "")}
    </div>
  );
};

export default CharAvatar;
