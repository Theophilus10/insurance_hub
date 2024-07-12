import React, { ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  methods: () => void;
  children: ReactNode;
  action: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  methods,
  action,
  children,
}) => {
  if (!show) return null;

  const handleMethodClick = () => {
    methods();
  };

  return (
    <div className="fixed left-[50%] top-[50%] z-[3000] grid translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-slate-800 dark:bg-slate-950">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-[700px]">
        {children}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleMethodClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            {action}
          </button>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
