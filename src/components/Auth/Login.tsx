import { useState } from "react";
import { login } from "../../utils/authRequest"; // Assuming login function exists in your authRequest file
import line from "/onboarding/Line.svg";
import google from "/onboarding/google.svg";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Eye, EyeSlash } from "iconsax-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);


  // Handle change of form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Handle form submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const response = await login(formData);
      // Ensure that response is valid
      if (response?.status === 200) {
        navigate("/");
      }
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-full w-full p-5">
      <div className="bg-[#E6CDBF4D] p-5 rounded-xl my-5">
        <div>
          <h2 className="text-primary text-[24px] font-bold leading-7">
            Welcome Back
          </h2>
          <p className="text-dark text-[14px] leading-5 font-normal my-2">
            Log in to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-primary rounded-lg text-[14px] focus:outline-none"
              placeholder="Email Address"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center border border-primary rounded-lg pr-2 bg-white ">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 grow rounded-lg text-[14px] focus:outline-none"
                placeholder="Password"
              />

              {
                isPasswordVisible ? <EyeSlash onClick={() => setIsPasswordVisible(!isPasswordVisible)} size="22" color="#a64e1b" variant="Broken" /> : <Eye onClick={() => setIsPasswordVisible(!isPasswordVisible)} size="22" color="#a64e1b" variant="Broken" />
              }

            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <small className="capitalize text-right text-primary text-[12px] leading-5 font-normal">
              Forget password
            </small>
          </div>

          <div>
            <button
              className="bg-primary text-white p-3 w-full font-bold rounded-lg text-[16px] text-center leading-5"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "logging in" : "Log In"}
            </button>
          </div>

          <div className="flex items-center justify-around gap-2 w-full">
            <img width={80} src={line} alt="line" />
            <small className="text-nowrap text-primary leading-[14px] text-[12px]">
              or register with
            </small>
            <img width={80} src={line} alt="line" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 border border-primary rounded-lg p-3 w-full">
              <img src={google} alt="" />
              <p className="text-dark text-[14px] leading-5 font-normal">
                Continue with Google
              </p>
            </div>
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
    </section>
  );
};

export default Login;
