import React from "react";
import indicator from "/onboarding/step3.svg";
import document from "/onboarding/document-attachment.svg";
import { ArrowLeft2 } from "iconsax-react";

interface Props {
  handlePrevStep: () => void;
}

const Step3: React.FC<Props> = ({ handlePrevStep }) => {
  return (
    <section className="p-5 h-full w-full bg-white dark:bg-theme transition-colors duration-300">
      {/* Top bar */}
      <div className="flex items-center gap-2">
        <ArrowLeft2 size="32" color="currentColor" className="text-dark dark:text-white" />
        <img className="ml-20" src={indicator} alt="indicator" />
      </div>

      {/* Content */}
      <div className="my-10">
        <h2 className="text-primary dark:text-[#DFBFAD] text-[22px] font-bold leading-7">
          Verify Identity
        </h2>

        <div className="my-10">
          <p className="text-dark dark:text-gray-300 leading-5 text-[14px] font-normal">
            Business Registration (for agencies/hostel managers)
          </p>

          {/* Upload box */}
          <div className="border border-primary dark:border-[#DFBFAD] rounded-lg mt-5 flex flex-col items-center justify-between gap-5 p-5 h-[168px] bg-white dark:bg-[#1A1B2D] transition-colors duration-300">
            <img src={document} alt="attachment" />
            <button className="bg-[#DFBFAD] hover:bg-[#c9a892] px-7 py-4 rounded-lg leading-5 text-white text-[14px] transition">
              Choose File
            </button>
            <small className="text-dark dark:text-gray-400 text-[12px] leading-5 font-normal">
              JPG, PNG, PDF (Max size: 5MB).
            </small>
          </div>

          <small className="text-dark dark:text-gray-400 text-[12px] leading-5 font-normal">
            Ensure the ID is clear and readable for verification.
          </small>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-5 w-full">
            <button
              onClick={handlePrevStep}
              className="bg-[#DFBFAD] hover:bg-[#c9a892] py-4 px-6 my-5 text-primary dark:text-[#0E0F1D] font-bold rounded-lg leading-5 text-[14px] w-full transition"
            >
              Back
            </button>
            <button className="bg-primary hover:bg-primary/90 p-4 capitalize text-white rounded-lg text-[14px] font-bold w-full transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step3;
