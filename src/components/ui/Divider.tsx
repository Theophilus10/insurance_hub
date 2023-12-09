import { cn } from "@app/lib/utils";
import React from "react";

interface IDivider {
  className?: string;
}

const Divider: React.FC<IDivider> = ({ className = "" }) => {
  return (
    <div className={cn("my-1 h-px bg-gray-100 dark:bg-gray-600", className)} />
  );
};

export default Divider;
