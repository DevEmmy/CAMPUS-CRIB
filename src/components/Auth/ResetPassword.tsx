import { useState } from "react"
import { resetPassword } from "../../utils/authRequest"
import { Link, useNavigate } from "react-router"
import { Eye, EyeSlash, User, Lock, ArrowRight2, ArrowLeft2, TickCircle } from "iconsax-react"

const ResetPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
    general: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validate = () => {
    const newErrors = {
      newPassword: "",
      confirmPassword: "",
      general: "",
    }

    if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    }

    setErrors(newErrors)
    return !newErrors.newPassword && !newErrors.confirmPassword
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const resetToken = localStorage.getItem("resetToken")
    if (!resetToken) {
      setErrors((prev) => ({
        ...prev,
        general: "Reset token not found. Please request a new password reset.",
      }))
      return
    }

    try {
      setIsSubmitting(true)
      const response = await resetPassword(resetToken, formData.newPassword)

      if (response?.status === 200) {
        localStorage.removeItem("resetToken") 
        setIsSuccess(true)
       
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      }
    } catch (error: unknown) {
      console.error("Reset password error:", error)
     
      setErrors((prev) => ({
        ...prev,
        general: "Password reset failed. Please try again or request a new reset link.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="min-h-dvh w-full flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
              <TickCircle size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-dark dark:text-white mb-2">
              Password Reset Successful
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your password has been successfully reset.
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-green-700 dark:text-green-400 text-sm">
                  You can now log in with your new password.
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs text-center">
                Redirecting to login page...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-dvh w-full flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full mb-4 shadow-lg">
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark dark:text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {errors.general && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                <p className="text-red-700 dark:text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 
                    ${errors.newPassword ? "border-red-300" : "border-gray-200 dark:border-gray-700"}
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {isPasswordVisible ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-red-500 text-xs">{errors.newPassword}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 
                    ${errors.confirmPassword ? "border-red-300" : "border-gray-200 dark:border-gray-700"}
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                />
                <button
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {isConfirmPasswordVisible ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? "bg-primary/60 cursor-not-allowed" 
                  : "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-custom"
              }`}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Resetting Password...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight2 size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          {/* Back to Login */}
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowLeft2 size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-200 font-medium">Back to Login</span>
          </Link>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link 
              to="/login" 
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
