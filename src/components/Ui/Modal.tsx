import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-[99999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white relative p-5 rounded-xl shadow-lg w-96">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          <LiaTimesSolid />
        </button>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
