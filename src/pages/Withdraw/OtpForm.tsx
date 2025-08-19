import React, { useState, useRef } from "react"

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  onFocus: () => void
  onBlur: () => void
  index: number
}

const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  ({ value, onChange, onFocus, onBlur, index }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      if (inputValue.length <= 1) {
        onChange(inputValue)
      }
    }

    return (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={1}
        className="w-12 h-12 text-center border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md mx-2 text-xl focus:border-primary dark:focus:border-primary focus:outline-none"
        ref={ref}
        autoFocus={index === 0}
      />
    )
  },
)

OTPInput.displayName = "OTPInput" // Required for proper debugging

const OTPForm: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select()
  }

  const handleBlur = () => {
    // Optional: Add custom blur behavior if needed
  }

  return (
    <>
      <div className="flex justify-center items-center space-x-2">
        {otp.map((digit, index) => (
          <OTPInput
            key={index}
            value={digit}
            index={index}
            onChange={(value) => handleChange(index, value)}
            onFocus={() => handleFocus(index)}
            onBlur={() => handleBlur()}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <p className="py-2 dark:text-gray-300">Send code again 00:20</p>
    </>
  )
}

export default OTPForm
