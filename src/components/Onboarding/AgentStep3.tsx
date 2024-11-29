import React from "react";
import indicator from "/onboarding/indicator-3.svg";
import illustration from "/onboarding/onboard-2.svg";
import { Link } from "react-router";

const AgentStep3: React.FC = () => {
  return (
    <section className="h-[100vh] w-full flex items-center justify-end flex-col p-4 gap-5">
    <div>
      <img src={illustration} alt="" />
    </div>
    <div className="bg-primary rounded-xl p-6 flex flex-col items-center justify-between gap-5 text-white">
      <img src={indicator} alt="indicator" />
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-center text-[24px] font-bold leading-7 p-2">
        Your Success, Our Priority
        </h2>
        <p className="text-[14px] font-normal leading-5 text-center p-2">
        We provide tools, insights, and support to help you succeed. From detailed analytics to 24/7 assistance, we’re here to make your journey easier
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <Link to={'/agent/signup'} className="bg-white text-primary py-2 px-14 rounded-lg font-bold">
          Get Started
        </Link>
      </div>
    </div>
  </section>
  )
}

export default AgentStep3