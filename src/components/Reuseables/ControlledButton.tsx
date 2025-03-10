import React from 'react'

interface ControlledButtonProps {
    title: string;
    isEdited?: boolean;
    uploading?: boolean;
    handleButtonClick?: () => void
}

const ControlledButton: React.FC<ControlledButtonProps> = ({title, isEdited, uploading, handleButtonClick}) => {
  return (
    <div>
     <button
        className={`${isEdited ? `bg-primary` :`bg-[#DFBFAD]`} px-7 py-2.5 rounded-lg leading-5 text-white text-[14px]`}
        type="button"
        disabled={uploading}
        onClick={handleButtonClick}
      >
        {uploading ? "Uploading..." : title}
      </button>
  </div>
  )
}

export default ControlledButton