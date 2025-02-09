import React from "react";
import { useParams, useNavigate } from "react-router";
import tick from "/icons/successTick.svg";
import { GoDownload } from "react-icons/go";

const WithdrawalStatus: React.FC = () => {
  const { isSuccess, price } = useParams();
  const navigate = useNavigate();

  return (
    <section className="h-[100vh] w-full p-5 grid place-items-center">
      <div className="max-w-lg w-full">
        {isSuccess ? (
          <div className="flex flex-col gap-2">
            <img src={tick} alt="Success Tick" className="mx-auto mb-4" />
            <p className="mb-2.5 text-xl text-center">Successful</p>
            <p className="text-[#7d8a9e] text-center my-3">
              Your purchase of Campus Haven Lodge for <strong>${price}</strong>{" "}
              has been successful. Send a downloaded receipt to the agent.
            </p>

            <button 
                onClick={() => navigate(-1)}
            className="p-3 w-full bg-primary flex justify-center items-center rounded-lg text-white">
              <span className="ml-2">Go Back.</span>
            </button>

            <button className="p-3 my-2.5 w-full border border-[#1B85A6] flex justify-center items-center rounded-lg text-[#1B85A6]">
              <GoDownload size={18} />
              <span className="ml-2">Download receipt.</span>
            </button>
          </div>
        ) : (
          <p className="text-center text-red-500">
            Transaction failed. Please try again.
          </p>
        )}
      </div>
    </section>
  );
};

export default WithdrawalStatus;
