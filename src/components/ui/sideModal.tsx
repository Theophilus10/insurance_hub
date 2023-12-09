import React from "react";
import { Sheet, SheetContent, SheetTitle } from "./sheet";
import IconButton from "./IconButton";
import Divider from "./Divider";
import { ContentSize } from "@app/types/appTypes";
// import { ScrollArea } from "./scroll-area";
import ScrollSection from "./scrollSection";

const widthKind = {
  sm: "w-96",
  md: "w-[500px]",
  lg: "w-[600px]",
  xl: "w-[750px]",
  "2xl": "w-[800px]",
  full: "w-full",
};

interface ISideModal {
  open: boolean;
  closeModal: () => void;
  size?: ContentSize;
  children?: React.ReactNode | React.JSX.Element;
  title?: string;
  showDivider?: boolean;
}

const SideModal: React.FC<ISideModal> = ({
  open = false,
  closeModal,
  size = "sm",
  children,
  title,
  showDivider = true,
}) => {
  return (
    <Sheet open={open}>
      <SheetContent className={`${widthKind[size]} h-full flex flex-col`}>
        <div className="flex flex-col h-full ">
          <div className="flex justify-between items-center px-3 pt-1">
            <SheetTitle>{title}</SheetTitle>
            <IconButton
              color="default"
              icon="ic:round-close"
              onClick={closeModal}
            />
          </div>
          <Divider className={`bg-gray-300 ${!showDivider && "hidden"}`} />
          <ScrollSection className=" flex-grow px-3 mt-2 ">
            {children}
          </ScrollSection>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideModal;
