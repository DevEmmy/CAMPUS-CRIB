import React from 'react'
import document from '/onboarding/document-attachment.svg'

const SchoolID: React.FC = () => {
  return (
    <section>
      <div className="bg-[#E6CDBF4D] dark:bg-[#2A2A2A] p-7 border border-primary rounded-xl my-10">
        <div>
          <h2 className="font-bold text-[26px] text-primary dark:text-[#E6CDBF] leading-7">
            School ID
          </h2>
          <p className="text-dark dark:text-gray-300 leading-5 text-[12px] font-normal">
            Upload Your School ID Card
          </p>
        </div>

        <div className="border border-primary rounded-lg mt-5 flex flex-col items-center justify-between gap-5 p-5 h-[168px] dark:border-gray-500 dark:bg-[#1E1E1E]">
          <img src={document} alt="attachment" />
          <button className="bg-[#DFBFAD] dark:bg-primary px-7 py-4 rounded-lg leading-5 text-white text-[14px]">
            Choose File
          </button>
          <small className="text-dark dark:text-gray-400 text-[12px] leading-5 font-normal">
            JPG, PNG, PDF (Max size: 5MB).
          </small>
        </div>

        <small className="text-dark dark:text-gray-400 text-[12px] leading-5 font-normal">
          Ensure the ID is clear and readable for verification.
        </small>

        <div className="flex items-center justify-around w-full">
          <button className="bg-[#DFBFAD] dark:bg-gray-700 py-4 px-12 my-5 text-primary dark:text-[#E6CDBF] font-bold rounded-lg leading-5 text-[14px]">
            Back
          </button>
          <button className="bg-primary p-4 capitalize text-white rounded-lg text-[14px] font-bold dark:bg-[#E6CDBF] dark:text-[#1E1E1E]">
            create account
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <small className="text-dark dark:text-gray-400 text-[14px] leading-5">
          Already have account?{" "}
          <span className="text-primary dark:text-[#E6CDBF] cursor-pointer">
            Log In
          </span>
        </small>
      </div>
    </section>
  )
}

export default SchoolID
