import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "../../lib/getNotifications";
import { ArrowLeft, Notification, Check, Trash } from "iconsax-react";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "oasis-toast";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: notifications, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });

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
        return <Notification size={18} className="text-amber-600" />;
      case "listing":
      case "new":
        return <Notification size={18} className="text-blue-600" />;
      case "payment":
      case "transaction":
        return <Notification size={18} className="text-emerald-600" />;
      case "booking":
      case "reservation":
        return <Notification size={18} className="text-violet-600" />;
      default:
        return <Notification size={18} className="text-primary" />;
    }
  };

  const handleMarkAsRead = async () => {
    try {
      successToast("Marked as read", "");
      refetch();
    } catch (error: unknown) {
      errorToast("Failed to mark as read", "Please try again");
      console.log(error)
    }
  };

  const handleDeleteNotification = async () => {
    try {
      successToast("Notification deleted", "");
      refetch();
    } catch (error) {
      errorToast("Failed to delete notification", "Please try again");
      console.log(error)
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-dvh bg-gray-50 dark:bg-theme">
        <div className="bg-white dark:bg-[#222] border-b border-gray-200 dark:border-dark-300 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-variant-500 dark:hover:text-white"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <h1 className="text-lg font-semibold text-dark dark:text-white">Notifications</h1>
            
            <div className="w-8"></div>
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600 dark:text-variant-500">Loading notifications...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-theme">
      {/* Header */}
      <div className="bg-white dark:bg-[#222] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-variant-500 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <h1 className="text-lg font-semibold text-dark dark:text-white">Notifications</h1>
          
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-4">
        {!notifications?.data.data.length ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-dark-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Notification size={40} className="text-gray-400 dark:text-gray-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-3">
              All caught up!
            </h2>
            
            <p className="text-gray-600 dark:text-variant-500 mb-8 max-w-md">
              You're up to date with all your notifications. New updates will appear here when they arrive.
            </p>
          </div>
        ) : (
          /* Notifications List */
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark dark:text-white">
                Recent Notifications
              </h2>
              <span className="text-sm text-gray-500 dark:text-variant-500">
                {notifications.data.data.length} {notifications.data.data.length === 1 ? 'notification' : 'notifications'}
              </span>
            </div>

            {notifications.data.data.map((notification: any) => (
              <div
                key={notification._id}
                className="bg-white dark:bg-dark-100 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-dark-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-dark-200 rounded-lg flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark dark:text-white text-sm mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 dark:text-variant-500 text-sm leading-relaxed mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-variant-500">
                        {formatDate(notification.createdAt)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMarkAsRead()}
                          className="p-1 text-gray-400 hover:text-green-600 dark:text-variant-500 dark:hover:text-green-400 transition-colors"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteNotification()}
                          className="p-1 text-gray-400 hover:text-red-600 dark:text-variant-500 dark:hover:text-red-400 transition-colors"
                          title="Delete notification"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default NotificationsPage;
