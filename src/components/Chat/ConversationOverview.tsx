import React from "react";
import profile from "/icons/profile.png";

const ConversationOverview: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-3 my-2 hover:bg-gray-50 dark:hover:bg-[#222] rounded-lg transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-600">
        <img
          src={profile}
          alt="user"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="font-medium capitalize text-gray-900 dark:text-white truncate">
          John doe
        </h3>
        <small className="text-gray-600 dark:text-gray-300 truncate">
          Hii
        </small>
      </div>
      <div className="flex-shrink-0">
        <small className="italic text-gray-500 dark:text-gray-400">
          1min ago
        </small>
      </div>
    </div>
  );
};

export default ConversationOverview;