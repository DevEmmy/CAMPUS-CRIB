import React from "react";
import { CloseCircle } from "iconsax-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt = "Image"
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200"
        >
          <CloseCircle size={24} />
        </button>

        {/* Image Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 