import type React from "react"
import { MdClose } from "react-icons/md"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 px-4 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 min-w-full p-6 rounded-lg shadow-lg dark:shadow-gray-900/50 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          <MdClose size={24} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
