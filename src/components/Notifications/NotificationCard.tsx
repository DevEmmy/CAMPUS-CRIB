import React from "react";
import messageIcon from "/icons/message.svg"
import { Link } from "react-router";

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
      <Link to={notification.actionLink} className="my-2 p-2">
        <div className="flex items-start justify-between w-full gap-3">
          <img className="size-10 border p-1 border-[#0E0F1D] rounded-[4.9px]" src={messageIcon} alt="icon" />
          <div className="flex flex-col gap-3">
          <h2 className="text-dark font-semibold leading-5 text-[14px] flex-1">
          {notification.title}
          </h2>
          <p className="text-[#7D8A9E] text-[14px] leading-5 font-normal">
        {notification.message}
        </p>
          </div>
          <small className="text-dark font-semibold leading-5 text-[12px] text-nowrap">
          {formatDate(notification.createdAt)}
          </small>
        </div>
      </Link>
  );
};

export default NotificationCard;
