import { cn } from "@app/lib/utils";
import React from "react";

interface IScrollSection {
  className?: string;
  children?: React.ReactNode;
}

const ScrollSection: React.FC<IScrollSection> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "w-full h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-y-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollSection;
