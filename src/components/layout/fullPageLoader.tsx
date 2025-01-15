import React from "react";
import LoadLogo from "@app/assets/images/default.png";
import Image from "next/image";

const FullPageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute">
          <Image src={LoadLogo} alt="Loading logo" className="w-16 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
