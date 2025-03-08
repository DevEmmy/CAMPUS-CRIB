import React from "react";
import { VscChevronLeft } from "react-icons/vsc";

interface NotificationProps {
  notification: {
    _id: string;
    title: string;
    message: string;
    actionLink: string;
    createdAt: string;
  };
}

const NotificationCard: React.FC<NotificationProps>  = ({notification}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };
  return (
    <div>
      <div className="my-2 p-2">
        <div className="flex items-center justify-between w-full my-2 gap-2">
          <button className="text-primary border border-primary p-2 rounded-lg cursor-pointer">
            {/* Replace the icon with correct one later */}
            <VscChevronLeft size={30} />
          </button>
          <h2 className="text-dark font-semibold leading-5 text-[14px] flex-1">
          {notification.title}
          </h2>
          <small className="text-dark font-semibold leading-5 text-[12px] flex-1">
          {formatDate(notification.createdAt)}
          </small>
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-2">
        {/* implment the function to truncate the text */}
        <p className="text-[#7D8A9E] text-[14px] leading-5 font-normal">
        {notification.message}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
