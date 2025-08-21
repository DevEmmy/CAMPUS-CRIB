import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import confirm from "/onboarding/confirm.svg";
import OTPInput from "../Reuseables/OTPInput";

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  return (
    <section className="p-5 h-full w-full bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <div>
        <BiChevronLeft
          size={30}
          className="text-dark dark:text-white cursor-pointer"
        />
      </div>

      <div className="flex flex-col items-center justify-center h-[80vh] w-full">
        <div>
          <img src={confirm} alt="confirm" />
        </div>
        <div className="my-5 w-full">
          <h2 className="text-dark dark:text-white text-[22px] leading-7 text-center font-bold">
            Verify your E-mail
          </h2>
          <small className="text-[#7D8A9E] dark:text-[#cbd5e1] text-[14px] leading-5 text-center font-normal my-1 block">
            Please enter the 5 digit code to verify your E-mail
          </small>

          <div className="flex flex-col items-center">
            {/* otp input */}
            <OTPInput otp={otp} setOtp={setOtp} />

            {/* handle count down logic */}
            <small className="text-dark dark:text-gray-300 text-[14px] text-center font-normal leading-7">
              Send code again 00:20
            </small>
          </div>

          <div>
            <button className="bg-primary text-white py-3 px-5 font-bold text-[18px] leading-5 text-center my-5 rounded-lg w-full hover:opacity-90 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
