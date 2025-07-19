import React from "react";
import { Link } from "react-router";
import { Message, Home, Wallet, Star, Calendar, Notification } from "iconsax-react";

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
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
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
          bg: "bg-amber-50/50",
          border: "border-amber-100",
          hover: "hover:bg-amber-50 hover:border-amber-200"
        };
      case "listing":
      case "new":
        return {
          bg: "bg-blue-50/50",
          border: "border-blue-100",
          hover: "hover:bg-blue-50 hover:border-blue-200"
        };
      case "payment":
      case "transaction":
        return {
          bg: "bg-emerald-50/50",
          border: "border-emerald-100",
          hover: "hover:bg-emerald-50 hover:border-emerald-200"
        };
      case "booking":
      case "reservation":
        return {
          bg: "bg-violet-50/50",
          border: "border-violet-100",
          hover: "hover:bg-violet-50 hover:border-violet-200"
        };
      default:
        return {
          bg: "bg-gray-50/50",
          border: "border-gray-100",
          hover: "hover:bg-gray-50 hover:border-gray-200"
        };
    }
  };

  const style = getNotificationStyle(notification.type);

  return (
    <Link to={notification.actionLink} className="block group">
      <div className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${style.bg} ${style.border} ${style.hover} group-hover:shadow-sm`}>
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/50">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {notification.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {notification.message}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <span className="text-xs text-gray-500 font-medium bg-white/60 px-2 py-1 rounded-full">
            {formatDate(notification.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
