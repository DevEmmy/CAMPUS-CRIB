import type { User } from "../../types/user"
import type React from "react"
import { useState } from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi"

interface ControlledInputProps {
  type: "firstName" | "lastName" | "email" | "password"
  placeholder: string
  name: string
  errors: FieldErrors<User>
  register: UseFormRegister<User>
}

const ControlledInput: React.FC<ControlledInputProps> = ({ type, placeholder, name, errors, register }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const inputType = type === "password" && showPassword ? "text" : type === "firstName" || "lastName" ? "text" : type

  const errorMessage = errors[type]?.message

  return (
    <>
      <div className="flex items-center gap-3 p-4 w-full md:max-w-[600px] border border-primary rounded-lg my-2">
        <input
          {...register(type)}
          autoComplete="off"
          className="flex-1 text-[#00030A52] dark:text-gray-300 text-[14px] focus:outline-none bg-transparent bg-opacity-0"
          type={inputType}
          name={name}
          placeholder={placeholder}
        />
        {type === "password" &&
          (showPassword ? (
            <PiEyeThin
              className="text-[#00030A52] dark:text-gray-400 cursor-pointer"
              size={20}
              onClick={handleShowPassword}
            />
          ) : (
            <PiEyeSlashThin
              className="text-[#00030A52] dark:text-gray-400 cursor-pointer"
              size={20}
              onClick={handleShowPassword}
            />
          ))}
      </div>

      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </>
  )
}

export default ControlledInput
