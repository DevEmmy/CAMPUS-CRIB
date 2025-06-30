import { useState } from "react"
import { resetPassword } from "../../utils/authRequest"
import line from "/onboarding/Line.svg"
import { Link, useNavigate } from "react-router"
import { Eye, EyeSlash } from "iconsax-react"

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
    } catch (error: any) {
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
      <section className="min-h-[100vh] w-full p-5 grid place-items-center">
        <div className="text-center">
          <div className="p-5 rounded-xl my-5">
            <div className="mb-6">
              <h2 className="text-primary text-[24px] font-bold leading-7">Password Reset Successful</h2>
              <p className="text-dark text-[14px] leading-5 font-normal my-2">
                Your password has been successfully reset.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-[14px]">You can now log in with your new password.</p>
              </div>
              <p className="text-dark text-[12px] leading-5">Redirecting to login page...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[100vh] w-full p-5 grid place-items-center">
      <div className="">
        <div className="p-5 rounded-xl my-5">
          <div>
            <h2 className="text-primary text-[24px] font-bold leading-7">Reset Password</h2>
            <p className="text-dark text-[14px] leading-5 font-normal my-2">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-xs">{errors.general}</p>
              </div>
            )}

            <div className="w-full">
              <div className="flex items-center border border-primary rounded-lg pr-2 bg-white">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-4 grow rounded-lg text-[14px] focus:outline-none"
                  placeholder="New Password"
                />
                {isPasswordVisible ? (
                  <EyeSlash
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    size="22"
                    color="#a64e1b"
                    variant="Broken"
                  />
                ) : (
                  <Eye
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    size="22"
                    color="#a64e1b"
                    variant="Broken"
                  />
                )}
              </div>
              {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
            </div>

            <div className="w-full">
              <div className="flex items-center border border-primary rounded-lg pr-2 bg-white">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-4 grow rounded-lg text-[14px] focus:outline-none"
                  placeholder="Confirm New Password"
                />
                {isConfirmPasswordVisible ? (
                  <EyeSlash
                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    size="22"
                    color="#a64e1b"
                    variant="Broken"
                  />
                ) : (
                  <Eye
                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    size="22"
                    color="#a64e1b"
                    variant="Broken"
                  />
                )}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <button
                className={`${
                  isSubmitting ? "bg-primary/60" : "bg-primary"
                } text-white p-3 w-full font-bold rounded-lg text-[16px] text-center leading-5`}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
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
            Remember your password?{" "}
            <Link className="text-primary" to={"/login"}>
              Sign In
            </Link>
          </small>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
