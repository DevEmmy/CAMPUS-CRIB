import React from "react";
import profile from "/icons/profile.png";

const ConversationOverview: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-3 my-2">
      <div>
        <img
          src={profile}
          alt="user"
          className="object-cover w-full h-full overflow-hidden"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="font-medium capitalize">John doe</h3>
        <small>Hii</small>
      </div>
      <div>
        <small className="italic text-gray-500">1min ago</small>
      </div>
    </div>
  );
};

export default ConversationOverview;
