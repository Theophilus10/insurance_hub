import { cn } from "@app/lib/utils";
import React, { FC } from "react";
import IconifyIcon from "../icon";

export interface IBreadCrumb {
  title: string;
  path?: string;
}

interface BreadCrumbProps {
  options: IBreadCrumb[];
  onItemClick?: (title: string, path: string, index: number) => void;
  activeBreadCrumb: string;
  className?: string;
}

const BreadCrumb: FC<BreadCrumbProps> = ({
  options,
  activeBreadCrumb,
  className,
  onItemClick,
}) => {
  return (
    <ul className="flex gap-3 items-center">
      {options &&
        options.map(({ title, path }, index) => (
          <>
            <li key={index}>
              <button
                onClick={() => onItemClick && onItemClick(title, path!, index)}
                className={cn(
                  `capitalize ${
                    activeBreadCrumb === title && index !== 0
                      ? "text-blue-500"
                      : "text-gray-500"
                  } ${
                    activeBreadCrumb !== title
                      ? "hover:text-gray-400"
                      : "cursor-default"
                  }`,
                  className
                )}
              >
                {title}
              </button>
            </li>
            {index !== options.length - 1 && (
              <IconifyIcon icon="ic:sharp-keyboard-double-arrow-right" />
            )}
          </>
        ))}
    </ul>
  );
};

export default BreadCrumb;
