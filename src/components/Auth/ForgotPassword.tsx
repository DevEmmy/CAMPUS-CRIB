import type React from "react"
import { useState } from "react"
import line from "/onboarding/Line.svg"
import { Link, useNavigate } from "react-router"
import { forgotPassword } from "../../utils/authRequest"

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
      <section className="min-h-[100vh] w-full p-5 grid place-items-center">
        <div className="text-center">
          <div className="p-5 rounded-xl my-5">
            <div className="mb-6">
              <h2 className="text-primary text-[24px] font-bold leading-7">Check Your Email</h2>
              <p className="text-dark text-[14px] leading-5 font-normal my-2">
                Password reset instructions have been sent to your email address.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-[14px]">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              <p className="text-dark text-[12px] leading-5">Redirecting to reset password page...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[100vh] w-full p-5 grid">
      <div className="">
        <div className="p-5 rounded-xl my-5">
          <div>
            <h2 className="text-primary text-[24px] font-bold leading-7">Forgot Password</h2>
            <p className="text-dark text-[14px] leading-5 font-normal my-2">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="w-full">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-primary rounded-lg text-[14px] focus:outline-none"
                placeholder="Email Address"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <div>
              <button
                className={`${
                  isSubmitting ? "bg-primary/60" : "bg-primary"
                } text-white p-3 w-full font-semibold rounded-lg text-[16px] text-center leading-5`}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </div>

            <div className="flex items-center justify-around gap-2 w-full">
              <img width={80} src={line || "/placeholder.svg"} alt="line" />
              <small className="text-nowrap text-primary leading-[14px] text-[12px]">or go back to</small>
              <img width={80} src={line || "/placeholder.svg"} alt="line" />
            </div>

            <div>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 border border-primary rounded-lg p-3 w-full text-dark text-[14px] leading-5 font-normal hover:bg-primary/5 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center my-10">
          <small className="text-dark text-[14px] leading-5 text-center">
            Don't have an account?{" "}
            <Link className="text-primary" to={"/signup"}>
              Sign Up
            </Link>
          </small>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
