import React from "react";
import { Link } from "react-router";
import { Message, Home, Wallet, Star, Calendar } from "iconsax-react";

interface NotificationProps {
  notification: {
    _id: string;
    title: string;
    message: string;
    actionLink: string;
    createdAt: string;
    type?: string;
  };
}

const NotificationCard: React.FC<NotificationProps> = ({ notification }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    }
  };

  const getNotificationIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "bidding":
      case "result":
        return <Star size={18} className="text-amber-600" />;
      case "listing":
      case "new":
        return <Home size={18} className="text-blue-600" />;
      case "payment":
      case "transaction":
        return <Wallet size={18} className="text-emerald-600" />;
      case "booking":
      case "reservation":
        return <Calendar size={18} className="text-violet-600" />;
      default:
        return <Message size={18} className="text-primary" />;
    }
  };

  const getNotificationStyle = (type?: string) => {
    switch (type?.toLowerCase()) {
      case "bidding":
      case "result":
        return {
          bg: "bg-amber-50/50 dark:bg-amber-900/20",
          border: "border-amber-100 dark:border-amber-800",
          hover: "hover:bg-amber-100/60 dark:hover:bg-amber-800/40",
        };
      case "listing":
      case "new":
        return {
          bg: "bg-blue-50/50 dark:bg-blue-900/20",
          border: "border-blue-100 dark:border-blue-800",
          hover: "hover:bg-blue-100/60 dark:hover:bg-blue-800/40",
        };
      case "payment":
      case "transaction":
        return {
          bg: "bg-emerald-50/50 dark:bg-emerald-900/20",
          border: "border-emerald-100 dark:border-emerald-800",
          hover: "hover:bg-emerald-100/60 dark:hover:bg-emerald-800/40",
        };
      case "booking":
      case "reservation":
        return {
          bg: "bg-violet-50/50 dark:bg-violet-900/20",
          border: "border-violet-100 dark:border-violet-800",
          hover: "hover:bg-violet-100/60 dark:hover:bg-violet-800/40",
        };
      default:
        return {
          bg: "bg-gray-50/50 dark:bg-gray-800/40",
          border: "border-gray-100 dark:border-gray-700",
          hover: "hover:bg-gray-100/60 dark:hover:bg-gray-700/60",
        };
    }
  };

  const style = getNotificationStyle(notification.type);

  return (
    <Link to={notification.actionLink} className="block group">
      <div
        className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${style.bg} ${style.border} ${style.hover} group-hover:shadow-sm`}
      >
        {/* Icon */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/50 dark:border-gray-700">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white dark:border-gray-900"></div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
            {notification.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
            {notification.message}
          </p>
        </div>

        {/* Timestamp */}
        <div className="flex-shrink-0">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-white/60 dark:bg-gray-800/60 px-2 py-1 rounded-full">
            {formatDate(notification.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
