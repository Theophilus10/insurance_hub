import React from "react";
import Logo from "@app/assets/images/logo.png";
import LoadLogo from "@app/assets/images/default.png";
import Image from "next/image";

const FullPageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex items-center flex-col">
        <div className="absolute w-24 h-24 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="pt-2">
          <Image src={LoadLogo} alt="pic_logo" className="w-20" />
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
