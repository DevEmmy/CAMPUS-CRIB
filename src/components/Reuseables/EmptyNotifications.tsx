import type React from "react"
import ControlledButton from "./ControlledButton"
import { useNavigate } from "react-router"

const EmptyNotifications: React.FC = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate("/")
  }

  return (
    <div className="w-full h-full p-2 flex flex-col items-center justify-center mt-36 gap-5">
      {/* home icon */}
      <p className="text-[#64748B] dark:text-gray-400 text-center leading-5 text-[12px] font-normal">
        No listing/payment on any hostels yet. Just make sure you stay updated for any new flaws!
      </p>
      <ControlledButton handleButtonClick={handleButtonClick} title="Discover new hostels" />
    </div>
  )
}

export default EmptyNotifications
