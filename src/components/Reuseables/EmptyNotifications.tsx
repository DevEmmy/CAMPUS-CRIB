import React from "react";
import ControlledButton from "./ControlledButton";

const EmptyNotifications: React.FC = () => {
  return (
    <div className="w-full h-full p-2 flex flex-col items-center justify-center mt-36 gap-5">
      {/* home icon */}
      <p className="text-[#64748B] text-center leading-5 text-[12px] font-normal">
        No listing/payment on any hostels yet. Just make sure you stay updated
        for any new flaws!
      </p>
      <ControlledButton title="Discover new hostels" />
    </div>
  );
};

export default EmptyNotifications;
