import React from 'react'

interface ControlledButtonProps {
    title: string;
    uploading?: boolean;
    handleButtonClick?: () => void
}

const ControlledButton: React.FC<ControlledButtonProps> = ({title, uploading, handleButtonClick}) => {
  return (
    <div>
     <button
        className="bg-[#DFBFAD] px-7 py-4 rounded-lg leading-5 text-white text-[14px]"
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