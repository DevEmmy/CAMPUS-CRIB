import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { forgotPassword } from "../../utils/authRequest"
import { User, Sms, ArrowRight2, ArrowLeft2, TickCircle } from "iconsax-react"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setIsSubmitting(true)
      const response = await forgotPassword(email)

      if (response?.status === 200) {
        if (response.data?.data?.resetToken) {
          localStorage.setItem("resetToken", response.data.data.resetToken)
        }
        setIsSuccess(true)
        setTimeout(() => {
          navigate("/reset-password")
        }, 2000)
      }
    } catch (error: any) {
      console.error("Forgot password error:", error)
      setError(error.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="min-h-dvh w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
              <TickCircle size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-dark mb-2">
              Check Your Email
            </h1>
            <p className="text-gray-600 text-sm">
              Password reset instructions have been sent to your email address.
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              <p className="text-gray-600 text-xs text-center">
                Redirecting to reset password page...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-dvh w-full flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full mb-4 shadow-lg">
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Form */}
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Sms size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                    error ? "border-red-300" : "border-gray-200"
                  }`}
                />
              </div>
              {error && (
                <span className="text-red-500 text-xs">{error}</span>
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
                  Sending Reset Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight2 size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Back to Login */}
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft2 size={20} className="text-gray-600" />
            <span className="text-gray-700 font-medium">Back to Login</span>
          </Link>
        </div>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
