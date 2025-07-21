import React from "react";
import indicator from "/onboarding/step2.svg";
import document from "/onboarding/document-attachment.svg";
import ButtonFileUploader from "../Reuseables/ButtonFileUploader";
import { ArrowLeft2 } from "iconsax-react";
// import attachment from '/onboarding/document-attachment-light.svg'

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const Step2: React.FC<Props> = ({handleNextStep, handlePrevStep}) => {
  const handleUploadComplete = (uploadUrls?: string[]) => {
    if (uploadUrls) {
      // Handle uploaded files if needed
    }
  };
  return (
    <section className="p-5 h-full w-full">
      <div className="flex items-center gap-2">
      <ArrowLeft2 size="32" color="#0E0F1D"/>
        <img className="ml-20" src={indicator} alt="" />
      </div>

      <div className="my-10">
        <h2 className="text-primary text-[22px] font-bold leading-7">
          Verify Identity
        </h2>

        <div className="my-10">
          <p className="text-dark leading-5 text-[14px] font-normal">
            Proof of Address (Utility bill, Rental Agreement)
          </p>

          <div className="border border-primary rounded-lg mt-5 flex flex-col items-center justify-between gap-5 p-5 h-[168px]">
            <img src={document} alt="attachment" />
            <ButtonFileUploader title="Upload" onUploadComplete={handleUploadComplete} />
            <small className="text-dark text-[12px] leading-5 font-normal">
              JPG, PNG, PDF (Max size: 5MB).
            </small>
          </div>
          <small className="text-dark text-[12px] leading-5 font-normal">
            Ensure the ID is clear and readable for verification.
          </small>

          <div className="flex items-center justify-between gap-5 w-full">
            <button onClick={handlePrevStep} className="bg-[#DFBFAD] py-4 px-6 my-5 text-primary font-bold rounded-lg leading-5 text-[14px] w-full">
              Back
            </button>
            <button onClick={handleNextStep} className="bg-primary p-4 capitalize text-white rounded-lg text-[14px] font-bold w-full">
              next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step2;
