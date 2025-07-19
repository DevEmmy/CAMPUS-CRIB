import React, { useEffect } from "react";
import EmptyNotifications from "../Reuseables/EmptyNotifications";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../lib/getNotifications";
import Loader from "../Ui/Loader";
import NotificationCard from "./NotificationCard";
import { Notification, Message, Star, Home, Wallet, Calendar } from "iconsax-react";

const AllNotifications: React.FC = () => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });

  useEffect(() => {
    if (notifications) {
      console.log(notifications.data);
    }
  }, [notifications]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">Loading your notifications</p>
            <p className="text-sm text-gray-500">Please wait while we fetch the latest updates</p>
          </div>
        </div>
      </div>
    );
  }

  if (!notifications?.data.data.length) {
    return (
      <div className="text-center py-20">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Notification size={28} className="text-gray-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">All caught up</h3>
          <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
            You're up to date with all your notifications. New updates will appear here when they arrive.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
        <span className="text-sm text-gray-500 font-medium">
          {notifications.data.data.length} {notifications.data.data.length === 1 ? 'notification' : 'notifications'}
        </span>
      </div>
      
      <div className="space-y-3">
        {notifications?.data.data.map((notification: any, index: number) => (
          <div key={notification.id} className="relative">
            <NotificationCard notification={notification} />
            {index < notifications.data.data.length - 1 && (
              <div className="absolute left-6 top-full w-px h-3 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNotifications;
