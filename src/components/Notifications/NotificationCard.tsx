import React from "react";
import { VscChevronLeft } from "react-icons/vsc";

const NotificationCard: React.FC = () => {
  return (
    <div>
      <div className="my-2 p-2">
        <div className="flex items-center justify-between w-full my-2 gap-2">
          <button className="text-primary border border-primary p-2 rounded-lg cursor-pointer">
            {/* Replace the icon with correct one later */}
            <VscChevronLeft size={30} />
          </button>
          <h2 className="text-dark font-semibold leading-5 text-[14px] flex-1">
            Payment Confirmed
          </h2>
          <small className="text-dark font-semibold leading-5 text-[12px] flex-1">
            1 DEC
          </small>
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-2">
        {/* implment the function to truncate the text */}
        <p className="text-[#7D8A9E] text-[14px] leading-5 font-normal">
          Transaction ID: 123456789 completed successfully for ₦250,000. Go
          ahead.........
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
