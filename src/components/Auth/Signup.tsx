import React, { useState } from "react";
import line from "/onboarding/Line.svg";
import google from "/onboarding/google.svg";
import { Link } from "react-router";
import { signup } from "../../utils/authRequest";
import { useNavigate } from "react-router";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const accountType = localStorage.getItem("accountType");
  // console.log(accountType)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: accountType || null,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // Validate firstName
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    // Validate lastName
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    // Validate confirmPassword
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match.";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submit
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const { confirmPassword, ...userData } = formData;
      const response = await signup(userData);
      if (response?.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-full w-full p-5">
      <div className="bg-[#E6CDBF4D] p-5 rounded-xl my-5">
        <div>
          <h2 className="text-primary text-[24px] font-bold leading-7">
            Create Account
          </h2>
          <p className="text-dark text-[14px] leading-5 font-normal my-2">
            Join us to find the perfect hostel for your campus life
          </p>
        </div>
       

        <form onSubmit={handleSignup} className="space-y-5">
          {/* First Name */}
          <div className="flex items-center gap-3 p-4 w-full md:max-w-[600px] border border-primary rounded-lg my-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="flex-1 text-[#00030A52] text-[14px] focus:outline-none bg-transparent bg-opacity-0"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex items-center gap-3 p-4 w-full md:max-w-[600px] border border-primary rounded-lg my-2">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="flex-1 text-[#00030A52] text-[14px] focus:outline-none bg-transparent bg-opacity-0"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 p-4 w-full md:max-w-[600px] border border-primary rounded-lg my-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="flex-1 text-[#00030A52] text-[14px] focus:outline-none bg-transparent bg-opacity-0"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 p-4 w-full md:max-w-[600px] border border-primary rounded-lg my-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="flex-1 text-[#00030A52] text-[14px] focus:outline-none bg-transparent bg-opacity-0"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-3 p-4 w-full md:max-w-[600px] border border-primary rounded-lg my-2">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="flex-1 text-[#00030A52] text-[14px] focus:outline-none bg-transparent bg-opacity-0"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="bg-primary text-white p-3 w-full font-bold rounded-lg text-[16px] text-center leading-5"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>

          <div className="flex items-center justify-around gap-2 w-full">
            <img width={80} src={line} alt="line" />
            <small className="text-nowrap text-primary leading-[14px] text-[12px]">
              or register with
            </small>
            <img width={80} src={line} alt="line" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 border border-primary rounded-lg p-3 w-full">
              <img src={google} alt="google" />
              <p className="text-dark text-[14px] leading-5 font-normal">
                Continue with Google
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center my-10">
        <small className="text-dark text-[14px] leading-5 text-center">
          Already have an account?{" "}
          <Link className="text-primary" to={"/login"}>
            Log In
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Signup;
