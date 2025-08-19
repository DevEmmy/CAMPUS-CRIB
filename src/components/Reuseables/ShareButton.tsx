import type React from "react"
import { useState } from "react"
import { Share, Copy, Check } from "iconsax-react"
import { copyToClipboardWithCallback } from "../../utils/copyToClipboard"

interface ShareButtonProps {
  text: string
  onSuccess?: () => void
  onError?: (error: Error) => void
  className?: string
  variant?: "icon" | "button" | "full"
  children?: React.ReactNode
  successDuration?: number
}

const ShareButton: React.FC<ShareButtonProps> = ({
  text,
  onSuccess,
  onError,
  className = "",
  variant = "icon",
  children,
  successDuration = 2000,
}) => {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    await copyToClipboardWithCallback(
      text,
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), successDuration)
        if (onSuccess) onSuccess()
      },
      (error) => {
        if (onError) onError(error)
      },
    )
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleShare}
        className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative ${className}`}
        title="Share"
      >
        {copied ? (
          <Check size={24} className="text-green-500" />
        ) : (
          <Share size={24} className="text-gray-600 dark:text-gray-400" />
        )}
      </button>
    )
  }

  if (variant === "button") {
    return (
      <button
        onClick={handleShare}
        className={`bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 w-full ${className}`}
      >
        {copied ? (
          <>
            <Check size={20} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={20} />
            {children || "Share"}
          </>
        )}
      </button>
    )
  }

  if (variant === "full") {
    return (
      <button
        onClick={handleShare}
        className={`w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 ${className}`}
      >
        {copied ? (
          <>
            <Check size={20} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={20} />
            {children || "Share"}
          </>
        )}
      </button>
    )
  }

  return null
}

export default ShareButton
