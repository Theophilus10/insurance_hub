import React from "react";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "./dialog";
import { ContentSize } from "@app/types/appTypes";
import IconButton from "./IconButton";
import Divider from "./Divider";
import ScrollSection from "./scrollSection";

const widthKind = {
  sm: "w-[500px]",
  md: "w-[700px]",
  lg: "w-[900px]",
  xl: "w-[1100px]",
  "2xl": "w-[1300px]",
  full: "w-full",
};

interface IModal {
  open: boolean;
  size: ContentSize;
  children?: React.ReactNode | React.JSX.Element;
  title?: string;
  showDivider?: boolean;
  closeModal: () => void;
}

const Modal: React.FC<IModal> = ({
  open,
  size,
  children,
  showDivider = true,
  title,
  closeModal,
}) => {
  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        className={`${widthKind[size]} flex flex-col max-h-[96vh]`}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <IconButton
              color="default"
              icon="ic:round-close"
              onClick={closeModal}
              size={10}
            />
          </div>
          <Divider className={`bg-gray-300 ${!showDivider && "hidden"}`} />
        </DialogHeader>
        {/* <DialogDescription className=""> */}
        <ScrollSection className="flex-grow h-full w-full">
          {children}
        </ScrollSection>
        {/* </DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
