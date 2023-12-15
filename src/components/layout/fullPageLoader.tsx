import React from "react";
import Logo from "@app/assets/images/logo.png";
import Image from "next/image";

const FullPageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex items-center flex-col">
        <div className="absolute w-24 h-24 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="pt-2">
          <Image src={Logo} alt="pic_logo" className="w-20" />
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
